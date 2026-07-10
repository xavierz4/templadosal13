<script lang="ts">
  /**
   * ScrollReveal.svelte
   * @module shared/ui
   *
   * Componente utilitario de scroll-driven animations con progressive enhancement:
   * - Chrome/Edge 115+ → CSS nativo `animation-timeline: view()` (zero JS overhead)
   * - Safari/Firefox    → IntersectionObserver fallback (agrega clase `.is-visible`)
   * - prefers-reduced-motion → Sin animaciones, contenido visible inmediato
   *
   * REGLA 4: Solo presentación. Sin fetch(), sin SDKs externos.
   *
   * ── Performance Budget (Task 9.3.9) ──
   * ALL animation properties MUST be composite-only for 60fps guarantee:
   * ✅ ALLOWED: transform, opacity
   * ⚠️ EXCEPTION: filter (blur) — GPU-accelerated in all modern browsers,
   *    used only in 'blur-focus' preset. Degrades gracefully via prefers-reduced-motion.
   * ❌ FORBIDDEN: width, height, margin, padding, top, left, border-width, font-size
   *    (these trigger layout/paint and will cause jank)
   */
  import { onMount } from 'svelte';

  import type { Snippet } from 'svelte';

  type AnimationPreset =
    | 'fade-up'
    | 'fade-in'
    | 'scale'
    | 'blur-focus'
    | 'slide-left'
    | 'slide-right';

  type Props = {
    animation?: AnimationPreset;
    delay?: number;
    duration?: number;
    threshold?: number;
    once?: boolean;
    class?: string;
    staggerIndex?: number;
    children?: Snippet;
  };

  let {
    animation = 'fade-up',
    delay = 0,
    duration = 800,
    threshold = 0.15,
    once = true,
    class: className = '',
    staggerIndex = 0,
    children,
  }: Props = $props();

  let wrapperEl: HTMLDivElement;
  let isVisible = $state(false);
  let supportsNativeTimeline = $state(false);
  let prefersReducedMotion = $state(false);

  let totalDelay = $derived(delay + staggerIndex * 100);

  onMount(() => {
    // Task 9.3.8: Detect prefers-reduced-motion with DYNAMIC listener
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion = motionQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (e.matches) {
        isVisible = true;
      }
    };
    motionQuery.addEventListener('change', handleMotionChange);

    if (prefersReducedMotion) {
      isVisible = true;
      return () => motionQuery.removeEventListener('change', handleMotionChange);
    }

    // Detectar soporte nativo CSS animation-timeline
    supportsNativeTimeline =
      typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()');

    if (supportsNativeTimeline) {
      // CSS nativo maneja todo — marcar como visible para evitar estado hidden
      isVisible = true;
      return () => motionQuery.removeEventListener('change', handleMotionChange);
    }

    // Fallback: IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          isVisible = true;
          if (once) observer.disconnect();
        } else if (!once) {
          isVisible = false;
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    if (wrapperEl) observer.observe(wrapperEl);
    return () => {
      observer.disconnect();
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  });
</script>

<div
  bind:this={wrapperEl}
  class="scroll-reveal scroll-reveal--{animation} {supportsNativeTimeline
    ? 'scroll-reveal--native'
    : ''} {isVisible && !supportsNativeTimeline ? 'is-visible' : ''} {prefersReducedMotion
    ? 'scroll-reveal--no-motion'
    : ''} {className}"
  style="--sr-delay: {totalDelay}ms; --sr-duration: {duration}ms;"
>
  {@render children?.()}
</div>

<style>
  /*
   * ── Task 9.3.9: Performance Budget ──
   * Base class: NO blanket will-change to avoid GPU layer over-reservation.
   * Each preset below only animates composite-only properties:
   * transform, opacity, filter (blur — GPU-accelerated exception).
   * will-change is managed per-preset via CSS vars and inline styles.
   */
  /* .scroll-reveal — Intentionally no base styles; presets define their own initial states */

  /* ── Reduced Motion: Visible inmediato sin animación (Task 9.3.8) ── */
  .scroll-reveal--no-motion {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
    will-change: auto;
  }

  /* ═══════════════════════════════════════════╗
   * RAMA A: CSS Nativo animation-timeline      ║
   * Chrome/Edge 115+  — Zero JS overhead       ║
   * ═══════════════════════════════════════════*/

  @supports (animation-timeline: view()) {
    .scroll-reveal--native.scroll-reveal--fade-up {
      animation: sr-fade-up linear both;
      animation-timeline: view();
      animation-range: entry 10% cover 35%;
      animation-delay: var(--sr-delay);
    }

    .scroll-reveal--native.scroll-reveal--fade-in {
      animation: sr-fade-in linear both;
      animation-timeline: view();
      animation-range: entry 10% cover 30%;
      animation-delay: var(--sr-delay);
    }

    .scroll-reveal--native.scroll-reveal--scale {
      animation: sr-scale linear both;
      animation-timeline: view();
      animation-range: entry 10% cover 35%;
      animation-delay: var(--sr-delay);
    }

    .scroll-reveal--native.scroll-reveal--blur-focus {
      animation: sr-blur-focus linear both;
      animation-timeline: view();
      animation-range: entry 10% cover 40%;
      animation-delay: var(--sr-delay);
    }

    .scroll-reveal--native.scroll-reveal--slide-left {
      animation: sr-slide-left linear both;
      animation-timeline: view();
      animation-range: entry 10% cover 35%;
      animation-delay: var(--sr-delay);
    }

    .scroll-reveal--native.scroll-reveal--slide-right {
      animation: sr-slide-right linear both;
      animation-timeline: view();
      animation-range: entry 10% cover 35%;
      animation-delay: var(--sr-delay);
    }
  }

  /* ═══════════════════════════════════════════╗
   * RAMA B: IntersectionObserver fallback       ║
   * Safari / Firefox — Transiciones CSS         ║
   * ═══════════════════════════════════════════*/

  /* Estado inicial por preset (antes de .is-visible) */
  .scroll-reveal--fade-up:not(.scroll-reveal--native):not(.scroll-reveal--no-motion) {
    opacity: 0;
    transform: translateY(40px);
    transition:
      opacity var(--sr-duration) cubic-bezier(0.16, 1, 0.3, 1) var(--sr-delay),
      transform var(--sr-duration) cubic-bezier(0.16, 1, 0.3, 1) var(--sr-delay);
  }

  .scroll-reveal--fade-in:not(.scroll-reveal--native):not(.scroll-reveal--no-motion) {
    opacity: 0;
    transition: opacity var(--sr-duration) ease-out var(--sr-delay);
  }

  .scroll-reveal--scale:not(.scroll-reveal--native):not(.scroll-reveal--no-motion) {
    opacity: 0;
    transform: scale(0.92);
    transition:
      opacity var(--sr-duration) cubic-bezier(0.16, 1, 0.3, 1) var(--sr-delay),
      transform var(--sr-duration) cubic-bezier(0.16, 1, 0.3, 1) var(--sr-delay);
  }

  .scroll-reveal--blur-focus:not(.scroll-reveal--native):not(.scroll-reveal--no-motion) {
    opacity: 0;
    filter: blur(8px);
    transition:
      opacity var(--sr-duration) ease-out var(--sr-delay),
      filter var(--sr-duration) ease-out var(--sr-delay);
  }

  .scroll-reveal--slide-left:not(.scroll-reveal--native):not(.scroll-reveal--no-motion) {
    opacity: 0;
    transform: translateX(-60px);
    transition:
      opacity var(--sr-duration) cubic-bezier(0.16, 1, 0.3, 1) var(--sr-delay),
      transform var(--sr-duration) cubic-bezier(0.16, 1, 0.3, 1) var(--sr-delay);
  }

  .scroll-reveal--slide-right:not(.scroll-reveal--native):not(.scroll-reveal--no-motion) {
    opacity: 0;
    transform: translateX(60px);
    transition:
      opacity var(--sr-duration) cubic-bezier(0.16, 1, 0.3, 1) var(--sr-delay),
      transform var(--sr-duration) cubic-bezier(0.16, 1, 0.3, 1) var(--sr-delay);
  }

  /* Estado visible (IO trigger) */
  .scroll-reveal.is-visible {
    opacity: 1 !important;
    transform: translateY(0) translateX(0) scale(1) !important;
    filter: blur(0) !important;
  }

  /* ── Keyframes para animation-timeline nativo ── */
  @keyframes sr-fade-up {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes sr-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes sr-scale {
    from {
      opacity: 0;
      transform: scale(0.92);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes sr-blur-focus {
    from {
      opacity: 0;
      filter: blur(8px);
    }
    to {
      opacity: 1;
      filter: blur(0);
    }
  }

  @keyframes sr-slide-left {
    from {
      opacity: 0;
      transform: translateX(-60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes sr-slide-right {
    from {
      opacity: 0;
      transform: translateX(60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
