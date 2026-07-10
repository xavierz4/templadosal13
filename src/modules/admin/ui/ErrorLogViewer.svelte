<!--
  ErrorLogViewer.svelte — Dashboard de errores de cliente (Fase 7)

  Svelte 5 Runes. Solo lectura: recibe los logs SSR, filtra client-side por nivel
  y texto, y agrupa por mensaje para ver los errores más frecuentes.
-->
<script lang="ts">
  import { LOG_LEVELS } from '@core/domain/clientLogSchema';
  import type { ClientLog, LogLevel } from '@core/domain/clientLogSchema';

  const props: { logs: ClientLog[] } = $props();

  const LEVEL_LABELS: Record<LogLevel, string> = { error: 'Error', warn: 'Warning', info: 'Info' };

  // ── Filtros ──
  let levelFilter = $state<'all' | LogLevel>('all');
  let search = $state('');
  let expanded = $state<string>('');

  const counts = $derived({
    error: props.logs.filter((l) => l.level === 'error').length,
    warn: props.logs.filter((l) => l.level === 'warn').length,
    info: props.logs.filter((l) => l.level === 'info').length,
  });

  const filtered = $derived.by(() => {
    const q = search.trim().toLowerCase();
    return props.logs.filter((l) => {
      if (levelFilter !== 'all' && l.level !== levelFilter) return false;
      if (!q) return true;
      return `${l.message} ${l.url ?? ''} ${l.source ?? ''}`.toLowerCase().includes(q);
    });
  });

  // Top mensajes por frecuencia (sobre el conjunto filtrado).
  const topMessages = $derived.by(() => {
    const acc: Record<string, { count: number; level: LogLevel }> = {};
    for (const l of filtered) {
      acc[l.message] = { count: (acc[l.message]?.count ?? 0) + 1, level: l.level };
    }
    return Object.entries(acc)
      .map(([message, v]) => ({ message, ...v }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  });

  const fmt = (iso: string | null) =>
    iso ? new Date(iso).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'medium' }) : '—';
</script>

<!-- Resumen por nivel -->
<div class="summary">
  <button
    class="sum-card"
    class:active={levelFilter === 'all'}
    onclick={() => (levelFilter = 'all')}
  >
    <span class="sum-num">{props.logs.length}</span><span class="sum-lbl">Total</span>
  </button>
  <button
    class="sum-card err"
    class:active={levelFilter === 'error'}
    onclick={() => (levelFilter = 'error')}
  >
    <span class="sum-num">{counts.error}</span><span class="sum-lbl">Errores</span>
  </button>
  <button
    class="sum-card warn"
    class:active={levelFilter === 'warn'}
    onclick={() => (levelFilter = 'warn')}
  >
    <span class="sum-num">{counts.warn}</span><span class="sum-lbl">Warnings</span>
  </button>
  <button
    class="sum-card info"
    class:active={levelFilter === 'info'}
    onclick={() => (levelFilter = 'info')}
  >
    <span class="sum-num">{counts.info}</span><span class="sum-lbl">Info</span>
  </button>
</div>

{#if topMessages.length > 0}
  <div class="top-box">
    <h3 class="top-title">Errores más frecuentes</h3>
    <ul class="top-list">
      {#each topMessages as t (t.message)}
        <li class="top-row">
          <span class={`dot dot--${t.level}`}></span>
          <span class="top-msg">{t.message}</span>
          <span class="top-count">{t.count}×</span>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<div class="toolbar">
  <input
    class="search"
    type="search"
    placeholder="Buscar en mensaje, URL o fuente…"
    bind:value={search}
  />
  <select class="level-select" bind:value={levelFilter} aria-label="Filtrar por nivel">
    <option value="all">Todos los niveles</option>
    {#each LOG_LEVELS as lv (lv)}
      <option value={lv}>{LEVEL_LABELS[lv]}</option>
    {/each}
  </select>
</div>

{#if filtered.length === 0}
  <div class="empty">
    <p>
      Sin registros. {props.logs.length === 0
        ? '¡Ningún error reportado! 🎉'
        : 'Ninguno coincide con el filtro.'}
    </p>
  </div>
{:else}
  <div class="log-list">
    {#each filtered as log (log.id)}
      <div class="log" class:open={expanded === log.id}>
        <button class="log-head" onclick={() => (expanded = expanded === log.id ? '' : log.id)}>
          <span class={`badge badge--${log.level}`}>{LEVEL_LABELS[log.level]}</span>
          <span class="log-msg">{log.message}</span>
          <span class="log-time">{fmt(log.created_at)}</span>
        </button>
        {#if expanded === log.id}
          <div class="log-detail">
            {#if log.url}<p class="meta"><b>URL:</b> {log.url}</p>{/if}
            {#if log.source}<p class="meta">
                <b>Fuente:</b>
                {log.source}{log.lineno != null ? `:${log.lineno}` : ''}{log.colno != null
                  ? `:${log.colno}`
                  : ''}
              </p>{/if}
            {#if log.user_agent}<p class="meta ua"><b>Navegador:</b> {log.user_agent}</p>{/if}
            {#if log.error_stack}
              <pre class="stack">{log.error_stack}</pre>
            {/if}
          </div>
        {/if}
      </div>
    {/each}
  </div>
{/if}

<style>
  .summary {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  .sum-card {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 1rem 1.25rem;
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 0.875rem;
    cursor: pointer;
    text-align: left;
    transition: border-color 0.2s;
  }
  .sum-card:hover {
    border-color: rgba(255, 255, 255, 0.15);
  }
  .sum-card.active {
    border-color: rgba(56, 189, 248, 0.5);
  }
  .sum-num {
    font-family: 'Outfit', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #f5f5f5;
    line-height: 1;
  }
  .sum-lbl {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.4);
  }
  .sum-card.err .sum-num {
    color: #ef4444;
  }
  .sum-card.warn .sum-num {
    color: #fbbf24;
  }
  .sum-card.info .sum-num {
    color: #60a5fa;
  }

  .top-box {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 0.875rem;
    padding: 1.1rem 1.25rem;
    margin-bottom: 1.5rem;
  }
  .top-title {
    font-family: 'Outfit', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: #e0e0e0;
    margin-bottom: 0.75rem;
  }
  .top-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .top-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.8rem;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .dot--error {
    background: #ef4444;
  }
  .dot--warn {
    background: #fbbf24;
  }
  .dot--info {
    background: #60a5fa;
  }
  .top-msg {
    color: #cfcfcf;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }
  .top-count {
    color: rgba(255, 255, 255, 0.5);
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }

  .toolbar {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  .search,
  .level-select {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    color: #e0e0e0;
    font-size: 0.82rem;
    padding: 0.5rem 0.75rem;
    outline: none;
    transition: border-color 0.2s;
    font-family: inherit;
  }
  .search {
    flex: 1;
  }
  .search:focus,
  .level-select:focus {
    border-color: rgba(56, 189, 248, 0.5);
  }

  .empty {
    text-align: center;
    padding: 3rem 1rem;
    color: rgba(255, 255, 255, 0.35);
    font-size: 0.9rem;
  }

  .log-list {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .log {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 0.625rem;
    overflow: hidden;
  }
  .log.open {
    border-color: rgba(255, 255, 255, 0.12);
  }
  .log-head {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.7rem 0.875rem;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }
  .badge {
    font-size: 0.62rem;
    font-weight: 600;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    flex-shrink: 0;
  }
  .badge--error {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.12);
  }
  .badge--warn {
    color: #fbbf24;
    background: rgba(251, 191, 36, 0.12);
  }
  .badge--info {
    color: #60a5fa;
    background: rgba(96, 165, 250, 0.12);
  }
  .log-msg {
    flex: 1;
    font-size: 0.82rem;
    color: #d5d5d5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .log-time {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.35);
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
  }
  .log-detail {
    padding: 0.5rem 0.875rem 0.875rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }
  .meta {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 0.4rem;
    word-break: break-all;
  }
  .meta b {
    color: rgba(255, 255, 255, 0.7);
  }
  .meta.ua {
    font-size: 0.68rem;
  }
  .stack {
    margin-top: 0.6rem;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 0.5rem;
    font-family: 'Courier New', monospace;
    font-size: 0.7rem;
    color: #fca5a5;
    white-space: pre-wrap;
    word-break: break-word;
    overflow-x: auto;
    max-height: 300px;
  }

  @media (max-width: 720px) {
    .summary {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
