<script lang="ts">
  /**
   * Scene3DCanvas.svelte
   * @module render/ui
   *
   * Canvas maestro para el motor 3D Threlte.
   * Usa geometría procedural premium (ProceduralScene) en lugar de .glb para garantizar
   * renders instantáneos sin dependencia de assets externos ni latencia de red.
   *
   * REGLA 4: Solo presentación 3D. Sin fetch(), sin SDKs externos.
   */
  import { Canvas, T } from '@threlte/core';
  import { HTML, OrbitControls, Grid } from '@threlte/extras';
  import { onMount } from 'svelte';
  import ProceduralScene from './ProceduralScene.svelte';

  type Props = {
    width?: number;
    height?: number;
    class?: string;
    fallbackImageSrc?: string;
    fallbackImageAlt?: string;
    glassType?: string;
    frameColor?: string;
    productType?: string;
  };

  let {
    width,
    height,
    class: className = '',
    fallbackImageSrc,
    fallbackImageAlt,
    glassType = 'clear',
    frameColor = 'anodizado',
    productType = 'divisor_oficina',
  }: Props = $props();

  let isMounted = $state(false);
  let webglSupported = $state(false);

  function detectWebGL() {
    if (typeof window === 'undefined' || import.meta.env?.TEST) return false;
    try {
      const canvas = document.createElement('canvas');
      const ctx =
        canvas.getContext('webgl2') ??
        canvas.getContext('webgl') ??
        canvas.getContext('experimental-webgl');
      return ctx !== null;
    } catch (err) {
      console.warn(
        '[Scene3DCanvas] WebGL detection failed:',
        err instanceof Error ? err.message : err
      );
      return false;
    }
  }

  onMount(() => {
    isMounted = true;
    webglSupported = detectWebGL();
    if (!webglSupported) {
      console.warn('[Scene3DCanvas] WebGL no disponible — mostrando fallback 2D.');
    }
  });

  const containerStyle = $derived(
    width
      ? `width:${width}px; height:${height ?? 500}px;`
      : `width:100%; height:${height ?? 500}px;`
  );
</script>

<div
  class="scene3d-container {className}"
  style={containerStyle}
  role="img"
  aria-label={fallbackImageAlt ?? 'Vidrio templado Templados AL13 — vista 3D'}
>
  {#if isMounted && webglSupported}
    <div class="scene3d-canvas-wrap">
      <Canvas>
        <!-- Iluminación premium: Ambiente suave + Directional fuerte para el vidrio PBR -->
        <T.AmbientLight intensity={0.5} color="#e8f0ff" />
        <T.DirectionalLight position={[6, 10, 6]} intensity={2.5} color="#ffffff" />
        <T.DirectionalLight position={[-4, 3, -6]} intensity={0.8} color="#b0d0ff" />
        <T.PointLight position={[0, 4, 3]} intensity={1.2} color="#ffffff" distance={10} />

        <!-- Rejilla de piso arquitectónica: cada celda = 1 metro de escala real -->
        <Grid
          position={[0, -1.6, 0]}
          cellSize={1}
          sectionSize={5}
          cellColor="rgba(255,255,255,0.06)"
          sectionColor="rgba(100,180,255,0.18)"
          fadeDistance={18}
          infiniteGrid={false}
        />

        <!-- Escena 3D procedural específica por tipo de producto -->
        <T.Group position={[0, -0.3, 0]}>
          <ProceduralScene {productType} {glassType} {frameColor} />
        </T.Group>

        <!-- Cámara con órbita libre y auto-rotación suave -->
        <T.PerspectiveCamera makeDefault={true} position={[4, 1.5, 5]} fov={38}>
          <OrbitControls
            enableDamping={true}
            dampingFactor={0.04}
            autoRotate={true}
            autoRotateSpeed={0.6}
            enableZoom={true}
            minDistance={2.5}
            maxDistance={12}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.9}
            target={[0, 0.2, 0]}
          />
        </T.PerspectiveCamera>
      </Canvas>
    </div>
  {:else if isMounted && !webglSupported}
    <!-- Fallback 2D — Solo para dispositivos sin WebGL -->
    <img
      src={fallbackImageSrc ?? '/hero_placeholder.jpg'}
      alt={fallbackImageAlt ?? 'Vidrio templado Templados AL13 — vista 3D'}
      class="scene3d-fallback"
      loading="lazy"
      decoding="async"
    />
  {:else}
    <!-- Shimmer skeleton loader premium mientras hydrata -->
    <div class="scene3d-skeleton">
      <!-- Shimmer sweep animado -->
      <div class="skeleton-shimmer"></div>

      <!-- Silueta de viewport 3D -->
      <div class="skeleton-viewport">
        <!-- Rejilla fantasma sugiriendo piso 3D -->
        <div class="skeleton-grid">
          <div class="skeleton-grid-line"></div>
          <div class="skeleton-grid-line"></div>
          <div class="skeleton-grid-line"></div>
        </div>

        <!-- Panel de cristal fantasma (silueta) -->
        <div class="skeleton-glass-silhouette"></div>

        <!-- Indicador de carga sutil -->
        <div class="skeleton-label">
          <div class="skeleton-dot"></div>
          <span>Preparando vista 3D</span>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .scene3d-container {
    position: relative;
    overflow: hidden;
    border-radius: 0.75rem;
    background: #050508;
  }

  /* Fade-in suave: skeleton → canvas 3D */
  .scene3d-canvas-wrap {
    width: 100%;
    height: 100%;
    animation: canvasFadeIn 0.6s ease-out forwards;
  }

  @keyframes canvasFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .scene3d-container :global(canvas) {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }

  .scene3d-fallback {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* ── Shimmer Skeleton Premium ── */
  .scene3d-skeleton {
    position: relative;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at 40% 50%, #0c0c1a 0%, #050508 80%);
    overflow: hidden;
  }

  /* Sweep de luz (shimmer diagonal) */
  .skeleton-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 30%,
      rgba(100, 180, 255, 0.04) 45%,
      rgba(100, 180, 255, 0.08) 50%,
      rgba(100, 180, 255, 0.04) 55%,
      transparent 70%
    );
    animation: shimmerSweep 2.4s ease-in-out infinite;
    will-change: transform;
  }

  @keyframes shimmerSweep {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  /* Viewport central */
  .skeleton-viewport {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* Líneas de rejilla fantasma */
  .skeleton-grid {
    position: absolute;
    bottom: 20%;
    left: 10%;
    right: 10%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    opacity: 0.15;
  }

  .skeleton-grid-line {
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(100, 180, 255, 0.5) 30%,
      rgba(100, 180, 255, 0.5) 70%,
      transparent 100%
    );
    animation: gridPulse 2s ease-in-out infinite;
  }

  .skeleton-grid-line:nth-child(2) {
    width: 80%;
    margin: 0 auto;
    animation-delay: 0.3s;
  }

  .skeleton-grid-line:nth-child(3) {
    width: 60%;
    margin: 0 auto;
    animation-delay: 0.6s;
  }

  @keyframes gridPulse {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }

  /* Silueta del panel de cristal */
  .skeleton-glass-silhouette {
    width: 35%;
    height: 45%;
    border: 1px solid rgba(100, 180, 255, 0.08);
    border-radius: 4px;
    background: linear-gradient(
      180deg,
      rgba(100, 180, 255, 0.03) 0%,
      rgba(100, 180, 255, 0.01) 100%
    );
    animation: glassPulse 3s ease-in-out infinite;
    will-change: opacity;
  }

  @keyframes glassPulse {
    0%,
    100% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.8;
    }
  }

  /* Label de carga */
  .skeleton-label {
    position: absolute;
    bottom: 10%;
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(161, 161, 170, 0.6);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  /* Dot pulsante */
  .skeleton-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(100, 180, 255, 0.6);
    animation: dotPulse 1.5s ease-in-out infinite;
    will-change: opacity;
  }

  @keyframes dotPulse {
    0%,
    100% {
      opacity: 0.3;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  /* prefers-reduced-motion: sin animaciones */
  @media (prefers-reduced-motion: reduce) {
    .skeleton-shimmer {
      animation: none;
      opacity: 0.04;
    }
    .skeleton-grid-line {
      animation: none;
      opacity: 0.6;
    }
    .skeleton-glass-silhouette {
      animation: none;
      opacity: 0.6;
    }
    .skeleton-dot {
      animation: none;
      opacity: 0.8;
      transform: scale(1);
    }
    .scene3d-canvas-wrap {
      animation: none;
      opacity: 1;
    }
  }
</style>
