<script lang="ts">
  import { spring } from 'svelte/motion';

  // Magnetic effect on CTA button
  let ctaBtn: HTMLAnchorElement;
  const btnSpring = spring({ x: 0, y: 0, scale: 1 }, { stiffness: 0.08, damping: 0.3 });

  function handleBtnMove(e: MouseEvent) {
    if (!ctaBtn) return;
    const rect = ctaBtn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    btnSpring.set({ x: y * -8, y: x * 8, scale: 1.05 });
  }

  function handleBtnLeave() {
    btnSpring.set({ x: 0, y: 0, scale: 1 });
  }
</script>

<section class="relative min-h-[90vh] flex items-center overflow-hidden">
  <!-- Fondo Oscuro Base (visible antes de que cargue video) -->
  <div class="absolute inset-0 bg-al13-black z-0"></div>

  <!-- Cinematic Background Video -->
  <video
    autoplay
    loop
    muted
    playsinline
    preload="metadata"
    aria-hidden="true"
    poster="/hero_placeholder.jpg"
    class="absolute inset-0 w-full h-full object-cover z-[1] pointer-events-none filter contrast-[1.05] brightness-[0.75] animate-hero-video"
  >
    <source src="/videos/hero-bg-opt.mp4" type="video/mp4" />
    <source
      src="https://cdn.pixabay.com/video/2021/08/21/85806-591741703_large.mp4"
      type="video/mp4"
    />
  </video>

  <!-- Overlay lateral: gradiente oscuro izquierda para legibilidad del texto (Aclarado para mayor luminosidad) -->
  <div
    class="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-r from-al13-black/80 via-al13-black/30 to-transparent"
  ></div>

  <!-- Overlay superior sutil (oscurece zona del navbar) -->
  <div
    class="absolute inset-x-0 top-0 h-32 z-[2] pointer-events-none bg-gradient-to-b from-al13-black/60 to-transparent"
  ></div>

  <!-- Fundido inferior (transición suave a la siguiente sección) -->
  <div
    class="absolute inset-x-0 bottom-0 h-44 z-[2] pointer-events-none bg-gradient-to-t from-al13-black to-transparent"
  ></div>

  <!-- Contenido Principal -->
  <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full pt-24 pb-20">
    <div class="max-w-3xl flex flex-col items-start text-left space-y-8">
      <!-- Titular SEO — Efecto cinemático de "apertura" scale(0.95→1) -->
      <h1
        class="text-5xl md:text-6xl lg:text-[4.5rem] font-heading font-bold tracking-tight text-white leading-[1.1] animate-cinematic-open"
        style="text-shadow: 0 4px 30px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6);"
      >
        CRISTAL Y<br />
        ALUMINIO<br />
        ARQUITECTÓNICO
      </h1>

      <!-- Subtítulo — fade-in suave retardado -->
      <p
        class="text-xl md:text-2xl text-zinc-200 font-sans font-light tracking-widest uppercase animate-hero-fade"
        style="animation-delay: 200ms; text-shadow: 0 2px 16px rgba(0,0,0,0.9);"
      >
        Diseño · Precisión · Lujo
      </p>

      <!-- Línea decorativa (simula perfil de aluminio) -->
      <div
        class="h-[2px] w-24 bg-gradient-to-r from-amber-400/80 via-white/40 to-transparent animate-hero-fade"
        style="animation-delay: 350ms;"
      ></div>

      <!-- CTA Principal con efecto magnético -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="animate-hero-fade" style="animation-delay: 500ms;">
        <a
          href="#cotizador"
          bind:this={ctaBtn}
          onmousemove={handleBtnMove}
          onmouseleave={handleBtnLeave}
          class="group relative inline-flex items-center px-10 py-4 rounded-lg text-white font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02] will-change-transform"
          style="transform: rotateX({$btnSpring.x}deg) rotateY({$btnSpring.y}deg) scale({$btnSpring.scale}); transform-style: preserve-3d;"
        >
          <!-- Fondo sutil glass -->
          <div
            class="absolute inset-0 rounded-lg bg-white/[0.06] backdrop-blur-sm border border-white/15"
          ></div>

          <!-- Borde glow (azul → ámbar) -->
          <div
            class="absolute inset-0 rounded-lg border-[1.5px] border-transparent bg-gradient-to-r from-sky-400 via-white/50 to-amber-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            style="-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; padding: 1.5px;"
          ></div>

          <!-- Glow exterior -->
          <div
            class="absolute inset-0 rounded-lg opacity-30 bg-gradient-to-r from-sky-400/20 via-transparent to-amber-500/20 blur-lg -z-10 group-hover:opacity-60 transition-opacity duration-300"
          ></div>

          <span class="relative z-10 drop-shadow-lg">Cotizar Proyecto</span>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  /* ── Hero Cinematic Opening: scale(0.95→1) + opacity ── */
  @keyframes cinematicOpen {
    from {
      opacity: 0;
      transform: scale(0.95);
      filter: blur(2px);
    }
    to {
      opacity: 1;
      transform: scale(1);
      filter: blur(0);
    }
  }

  .animate-cinematic-open {
    animation: cinematicOpen 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
    will-change: transform, opacity, filter;
  }

  /* ── Hero elements fade-in (subtitle, line, CTA) ── */
  @keyframes heroFade {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-hero-fade {
    animation: heroFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
    will-change: transform, opacity;
  }

  /* ── Video fade-in retardado (200ms después del título) ── */
  @keyframes videoReveal {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .animate-hero-video {
    animation: videoReveal 1.5s ease-out 200ms forwards;
    opacity: 0;
  }

  /* ── Accesibilidad: sin animaciones ── */
  @media (prefers-reduced-motion: reduce) {
    .animate-cinematic-open,
    .animate-hero-fade,
    .animate-hero-video {
      animation: none;
      opacity: 1;
      transform: none;
      filter: none;
    }
  }
</style>
