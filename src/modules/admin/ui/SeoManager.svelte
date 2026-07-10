<!--
  SeoManager.svelte — Panel SEO (Fase 6): gestiona la matriz sistemas × ubicaciones
  que genera las rutas /catalogo/[sistema]/[ubicacion]. Island "dumb": delega HTTP.
-->
<script lang="ts">
  import type { SeoSystem, SeoLocation } from '@core/domain/seoSchema';
  import {
    createSystem,
    updateSystem,
    deleteSystem,
    createLocation,
    updateLocation,
    deleteLocation,
  } from '../api/seoAdminClient';
  import { untrack } from 'svelte';

  const props: { systems: SeoSystem[]; locations: SeoLocation[] } = $props();

  let systems = $state<SeoSystem[]>(untrack(() => [...props.systems]));
  let locations = $state<SeoLocation[]>(untrack(() => [...props.locations]));
  let errorMessage = $state('');

  // Rutas SEO generadas = producto cartesiano.
  const routeCount = $derived(systems.length * locations.length);

  // ── Alta de sistema ──
  let newSystemName = $state('');
  async function addSystem() {
    if (newSystemName.trim().length < 2) return;
    errorMessage = '';
    const r = await createSystem({ name: newSystemName.trim() });
    if (r.error || !r.system) {
      errorMessage = r.error ?? 'Error al crear el sistema.';
      return;
    }
    systems = [...systems, r.system];
    newSystemName = '';
  }
  async function saveSystem(s: SeoSystem, name: string) {
    if (name.trim().length < 2 || name === s.name) return;
    const r = await updateSystem(s.id, { name: name.trim() });
    if (r.error || !r.system) {
      errorMessage = r.error ?? 'Error al actualizar.';
      return;
    }
    systems = systems.map((x) => (x.id === s.id ? r.system! : x));
  }
  async function removeSystem(s: SeoSystem) {
    if (!confirm(`¿Eliminar el sistema "${s.name}"? Dejarán de generarse sus rutas SEO.`)) return;
    const prev = systems;
    systems = systems.filter((x) => x.id !== s.id);
    const r = await deleteSystem(s.id);
    if (r.error) {
      systems = prev;
      errorMessage = r.error;
    }
  }

  // ── Alta de ubicación ──
  let newLocName = $state('');
  let newLocDept = $state('');
  async function addLocation() {
    if (newLocName.trim().length < 2 || newLocDept.trim().length < 2) return;
    errorMessage = '';
    const r = await createLocation({ name: newLocName.trim(), department: newLocDept.trim() });
    if (r.error || !r.location) {
      errorMessage = r.error ?? 'Error al crear la ubicación.';
      return;
    }
    locations = [...locations, r.location];
    newLocName = '';
    newLocDept = '';
  }
  async function saveLocation(l: SeoLocation, name: string, dept: string) {
    if (name.trim().length < 2 || dept.trim().length < 2) return;
    if (name === l.name && dept === l.department) return;
    const r = await updateLocation(l.id, { name: name.trim(), department: dept.trim() });
    if (r.error || !r.location) {
      errorMessage = r.error ?? 'Error al actualizar.';
      return;
    }
    locations = locations.map((x) => (x.id === l.id ? r.location! : x));
  }
  async function removeLocation(l: SeoLocation) {
    if (!confirm(`¿Eliminar la ubicación "${l.name}"? Dejarán de generarse sus rutas SEO.`)) return;
    const prev = locations;
    locations = locations.filter((x) => x.id !== l.id);
    const r = await deleteLocation(l.id);
    if (r.error) {
      locations = prev;
      errorMessage = r.error;
    }
  }
</script>

{#if errorMessage}
  <div class="banner error" role="alert">
    ⚠️ {errorMessage}
    <button class="dismiss" onclick={() => (errorMessage = '')}>×</button>
  </div>
{/if}

<div class="matrix-stat">
  <span class="matrix-num">{routeCount}</span>
  <span class="matrix-label"
    >rutas SEO generadas ({systems.length} sistemas × {locations.length} ubicaciones)</span
  >
</div>

<div class="cols">
  <!-- Sistemas -->
  <section class="panel">
    <h3 class="panel-title">Sistemas / productos</h3>
    <div class="add-row">
      <input
        class="input"
        placeholder="Nombre del sistema (ej: Ventanas termoacústicas)"
        bind:value={newSystemName}
        onkeydown={(e) => e.key === 'Enter' && addSystem()}
      />
      <button class="btn-add" onclick={addSystem} disabled={newSystemName.trim().length < 2}
        >Añadir</button
      >
    </div>
    <ul class="list">
      {#each systems as s (s.id)}
        <li class="row">
          <input
            class="row-input"
            value={s.name}
            onblur={(e) => saveSystem(s, e.currentTarget.value)}
          />
          <span class="slug">/{s.slug}</span>
          <button class="btn-del" onclick={() => removeSystem(s)} aria-label="Eliminar">🗑️</button>
        </li>
      {/each}
    </ul>
  </section>

  <!-- Ubicaciones -->
  <section class="panel">
    <h3 class="panel-title">Ubicaciones</h3>
    <div class="add-row loc">
      <input class="input" placeholder="Ciudad (ej: Valledupar)" bind:value={newLocName} />
      <input class="input" placeholder="Departamento (ej: Cesar)" bind:value={newLocDept} />
      <button
        class="btn-add"
        onclick={addLocation}
        disabled={newLocName.trim().length < 2 || newLocDept.trim().length < 2}>Añadir</button
      >
    </div>
    <ul class="list">
      {#each locations as l (l.id)}
        <li class="row">
          <input
            class="row-input"
            value={l.name}
            onblur={(e) => saveLocation(l, e.currentTarget.value, l.department)}
          />
          <input
            class="row-input dept"
            value={l.department}
            onblur={(e) => saveLocation(l, l.name, e.currentTarget.value)}
          />
          <span class="slug">/{l.slug}</span>
          <button class="btn-del" onclick={() => removeLocation(l)} aria-label="Eliminar">🗑️</button
          >
        </li>
      {/each}
    </ul>
  </section>
</div>

<style>
  .banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.85rem;
    margin-bottom: 1rem;
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

  .matrix-stat {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    padding: 1rem 1.25rem;
    background: rgba(56, 189, 248, 0.06);
    border: 1px solid rgba(56, 189, 248, 0.15);
    border-radius: 0.875rem;
    margin-bottom: 1.5rem;
  }
  .matrix-num {
    font-family: 'Outfit', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--color-al13-cyan);
  }
  .matrix-label {
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.5);
  }

  .cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }
  .panel {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 0.875rem;
    padding: 1.25rem;
  }
  .panel-title {
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: #e0e0e0;
    margin-bottom: 1rem;
  }
  .add-row {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .add-row.loc {
    flex-wrap: wrap;
  }
  .input,
  .row-input {
    flex: 1;
    min-width: 0;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    color: #e0e0e0;
    font-size: 0.82rem;
    padding: 0.45rem 0.7rem;
    outline: none;
    transition: border-color 0.2s;
    font-family: inherit;
  }
  .input:focus,
  .row-input:focus {
    border-color: rgba(56, 189, 248, 0.5);
  }
  .btn-add {
    background: linear-gradient(135deg, var(--color-al13-cyan), var(--color-al13-emerald));
    color: var(--color-al13-black);
    font-weight: 700;
    font-size: 0.8rem;
    border: none;
    border-radius: 0.5rem;
    padding: 0.45rem 1rem;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .btn-add:hover:not(:disabled) {
    opacity: 0.9;
  }
  .btn-add:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .row-input.dept {
    max-width: 40%;
  }
  .slug {
    font-size: 0.68rem;
    color: rgba(56, 189, 248, 0.7);
    font-family: 'Courier New', monospace;
    white-space: nowrap;
    max-width: 30%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .btn-del {
    background: none;
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 0.4rem;
    padding: 0.3rem 0.45rem;
    cursor: pointer;
    font-size: 0.78rem;
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .btn-del:hover {
    background: rgba(239, 68, 68, 0.12);
  }

  @media (max-width: 860px) {
    .cols {
      grid-template-columns: 1fr;
    }
  }
</style>
