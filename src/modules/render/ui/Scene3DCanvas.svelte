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
    <!-- Skeleton loader mientras hydrata -->
    <div class="scene3d-skeleton">
      <div class="skeleton-inner">
        <div
          class="w-8 h-8 rounded-full border-4 border-zinc-700 border-t-blue-400 animate-spin"
        ></div>
        <span class="text-xs font-semibold tracking-widest text-zinc-400 uppercase mt-3"
          >Cargando 3D...</span
        >
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

  .scene3d-skeleton {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(ellipse at center, #0a0a18 0%, #050508 80%);
  }

  .skeleton-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
