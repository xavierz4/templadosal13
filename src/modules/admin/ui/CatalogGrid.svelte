<!--
  CatalogGrid.svelte — Grid de gestión del catálogo (Task 4.3)

  Svelte 5 con Runes ($state, $derived).
  Muestra todos los proyectos, permite toggle published/unpublished y borrado.
  REGLA 4 — Dumb: delega HTTP a catalogAdminClient.ts
-->
<script lang="ts">
  import { CATALOG_CATEGORIES } from '@core/domain/catalogSchema';
  import type { CatalogProject, CatalogCategory } from '@core/domain/catalogSchema';
  import { togglePublish, deleteProject, updateProject } from '../api/catalogAdminClient';
  import CatalogEditModal from './CatalogEditModal.svelte';
  import { untrack, onMount } from 'svelte';

  const props: { projects: CatalogProject[] } = $props();

  let localProjects: CatalogProject[] = $state(untrack(() => [...props.projects]));
  let errorMessage: string = $state('');

  // ── Búsqueda y filtro ──
  let searchQuery: string = $state('');
  let categoryFilter: string = $state('all');

  const filteredProjects = $derived.by(() => {
    const q = searchQuery.trim().toLowerCase();
    return localProjects.filter((p) => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (!q) return true;
      return `${p.title} ${p.description ?? ''}`.toLowerCase().includes(q);
    });
  });

  // ── Modal de edición ──
  let editingProject: CatalogProject | null = $state(null);
  let editSaving: boolean = $state(false);

  interface EditPatch {
    title?: string;
    category?: CatalogCategory;
    description?: string | null;
    image_url?: string;
    image_path?: string;
  }

  async function handleSaveEdit(id: string, patch: EditPatch) {
    editSaving = true;
    errorMessage = '';
    const result = await updateProject(id, patch);
    editSaving = false;

    if (result.error || !result.project) {
      errorMessage = `Error al guardar: ${result.error ?? 'respuesta inválida'}`;
      return;
    }
    localProjects = localProjects.map((p) => (p.id === id ? result.project! : p));
    editingProject = null;
  }

  // Escucha el evento del ProjectUploadForm (island hermano) para insertar
  // la tarjeta recién creada al tope del grid sin recargar la página.
  onMount(() => {
    const handler = (e: Event) => {
      const project = (e as CustomEvent<CatalogProject>).detail;
      if (project && !localProjects.some((p) => p.id === project.id)) {
        localProjects = [project, ...localProjects];
      }
    };
    window.addEventListener('al13:project-created', handler);
    return () => window.removeEventListener('al13:project-created', handler);
  });

  const categoryLabels: Record<string, string> = {
    cabina_ducha: 'Cabina de Ducha',
    divisor_oficina: 'Divisor de Oficina',
    fachada_monumental: 'Fachada Monumental',
    puerta_pivotante: 'Puerta Pivotante',
  };

  async function handleTogglePublish(project: CatalogProject) {
    const newState = !project.is_published;

    // Optimistic UI
    localProjects = localProjects.map((p) =>
      p.id === project.id ? { ...p, is_published: newState } : p
    );

    const result = await togglePublish(project.id, newState);
    if (result.error) {
      // Revert
      localProjects = localProjects.map((p) =>
        p.id === project.id ? { ...p, is_published: project.is_published } : p
      );
      errorMessage = result.error;
    }
  }

  async function handleDelete(project: CatalogProject) {
    if (!confirm(`¿Eliminar "${project.title}"? Esta acción es irreversible.`)) return;

    // Optimistic UI
    localProjects = localProjects.filter((p) => p.id !== project.id);

    const result = await deleteProject(project.id, project.image_path);
    if (result.error) {
      // Revert
      localProjects = [project, ...localProjects];
      errorMessage = result.error;
    }
  }
</script>

{#if errorMessage}
  <div class="error-banner" role="alert">
    ⚠️ {errorMessage}
    <button onclick={() => (errorMessage = '')} class="dismiss-btn">×</button>
  </div>
{/if}

<!-- Toolbar: búsqueda + filtro por categoría -->
{#if localProjects.length > 0}
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
        placeholder="Buscar por título o descripción…"
        bind:value={searchQuery}
      />
    </div>
    <select class="cat-select" bind:value={categoryFilter} aria-label="Filtrar por categoría">
      <option value="all">Todas las categorías</option>
      {#each CATALOG_CATEGORIES as cat (cat)}
        <option value={cat}>{categoryLabels[cat]}</option>
      {/each}
    </select>
    {#if searchQuery || categoryFilter !== 'all'}
      <button
        class="clear-btn"
        onclick={() => {
          searchQuery = '';
          categoryFilter = 'all';
        }}>Limpiar</button
      >
    {/if}
  </div>
{/if}

{#if localProjects.length === 0}
  <div class="empty-state">
    <p>No hay proyectos en el catálogo aún.</p>
    <p class="empty-hint">Usa el formulario de arriba para añadir el primero.</p>
  </div>
{:else if filteredProjects.length === 0}
  <div class="empty-state">
    <p>Ningún proyecto coincide con la búsqueda.</p>
  </div>
{:else}
  <div class="catalog-grid">
    {#each filteredProjects as project (project.id)}
      <div class="project-card" class:unpublished={!project.is_published}>
        <!-- Image -->
        <div class="card-image-wrap">
          <img src={project.image_url} alt={project.title} class="card-image" loading="lazy" />
          <span class="publish-badge" class:published-badge={project.is_published}>
            {project.is_published ? '✅ Publicado' : '🔒 No publicado'}
          </span>
        </div>

        <!-- Content -->
        <div class="card-content">
          <span class="category-tag">{categoryLabels[project.category] ?? project.category}</span>
          <h4 class="card-title">{project.title}</h4>
          {#if project.description}
            <p class="card-desc">{project.description}</p>
          {/if}

          <!-- Actions -->
          <div class="card-actions">
            <button
              class="btn-toggle"
              class:btn-publish={!project.is_published}
              class:btn-unpublish={project.is_published}
              onclick={() => handleTogglePublish(project)}
            >
              {project.is_published ? 'Despublicar' : 'Publicar'}
            </button>
            <button
              class="btn-edit"
              onclick={() => (editingProject = project)}
              aria-label={`Editar ${project.title}`}
            >
              Editar
            </button>
            <button
              class="btn-delete"
              onclick={() => handleDelete(project)}
              aria-label={`Eliminar ${project.title}`}
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}

<!-- Modal de edición -->
<CatalogEditModal
  project={editingProject}
  saving={editSaving}
  onsave={handleSaveEdit}
  onclose={() => (editingProject = null)}
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

  /* Toolbar */
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
  .cat-select {
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
  .cat-select:focus {
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

  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: rgba(255, 255, 255, 0.3);
    font-size: 0.9rem;
  }

  .empty-hint {
    font-size: 0.75rem;
    margin-top: 0.5rem;
    color: rgba(255, 255, 255, 0.2);
  }

  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
  }

  .project-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 0.875rem;
    overflow: hidden;
    transition:
      border-color 0.2s,
      transform 0.2s;
  }

  .project-card:hover {
    border-color: rgba(56, 189, 248, 0.2);
    transform: translateY(-2px);
  }
  .project-card.unpublished {
    opacity: 0.6;
  }

  .card-image-wrap {
    position: relative;
    aspect-ratio: 16/9;
    overflow: hidden;
  }
  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .publish-badge {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 0.62rem;
    font-weight: 600;
    padding: 0.2rem 0.5rem;
    border-radius: 999px;
    background: rgba(239, 68, 68, 0.85);
    color: #fff;
    backdrop-filter: blur(4px);
  }

  .publish-badge.published-badge {
    background: rgba(34, 197, 94, 0.85);
  }

  .card-content {
    padding: 0.875rem;
  }

  .category-tag {
    font-size: 0.62rem;
    font-weight: 600;
    color: var(--color-al13-cyan);
    background: rgba(56, 189, 248, 0.1);
    border: 1px solid rgba(56, 189, 248, 0.2);
    border-radius: 999px;
    padding: 0.15rem 0.5rem;
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  .card-title {
    font-family: 'Outfit', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: #e0e0e0;
    margin-bottom: 0.35rem;
    line-height: 1.3;
  }

  .card-desc {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.35);
    line-height: 1.4;
    margin-bottom: 0.75rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-toggle {
    flex: 1;
    font-size: 0.72rem;
    font-weight: 600;
    border: none;
    border-radius: 0.4rem;
    padding: 0.4rem 0.75rem;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .btn-toggle:hover {
    opacity: 0.85;
  }

  .btn-publish {
    background: rgba(34, 197, 94, 0.15);
    color: #22c55e;
  }
  .btn-unpublish {
    background: rgba(239, 68, 68, 0.12);
    color: #ef4444;
  }

  .btn-edit {
    font-size: 0.72rem;
    font-weight: 600;
    border: 1px solid rgba(56, 189, 248, 0.25);
    background: rgba(56, 189, 248, 0.08);
    color: var(--color-al13-cyan);
    border-radius: 0.4rem;
    padding: 0.4rem 0.7rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-edit:hover {
    background: rgba(56, 189, 248, 0.15);
  }

  .btn-delete {
    background: none;
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 0.4rem;
    padding: 0.4rem 0.5rem;
    cursor: pointer;
    font-size: 0.8rem;
    transition: background 0.2s;
  }

  .btn-delete:hover {
    background: rgba(239, 68, 68, 0.12);
  }
</style>
