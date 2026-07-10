<!--
  CatalogEditModal.svelte — Edición de metadata de un proyecto del catálogo (Fase 3)

  Svelte 5 Runes. Componente "dumb" (REGLA 4): emite onsave con el patch; el
  reemplazo de imagen (opcional) reutiliza los helpers de subida del cliente.
-->
<script lang="ts">
  import { CATALOG_CATEGORIES } from '@core/domain/catalogSchema';
  import type { CatalogProject, CatalogCategory } from '@core/domain/catalogSchema';
  import { getPresignedUrl, uploadImageToStorage } from '../api/catalogAdminClient';

  interface Patch {
    title?: string;
    category?: CatalogCategory;
    description?: string | null;
    image_url?: string;
    image_path?: string;
  }

  interface Props {
    project: CatalogProject | null;
    saving?: boolean;
    onsave: (id: string, patch: Patch) => void;
    onclose: () => void;
  }

  const props: Props = $props();

  const categoryLabels: Record<string, string> = {
    cabina_ducha: 'Cabina de Ducha',
    divisor_oficina: 'Divisor de Oficina',
    fachada_monumental: 'Fachada Monumental',
    puerta_pivotante: 'Puerta Pivotante',
  };

  let title = $state('');
  let category = $state<string>(CATALOG_CATEGORIES[0]);
  let description = $state('');
  let newFile: File | null = $state(null);
  let uploadingImage = $state(false);
  let localError = $state('');

  let loadedId = $state('');
  $effect(() => {
    const p = props.project;
    if (p && p.id !== loadedId) {
      loadedId = p.id;
      title = p.title;
      category = p.category;
      description = p.description ?? '';
      newFile = null;
      localError = '';
    }
  });

  const isValid = $derived(title.trim().length >= 3);

  function handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (file && !file.type.startsWith('image/')) {
      localError = 'Solo se aceptan imágenes.';
      newFile = null;
      return;
    }
    if (file && file.size > 15 * 1024 * 1024) {
      localError = 'La imagen no puede superar los 15MB.';
      newFile = null;
      return;
    }
    localError = '';
    newFile = file;
  }

  async function handleSave() {
    if (!props.project || !isValid) return;
    localError = '';

    const patch: Patch = {
      title: title.trim(),
      category: category as CatalogCategory,
      description: description.trim() === '' ? null : description.trim(),
    };

    // Reemplazo opcional de imagen: subir al bucket y añadir url/path al patch
    if (newFile) {
      uploadingImage = true;
      try {
        const presign = await getPresignedUrl(newFile.name, newFile.type);
        if (presign.error || !presign.signedUrl) {
          throw new Error(presign.error ?? 'Error al obtener URL de subida.');
        }
        const up = await uploadImageToStorage(presign.signedUrl, newFile);
        if (!up.ok) throw new Error(up.error ?? 'Error al subir la imagen.');
        patch.image_url = presign.publicUrl!;
        patch.image_path = presign.path!;
      } catch (err: unknown) {
        uploadingImage = false;
        localError = err instanceof Error ? err.message : 'Error al subir la imagen.';
        return;
      }
      uploadingImage = false;
    }

    props.onsave(props.project.id, patch);
  }

  const busy = $derived(props.saving || uploadingImage);
</script>

{#if props.project}
  <div
    class="modal-overlay"
    role="button"
    tabindex="0"
    aria-label="Cerrar"
    onclick={props.onclose}
    onkeydown={(e) => (e.key === 'Escape' || e.key === 'Enter') && props.onclose()}
  ></div>

  <div class="modal" role="dialog" aria-label="Editar proyecto">
    <header class="modal-header">
      <h3 class="modal-title">Editar proyecto</h3>
      <button class="icon-btn" aria-label="Cerrar" onclick={props.onclose}>×</button>
    </header>

    <div class="modal-body">
      {#if localError}
        <p class="error-msg" role="alert">⚠️ {localError}</p>
      {/if}

      <label class="field">
        <span class="field-label">Título *</span>
        <input class="field-input" bind:value={title} maxlength="255" />
      </label>

      <label class="field">
        <span class="field-label">Categoría *</span>
        <select class="field-input" bind:value={category}>
          {#each CATALOG_CATEGORIES as cat (cat)}
            <option value={cat}>{categoryLabels[cat]}</option>
          {/each}
        </select>
      </label>

      <label class="field">
        <span class="field-label">Descripción</span>
        <textarea class="field-input textarea" bind:value={description} rows="3" maxlength="2000"
        ></textarea>
      </label>

      <div class="field">
        <span class="field-label">Imagen actual</span>
        <img class="current-img" src={props.project.image_url} alt={props.project.title} />
        <label class="field-label" style="margin-top:0.5rem">Reemplazar imagen (opcional)</label>
        <input
          type="file"
          class="file-input"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onchange={handleFileChange}
        />
        {#if newFile}<p class="file-selected">✅ {newFile.name}</p>{/if}
      </div>
    </div>

    <footer class="modal-footer">
      <button class="btn-ghost" onclick={props.onclose} disabled={busy}>Cancelar</button>
      <button class="btn-save" onclick={handleSave} disabled={!isValid || busy}>
        {busy ? 'Guardando…' : 'Guardar cambios'}
      </button>
    </footer>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(2px);
    z-index: 50;
  }
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    max-width: 92vw;
    max-height: 90vh;
    background: #0d0f13;
    border: 1px solid var(--color-al13-glass-border);
    border-radius: 1rem;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
    z-index: 51;
    display: flex;
    flex-direction: column;
  }
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .modal-title {
    font-family: 'Outfit', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    color: #f5f5f5;
  }
  .icon-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.6);
    width: 30px;
    height: 30px;
    border-radius: 0.5rem;
    font-size: 1.15rem;
    line-height: 1;
    cursor: pointer;
    transition: all 0.2s;
  }
  .icon-btn:hover {
    color: #fff;
  }
  .modal-body {
    padding: 1.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .error-msg {
    font-size: 0.8rem;
    color: #fca5a5;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.25);
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
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
  .textarea {
    resize: vertical;
    min-height: 70px;
  }
  .current-img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .file-input {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
  .file-selected {
    font-size: 0.75rem;
    color: #22c55e;
  }
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }
  .btn-ghost,
  .btn-save {
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 0.5rem;
    padding: 0.5rem 1.1rem;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
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
  .btn-ghost:disabled,
  .btn-save:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
