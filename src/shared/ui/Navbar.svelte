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
    <a href="/" class="flex items-center gap-2 group">
      <div class="w-8 h-8 rounded-sm bg-gradient-to-br from-al13-gold to-yellow-600 flex items-center justify-center font-bold text-al13-dark font-heading group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
        AL
      </div>
      <span class="text-xl font-heading font-semibold tracking-wide text-white">
        Templados <span class="text-gradient-gold">13</span>
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
      <button class="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg backdrop-blur-sm">
        Ingresar Admin
      </button>
    </div>

    <!-- Mobile Menu Button (Decorativo en esta fase) -->
    <button aria-label="Abrir menú móvil" class="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none">
      <span class="block w-6 h-[2px] bg-white rounded-full transition-transform"></span>
      <span class="block w-4 h-[2px] bg-white rounded-full transition-transform ml-auto"></span>
    </button>
  </div>
</header>
