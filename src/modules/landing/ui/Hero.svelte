<script lang="ts">
  import { spring } from 'svelte/motion';

  // Magnetic UI State (Tilt 3D)
  let container: HTMLDivElement;
  const magneticProps = spring({ x: 0, y: 0, scale: 1 }, { stiffness: 0.05, damping: 0.25 });

  // Image loading state
  let imageLoaded = $state(false);

  function handleMouseMove(e: MouseEvent) {
    if (!container) return;
    const rect = container.getBoundingClientRect();

    // Distancia relativa del ratón respecto al centro del panel
    const xInfo = e.clientX - rect.left - rect.width / 2;
    const yInfo = e.clientY - rect.top - rect.height / 2;

    // Límite de grados de rotación (Tilt Inverso)
    const factor = 12;

    magneticProps.set({
      x: (yInfo / rect.height) * -factor,
      y: (xInfo / rect.width) * factor,
      scale: 1.02,
    });
  }

  function handleMouseLeave() {
    magneticProps.set({ x: 0, y: 0, scale: 1 });
  }
</script>

<section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
  <!-- Fondo Oscuro de Estudio Principal -->
  <div class="absolute inset-0 bg-[#0A0A0A] z-0"></div>

  <!-- Cinematic B2B Background Video Loop (Optimizado para WebM/MP4 local + Fallback) -->
  <video
    autoplay
    loop
    muted
    playsinline
    poster="/hero_placeholder.jpg"
    class="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-2000 ease-in-out pointer-events-none filter contrast-105 brightness-[0.50]"
  >
    <source src="/videos/hero-bg.webm" type="video/webm" />
    <source src="/videos/hero-bg.mp4" type="video/mp4" />
    <source
      src="https://cdn.pixabay.com/video/2021/08/21/85806-591741703_large.mp4"
      type="video/mp4"
    />
  </video>

  <!-- Overlay de oscuridad profunda detrás de los textos (Solapamiento lateral) -->
  <div
    class="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10 pointer-events-none w-full lg:w-[75%]"
  ></div>

  <!-- Fundido Suave en el borde inferior (Soft Cut/Fade a la siguiente sección) -->
  <div
    class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 pointer-events-none"
  ></div>

  <!-- Contenedor Principal Limitado -->
  <div
    class="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24"
  >
    <!-- Texto (Mitad Izquierda) -->
    <div class="flex-1 flex flex-col items-start text-left space-y-6 max-w-2xl pl-0 lg:pl-10">
      <!-- Titular SEO Impactante (Tipografía gruesa blanca) -->
      <h1
        class="text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-white leading-[1.1] animate-fade-in-up drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
      >
        CRISTAL Y<br />
        ALUMINIO<br />
        ARQUITECTÓNICO
      </h1>

      <!-- Párrafo Subtitular (Minimalista) -->
      <p
        class="text-xl md:text-2xl text-zinc-300 font-sans font-light tracking-wide animate-fade-in-up drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        style="animation-delay: 200ms;"
      >
        Diseño. Precisión. Lujo.
      </p>
    </div>

    <!-- Panel de Cristal Interactivo (Mitad Derecha) -->
    <div
      class="flex-1 w-full relative flex items-center justify-center animate-fade-in-up"
      style="animation-delay: 400ms; perspective: 1200px;"
    >
      <!-- Cubo/Panel Glassmorphism con Imagen Premium -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        bind:this={container}
        onmousemove={handleMouseMove}
        onmouseleave={handleMouseLeave}
        class="relative w-full max-w-sm lg:max-w-md aspect-[3/4.5] rounded-2xl flex flex-col items-center justify-end overflow-hidden bg-white/5 backdrop-blur-[12px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_60px_rgba(56,189,248,0.15)] transition-shadow duration-500 will-change-transform"
        style="transform: rotateX({$magneticProps.x}deg) rotateY({$magneticProps.y}deg) scale({$magneticProps.scale}); transform-style: preserve-3d;"
      >
        <!-- Shimmer Skeleton Loader (visible hasta que la imagen cargue) -->
        {#if !imageLoaded}
          <div class="absolute inset-0 z-0 rounded-2xl overflow-hidden">
            <div class="hero-shimmer"></div>
          </div>
        {/if}

        <!-- Imagen Hero Premium (Fallback visual para 3D) -->
        <img
          src="/images/gallery/hero_glass_cabin_1771826676799.png"
          alt="Cabina de vidrio templado premium con iluminación cálida — Templados AL13"
          loading="eager"
          decoding="async"
          onload={() => {
            imageLoaded = true;
          }}
          class="absolute inset-0 w-full h-full object-cover z-0 rounded-2xl transition-opacity duration-700 {imageLoaded
            ? 'opacity-100'
            : 'opacity-0'}"
        />

        <!-- Overlay gradiente oscuro inferior para legibilidad del botón -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-5 rounded-2xl pointer-events-none"
        ></div>

        <!-- Borde Iluminado Superior sutil -->
        <div
          class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent z-10 pointer-events-none"
        ></div>

        <!-- Botón B2B: Cotizar Proyecto con borde glowing naranja/azul -->
        <button
          class="group relative px-8 py-3.5 mb-8 rounded-lg bg-black/30 backdrop-blur-sm text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-black/50 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.2)] z-20"
          style="transform: translateZ(40px);"
        >
          <!-- Borde simulado (Glow naranja-azul claro estilo UI Concept) -->
          <div
            class="absolute inset-0 rounded-lg border-[1.5px] border-transparent bg-gradient-to-r from-blue-400 via-white/60 to-orange-400 opacity-90 group-hover:opacity-100"
            style="-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; padding: 1.5px;"
          ></div>
          <!-- Glow exterior sutil naranja/azul -->
          <div
            class="absolute inset-0 rounded-lg opacity-40 bg-gradient-to-r from-blue-400/30 via-transparent to-orange-400/30 blur-md -z-10 group-hover:opacity-70 transition-opacity duration-300"
          ></div>

          <span class="relative z-10 drop-shadow-md">Cotizar Proyecto</span>
        </button>
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }

  /* Shimmer/Skeleton loader animation */
  .hero-shimmer {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      110deg,
      rgba(255, 255, 255, 0.03) 0%,
      rgba(255, 255, 255, 0.03) 40%,
      rgba(255, 255, 255, 0.08) 50%,
      rgba(255, 255, 255, 0.03) 60%,
      rgba(255, 255, 255, 0.03) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.8s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
</style>
