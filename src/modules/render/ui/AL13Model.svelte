<script lang="ts">
  /**
   * AL13Model.svelte
   * @module render/ui
   *
   * Componente responsable de la ingesta y decodificación asíncrona
   * del modelo 3D GLTF usando compresión Draco.
   *
   * REFACTOR Epic 5.x: El mapping de materiales ya NO usa heurística débil de strings.
   * Ahora recibe `metalNodes: string[]` del CMS (Content Collections), que lista
   * exactamente qué substrings de nombre de malla pintaremos con el material metálico.
   * Cualquier malla cuyo nombre no aparezca en metalNodes recibirá el material de vidrio PBR.
   *
   * Se aísla del padre (Scene3DCanvas) para cumplir con el patrón <Suspense>
   * de Svelte/Threlte y delegar el estado de carga al Engine B2C.
   */
  import { GLTF, useDraco } from '@threlte/extras';
  import { MeshPhysicalMaterial, MeshStandardMaterial } from 'three';

  // ── Props — todas reactivas Svelte 5 Runes ─────────────────────────────────
  type Props = {
    glassType?: string;
    frameColor?: string;
    modelUrl?: string;
    metalNodes?: string[];
    [key: string]: unknown;
  };
  let {
    glassType = 'clear',
    frameColor = 'anodizado',
    modelUrl = '/models/aluminio_draco.glb',
    metalNodes = ['frame', 'perfil', 'marco', 'metal'],
    ...rest
  }: Props = $props();

  // ── Material Premium "Vidrio Arquitectónico AL13" ──────────────────────────
  const glassMaterial = $derived(
    new MeshPhysicalMaterial({
      transmission: 1.0,
      ior: glassType === 'clear' ? 1.52 : glassType === 'smoke' ? 1.6 : 1.45,
      roughness: glassType === 'frosted' ? 0.35 : 0.05,
      metalness: 0.1,
      color: glassType === 'clear' ? '#eef2f5' : glassType === 'smoke' ? '#1a1a1a' : '#dcdcdc',
      transparent: true,
      opacity: 1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    })
  );

  // ── Material "Aluminio Anodizado Mate" para perfiles ───────────────────────
  const metalMaterial = $derived(
    new MeshStandardMaterial({
      color:
        frameColor === 'anodizado' ? '#8f9296' : frameColor === 'black' ? '#111111' : '#b8860b',
      metalness: 0.85,
      roughness: 0.5,
    })
  );

  // ── Escena cargada desde el GLTF ──────────────────────────────────────────
  let sceneObject: any = $state(null);

  /**
   * isMetal: determina si una malla debe recibir el material metálico.
   * Usa la lista de metalNodes proveniente del CMS (Epic 5.x).
   * Esto reemplaza la heurística débil de `includes('frame')` con
   * un contrato explícito definido por contenido, no por código.
   */
  function isMetal(meshName: string): boolean {
    const nameLower = meshName.toLowerCase();
    return metalNodes.some((node) => nameLower.includes(node.toLowerCase()));
  }

  $effect(() => {
    // Traverse interception: asigna PBR logic dinámicamente al cargar o cambiar prop
    if (sceneObject) {
      sceneObject.traverse((child: any) => {
        if (child.isMesh) {
          child.material = isMetal(child.name || '') ? metalMaterial : glassMaterial;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  });

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
  
  REFACTOR Epic 5.x: url es dinámica (proviene del CMS), no hardcodeada.
-->
<GLTF
  url={modelUrl}
  dracoLoader={useDraco('https://www.gstatic.com/draco/v1/decoders/')}
  position={[0, -1, 0]}
  onload={handleSceneLoad}
  {...rest}
/>
