<!--
  MarketingGenerator.svelte — Generador de contenido de redes con IA (Fase C)

  Svelte 5 Runes. Island "dumb" (REGLA 4): delega HTTP a marketingAdminClient.
  Formulario (canal/sistema/ubicación/ángulo/cantidad) → genera → borradores con
  editar/aprobar/descartar/copiar. Cada pieza lleva su link con UTMs (embudo).
-->
<script lang="ts">
  import { MARKETING_CHANNELS } from '@core/domain/marketingSchema';
  import type { MarketingContent, MarketingChannel } from '@core/domain/marketingSchema';
  import { generateContent, updateContent, discardContent } from '../api/marketingAdminClient';
  import { untrack } from 'svelte';

  interface SeoOption {
    slug: string;
    name: string;
  }
  const props: {
    systems: SeoOption[];
    locations: SeoOption[];
    initialContent: MarketingContent[];
  } = $props();

  const CHANNEL_LABELS: Record<MarketingChannel, string> = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
  };

  // ── Estado del formulario ──
  let channel = $state<MarketingChannel>('instagram');
  let systemSlug = $state(props.systems[0]?.slug ?? '');
  let locationSlug = $state('');
  let angle = $state('');
  let count = $state(3);
  let generating = $state(false);
  let errorMessage = $state('');

  // ── Contenido (borradores + aprobados) ──
  let items = $state<MarketingContent[]>(untrack(() => [...props.initialContent]));

  const STATUS_LABELS: Record<string, string> = {
    draft: 'Borrador',
    approved: 'Aprobado',
    published: 'Publicado',
  };

  async function handleGenerate() {
    if (!systemSlug || generating) return;
    generating = true;
    errorMessage = '';
    const result = await generateContent({
      channel,
      system_slug: systemSlug,
      location_slug: locationSlug || undefined,
      angle: angle.trim() || undefined,
      count,
    });
    generating = false;

    if (result.error || !result.content) {
      errorMessage = result.error ?? 'No se pudo generar el contenido.';
      return;
    }
    items = [...result.content, ...items];
  }

  async function approve(item: MarketingContent) {
    const result = await updateContent(item.id, { status: 'approved' });
    if (result.error || !result.content) {
      errorMessage = result.error ?? 'Error al aprobar.';
      return;
    }
    items = items.map((i) => (i.id === item.id ? result.content! : i));
  }

  async function markPublished(item: MarketingContent) {
    const result = await updateContent(item.id, { status: 'published' });
    if (result.error || !result.content) {
      errorMessage = result.error ?? 'Error al marcar como publicado.';
      return;
    }
    items = items.map((i) => (i.id === item.id ? result.content! : i));
  }

  async function discard(item: MarketingContent) {
    if (!confirm('¿Descartar esta pieza?')) return;
    const result = await discardContent(item.id);
    if (result.error) {
      errorMessage = result.error;
      return;
    }
    items = items.filter((i) => i.id !== item.id);
  }

  let copiedId = $state('');
  async function copyPiece(item: MarketingContent) {
    const text =
      `${item.hook}\n\n${item.body}\n\n${item.cta ?? ''}\n${(item.hashtags ?? []).join(' ')}\n${item.target_url ?? ''}`.trim();
    try {
      await navigator.clipboard.writeText(text);
      copiedId = item.id;
      setTimeout(() => (copiedId = ''), 1500);
    } catch {
      errorMessage = 'No se pudo copiar al portapapeles.';
    }
  }
</script>

<!-- Generador -->
<div class="gen-card">
  <h3 class="gen-title">Generar contenido con IA</h3>

  {#if errorMessage}
    <div class="banner error" role="alert">
      ⚠️ {errorMessage}
      <button class="dismiss" onclick={() => (errorMessage = '')}>×</button>
    </div>
  {/if}

  <div class="gen-grid">
    <label class="field">
      <span class="field-label">Canal</span>
      <select class="field-input" bind:value={channel}>
        {#each MARKETING_CHANNELS as c (c)}
          <option value={c}>{CHANNEL_LABELS[c]}</option>
        {/each}
      </select>
    </label>

    <label class="field">
      <span class="field-label">Sistema / producto</span>
      <select class="field-input" bind:value={systemSlug}>
        {#each props.systems as s (s.slug)}
          <option value={s.slug}>{s.name}</option>
        {/each}
      </select>
    </label>

    <label class="field">
      <span class="field-label">Ubicación (opcional)</span>
      <select class="field-input" bind:value={locationSlug}>
        <option value="">Sin ubicación específica</option>
        {#each props.locations as l (l.slug)}
          <option value={l.slug}>{l.name}</option>
        {/each}
      </select>
    </label>

    <label class="field">
      <span class="field-label">Cantidad</span>
      <select class="field-input" bind:value={count}>
        {#each [1, 2, 3, 4, 5] as n (n)}
          <option value={n}>{n} pieza{n === 1 ? '' : 's'}</option>
        {/each}
      </select>
    </label>

    <label class="field full">
      <span class="field-label">Ángulo / enfoque (opcional)</span>
      <input
        class="field-input"
        bind:value={angle}
        placeholder="Ej: resistencia al salitre costero, norma NSR-10, temporada de lluvias…"
        maxlength="200"
      />
    </label>
  </div>

  <button class="btn-generate" onclick={handleGenerate} disabled={!systemSlug || generating}>
    {generating ? 'Generando…' : '✨ Generar contenido'}
  </button>
</div>

<!-- Lista de contenido -->
{#if items.length === 0}
  <div class="empty">
    <p>Aún no hay contenido. Genera el primer lote con el formulario de arriba.</p>
  </div>
{:else}
  <div class="content-grid">
    {#each items as item (item.id)}
      <div class="piece" class:published={item.status === 'published'}>
        <div class="piece-head">
          <div class="piece-tags">
            <span class="tag channel">{CHANNEL_LABELS[item.channel]}</span>
            {#if item.system_slug}<span class="tag">{item.system_slug}</span>{/if}
            {#if item.location_slug}<span class="tag">{item.location_slug}</span>{/if}
          </div>
          <span class={`status status--${item.status}`}
            >{STATUS_LABELS[item.status] ?? item.status}</span
          >
        </div>

        <p class="piece-hook">{item.hook}</p>
        <p class="piece-body">{item.body}</p>
        {#if item.cta}<p class="piece-cta">{item.cta}</p>{/if}
        {#if item.hashtags?.length}
          <p class="piece-hashtags">{item.hashtags.join(' ')}</p>
        {/if}
        {#if item.target_url}
          <a class="piece-url" href={item.target_url} target="_blank" rel="noopener noreferrer"
            >{item.target_url}</a
          >
        {/if}

        <div class="piece-actions">
          <button class="act copy" onclick={() => copyPiece(item)}>
            {copiedId === item.id ? '✓ Copiado' : 'Copiar'}
          </button>
          {#if item.status === 'draft'}
            <button class="act approve" onclick={() => approve(item)}>Aprobar</button>
          {:else if item.status === 'approved'}
            <button class="act publish" onclick={() => markPublished(item)}>Marcar publicado</button
            >
          {/if}
          <button class="act discard" onclick={() => discard(item)} aria-label="Descartar"
            >🗑️</button
          >
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }
  .banner.error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #fca5a5;
  }
  .dismiss {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.1rem;
    cursor: pointer;
    line-height: 1;
  }

  .gen-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  .gen-title {
    font-family: 'Outfit', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-al13-cyan);
    margin-bottom: 1.25rem;
  }
  .gen-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.875rem;
    margin-bottom: 1.25rem;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .field.full {
    grid-column: 1 / -1;
  }
  .field-label {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: rgba(255, 255, 255, 0.5);
  }
  .field-input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    color: #e0e0e0;
    font-size: 0.85rem;
    padding: 0.5rem 0.75rem;
    outline: none;
    transition: border-color 0.2s;
    font-family: inherit;
  }
  .field-input:focus {
    border-color: rgba(56, 189, 248, 0.5);
  }
  .btn-generate {
    background: linear-gradient(135deg, var(--color-al13-cyan), var(--color-al13-emerald));
    color: var(--color-al13-black);
    font-weight: 700;
    font-size: 0.9rem;
    border: none;
    border-radius: 0.5rem;
    padding: 0.7rem 1.5rem;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .btn-generate:hover:not(:disabled) {
    opacity: 0.9;
  }
  .btn-generate:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .empty {
    text-align: center;
    padding: 3rem 1rem;
    color: rgba(255, 255, 255, 0.35);
    font-size: 0.9rem;
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1rem;
  }
  .piece {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 0.875rem;
    padding: 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .piece.published {
    opacity: 0.65;
  }
  .piece-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .piece-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }
  .tag {
    font-size: 0.6rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    padding: 0.1rem 0.45rem;
  }
  .tag.channel {
    color: var(--color-al13-cyan);
    background: rgba(56, 189, 248, 0.1);
    border-color: rgba(56, 189, 248, 0.2);
  }
  .status {
    font-size: 0.62rem;
    font-weight: 600;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .status--draft {
    color: #fbbf24;
    background: rgba(251, 191, 36, 0.12);
  }
  .status--approved {
    color: #22c55e;
    background: rgba(34, 197, 94, 0.12);
  }
  .status--published {
    color: rgba(255, 255, 255, 0.55);
    background: rgba(255, 255, 255, 0.06);
  }
  .piece-hook {
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: #f0f0f0;
    line-height: 1.3;
  }
  .piece-body {
    font-size: 0.82rem;
    color: #cfcfcf;
    line-height: 1.5;
    white-space: pre-wrap;
  }
  .piece-cta {
    font-size: 0.82rem;
    color: var(--color-al13-emerald);
    font-weight: 600;
  }
  .piece-hashtags {
    font-size: 0.75rem;
    color: rgba(56, 189, 248, 0.75);
    line-height: 1.4;
  }
  .piece-url {
    font-size: 0.68rem;
    color: rgba(255, 255, 255, 0.4);
    word-break: break-all;
    text-decoration: none;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding-top: 0.5rem;
  }
  .piece-url:hover {
    color: var(--color-al13-cyan);
  }
  .piece-actions {
    display: flex;
    gap: 0.4rem;
    margin-top: 0.35rem;
  }
  .act {
    font-size: 0.72rem;
    font-weight: 600;
    border-radius: 0.4rem;
    padding: 0.35rem 0.7rem;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s;
  }
  .act.copy {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.75);
  }
  .act.approve {
    background: rgba(34, 197, 94, 0.15);
    color: #22c55e;
  }
  .act.publish {
    background: rgba(56, 189, 248, 0.12);
    color: var(--color-al13-cyan);
  }
  .act.discard {
    margin-left: auto;
    background: none;
    border-color: rgba(239, 68, 68, 0.2);
  }
  .act.discard:hover {
    background: rgba(239, 68, 68, 0.12);
  }

  @media (max-width: 820px) {
    .gen-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
