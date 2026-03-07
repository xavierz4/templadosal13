import { z, defineCollection } from 'astro:content';

/**
 * Epic 5.x: Colecciones de Contenido (Data Layer)
 * Definimos estrictamente el esquema de los sistemas 3D
 * para asegurar Type-Safety completo (Astro Content API).
 */

const sistemasCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id_badge: z.string(), // Ej: "AL13-SYS-01"
    badge_label: z.string(), // Ej: "Premium"
    title_start: z.string(), // Ej: "División"
    title_highlight: z.string(), // Ej: "Arquitectónica"
    description: z.string(),
    spec_cristal: z.string(),
    spec_perfileria: z.string(),
    spec_herrajes: z.string(),
    spec_acustica: z.string(),
    product_type: z.enum([
      'cabina_ducha',
      'divisor_oficina',
      'fachada_monumental',
      'puerta_pivotante',
    ]),
    model_url: z.string(), // URL al archivo .glb

    // Mapping que le dice al motor Threlte qué nodos pintar de metal
    // Cualquier nodo que incluya estas strings se pintará con MeshStandardMaterial Metálico
    metal_nodes: z
      .array(z.string())
      .default(['frame', 'perfil', 'marco', 'metal', 'herraje', 'bisagra', 'riel']),
  }),
});

export const collections = {
  sistemas: sistemasCollection,
};
