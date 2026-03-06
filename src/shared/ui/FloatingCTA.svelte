<script lang="ts">
  import { onMount } from 'svelte';

  // Reactividad Svelte 5 para el umbral visual de entrada
  let isVisible = $state(false);

  onMount(() => {
    const handleScroll = () => {
      // El FAB aparece cuando pasamos el primer pliegue del monitor (roughly hero height)
      isVisible = window.scrollY > 400;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check inicial por si la página recargó abajo
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<div
  class="fixed bottom-6 right-6 z-[100] transition-all duration-500 ease-in-out sm:bottom-8 sm:right-8"
  class:opacity-0={!isVisible}
  class:translate-y-8={!isVisible}
  class:pointer-events-none={!isVisible}
  class:opacity-100={isVisible}
  class:translate-y-0={isVisible}
>
  <!-- Enrutador Anchor tag directo a ancla Hash o Ruta transaccional central -->
  <a
    href="/#cotizador"
    class="group flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-al13-cyan to-blue-600 px-5 py-4 font-bold text-white shadow-[0_0_20px_rgba(14,165,233,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] active:scale-95"
    aria-label="Ir a la calculadora y solicitar cotización formal"
  >
    <!-- Icono B2B / Calculadora Pura SVG inyectado in-line -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 transition-transform duration-300 group-hover:rotate-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>

    <!-- Texto Expandible: En desktop está, en mobile colapsa (y se oculta texto o lo mostramos si el botón es key) -->
    <span
      class="overflow-hidden whitespace-nowrap opacity-100 transition-all duration-300 group-hover:opacity-100 font-heading"
    >
      Cotizador B2B
    </span>
  </a>
</div>
