<script lang="ts">
  import { onMount } from 'svelte';

  // Reactividad Svelte 5 (Runes) para detectar scroll y aplicar Glassmorphism
  let isScrolled = $state(false);
  let passedHero = $state(false); // Para mostrar dinámicamente el botón CTA
  let isMobileMenuOpen = $state(false); // Estado del menú móvil alineado con Svelte 5

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMenu() {
    isMobileMenuOpen = false;
  }

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 50;
      passedHero = window.scrollY > 600; // Umbral aproximado donde termina el Hero
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<header
  class="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 {isScrolled
    ? 'bg-[#0A0A0A]/80 backdrop-blur-md py-4 shadow-xl'
    : 'bg-transparent py-5'}"
>
  <div class="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
    <!-- Logotipo B2B Luxury -->
    <a href="/" class="flex items-center gap-3 group">
      <div class="relative flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          class="w-12 h-12 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300"
        >
          <defs>
            <linearGradient id="glassGradientFrontNav" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#0284c7" stop-opacity="0.85" />
            </linearGradient>
            <linearGradient id="glassGradientSideNav" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#172554" stop-opacity="0.9" />
            </linearGradient>
            <linearGradient id="bevelHighlightNav" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6" />
              <stop offset="40%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
            </linearGradient>
            <filter id="glowDropNav" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="4"
                flood-color="#000000"
                flood-opacity="0.5"
              />
            </filter>
          </defs>

          <g filter="url(#glowDropNav)" transform="translate(10, 10) scale(0.8)">
            <!-- Pared Azul Derecha (Profundidad) -->
            <polygon points="50,0 80,25 80,95 50,95" fill="url(#glassGradientSideNav)" />
            <!-- Bisel Iluminador Borde Superior Izquierdo -->
            <polygon points="10,25 50,0 50,95 10,95" fill="url(#glassGradientFrontNav)" />
            <polygon points="10,25 50,0 50,2 10,27" fill="url(#bevelHighlightNav)" />

            <!-- Hueco / Marco Interior -->
            <polygon points="30,35 50,30 50,80 30,80" fill="#0f172a" opacity="0.4" />

            <!-- Puerta Naranja Frontal (Abriéndose) -->
            <polygon points="30,35 70,25 70,80 30,80" fill="#f97316" opacity="0.9" />

            <!-- Panel Posterior Amarillo -->
            <polygon points="70,25 80,25 80,80 70,80" fill="#eab308" opacity="0.9" />

            <!-- Acento Rojo Superior de la puerta -->
            <polygon points="30,35 70,25 70,28 30,38" fill="#ef4444" opacity="0.9" />

            <!-- Líneas de Cristal Reflejante -->
            <line
              x1="12"
              y1="28"
              x2="48"
              y2="5"
              stroke="#ffffff"
              stroke-width="1"
              stroke-opacity="0.4"
            />
            <line
              x1="52"
              y1="5"
              x2="78"
              y2="28"
              stroke="#ffffff"
              stroke-width="1"
              stroke-opacity="0.3"
            />
            <line
              x1="50"
              y1="0"
              x2="50"
              y2="95"
              stroke="#ffffff"
              stroke-width="1.5"
              stroke-opacity="0.5"
            />
          </g>
        </svg>
      </div>
      <span class="text-xl font-heading font-semibold tracking-wide text-white">
        Templados <span
          class="bg-gradient-to-r from-al13-cyan to-al13-emerald bg-clip-text text-transparent"
          >AL 13</span
        >
      </span>
    </a>

    <!-- Navegación Escritorio -->
    <nav class="hidden md:flex items-center gap-8">
      <a
        href="/catalogo"
        data-astro-prefetch="viewport"
        class="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200"
        >Catálogo</a
      >
      <a
        href="/nosotros"
        data-astro-prefetch="viewport"
        class="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200"
        >Filosofía</a
      >
      <a
        href="/contacto"
        data-astro-prefetch="viewport"
        class="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200"
        >Contacto B2B</a
      >
    </nav>

    <!-- Call to Actions -->
    <div class="hidden md:flex items-center gap-4">
      <!-- Botón Transaccional Sticky (Visible solo si pasó el Hero) -->
      {#if passedHero}
        <a
          href="#cotizador"
          class="bg-gradient-to-r from-al13-cyan to-al13-emerald hover:from-cyan-400 hover:to-emerald-400 text-al13-black px-6 py-2.5 rounded-lg text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] active:scale-95 animate-in slide-in-from-bottom-2 fade-in shadow-lg"
        >
          Cotizar Proyecto
        </a>
      {/if}
    </div>

    <!-- Mobile Menu Button -->
    <button
      aria-label="Abrir menú móvil"
      onclick={toggleMobileMenu}
      class="md:hidden relative z-50 flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
    >
      <span
        class="block w-6 h-[2px] bg-white rounded-full transition-transform {isMobileMenuOpen
          ? 'rotate-45 translate-y-[8px]'
          : ''}"
      ></span>
      <span
        class="block w-4 h-[2px] bg-white rounded-full transition-transform ml-auto {isMobileMenuOpen
          ? 'opacity-0'
          : ''}"
      ></span>
      <span
        class="block w-6 h-[2px] bg-white rounded-full transition-transform {isMobileMenuOpen
          ? '-rotate-45 -translate-y-[8px]'
          : 'hidden'}"
      ></span>
    </button>
  </div>

  <!-- Mobile Navigation Overlay -->
  {#if isMobileMenuOpen}
    <div
      class="md:hidden absolute top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 px-6 animate-in fade-in zoom-in-95 duration-300"
    >
      <a href="/" onclick={closeMenu} class="text-2xl font-bold text-white mb-4">Inicio</a>
      <a
        href="/catalogo"
        data-astro-prefetch="viewport"
        onclick={closeMenu}
        class="text-2xl font-bold text-zinc-300 hover:text-al13-cyan transition-colors"
        >Catálogo 3D</a
      >
      <a
        href="/nosotros"
        data-astro-prefetch="viewport"
        onclick={closeMenu}
        class="text-2xl font-bold text-zinc-300 hover:text-al13-cyan transition-colors"
        >Nuestra Filosofía</a
      >
      <a
        href="/contacto"
        data-astro-prefetch="viewport"
        onclick={closeMenu}
        class="text-2xl font-bold text-zinc-300 hover:text-al13-cyan transition-colors"
        >Contacto B2B</a
      >
      <a
        href="/#cotizador"
        onclick={closeMenu}
        class="mt-8 bg-al13-cyan text-black px-8 py-4 rounded-xl font-bold text-lg w-full text-center"
        >Cotizar Proyecto</a
      >
    </div>
  {/if}
</header>
