<script lang="ts">
  /**
   * CounterStat.svelte
   * @module shared/ui
   *
   * Animated counter that interpolates from 0 to a target value with blur→focus effect.
   * - IntersectionObserver triggers animation when element enters viewport
   * - requestAnimationFrame for 60fps interpolation
   * - prefers-reduced-motion → muestra valor final inmediato (REGLA 9.3.8)
   * - Solo usa transform, opacity, filter (composite-only — REGLA 9.3.9)
   *
   * REGLA 4: Solo presentación. Sin fetch(), sin SDKs externos.
   */
  import { onMount } from 'svelte';

  type Props = {
    value: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    duration?: number;
    class?: string;
  };

  let {
    value,
    suffix = '',
    prefix = '',
    decimals = 0,
    duration = 1500,
    class: className = '',
  }: Props = $props();

  let counterEl: HTMLSpanElement;
  let displayValue = $state('0');
  let hasAnimated = $state(false);
  let isVisible = $state(false);
  let prefersReducedMotion = $state(false);

  onMount(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Listen for dynamic changes (user toggles OS accessibility setting)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (e.matches) {
        displayValue = formatNumber(value);
        isVisible = true;
        hasAnimated = true;
      }
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    if (prefersReducedMotion) {
      displayValue = formatNumber(value);
      isVisible = true;
      hasAnimated = true;
      return () => mediaQuery.removeEventListener('change', handleMotionChange);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          hasAnimated = true;
          isVisible = true;
          animateCounter();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (counterEl) observer.observe(counterEl);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  });

  function formatNumber(n: number): string {
    return decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
  }

  function animateCounter() {
    const startTime = performance.now();

    function tick(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: cubic-bezier(0.16, 1, 0.3, 1) approximation — ease-out expo
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = value * eased;

      displayValue = formatNumber(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        displayValue = formatNumber(value);
      }
    }

    requestAnimationFrame(tick);
  }
</script>

<span
  bind:this={counterEl}
  class="counter-stat {isVisible ? 'counter-stat--visible' : ''} {prefersReducedMotion
    ? 'counter-stat--no-motion'
    : ''} {className}"
  style="--counter-duration: {duration}ms;"
>
  {prefix}{displayValue}{suffix}
</span>

<style>
  .counter-stat {
    display: inline-block;
    opacity: 0;
    filter: blur(8px);
    transition:
      opacity calc(var(--counter-duration) * 0.6) ease-out,
      filter calc(var(--counter-duration) * 0.8) ease-out;
    will-change: opacity, filter;
  }

  .counter-stat--visible {
    opacity: 1;
    filter: blur(0);
  }

  /* Accesibilidad: sin animaciones */
  .counter-stat--no-motion {
    opacity: 1 !important;
    filter: none !important;
    transition: none !important;
    will-change: auto;
  }
</style>
