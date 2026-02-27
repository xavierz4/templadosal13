import type { CatalogProject, CatalogProjectInput } from '../catalogSchema';

/**
 * Puerto Secundario — Catálogo CMS (Task 4.3)
 *
 * Define el contrato de persistencia del catálogo de proyectos AL13.
 * Implementado por SupabaseCatalogRepository (infrastructure/).
 * Siguiendo el mismo patrón que ILeadRepository (SOLID — DIP).
 */
export interface ICatalogRepository {
  /** Retorna todos los proyectos (admin ve publicados + no publicados) */
  getAll(): Promise<CatalogProject[]>;

  /** Retorna solo los proyectos publicados (catálogo público B2C) */
  getPublished(): Promise<CatalogProject[]>;

  /** Crea un nuevo proyecto en la BD */
  create(input: CatalogProjectInput, imageUrl: string, imagePath: string): Promise<CatalogProject>;

  /** Publica o despublica un proyecto del catálogo */
  togglePublish(id: string, isPublished: boolean): Promise<void>;

  /** Elimina un proyecto de la BD (la imagen del bucket se borra por separado) */
  delete(id: string): Promise<void>;
}
