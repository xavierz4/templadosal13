<script lang="ts">
  /**
   * CatalogInteractiveViewer.svelte
   * @module render/ui
   *
   * Isla Reactiva (Svelte 5) que orquesta la configuración del Gemelo Digital 3D.
   * Contiene los selectores B2C (Vidrio y Perfil) y encapsula a Scene3DCanvas
   * para re-transmitir el estado al motor.
   */
  import Scene3DCanvas from './Scene3DCanvas.svelte';

  // ── Runes: Estado Local ────────────────────────────────────────────────────
  let glassType = $state('clear'); // clear | smoke | frosted
  let frameColor = $state('anodizado'); // anodizado | black | gold
</script>

<div class="relative w-full h-full">
  <!-- 3D Engine Instance -->
  <Scene3DCanvas class="w-full h-full" {glassType} {frameColor} fallbackImageSrc="/hero_placeholder.jpg" fallbackImageAlt="Vidrio 3D" width={undefined} height={undefined} />

  <!-- Overlay de Controles (Zero-UI Glassmorphism) -->
  <div class="absolute top-6 right-6 flex flex-col gap-4 z-40">
    
    <!-- Config Vidrio -->
    <div class="bg-[#0A0A0A]/60 backdrop-blur-md rounded-2xl border border-white/5 p-3 flex flex-col gap-2 pointer-events-auto">
      <span class="text-[10px] text-zinc-400 font-bold tracking-widest uppercase ml-1">Cristal PBR</span>
      <div class="flex bg-black/40 p-1 rounded-xl">
        <button 
          onclick={() => glassType = 'clear'}
          class="px-4 py-2 rounded-lg text-xs font-medium transition-all {glassType === 'clear' ? 'bg-white text-black shadow-md' : 'text-zinc-400 hover:text-white'}"
        >
          Extraclaro
        </button>
        <button 
          onclick={() => glassType = 'smoke'}
          class="px-4 py-2 rounded-lg text-xs font-medium transition-all {glassType === 'smoke' ? 'bg-white text-black shadow-md' : 'text-zinc-400 hover:text-white'}"
        >
          Gris Humo
        </button>
        <button 
          onclick={() => glassType = 'frosted'}
          class="px-4 py-2 rounded-lg text-xs font-medium transition-all {glassType === 'frosted' ? 'bg-white text-black shadow-md' : 'text-zinc-400 hover:text-white'}"
        >
          Esmerilado
        </button>
      </div>
    </div>

    <!-- Config Perfiles -->
    <div class="bg-[#0A0A0A]/60 backdrop-blur-md rounded-2xl border border-white/5 p-3 flex flex-col gap-2 pointer-events-auto">
      <span class="text-[10px] text-zinc-400 font-bold tracking-widest uppercase ml-1">Perfíleria (Anodizados)</span>
      <div class="flex gap-2">
        <!-- Plata -->
        <button 
          onclick={() => frameColor = 'anodizado'}
          aria-label="Plata Anodizado"
          class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 {frameColor === 'anodizado' ? 'border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.4)]' : 'border-transparent'}"
        >
          <div class="w-full h-full rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500"></div>
        </button>
        
        <!-- Negro -->
        <button 
          onclick={() => frameColor = 'black'}
          aria-label="Negro Mate"
          class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 {frameColor === 'black' ? 'border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.4)]' : 'border-transparent'}"
        >
          <div class="w-full h-full rounded-full bg-gradient-to-br from-zinc-700 to-zinc-950"></div>
        </button>
        
        <!-- Bronce/Oro -->
        <button 
          onclick={() => frameColor = 'gold'}
          aria-label="Bronce Arquitectónico"
          class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 {frameColor === 'gold' ? 'border-amber-400 scale-110 shadow-[0_0_12px_rgba(251,191,36,0.4)]' : 'border-transparent'}"
        >
          <div class="w-full h-full rounded-full bg-gradient-to-br from-amber-600 to-amber-900"></div>
        </button>
      </div>
    </div>
  </div>
</div>
