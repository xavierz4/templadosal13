<script lang="ts">
  /**
   * ProceduralScene.svelte
   * @module render/ui
   *
   * Motor 3D Procedural Premium para el Catálogo Interactivo AL13.
   * Genera geometría Three.js nativa específica para cada tipo de sistema
   * sin depender de archivos .glb — totalmente portátil y sin latencia de carga.
   *
   * Cada tipo de producto tiene su escena arquitectónica única.
   *
   * REGLA 4: Solo lógica de presentación 3D. Sin fetch() ni lógica de negocio.
   */
  import { T } from '@threlte/core';
  import { MeshPhysicalMaterial, MeshStandardMaterial } from 'three';

  type Props = {
    productType: string;
    glassType?: string;
    frameColor?: string;
  };

  let {
    productType = 'divisor_oficina',
    glassType = 'clear',
    frameColor = 'anodizado',
  }: Props = $props();

  // ── Materiales PBR Reactivos ──────────────────────────────────────────────

  const glassMaterial = $derived(
    new MeshPhysicalMaterial({
      transmission: 1.0,
      ior: glassType === 'clear' ? 1.52 : glassType === 'smoke' ? 1.6 : 1.45,
      roughness: glassType === 'frosted' ? 0.32 : 0.04,
      metalness: 0.0,
      color: glassType === 'clear' ? '#ddeeff' : glassType === 'smoke' ? '#222222' : '#cccccc',
      transparent: true,
      opacity: 0.92,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.95,
      thickness: 0.6,
    })
  );

  const frameMaterial = $derived(
    new MeshStandardMaterial({
      color:
        frameColor === 'anodizado' ? '#909497' : frameColor === 'black' ? '#0a0a0a' : '#b5860a',
      metalness: 0.92,
      roughness: 0.28,
      envMapIntensity: 1.2,
    })
  );
</script>

{#if productType === 'divisor_oficina'}
  <!-- ──────── División de Oficina: Muro de cristal con grid de perfiles ──────── -->
  <T.Group position={[0, 0, 0]}>
    <!-- Panel principal de vidrio (ancho 2.4m, alto 2.8m) -->
    <T.Mesh material={glassMaterial}>
      <T.BoxGeometry args={[2.4, 2.8, 0.01]} />
    </T.Mesh>
    <!-- Perfil vertical izquierdo -->
    <T.Mesh material={frameMaterial} position={[-1.21, 0, 0]}>
      <T.BoxGeometry args={[0.05, 2.9, 0.06]} />
    </T.Mesh>
    <!-- Perfil vertical derecho -->
    <T.Mesh material={frameMaterial} position={[1.21, 0, 0]}>
      <T.BoxGeometry args={[0.05, 2.9, 0.06]} />
    </T.Mesh>
    <!-- Perfil horizontal superior -->
    <T.Mesh material={frameMaterial} position={[0, 1.43, 0]}>
      <T.BoxGeometry args={[2.5, 0.05, 0.06]} />
    </T.Mesh>
    <!-- Perfil horizontal inferior -->
    <T.Mesh material={frameMaterial} position={[0, -1.43, 0]}>
      <T.BoxGeometry args={[2.5, 0.05, 0.06]} />
    </T.Mesh>
    <!-- Tirador lateral (herraje) -->
    <T.Mesh material={frameMaterial} position={[1.1, 0, 0.06]}>
      <T.CylinderGeometry args={[0.018, 0.018, 0.55, 16]} />
    </T.Mesh>
    <!-- Detalle: montante central vertical -->
    <T.Mesh material={frameMaterial} position={[0, 0, 0]}>
      <T.BoxGeometry args={[0.035, 2.8, 0.055]} />
    </T.Mesh>
  </T.Group>
{:else if productType === 'cabina_ducha'}
  <!-- ──────── Cabina de Ducha: Dos paneles en L con bisagra frontal ──────── -->
  <T.Group position={[0, 0.1, 0]}>
    <!-- Panel lateral izquierdo fijo -->
    <T.Mesh material={glassMaterial} position={[-0.7, 0, -0.5]} rotation={[0, Math.PI / 2, 0]}>
      <T.BoxGeometry args={[1.0, 2.1, 0.01]} />
    </T.Mesh>
    <!-- Panel frontal puerta -->
    <T.Mesh material={glassMaterial} position={[0, 0, 0]}>
      <T.BoxGeometry args={[0.85, 2.1, 0.01]} />
    </T.Mesh>
    <!-- Perfil de techo L -->
    <T.Mesh material={frameMaterial} position={[-0.35, 1.06, -0.25]}>
      <T.BoxGeometry args={[0.7, 0.04, 1.0]} />
    </T.Mesh>
    <!-- Perfil de piso L -->
    <T.Mesh material={frameMaterial} position={[-0.35, -1.06, -0.25]}>
      <T.BoxGeometry args={[0.7, 0.04, 1.0]} />
    </T.Mesh>
    <!-- Perfil vertical derecho (puerta) -->
    <T.Mesh material={frameMaterial} position={[0.43, 0, 0]}>
      <T.BoxGeometry args={[0.04, 2.1, 0.065]} />
    </T.Mesh>
    <!-- Perfil vertical izquierdo (unión) -->
    <T.Mesh material={frameMaterial} position={[-0.7, 0, -0.01]} rotation={[0, Math.PI / 2, 0]}>
      <T.BoxGeometry args={[1.0, 2.1, 0.04]} />
    </T.Mesh>
    <!-- Tirador asa horizontal -->
    <T.Mesh material={frameMaterial} position={[0.3, 0, 0.1]} rotation={[0, 0, Math.PI / 2]}>
      <T.CylinderGeometry args={[0.016, 0.016, 0.35, 16]} />
    </T.Mesh>
  </T.Group>
{:else if productType === 'fachada_monumental'}
  <!-- ──────── Fachada Monumental: Grid curtain wall 3x2 paneles ──────── -->
  <T.Group position={[0, 0, 0]}>
    <!-- 6 paneles de vidrio en grid 3 cols × 2 filas -->
    {#each [-1.1, 0, 1.1] as x}
      {#each [0.8, -0.8] as y}
        <T.Mesh material={glassMaterial} position={[x, y, 0]}>
          <T.BoxGeometry args={[0.96, 1.38, 0.012]} />
        </T.Mesh>
      {/each}
    {/each}
    <!-- Montantes verticales (mullions) -->
    {#each [-1.58, -0.55, 0.55, 1.58] as x}
      <T.Mesh material={frameMaterial} position={[x, 0, 0]}>
        <T.BoxGeometry args={[0.04, 3.6, 0.08]} />
      </T.Mesh>
    {/each}
    <!-- Travesaños horizontales (transoms) -->
    {#each [1.64, 0, -1.64] as y}
      <T.Mesh material={frameMaterial} position={[0, y, 0]}>
        <T.BoxGeometry args={[3.62, 0.04, 0.07]} />
      </T.Mesh>
    {/each}
  </T.Group>
{:else if productType === 'puerta_pivotante'}
  <!-- ──────── Puerta Pivotante: Full-glass con hardware de eje central ──────── -->
  <T.Group position={[0, 0, 0]}>
    <!-- Hoja principal de cristal full-glass -->
    <T.Mesh material={glassMaterial} position={[0, 0, 0]}>
      <T.BoxGeometry args={[1.1, 2.9, 0.012]} />
    </T.Mesh>
    <!-- Pivote superior (bisagra) -->
    <T.Mesh material={frameMaterial} position={[0, 1.5, 0]}>
      <T.CylinderGeometry args={[0.04, 0.04, 0.12, 20]} />
    </T.Mesh>
    <!-- Pivote inferior (bisagra) -->
    <T.Mesh material={frameMaterial} position={[0, -1.5, 0]}>
      <T.CylinderGeometry args={[0.04, 0.04, 0.12, 20]} />
    </T.Mesh>
    <!-- Tirador vertical largo (handle) ambos lados -->
    <T.Mesh material={frameMaterial} position={[0.35, 0.15, 0.08]}>
      <T.CylinderGeometry args={[0.022, 0.022, 0.9, 16]} />
    </T.Mesh>
    <T.Mesh material={frameMaterial} position={[-0.35, 0.15, -0.08]}>
      <T.CylinderGeometry args={[0.022, 0.022, 0.9, 16]} />
    </T.Mesh>
    <!-- Marco de jamba izquierda en pared -->
    <T.Mesh material={frameMaterial} position={[-0.61, 0, -0.04]}>
      <T.BoxGeometry args={[0.06, 3.1, 0.12]} />
    </T.Mesh>
    <!-- Marco de jamba derecha en pared -->
    <T.Mesh material={frameMaterial} position={[0.61, 0, -0.04]}>
      <T.BoxGeometry args={[0.06, 3.1, 0.12]} />
    </T.Mesh>
  </T.Group>
{:else}
  <!-- Fallback genérico — single glass panel -->
  <T.Mesh material={glassMaterial}>
    <T.BoxGeometry args={[1.8, 2.5, 0.01]} />
  </T.Mesh>
{/if}
