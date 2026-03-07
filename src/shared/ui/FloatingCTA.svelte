<script lang="ts">
  import { onMount } from 'svelte';

  // Reactividad Svelte 5 para el umbral visual de entrada
  let isVisible = $state(false);
  let isQuoterVisible = $state(false);

  onMount(() => {
    const handleScroll = () => {
      // El FAB aparece cuando pasamos el primer pliegue del monitor (roughly hero height)
      isVisible = window.scrollY > 400;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check inicial por si la página recargó abajo
    handleScroll();

    // Evitar la guerra de CTAs: Ocultarlo cuando el cotizador ya está en pantalla
    const observer = new IntersectionObserver(
      (entries) => {
        isQuoterVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    ); // 10% visible es suficiente para ocultarlo

    // Esperar a que el DOM se asiente
    setTimeout(() => {
      const quoterEl = document.getElementById('cotizador');
      if (quoterEl) observer.observe(quoterEl);
    }, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  });
</script>

<div
  class="fixed bottom-6 right-6 z-[100] transition-all duration-500 ease-in-out sm:bottom-8 sm:right-8"
  class:opacity-0={!isVisible || isQuoterVisible}
  class:translate-y-8={!isVisible || isQuoterVisible}
  class:pointer-events-none={!isVisible || isQuoterVisible}
  class:opacity-100={isVisible && !isQuoterVisible}
  class:translate-y-0={isVisible && !isQuoterVisible}
>
  <!-- Enrutador Anchor tag directo a ancla Hash o Ruta transaccional central -->
  <a
    href="/#cotizador"
    class="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-al13-cyan to-blue-600 p-4 md:px-5 md:py-4 font-bold text-white shadow-[0_0_20px_rgba(14,165,233,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] active:scale-95"
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

    <!-- Texto Expandible: En desktop está, en mobile colapsa a ícono puro para evitar fricción UX -->
    <span
      class="hidden overflow-hidden whitespace-nowrap font-heading opacity-100 transition-all duration-300 group-hover:opacity-100 md:block"
    >
      Cotizador B2B
    </span>
  </a>
</div>
