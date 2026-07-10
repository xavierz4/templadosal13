<!--
  KanbanBoard.svelte — CRM Kanban de Leads B2B (Task 4.2)
  
  Svelte 5 con Runes ($state, $derived).
  HTML5 Drag and Drop API nativa (sin dependencias extra — YAGNI).
  Optimistic UI: mueve la tarjeta antes de confirmar el servidor.
  
  NO hace fetch directamente (REGLA 4). Delega a leadsAdminClient.ts.
-->
<script lang="ts">
  import { LEAD_STATUSES } from '@core/domain/leadAdminSchema';
  import type { AdminLead, LeadStatus, LeadUpdate } from '@core/domain/leadAdminSchema';
  import { updateLeadStatus, updateLead, deleteLead } from '../api/leadsAdminClient';
  import KanbanCard from './KanbanCard.svelte';
  import LeadDetailDrawer from './LeadDetailDrawer.svelte';
  import { untrack } from 'svelte';

  const props: { leads: AdminLead[] } = $props();

  // ─── Estado reactivo del Kanban ───────────────────────────────────────────
  // untrack evita que Svelte reaccione a props.leads en el inicializador de $state
  let localLeads: AdminLead[] = $state(untrack(() => [...props.leads]));
  let draggedLeadId: string = $state('');
  let draggingOverColumn: string = $state('');
  let errorMessage: string = $state('');

  // ─── Búsqueda y filtros ────────────────────────────────────────────────────
  let searchQuery: string = $state('');
  let productFilter: string = $state('all');

  const PRODUCT_OPTIONS = [
    { id: 'all', label: 'Todos los productos' },
    { id: 'cabina_ducha', label: 'Cabina de Ducha' },
    { id: 'divisor_oficina', label: 'Divisor de Oficina' },
    { id: 'fachada_monumental', label: 'Fachada Monumental' },
    { id: 'puerta_pivotante', label: 'Puerta Pivotante' },
  ];

  const filteredLeads = $derived.by(() => {
    const q = searchQuery.trim().toLowerCase();
    return localLeads.filter((l) => {
      if (productFilter !== 'all' && l.product_type !== productFilter) return false;
      if (!q) return true;
      const haystack = `${l.customer_name} ${l.customer_phone} ${l.notes ?? ''}`.toLowerCase();
      return haystack.includes(q);
    });
  });

  // Leads (ya filtrados) agrupados por status
  const leadsByStatus = $derived(
    Object.fromEntries(
      LEAD_STATUSES.map((status) => [status, filteredLeads.filter((l) => l.status === status)])
    ) as Record<LeadStatus, AdminLead[]>
  );

  // ─── Drawer de detalle ─────────────────────────────────────────────────────
  let selectedLead: AdminLead | null = $state(null);
  let drawerSaving: boolean = $state(false);

  function openLead(lead: AdminLead) {
    selectedLead = lead;
  }
  function closeDrawer() {
    selectedLead = null;
  }

  async function handleSaveLead(id: string, patch: LeadUpdate) {
    drawerSaving = true;
    errorMessage = '';
    const result = await updateLead(id, patch);
    drawerSaving = false;

    if (result.error || !result.lead) {
      errorMessage = `Error al guardar: ${result.error ?? 'respuesta inválida'}`;
      return;
    }
    // Refrescar el lead en el estado local con lo que devolvió el servidor
    localLeads = localLeads.map((l) => (l.id === id ? result.lead! : l));
    closeDrawer();
  }

  async function handleDeleteLead(id: string) {
    drawerSaving = true;
    errorMessage = '';
    const result = await deleteLead(id);
    drawerSaving = false;

    if (result.error) {
      errorMessage = `Error al eliminar: ${result.error}`;
      return;
    }
    localLeads = localLeads.filter((l) => l.id !== id);
    closeDrawer();
  }

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

<!-- Toolbar: búsqueda + filtro -->
<div class="toolbar">
  <div class="search-wrap">
    <svg
      class="search-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>
    </svg>
    <input
      class="search-input"
      type="search"
      placeholder="Buscar por nombre, teléfono o nota…"
      bind:value={searchQuery}
    />
  </div>
  <select class="product-select" bind:value={productFilter} aria-label="Filtrar por producto">
    {#each PRODUCT_OPTIONS as opt (opt.id)}
      <option value={opt.id}>{opt.label}</option>
    {/each}
  </select>
  {#if searchQuery || productFilter !== 'all'}
    <button
      class="clear-btn"
      onclick={() => {
        searchQuery = '';
        productFilter = 'all';
      }}>Limpiar</button
    >
  {/if}
</div>

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
          <KanbanCard {lead} ondragstart={handleDragStart} onopen={openLead} />
        {/each}

        {#if columnLeads.length === 0 && draggingOverColumn !== status}
          <p class="empty-state">Sin leads aquí</p>
        {/if}
      </div>
    </div>
  {/each}
</div>

<!-- Drawer de detalle/edición -->
<LeadDetailDrawer
  lead={selectedLead}
  saving={drawerSaving}
  onsave={handleSaveLead}
  ondelete={handleDeleteLead}
  onclose={closeDrawer}
/>

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

  /* ─── Toolbar ─── */
  .toolbar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
  }
  .search-wrap {
    position: relative;
    flex: 1;
    min-width: 220px;
  }
  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 15px;
    height: 15px;
    color: rgba(255, 255, 255, 0.35);
    pointer-events: none;
  }
  .search-input,
  .product-select {
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
  .search-input {
    width: 100%;
    padding-left: 2.1rem;
  }
  .search-input:focus,
  .product-select:focus {
    border-color: rgba(56, 189, 248, 0.5);
  }
  .clear-btn {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.78rem;
    padding: 0.5rem 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .clear-btn:hover {
    color: #fff;
    border-color: rgba(56, 189, 248, 0.4);
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
