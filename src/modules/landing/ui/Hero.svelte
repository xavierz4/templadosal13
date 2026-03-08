<script lang="ts">
  import { spring } from 'svelte/motion';

  // Magnetic effect on CTA button
  let ctaBtn: HTMLButtonElement;
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
  <div class="absolute inset-0 bg-[#0A0A0A] z-0"></div>

  <!-- Cinematic Background Video -->
  <video
    autoplay
    loop
    muted
    playsinline
    poster="/hero_placeholder.jpg"
    class="absolute inset-0 w-full h-full object-cover z-[1] pointer-events-none filter contrast-[1.05] brightness-[0.55]"
  >
    <source src="/videos/hero-bg.webm" type="video/webm" />
    <source src="/videos/hero-bg.mp4" type="video/mp4" />
    <source
      src="https://cdn.pixabay.com/video/2021/08/21/85806-591741703_large.mp4"
      type="video/mp4"
    />
  </video>

  <!-- Overlay lateral: gradiente oscuro izquierda para legibilidad del texto -->
  <div
    class="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/50 to-transparent"
  ></div>

  <!-- Overlay superior sutil (oscurece zona del navbar) -->
  <div
    class="absolute inset-x-0 top-0 h-32 z-[2] pointer-events-none bg-gradient-to-b from-[#0A0A0A]/60 to-transparent"
  ></div>

  <!-- Fundido inferior (transición suave a la siguiente sección) -->
  <div
    class="absolute inset-x-0 bottom-0 h-44 z-[2] pointer-events-none bg-gradient-to-t from-[#0A0A0A] to-transparent"
  ></div>

  <!-- Contenido Principal -->
  <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full pt-24 pb-20">
    <div class="max-w-3xl flex flex-col items-start text-left space-y-8">
      <!-- Titular SEO (Tipografía blanca sobre video) -->
      <h1
        class="text-5xl md:text-6xl lg:text-[5.5rem] font-sans font-bold tracking-tight text-white leading-[1.05] animate-fade-in-up"
        style="text-shadow: 0 4px 30px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6);"
      >
        CRISTAL Y<br />
        ALUMINIO<br />
        ARQUITECTÓNICO
      </h1>

      <!-- Subtítulo -->
      <p
        class="text-xl md:text-2xl text-zinc-200 font-sans font-light tracking-widest uppercase animate-fade-in-up"
        style="animation-delay: 150ms; text-shadow: 0 2px 16px rgba(0,0,0,0.9);"
      >
        Diseño · Precisión · Lujo
      </p>

      <!-- Línea decorativa (simula perfil de aluminio) -->
      <div
        class="h-[2px] w-24 bg-gradient-to-r from-amber-400/80 via-white/40 to-transparent animate-fade-in-up"
        style="animation-delay: 250ms;"
      ></div>

      <!-- CTA Principal con efecto magnético -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="animate-fade-in-up" style="animation-delay: 350ms;">
        <button
          bind:this={ctaBtn}
          onmousemove={handleBtnMove}
          onmouseleave={handleBtnLeave}
          class="group relative px-10 py-4 rounded-lg text-white font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02] will-change-transform"
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
        </button>
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }
</style>
