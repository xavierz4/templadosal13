<!--
  ProjectUploadForm.svelte — Formulario de carga de proyecto al catálogo (Task 4.3)

  Svelte 5 con Runes ($state).
  Flujo de 3 pasos:
    1. Datos del proyecto (título, categoría, descripción)
    2. Selección + subida de imagen (presign → PUT directo al Storage)
    3. Confirmación (registro en BD)
  
  REGLA 4 — Dumb component: delega fetch a catalogAdminClient.ts
-->
<script lang="ts">
  import { CATALOG_CATEGORIES } from '@core/domain/catalogSchema';
  import { getPresignedUrl, uploadImageToStorage, createProject } from '../api/catalogAdminClient';

  const props = $props();

  const categoryLabels: Record<string, string> = {
    cabina_ducha: 'Cabina de Ducha',
    divisor_oficina: 'Divisor de Oficina',
    fachada_monumental: 'Fachada Monumental',
    puerta_pivotante: 'Puerta Pivotante',
  };

  // ─── Estado del formulario ───────────────────────────────────────────────
  let title: string = $state('');
  let category: string = $state(CATALOG_CATEGORIES[0]);
  let description: string = $state('');
  let selectedFile: File | null = $state(null);
  let uploadProgress: number = $state(0);
  let step: number = $state(1); // 1 = form, 2 = uploading, 3 = success
  let errorMessage: string = $state('');
  let isSubmitting: boolean = $state(false);

  // ─── Validación simple ───────────────────────────────────────────────────
  const isFormValid = $derived(title.trim().length >= 3 && category.length > 0);

  function handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (file && !file.type.startsWith('image/')) {
      errorMessage = 'Solo se aceptan imágenes (JPEG, PNG, WebP, AVIF).';
      selectedFile = null;
      return;
    }
    if (file && file.size > 15 * 1024 * 1024) {
      errorMessage = 'La imagen no puede superar los 15MB.';
      selectedFile = null;
      return;
    }

    errorMessage = '';
    selectedFile = file;
  }

  async function handleSubmit() {
    if (!isFormValid || !selectedFile || isSubmitting) return;

    isSubmitting = true;
    errorMessage = '';
    step = 2;

    try {
      // Paso 1: Obtener URL firmada
      const presignResult = await getPresignedUrl(selectedFile.name, selectedFile.type);
      if (presignResult.error || !presignResult.signedUrl) {
        throw new Error(presignResult.error ?? 'Error al obtener URL de subida.');
      }

      // Paso 2: Subir imagen directamente al bucket con progreso
      const uploadResult = await uploadImageToStorage(
        presignResult.signedUrl,
        selectedFile,
        (pct) => {
          uploadProgress = pct;
        }
      );

      if (!uploadResult.ok) {
        throw new Error(uploadResult.error ?? 'Error al subir la imagen.');
      }

      // Paso 3: Registrar en BD
      const createResult = await createProject({
        title: title.trim(),
        category: category as never,
        description: description.trim() || undefined,
        image_url: presignResult.publicUrl!,
        image_path: presignResult.path!,
      });

      if (createResult.error) {
        throw new Error(createResult.error);
      }

      step = 3;
      if (props.onSuccess) {
        props.onSuccess(createResult.project);
      }
    } catch (err: unknown) {
      step = 1;
      errorMessage = err instanceof Error ? err.message : 'Error inesperado.';
      console.error('[ProjectUploadForm]', errorMessage);
    } finally {
      isSubmitting = false;
      uploadProgress = 0;
    }
  }

  function resetForm() {
    title = '';
    category = CATALOG_CATEGORIES[0];
    description = '';
    selectedFile = null;
    uploadProgress = 0;
    step = 1;
    errorMessage = '';
  }
</script>

<div class="upload-form">
  {#if step === 1}
    <!-- ── STEP 1: Datos del proyecto ── -->
    <h3 class="form-title">Añadir Proyecto al Catálogo</h3>

    {#if errorMessage}
      <p class="error-msg" role="alert">⚠️ {errorMessage}</p>
    {/if}

    <div class="form-grid">
      <label class="field">
        <span class="label-text">Título *</span>
        <input
          type="text"
          class="input"
          placeholder="Ej: Cabina de ducha piso 9 — Rosales"
          bind:value={title}
          maxlength="255"
        />
      </label>

      <label class="field">
        <span class="label-text">Categoría *</span>
        <select class="input" bind:value={category}>
          {#each CATALOG_CATEGORIES as cat}
            <option value={cat}>{categoryLabels[cat]}</option>
          {/each}
        </select>
      </label>

      <label class="field full-width">
        <span class="label-text">Descripción</span>
        <textarea
          class="input textarea"
          placeholder="Breve descripción del proyecto..."
          bind:value={description}
          rows="3"
          maxlength="2000"
        ></textarea>
      </label>

      <label class="field full-width">
        <span class="label-text"
          >Imagen del proyecto * <em class="hint">(max 15MB — JPEG, PNG, WebP, AVIF)</em></span
        >
        <input
          type="file"
          class="file-input"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onchange={handleFileChange}
        />
        {#if selectedFile}
          <p class="file-selected">✅ {selectedFile.name}</p>
        {/if}
      </label>
    </div>

    <button class="btn-primary" disabled={!isFormValid || !selectedFile} onclick={handleSubmit}>
      Subir Proyecto →
    </button>
  {:else if step === 2}
    <!-- ── STEP 2: Progreso de subida ── -->
    <div class="upload-progress">
      <p class="progress-label">Subiendo imagen al Storage...</p>
      <div class="progress-bar-track">
        <div class="progress-bar-fill" style="width: {uploadProgress}%"></div>
      </div>
      <p class="progress-pct">{uploadProgress}%</p>
      <p class="progress-hint">No cierres esta ventana</p>
    </div>
  {:else if step === 3}
    <!-- ── STEP 3: Confirmación ── -->
    <div class="success-state">
      <span class="success-icon">✅</span>
      <h3 class="success-title">¡Proyecto añadido al catálogo!</h3>
      <p class="success-sub">Está en modo "No publicado". Actívalo desde el grid de proyectos.</p>
      <button class="btn-secondary" onclick={resetForm}>Añadir otro proyecto</button>
    </div>
  {/if}
</div>

<style>
  .upload-form {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .form-title {
    font-family: 'Outfit', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #d4af37;
    margin-bottom: 1.25rem;
  }

  .error-msg {
    font-size: 0.8rem;
    color: #fca5a5;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.25);
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    margin-bottom: 1rem;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.875rem;
    margin-bottom: 1.25rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .full-width {
    grid-column: 1 / -1;
  }

  .label-text {
    font-size: 0.72rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .hint {
    font-weight: 400;
    color: rgba(255, 255, 255, 0.25);
    text-transform: none;
    font-style: normal;
  }

  .input {
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

  .input:focus {
    border-color: rgba(212, 175, 55, 0.4);
  }

  .textarea {
    resize: vertical;
    min-height: 72px;
  }

  .file-input {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    padding: 0.4rem 0;
    cursor: pointer;
  }

  .file-selected {
    font-size: 0.75rem;
    color: #22c55e;
    margin-top: 0.25rem;
  }

  .btn-primary {
    background: linear-gradient(135deg, #d4af37, #b8962e);
    color: #0a0a0a;
    font-weight: 700;
    font-size: 0.85rem;
    border: none;
    border-radius: 0.5rem;
    padding: 0.625rem 1.5rem;
    cursor: pointer;
    transition:
      opacity 0.2s,
      transform 0.2s;
  }

  .btn-primary:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  .btn-primary:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  /* Progress */
  .upload-progress {
    text-align: center;
    padding: 2rem 0;
  }
  .progress-label {
    color: #d4af37;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  .progress-bar-track {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    height: 6px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }
  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #d4af37, #22c55e);
    border-radius: 999px;
    transition: width 0.1s linear;
  }
  .progress-pct {
    font-size: 1.5rem;
    font-weight: 700;
    color: #e0e0e0;
  }
  .progress-hint {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.25);
    margin-top: 0.5rem;
  }

  /* Success */
  .success-state {
    text-align: center;
    padding: 2rem 0;
  }
  .success-icon {
    font-size: 2.5rem;
    display: block;
    margin-bottom: 0.75rem;
  }
  .success-title {
    font-family: 'Outfit', sans-serif;
    font-size: 1.1rem;
    color: #22c55e;
    margin-bottom: 0.5rem;
  }
  .success-sub {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 1.25rem;
  }
  .btn-secondary {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #e0e0e0;
    font-size: 0.82rem;
    border-radius: 0.5rem;
    padding: 0.5rem 1.25rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.09);
  }
</style>
