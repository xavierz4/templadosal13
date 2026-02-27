/**
 * Módulo Admin — Barrel File (REGLA 3 — FSD Encapsulation)
 *
 * ÚNICO punto de entrada externo para el módulo admin.
 * Los imports externos DEBEN usar: import { X } from '@modules/admin'
 * NUNCA: import X from '@modules/admin/ui/X.svelte'
 */
export { default as LoginForm } from './ui/LoginForm.svelte';
export { default as KanbanBoard } from './ui/KanbanBoard.svelte';
export { default as KanbanCard } from './ui/KanbanCard.svelte';
export { default as ProjectUploadForm } from './ui/ProjectUploadForm.svelte';
export { default as CatalogGrid } from './ui/CatalogGrid.svelte';
