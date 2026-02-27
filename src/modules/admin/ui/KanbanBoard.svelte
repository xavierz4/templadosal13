<!--
  KanbanBoard.svelte — CRM Kanban de Leads B2B (Task 4.2)
  
  Svelte 5 con Runes ($state, $derived).
  HTML5 Drag and Drop API nativa (sin dependencias extra — YAGNI).
  Optimistic UI: mueve la tarjeta antes de confirmar el servidor.
  
  NO hace fetch directamente (REGLA 4). Delega a leadsAdminClient.ts.
-->
<script lang="ts">
  import { LEAD_STATUSES } from '@core/domain/leadAdminSchema';
  import type { AdminLead, LeadStatus } from '@core/domain/leadAdminSchema';
  import { updateLeadStatus } from '../api/leadsAdminClient';
  import KanbanCard from './KanbanCard.svelte';
  import { untrack } from 'svelte';

  const props: { leads: AdminLead[] } = $props();

  // ─── Estado reactivo del Kanban ───────────────────────────────────────────
  // untrack evita que Svelte reaccione a props.leads en el inicializador de $state
  let localLeads: AdminLead[] = $state(untrack(() => [...props.leads]));
  let draggedLeadId: string = $state('');
  let draggingOverColumn: string = $state('');
  let errorMessage: string = $state('');

  // Leads agrupados por status
  const leadsByStatus = $derived(
    Object.fromEntries(
      LEAD_STATUSES.map((status) => [status, localLeads.filter((l) => l.status === status)])
    ) as Record<LeadStatus, AdminLead[]>
  );

  // ─── Labels y colores de columnas ─────────────────────────────────────────
  const columnConfig: Record<LeadStatus, { label: string; color: string; accent: string }> = {
    NUEVO: { label: '🆕 Nuevos', color: 'rgba(96,165,250,0.08)', accent: '#60a5fa' },
    COTIZADO: { label: '📋 Cotizados', color: 'rgba(251,191,36,0.08)', accent: '#fbbf24' },
    CERRADO_GANADO: {
      label: '✅ Cerrado Ganado',
      color: 'rgba(34,197,94,0.08)',
      accent: '#22c55e',
    },
    PERDIDO: { label: '❌ Perdido', color: 'rgba(239,68,68,0.08)', accent: '#ef4444' },
  };

  // ─── Drag and Drop handlers ────────────────────────────────────────────────
  function handleDragStart(leadId: string) {
    draggedLeadId = leadId;
  }

  function handleDragOver(e: DragEvent, status: LeadStatus) {
    e.preventDefault();
    draggingOverColumn = status;
  }

  function handleDragLeave() {
    draggingOverColumn = '';
  }

  async function handleDrop(e: DragEvent, newStatus: LeadStatus) {
    e.preventDefault();
    draggingOverColumn = '';

    const id = draggedLeadId || (e.dataTransfer?.getData('text/plain') ?? '');
    if (!id) return;

    const lead = localLeads.find((l) => l.id === id);
    if (!lead || lead.status === newStatus) {
      draggedLeadId = '';
      return;
    }

    // Optimistic UI: mover inmediatamente en el estado local
    localLeads = localLeads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
    draggedLeadId = '';
    errorMessage = '';

    // Persistir en servidor (fire-and-confirm)
    const result = await updateLeadStatus(id, newStatus);

    if (result.error) {
      // Revertir en caso de error
      localLeads = localLeads.map((l) => (l.id === id ? { ...l, status: lead.status } : l));
      errorMessage = `Error al actualizar: ${result.error}`;
      console.error('[KanbanBoard] updateLeadStatus failed:', result.error);
    }
  }
</script>

<!-- Error Banner -->
{#if errorMessage}
  <div class="error-banner" role="alert">
    ⚠️ {errorMessage}
    <button onclick={() => (errorMessage = '')} class="dismiss-btn">×</button>
  </div>
{/if}

<!-- Kanban Grid -->
<div class="kanban-board">
  {#each LEAD_STATUSES as status}
    {@const config = columnConfig[status]}
    {@const columnLeads = leadsByStatus[status]}

    <div
      class="kanban-column"
      class:drag-over={draggingOverColumn === status}
      style="--accent: {config.accent}; --bg: {config.color}"
      role="list"
      aria-label={`Columna ${config.label}`}
      ondragover={(e) => handleDragOver(e, status)}
      ondragleave={handleDragLeave}
      ondrop={(e) => handleDrop(e, status)}
    >
      <!-- Column Header -->
      <div class="column-header">
        <span class="column-title">{config.label}</span>
        <span class="column-count">{columnLeads.length}</span>
      </div>

      <!-- Drop Zone Indicator -->
      <div class="drop-zone" class:active={draggingOverColumn === status}>Soltar aquí</div>

      <!-- Cards -->
      <div class="column-cards">
        {#each columnLeads as lead (lead.id)}
          <KanbanCard {lead} ondragstart={handleDragStart} />
        {/each}

        {#if columnLeads.length === 0 && draggingOverColumn !== status}
          <p class="empty-state">Sin leads aquí</p>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
  .error-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 0.75rem;
    color: #fca5a5;
    font-size: 0.85rem;
    margin-bottom: 1.25rem;
    animation: shakeX 0.4s ease-in-out;
  }

  @keyframes shakeX {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-6px);
    }
    75% {
      transform: translateX(6px);
    }
  }

  .dismiss-btn {
    background: none;
    border: none;
    color: #fca5a5;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 0 0.25rem;
    line-height: 1;
  }

  /* ─── Board Layout ─── */
  .kanban-board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    align-items: start;
  }

  /* ─── Column ─── */
  .kanban-column {
    background: var(--bg);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 0.875rem;
    padding: 0.875rem;
    min-height: 200px;
    transition:
      border-color 0.2s ease,
      background 0.2s ease;
  }

  .kanban-column.drag-over {
    border-color: var(--accent);
    background: color-mix(in srgb, var(--bg) 80%, rgba(255, 255, 255, 0.05));
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 30%, transparent);
  }

  /* ─── Header ─── */
  .column-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    padding-bottom: 0.625rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .column-title {
    font-family: 'Outfit', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent);
  }

  .column-count {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 15%, transparent);
    border-radius: 999px;
    padding: 0.1rem 0.45rem;
    min-width: 20px;
    text-align: center;
  }

  /* ─── Drop Zone ─── */
  .drop-zone {
    display: none;
    align-items: center;
    justify-content: center;
    height: 48px;
    border: 2px dashed var(--accent);
    border-radius: 0.5rem;
    color: var(--accent);
    font-size: 0.75rem;
    margin-bottom: 0.75rem;
    opacity: 0.6;
    transition: opacity 0.2s;
  }

  .drop-zone.active {
    display: flex;
    opacity: 1;
  }

  /* ─── Cards ─── */
  .column-cards {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .empty-state {
    text-align: center;
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.2);
    padding: 1.5rem 0;
    font-style: italic;
  }
</style>
