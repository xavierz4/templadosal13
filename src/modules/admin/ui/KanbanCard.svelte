<!--
  KanbanCard.svelte — Componente "Dumb" para una tarjeta de lead (REGLA 4)
  
  NO hace fetch. Solo renderiza datos y emite eventos de drag.
  Svelte 5 con Runes ($props).
  
  Diseño: Glassmorphism premium, paleta AL13 Gold/Dark.
-->
<script lang="ts">
  import type { AdminLead } from '@core/domain/leadAdminSchema';

  interface Props {
    lead: AdminLead;
    ondragstart: (leadId: string) => void;
  }

  const props: Props = $props();

  // Format date nicely — $derived to stay reactive to props changes
  const formattedDate = $derived(
    new Date(props.lead.created_at).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  );

  // Product type labels
  const productLabels: Record<string, string> = {
    cabina_ducha: 'Cabina de Ducha',
    divisor_oficina: 'Divisor de Oficina',
    fachada_monumental: 'Fachada Monumental',
    puerta_pivotante: 'Puerta Pivotante',
  };

  const productLabel = $derived(productLabels[props.lead.product_type] ?? props.lead.product_type);
</script>

<div
  class="kanban-card"
  draggable="true"
  role="listitem"
  aria-label={`Lead de ${props.lead.customer_name}`}
  ondragstart={(e) => {
    e.dataTransfer?.setData('text/plain', props.lead.id);
    props.ondragstart(props.lead.id);
  }}
>
  <!-- Header -->
  <div class="card-header">
    <span class="product-badge">{productLabel}</span>
    <span class="card-date">{formattedDate}</span>
  </div>

  <!-- Name -->
  <p class="customer-name">{props.lead.customer_name}</p>

  <!-- Phone -->
  <a href={`tel:${props.lead.customer_phone}`} class="customer-phone">
    📞 {props.lead.customer_phone}
  </a>

  <!-- Notes (empresa) -->
  {#if props.lead.notes}
    <p class="card-notes">{props.lead.notes}</p>
  {/if}

  <!-- Measurements -->
  {#if props.lead.measurements}
    <div class="measurements">
      <span class="measure-chip"
        >{props.lead.measurements.width_mm}mm × {props.lead.measurements.height_mm}mm</span
      >
      <span class="measure-chip">{props.lead.measurements.thickness_recommended}mm vidrio</span>
    </div>
  {/if}
</div>

<style>
  .kanban-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 0.75rem;
    padding: 0.875rem;
    cursor: grab;
    transition: all 0.2s ease;
    user-select: none;
  }

  .kanban-card:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(212, 175, 55, 0.25);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }

  .kanban-card:active {
    cursor: grabbing;
    opacity: 0.7;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .product-badge {
    font-size: 0.65rem;
    font-weight: 600;
    color: #d4af37;
    background: rgba(212, 175, 55, 0.1);
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 999px;
    padding: 0.2rem 0.5rem;
    letter-spacing: 0.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 130px;
  }

  .card-date {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.25);
    flex-shrink: 0;
  }

  .customer-name {
    font-family: 'Outfit', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #e0e0e0;
    margin-bottom: 0.25rem;
    line-height: 1.2;
  }

  .customer-phone {
    display: block;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
    text-decoration: none;
    margin-bottom: 0.4rem;
    transition: color 0.2s;
  }

  .customer-phone:hover {
    color: #d4af37;
  }

  .card-notes {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.35);
    margin-bottom: 0.5rem;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .measurements {
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
    margin-top: 0.4rem;
  }

  .measure-chip {
    font-size: 0.62rem;
    color: rgba(96, 165, 250, 0.8);
    background: rgba(96, 165, 250, 0.08);
    border: 1px solid rgba(96, 165, 250, 0.15);
    border-radius: 0.3rem;
    padding: 0.15rem 0.4rem;
    font-family: 'Courier New', monospace;
  }
</style>
