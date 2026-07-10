<!--
  LeadDetailDrawer.svelte — Panel lateral de detalle/edición de un lead (Fase 2)

  Svelte 5 Runes. Componente "dumb" (REGLA 4): no hace fetch directo, emite
  callbacks (onsave/ondelete/onclose) que el KanbanBoard resuelve vía el cliente.
  Muestra todos los datos del lead y permite editar los campos clave, cambiar el
  estado y eliminarlo.
-->
<script lang="ts">
  import { LEAD_STATUSES } from '@core/domain/leadAdminSchema';
  import type { AdminLead, LeadStatus, LeadUpdate } from '@core/domain/leadAdminSchema';

  interface Props {
    lead: AdminLead | null;
    saving?: boolean;
    onsave: (id: string, patch: LeadUpdate) => void;
    ondelete: (id: string) => void;
    onclose: () => void;
  }

  const props: Props = $props();

  const PRODUCTS = [
    { id: 'cabina_ducha', label: 'Cabina de Ducha' },
    { id: 'divisor_oficina', label: 'Divisor de Oficina' },
    { id: 'fachada_monumental', label: 'Fachada Monumental' },
    { id: 'puerta_pivotante', label: 'Puerta Pivotante' },
  ];

  const STATUS_LABELS: Record<LeadStatus, string> = {
    NUEVO: 'Nuevo',
    COTIZADO: 'Cotizado',
    CERRADO_GANADO: 'Cerrado Ganado',
    PERDIDO: 'Perdido',
  };

  // Estado editable local — se resincroniza cada vez que cambia el lead abierto.
  let name = $state('');
  let phone = $state('');
  let productType = $state('');
  let totalValue = $state<string>('');
  let status = $state<LeadStatus>('NUEVO');
  let notes = $state('');

  // $effect: al abrir un lead distinto, precargar el formulario con sus datos.
  let loadedId = $state('');
  $effect(() => {
    const l = props.lead;
    if (l && l.id !== loadedId) {
      loadedId = l.id;
      name = l.customer_name;
      phone = l.customer_phone;
      productType = l.product_type;
      totalValue = l.total_value != null ? String(l.total_value) : '';
      status = l.status;
      notes = l.notes ?? '';
    }
  });

  const currencyFmt = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  });

  const createdLabel = $derived(
    props.lead
      ? new Date(props.lead.created_at).toLocaleString('es-CO', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })
      : ''
  );

  function handleSave() {
    if (!props.lead) return;
    const parsedValue = totalValue.trim() === '' ? null : Number(totalValue);
    props.onsave(props.lead.id, {
      customer_name: name.trim(),
      customer_phone: phone.trim(),
      product_type: productType,
      total_value: Number.isFinite(parsedValue as number) ? parsedValue : null,
      status,
      notes: notes.trim() === '' ? null : notes.trim(),
    });
  }

  function handleDelete() {
    if (!props.lead) return;
    if (confirm(`¿Eliminar el lead de "${props.lead.customer_name}"? Es irreversible.`)) {
      props.ondelete(props.lead.id);
    }
  }
</script>

{#if props.lead}
  <!-- Overlay -->
  <div
    class="drawer-overlay"
    role="button"
    tabindex="0"
    aria-label="Cerrar panel"
    onclick={props.onclose}
    onkeydown={(e) => (e.key === 'Escape' || e.key === 'Enter') && props.onclose()}
  ></div>

  <!-- Panel -->
  <aside class="drawer" role="dialog" aria-label="Detalle del lead">
    <header class="drawer-header">
      <div>
        <p class="drawer-eyebrow">Lead B2B</p>
        <h2 class="drawer-title">{props.lead.customer_name}</h2>
        <p class="drawer-sub">Registrado el {createdLabel}</p>
      </div>
      <button class="icon-btn" aria-label="Cerrar" onclick={props.onclose}>×</button>
    </header>

    <div class="drawer-body">
      <!-- Campos editables -->
      <label class="field">
        <span class="field-label">Nombre / Empresa</span>
        <input class="field-input" bind:value={name} maxlength="255" />
      </label>

      <label class="field">
        <span class="field-label">Teléfono</span>
        <input class="field-input" bind:value={phone} maxlength="50" />
      </label>

      <div class="field-row">
        <label class="field">
          <span class="field-label">Producto</span>
          <select class="field-input" bind:value={productType}>
            {#each PRODUCTS as p (p.id)}
              <option value={p.id}>{p.label}</option>
            {/each}
          </select>
        </label>

        <label class="field">
          <span class="field-label">Estado</span>
          <select class="field-input" bind:value={status}>
            {#each LEAD_STATUSES as s (s)}
              <option value={s}>{STATUS_LABELS[s]}</option>
            {/each}
          </select>
        </label>
      </div>

      <label class="field">
        <span class="field-label">Valor estimado (COP)</span>
        <input class="field-input" type="number" min="0" bind:value={totalValue} placeholder="0" />
      </label>

      <label class="field">
        <span class="field-label">Notas</span>
        <textarea class="field-input textarea" bind:value={notes} rows="3" maxlength="2000"
        ></textarea>
      </label>

      <!-- Datos de solo lectura -->
      {#if props.lead.measurements}
        <div class="readonly-block">
          <p class="readonly-title">Especificaciones</p>
          <div class="chips">
            <span class="chip"
              >{props.lead.measurements.width_mm}mm × {props.lead.measurements.height_mm}mm</span
            >
            <span class="chip">{props.lead.measurements.thickness_recommended}mm vidrio</span>
            {#if props.lead.measurements.glass_color}
              <span class="chip">{props.lead.measurements.glass_color}</span>
            {/if}
          </div>
        </div>
      {/if}

      {#if props.lead.total_value != null}
        <div class="readonly-block">
          <p class="readonly-title">Valor actual</p>
          <p class="readonly-value">{currencyFmt.format(props.lead.total_value)}</p>
        </div>
      {/if}

      {#if props.lead.utm_source || props.lead.utm_campaign}
        <div class="readonly-block">
          <p class="readonly-title">Atribución</p>
          <div class="chips">
            {#if props.lead.utm_source}<span class="chip">src: {props.lead.utm_source}</span>{/if}
            {#if props.lead.utm_campaign}<span class="chip">camp: {props.lead.utm_campaign}</span
              >{/if}
          </div>
        </div>
      {/if}
    </div>

    <footer class="drawer-footer">
      <button class="btn-delete" onclick={handleDelete} disabled={props.saving}>Eliminar</button>
      <div class="footer-right">
        <button class="btn-ghost" onclick={props.onclose} disabled={props.saving}>Cancelar</button>
        <button class="btn-save" onclick={handleSave} disabled={props.saving}>
          {props.saving ? 'Guardando…' : 'Guardar cambios'}
        </button>
      </div>
    </footer>
  </aside>
{/if}

<style>
  .drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(2px);
    z-index: 40;
    animation: fade 0.2s ease;
  }

  .drawer {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 420px;
    max-width: 92vw;
    background: #0d0f13;
    border-left: 1px solid var(--color-al13-glass-border);
    box-shadow: -20px 0 60px rgba(0, 0, 0, 0.5);
    z-index: 41;
    display: flex;
    flex-direction: column;
    animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
  }
  @keyframes slideIn {
    from {
      transform: translateX(30px);
      opacity: 0;
    }
  }

  .drawer-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .drawer-eyebrow {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-al13-cyan);
    margin-bottom: 0.35rem;
  }
  .drawer-title {
    font-family: 'Outfit', sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: #f5f5f5;
    line-height: 1.2;
  }
  .drawer-sub {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.35);
    margin-top: 0.35rem;
  }

  .icon-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.6);
    width: 32px;
    height: 32px;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    line-height: 1;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.2s;
  }
  .icon-btn:hover {
    color: #fff;
    border-color: rgba(255, 255, 255, 0.25);
  }

  .drawer-body {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
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
    width: 100%;
  }
  .field-input:focus {
    border-color: rgba(56, 189, 248, 0.5);
  }
  .textarea {
    resize: vertical;
    min-height: 70px;
  }

  .readonly-block {
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
  }
  .readonly-title {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 0.5rem;
  }
  .readonly-value {
    font-family: 'Outfit', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-al13-emerald);
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .chip {
    font-size: 0.68rem;
    color: rgba(56, 189, 248, 0.85);
    background: rgba(56, 189, 248, 0.08);
    border: 1px solid rgba(56, 189, 248, 0.15);
    border-radius: 0.3rem;
    padding: 0.15rem 0.45rem;
    font-family: 'Courier New', monospace;
  }

  .drawer-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }
  .footer-right {
    display: flex;
    gap: 0.5rem;
  }

  .btn-delete,
  .btn-ghost,
  .btn-save {
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
  }
  .btn-delete {
    background: transparent;
    color: #ef4444;
    border-color: rgba(239, 68, 68, 0.25);
  }
  .btn-delete:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.1);
  }
  .btn-ghost {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.7);
    border-color: rgba(255, 255, 255, 0.1);
  }
  .btn-ghost:hover:not(:disabled) {
    color: #fff;
  }
  .btn-save {
    background: linear-gradient(135deg, var(--color-al13-cyan), var(--color-al13-emerald));
    color: var(--color-al13-black);
  }
  .btn-save:hover:not(:disabled) {
    opacity: 0.9;
  }
  .btn-delete:disabled,
  .btn-ghost:disabled,
  .btn-save:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
