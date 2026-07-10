<script lang="ts">
  import CheckCircle2 from 'lucide-svelte/icons/circle-check-big';
  import ShieldCheck from 'lucide-svelte/icons/shield-check';
  import Ruler from 'lucide-svelte/icons/ruler';
  import Sparkles from 'lucide-svelte/icons/sparkles';
  import Gem from 'lucide-svelte/icons/gem';
  import ArrowRight from 'lucide-svelte/icons/arrow-right';
  import ScrollReveal from '@shared/ui/ScrollReveal.svelte';
  import { onMount } from 'svelte';

  // Pilares de Valor B2B
  const values = [
    {
      title: 'Ingeniería Milimétrica',
      description:
        'Cristales templados procesados con márgenes de error inferiores a 0.5mm. Soluciones que encajan al primer intento.',
      image:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      badge: {
        value: '±0.5mm',
        label: 'Tolerancia CNC',
        icon: Ruler,
        color: 'text-blue-400',
      },
    },
    {
      title: 'Resistencia Industrial',
      description:
        'Aleaciones de aluminio extruido de alta densidad y cristales de seguridad certificados para zonas de alto impacto.',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      badge: {
        value: 'ISO 9001',
        label: 'Certificación',
        icon: ShieldCheck,
        color: 'text-orange-400',
      },
    },
    {
      title: 'Acabados Premium',
      description:
        'Herrajes de acero inoxidable pulido y perfilería esmaltada con estética Boutique arquitectónica. El lujo en cada bisagra.',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      badge: {
        value: '10 Años',
        label: 'Garantía Extendida',
        icon: Gem,
        color: 'text-zinc-300',
      },
    },
  ];

  let scrollY = $state(0);
  let prefersReducedMotion = $state(false);

  onMount(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  });

  /**
   * Task 9.3.7: Parallax velocity differential
   * Images: ~0.8x scroll speed (translateY positive = moves slower)
   * Text: 1x (no transform = natural speed)
   * Delta creates depth illusion.
   * Task 9.3.9: Only uses `transform: translateY()` — composite-only, 60fps.
   */
  function parallaxOffset(baseOffset: number): number {
    if (prefersReducedMotion) return 0; // Task 9.3.8
    return scrollY * baseOffset;
  }
</script>

<svelte:window bind:scrollY />

<section
  id="propuesta-valor"
  class="relative pt-24 pb-12 md:pt-32 md:pb-16 px-6 md:px-12 bg-al13-black overflow-hidden"
>
  <!-- Efectos de Luz Background -->
  <div
    class="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
  ></div>
  <div
    class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"
  ></div>
  <div
    class="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"
  ></div>

  <div class="max-w-7xl mx-auto relative z-10">
    <!-- Encabezado de Sección -->
    <ScrollReveal animation="fade-up">
      <div class="text-center mb-20 max-w-3xl mx-auto">
        <ScrollReveal animation="scale" delay={100}>
          <div
            class="inline-flex items-center space-x-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm"
          >
            <Sparkles class="w-4 h-4 text-orange-400" strokeWidth={2} />
            <span class="text-xs font-bold tracking-widest text-zinc-300 uppercase"
              >El Estándar AL13</span
            >
          </div>
        </ScrollReveal>
        <h2 class="text-4xl md:text-5xl font-heading font-bold text-white mb-6 tracking-tight">
          No fabricamos ventanas.<br /> Forjamos arquitectura.
        </h2>
        <p class="text-lg text-zinc-400 font-light">
          La industria se conforma con lo funcional. Nosotros redefinimos la estética industrial a
          través de sistemas de vidrio y aluminio diseñados para espacios que exigen la máxima
          sofisticación y durabilidad.
        </p>
      </div>
    </ScrollReveal>

    <!-- Flujo Editorial Z-Pattern -->
    <div class="flex flex-col space-y-32 md:space-y-48 mt-16 md:mt-32">
      {#each values as value, index}
        {@const isReversed = index % 2 !== 0}
        {@const BadgeIcon = value.badge.icon}

        <div
          class="flex flex-col md:flex-row {isReversed
            ? 'md:flex-row-reverse'
            : ''} items-center gap-12 lg:gap-24 group"
        >
          <!-- 50% Visual (Imagen Editorial con Parallax y Trust Badge) -->
          <ScrollReveal
            animation={isReversed ? 'slide-right' : 'slide-left'}
            class="w-full md:w-1/2"
            staggerIndex={index}
          >
            <div
              class="relative"
              style="transform: translateY({parallaxOffset(0.03)}px); will-change: transform;"
            >
              <div
                class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-[1.02] border border-white/10"
              >
                <!-- Overlay de viñeta -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                ></div>
                <img
                  src={value.image}
                  alt={value.title}
                  loading="lazy"
                  class="absolute inset-0 w-full h-full object-cover filter grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />

                <!-- Trust Badge (Glassmorphism B2B) -->
                <div
                  class="absolute bottom-6 {isReversed
                    ? 'left-6'
                    : 'right-6'} z-20 transition-transform duration-500 group-hover:-translate-y-2"
                >
                  <div
                    class="backdrop-blur-md bg-white/5 border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),_0_20px_40px_rgba(0,0,0,0.6)] rounded-2xl p-4 flex flex-col items-start min-w-[160px] overflow-hidden group/badge"
                  >
                    <!-- Glow effect tras el icono -->
                    <div
                      class="absolute -top-4 -right-4 w-12 h-12 bg-white/10 blur-[20px] rounded-full pointer-events-none transition-opacity opacity-50 group-hover/badge:opacity-100"
                    ></div>

                    <div class="flex items-center space-x-3 mb-2">
                      <div class="p-1.5 rounded-lg bg-black/40 border border-white/10">
                        <BadgeIcon class="w-4 h-4 {value.badge.color}" strokeWidth={2} />
                      </div>
                      <span
                        class="text-[0.65rem] font-bold tracking-widest text-zinc-400 uppercase"
                      >
                        {value.badge.label}
                      </span>
                    </div>

                    <span
                      class="text-3xl font-heading font-bold text-white tracking-tight drop-shadow-md"
                    >
                      {value.badge.value}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <!-- 50% Copy (Texto B2B Puro) -->
          <ScrollReveal
            animation={isReversed ? 'slide-left' : 'slide-right'}
            class="w-full md:w-1/2"
            delay={150}
            staggerIndex={index}
          >
            <div
              class="flex flex-col items-start {isReversed
                ? 'md:items-start lg:pl-12'
                : 'md:items-start lg:pr-12'}"
            >
              <h3
                class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 tracking-tight leading-tight"
              >
                {value.title}
              </h3>

              <p class="text-xl lg:text-2xl text-zinc-400 font-light leading-relaxed mb-10">
                {value.description}
              </p>

              <button
                class="inline-flex items-center space-x-3 text-sm font-bold tracking-widest uppercase text-white hover:text-orange-400 transition-colors cursor-pointer group/btn"
                aria-label="Explorar especificaciones técnicas"
              >
                <span>Explorar Especificaciones</span>
                <ArrowRight
                  class="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform"
                />
              </button>
            </div>
          </ScrollReveal>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* Agrega aquí utilidades específicas si las optimizaciones globales tailwind no se activan. */
</style>
