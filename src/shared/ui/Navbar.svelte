<script lang="ts">
  import { onMount } from 'svelte';

  // Reactividad Svelte 5 (Runes) para detectar scroll y aplicar Glassmorphism
  let isScrolled = $state(false);

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 50;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<header 
  class="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 {isScrolled ? 'bg-[#0A0A0A]/80 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-5'}"
>
  <div class="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
    <!-- Logotipo B2B Luxury -->
    <a href="/" class="flex items-center gap-3 group">
      <div class="relative flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-12 h-12 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300">
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
               <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.5"/>
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
            <line x1="12" y1="28" x2="48" y2="5" stroke="#ffffff" stroke-width="1" stroke-opacity="0.4" />
            <line x1="52" y1="5" x2="78" y2="28" stroke="#ffffff" stroke-width="1" stroke-opacity="0.3" />
            <line x1="50" y1="0" x2="50" y2="95" stroke="#ffffff" stroke-width="1.5" stroke-opacity="0.5" />
          </g>
        </svg>
      </div>
      <span class="text-xl font-heading font-semibold tracking-wide text-white">
        Templados <span class="bg-gradient-to-r from-al13-cyan to-al13-emerald bg-clip-text text-transparent">AL 13</span>
      </span>
    </a>

    <!-- Navegación Escritorio -->
    <nav class="hidden md:flex items-center gap-8">
      <a href="/catalogo" class="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200">Catálogo</a>
      <a href="/nosotros" class="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200">Filosofía</a>
      <a href="/contacto" class="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200">Contacto B2B</a>
    </nav>

    <!-- Call to Action B2B -->
    <div class="hidden md:flex">
      <a
        href="/admin/login"
        class="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg backdrop-blur-sm"
      >
        Ingresar Admin
      </a>
    </div>

    <!-- Mobile Menu Button (Decorativo en esta fase) -->
    <button aria-label="Abrir menú móvil" class="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none">
      <span class="block w-6 h-[2px] bg-white rounded-full transition-transform"></span>
      <span class="block w-4 h-[2px] bg-white rounded-full transition-transform ml-auto"></span>
    </button>
  </div>
</header>
