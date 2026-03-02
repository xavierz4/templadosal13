<script lang="ts">
  /**
   * Scene3DCanvas.svelte
   * @module render/ui
   *
   * Canvas maestro para el motor 3D Threlte (Epic 5 — Task 5.1.1).
   * Responsabilidades:
   *  1. Detectar soporte WebGL antes de montar el contexto Three.js.
   *  2. Renderizar un placeholder (BoxGeometry) para validar el pipeline 3D.
   *  3. Degradar gracefully a un fallback 2D si el dispositivo no soporta WebGL.
   *
   * REGLA 4: Presentación pura. Sin fetch(), sin SDKs externos, sin lógica de negocio.
   * REGLA 0: Imports usan alias @modules/* o rutas relativas dentro del módulo.
   */
  import { Canvas, T } from '@threlte/core';
  import { Suspense, HTML, Environment, OrbitControls } from '@threlte/extras';
  import { onMount } from 'svelte';
  import AL13Model from './AL13Model.svelte';

  // ── Props ──────────────────────────────────────────────────────────────────
  /** @type {{ width?: number, height?: number, class?: string, fallbackImageSrc?: string, fallbackImageAlt?: string }} */
  let props = $props();

  // ── Estado Svelte 5 Runes ──────────────────────────────────────────────────
  let isMounted = $state(false);
  let webglSupported = $state(false);

  /**
   * Detecta soporte WebGL v2 (preferido) o WebGL v1.
   * Se ejecuta en onMount para asegurar que corremos en el cliente (CSR island).
   * Adelanto de Task 5.4.1 — WebGL capability guard.
   * @returns {boolean}
   */
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
      console.warn('[Scene3DCanvas] WebGL no disponible — mostrando fallback 2D. (Task 5.4.2)');
    }
  });

  // Estilo de contenedor responsivo
  const containerStyle = $derived(
    props.width
      ? `width:${props.width}px; height:${props.height ?? 500}px;`
      : `width:100%; height:${props.height ?? 500}px;`
  );
</script>

<!--
  Contenedor principal.
  z-index gestionado por el padre (la isla Astro que lo consuma).
-->
<div
  class="scene3d-container {props.class ?? ''}"
  style={containerStyle}
  role="img"
  aria-label={props.fallbackImageAlt ?? 'Vidrio templado Templados AL13 — vista 3D'}
>
  {#if isMounted && webglSupported}
    <!--
      Canvas Threlte (Task 5.1.1 scaffold).
      Escena mínima de validación: luz ambiental + luz direccional + cubo placeholder.
      Task 5.2.x reemplazará el BoxGeometry con el modelo .glb de cabina/fachada.
    -->
    <Canvas>
      <!-- Iluminación base y Entorno HDRI (necesario para la refracción del cristal PBR) -->
      <T.AmbientLight intensity={0.6} />
      <T.DirectionalLight position={[5, 10, 7]} intensity={1.2} castShadow />
      <Environment
        url="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/royal_esplanade_1k.hdr"
      />

      <!--
        Carga asíncrona del modelo 3D B2C (Draco).
        La prop 'fallback' inyecta un HTML Overlay en el canvas 
        sin detener el hilo principal de Svelte SRE.
      -->
      <Suspense>
        {#snippet fallback()}
          <HTML position={[0, 0, 0]} center>
            <div class="flex flex-col items-center gap-3">
              <div
                class="w-8 h-8 rounded-full border-4 border-zinc-700 border-t-amber-500 animate-spin"
              ></div>
              <span class="text-xs font-semibold tracking-widest text-zinc-300 uppercase"
                >Cargando 3D...</span
              >
            </div>
          </HTML>
        {/snippet}
        <AL13Model />
      </Suspense>

      <!-- Cámara perspectiva estándar y Coreografía Orbital B2B -->
      <T.PerspectiveCamera makeDefault position={[5, 2, 5]} fov={45}>
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          autoRotate={true}
          autoRotateSpeed={0.5}
          enableZoom={true}
          minDistance={3}
          maxDistance={15}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
        />
      </T.PerspectiveCamera>
    </Canvas>
  {:else}
    <!--
      Fallback 2D — Tarea 5.4.2 SRE Degradation.
      Se muestra en dispositivos sin WebGL (iOS antiguo, navegadores headless, etc.)
    -->
    <img
      src={props.fallbackImageSrc ?? '/images/vidrio-templado-3d-fallback.jpg'}
      alt={props.fallbackImageAlt ?? 'Vidrio templado Templados AL13 — vista 3D'}
      class="scene3d-fallback"
      loading="lazy"
      decoding="async"
    />
  {/if}
</div>

<style>
  .scene3d-container {
    position: relative;
    overflow: hidden;
    border-radius: 0.75rem;
  }

  /* El canvas de Threlte ocupa el 100% del contenedor automáticamente */
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
</style>
