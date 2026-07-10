<script lang="ts">
  /**
   * ProjectGallery.svelte
   * @module landing/ui
   *
   * Galería de Proyectos (Bento Grid) - Mostrar fotos reales de instalaciones.
   * Task 9.8.2. Premium 2026 Aesthetic con animaciones ScrollReveal y hover zoom-in.
   *
   * REGLA 4: Solo presentación.
   */
  import ScrollReveal from '@shared/ui/ScrollReveal.svelte';

  // Placeholders fotorrealistas de instalaciones arquitectónicas en vidrio
  const projects = [
    {
      id: 1,
      title: 'Fachada Monumental',
      location: 'Edificio Prisma, Medellín',
      image:
        'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=1200&h=800',
      width: 1200,
      height: 800,
      span: 'col-span-1 md:col-span-2 row-span-2', // Grande
    },
    {
      id: 2,
      title: 'División Acústica',
      location: 'WeWork Oficinas, Bogotá',
      image:
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800&h=600',
      width: 800,
      height: 600,
      span: 'col-span-1 row-span-1', // Pequeño
    },
    {
      id: 3,
      title: 'Cabina Premium',
      location: 'Hotel Dann Carlton, Cali',
      image:
        'https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80&w=800&h=600',
      width: 800,
      height: 600,
      span: 'col-span-1 row-span-1', // Pequeño
    },
    {
      id: 4,
      title: 'Puerta Pivotante',
      location: 'Residencia Privada, Llanogrande',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200&h=600',
      width: 1200,
      height: 600,
      span: 'col-span-1 md:col-span-2 row-span-1', // Horizontal
    },
  ];
</script>

<section class="py-24 bg-al13-black relative overflow-hidden">
  <div class="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
    <ScrollReveal animation="fade-up" duration={800}>
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-heading font-bold text-white mb-4 tracking-tight">
          Nuestra Obra Construida
        </h2>
        <p class="text-zinc-400 text-lg font-light max-w-2xl mx-auto">
          Casos de éxito reales que validan la ingeniería detrás de la estética. Diseño puro.
          Precisión milimétrica.
        </p>
      </div>
    </ScrollReveal>

    <!-- Bento Grid -->
    <div
      class="grid grid-cols-1 md:grid-cols-4 grid-rows-[auto] gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]"
    >
      {#each projects as project, index (project.id)}
        <ScrollReveal
          animation="fade-up"
          delay={index * 150}
          class="{project.span} flex group rounded-2xl overflow-hidden relative cursor-pointer"
        >
          <!-- Contenedor Base -->
          <div
            class="w-full h-full relative overflow-hidden bg-black border border-white/5 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          >
            <!-- Imagen con Lazy Loading y Zoom Hover -->
            <img
              src={project.image}
              alt={project.title}
              width={project.width}
              height={project.height}
              loading="lazy"
              class="object-cover w-full h-full scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] filter brightness-[0.7] group-hover:brightness-90 opacity-90 group-hover:opacity-100"
            />

            <!-- Overlay Degradado para legibilidad del texto -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"
            ></div>

            <!-- Contenido de Texto Glassmorphism (Se eleva en hover) -->
            <div
              class="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out"
            >
              <!-- Línea decorativa AL13 -->
              <div
                class="w-8 h-[2px] bg-al13-cyan mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              ></div>

              <h3 class="text-xl md:text-2xl font-bold font-heading text-white mb-1 drop-shadow-md">
                {project.title}
              </h3>
              <p
                class="text-sm md:text-base text-zinc-300 font-light flex items-center gap-2 drop-shadow-md"
              >
                <span class="opacity-70">📍</span>
                {project.location}
              </p>
            </div>

            <!-- Efecto de borde glowing sutil en Hover -->
            <div
              class="absolute inset-0 border-2 border-transparent group-hover:border-white/10 rounded-2xl transition-colors duration-500 pointer-events-none"
            ></div>
          </div>
        </ScrollReveal>
      {/each}
    </div>

    <!-- CTA Secundario -->
    <ScrollReveal animation="fade-up" delay={600} class="mt-16 text-center">
      <a
        href="#cotizador"
        class="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-medium hover:bg-white/10 hover:border-al13-cyan/50 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(103,232,249,0.15)] group"
      >
        Cotizar Proyecto Similar
        <span class="group-hover:translate-x-1 transition-transform">→</span>
      </a>
    </ScrollReveal>
  </div>
</section>

<style>
  /* Fallback para prefers-reduced-motion: cancela los zooms */
  @media (prefers-reduced-motion: reduce) {
    img {
      transition: none !important;
      transform: none !important;
    }
    div {
      transition: none !important;
      transform: none !important;
    }
  }
</style>
