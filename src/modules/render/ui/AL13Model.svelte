<script lang="ts">
  /**
   * AL13Model.svelte
   * @module render/ui
   *
   * Componente responsable de la ingesta y decodificación asíncrona
   * del modelo 3D GLTF usando compresión Draco.
   *
   * Se aísla del padre (Scene3DCanvas) para cumplir con el patrón <Suspense>
   * de Svelte/Threlte y delegar el estado de carga al Engine B2C.
   */
  import { GLTF, useDraco } from '@threlte/extras';
  import { MeshPhysicalMaterial, MeshStandardMaterial } from 'three';

  let props = $props();

  // Material Premium "Vidrio Arquitectónico AL13"
  const glassMaterial = new MeshPhysicalMaterial({
    transmission: 1.0, // Transparencia física completa
    ior: 1.52, // Índice de refracción del vidrio
    roughness: 0.05, // Superficie ultra pulida
    metalness: 0.1, // Ligero reflejo estructural
    color: '#eef2f5', // Tinte icy sutil
    transparent: true,
    opacity: 1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  // Material "Aluminio Anodizado Mate" para perfiles
  const metalMaterial = new MeshStandardMaterial({
    color: '#1f1f1f', // Gris espacial / Negro mate AL13
    metalness: 0.85, // Material altamente metálico
    roughness: 0.5, // Acabado mate, difumina los reflejos
  });

  /** @param {any} e */
  const handleSceneLoad = (e) => {
    // Traverse interception to assign PBR logic dynamically
    if (e?.scene) {
      /** @param {any} child */
      e.scene.traverse((child) => {
        if (child.isMesh) {
          const name = (child.name || '').toLowerCase();

          // Lógica Semántica B2B: Busca llaves de perfilería metálica
          if (
            name.includes('frame') ||
            name.includes('metal') ||
            name.includes('perfil') ||
            name.includes('marco')
          ) {
            child.material = metalMaterial;
          } else {
            // Default: Aplicamos Vidrio al resto (Incluyendo el Box temporal)
            child.material = glassMaterial;
          }

          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  };
</script>

<!--
  Instancia nativa optimizada de threlte/extras.
  useDraco descarga asincrónicamente los decoders Wasm desde gstatic CDN (Google)
  solo en runtime, limitando significativamente el bundle.
-->
<GLTF
  url="/models/aluminio_draco.glb"
  dracoLoader={useDraco('https://www.gstatic.com/draco/v1/decoders/')}
  position={[0, -1, 0]}
  onload={handleSceneLoad}
  {...props}
/>
