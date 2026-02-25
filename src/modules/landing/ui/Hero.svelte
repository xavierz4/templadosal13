<script lang="ts">
  import { onMount } from 'svelte';

  // Bank of generated ultra-wide horizontal cinematic B2B images passed from Astro
  let { backgroundImages = [] } = $props<{backgroundImages: {src: string, srcset: string}[]}>();

  let currentImageIndex = $state(0);

  onMount(() => {
    // Rotar imágenes cada 5 segundos (Motion Fading)
    const interval = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    }, 5000);

    return () => clearInterval(interval);
  });
</script>

<section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
  <!-- Fondo Oscuro de Estudio Principal -->
  <div class="absolute inset-0 bg-[#0A0A0A] z-0"></div>
  
  <!-- Sistema de Contención 16:9 con IMG Nativo (Anti-Pixelación 4K) -->
  {#each backgroundImages as image, i}
    <img 
      src={image.src}
      srcset={image.srcset}
      sizes="100vw"
      decoding="async"
      loading={i === 0 ? "eager" : "lazy"}
      alt="Fondo Arquitectónico AL13"
      class="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-2000 ease-in-out pointer-events-none filter contrast-105 brightness-[0.85]"
      style="opacity: {i === currentImageIndex ? 1 : 0};"
    />
  {/each}

  <!-- Overlay de oscuridad profunda detrás de los textos (Solapamiento lateral) -->
  <div class="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/50 to-transparent z-10 pointer-events-none w-full lg:w-[75%]"></div>
  
  <!-- Fundido Suave en el borde inferior (Soft Cut/Fade a la siguiente sección) -->
  <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 pointer-events-none"></div>

  <!-- Contenedor Principal Limitado -->
  <div class="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
    
    <!-- Texto (Mitad Izquierda) -->
    <div class="flex-1 flex flex-col items-start text-left space-y-6 max-w-2xl pl-0 lg:pl-10">
      
      <!-- Titular SEO Impactante (Tipografía gruesa blanca) -->
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-white leading-[1.1] animate-fade-in-up">
        CRISTAL Y<br>
        ALUMINIO<br>
        ARQUITECTÓNICO
      </h1>

      <!-- Párrafo Subtitular (Minimalista) -->
      <p class="text-xl md:text-2xl text-zinc-300 font-sans font-light tracking-wide animate-fade-in-up" style="animation-delay: 200ms;">
        Diseño. Precisión. Lujo.
      </p>

    </div>

    <!-- Panel de Cristal Interactivo (Mitad Derecha) -->
    <div class="flex-1 w-full relative flex items-center justify-center animate-fade-in-up" style="animation-delay: 400ms;">
      
      <!-- Cubo/Panel Glassmorphism Translúcido Puro (Escarcha Blanca a lo UI Concept) -->
      <div class="relative w-full max-w-sm lg:max-w-md aspect-[3/4.5] rounded-2xl flex items-center justify-center overflow-hidden transition-transform duration-700 hover:scale-[1.02] bg-white/5 backdrop-blur-[12px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
        
        <!-- Borde Iluminado Superior sutil -->
        <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

        <!-- Botón B2B: Cotizar Proyecto con borde glowing naranja/azul -->
        <button class="group relative px-8 py-3.5 rounded-lg bg-white/5 text-white font-bold text-sm tracking-widest uppercase backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
          <!-- Borde simulado (Glow naranja-azul claro estilo UI Concept) -->
          <div class="absolute inset-0 rounded-lg border-[1.5px] border-transparent bg-gradient-to-r from-blue-400 via-white/60 to-orange-400 opacity-90 group-hover:opacity-100" style="-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; padding: 1.5px;"></div>
          <!-- Glow exterior sutil naranja/azul -->
          <div class="absolute inset-0 rounded-lg opacity-40 bg-gradient-to-r from-blue-400/30 via-transparent to-orange-400/30 blur-md -z-10 group-hover:opacity-70 transition-opacity duration-300"></div>

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
    /* Initially hidden via forwards rule applying the first frame implicitly if needed, but we ensure it plays. */
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0; /* Fallback that gets overridden by forwards */
  }
</style>
