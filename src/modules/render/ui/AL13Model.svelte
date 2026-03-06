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

  // Props reactivas Svelte 5 (Inyectables desde arriba)
  let { glassType = 'clear', frameColor = 'anodizado', ...rest } = $props();

  // Material Premium "Vidrio Arquitectónico AL13"
  const glassMaterial = $derived(new MeshPhysicalMaterial({
    transmission: 1.0, 
    ior: glassType === 'clear' ? 1.52 : (glassType === 'smoke' ? 1.6 : 1.45), 
    roughness: glassType === 'frosted' ? 0.35 : 0.05, 
    metalness: 0.1, 
    color: glassType === 'clear' ? '#eef2f5' : (glassType === 'smoke' ? '#1a1a1a' : '#dcdcdc'),
    transparent: true,
    opacity: 1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  }));

  // Material "Aluminio Anodizado Mate" para perfiles
  const metalMaterial = $derived(new MeshStandardMaterial({
    color: frameColor === 'anodizado' ? '#8f9296' : (frameColor === 'black' ? '#111111' : '#b8860b'), 
    metalness: 0.85, 
    roughness: 0.5, 
  }));

  $effect(() => {
    // Traverse interception to assign PBR logic dynamically upon prop change
    if (sceneObject) {
      sceneObject.traverse((child: any) => {
        if (child.isMesh) {
          const name = (child.name || '').toLowerCase();

          if (
            name.includes('frame') ||
            name.includes('metal') ||
            name.includes('perfil') ||
            name.includes('marco')
          ) {
            child.material = metalMaterial;
          } else {
            child.material = glassMaterial;
          }

          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  });

  let sceneObject: any = $state(null);

  const handleSceneLoad = (e: any) => {
    if (e?.scene) {
        sceneObject = e.scene;
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
  {...rest}
/>
