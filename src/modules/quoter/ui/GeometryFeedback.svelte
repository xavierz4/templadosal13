<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  // @ts-expect-error - Svelte parser crashes on import type due to a known conflict with verbatimModuleSyntax
  import { ProductType } from '@core/domain/physicsEngine';

  let { 
    width = 0, 
    height = 0,
    productType = 'puerta_pivotante',
    hasError = false,
    hasWarning = false
  } = $props();

  // Constantes del Canvas SVG (Espacio Escena)
  const CANVAS_SIZE = 400;
  const PADDING = 60;
  const MAX_DRAW_AREA = CANVAS_SIZE - (PADDING * 2);

  // Stores animados para fluidez (Framer-like physics)
  const animatedWidth = tweened(100, {
    duration: 600,
    easing: cubicOut
  });
  
  const animatedHeight = tweened(200, {
    duration: 600,
    easing: cubicOut
  });

  // Escalar los inputs físicos (mm) al ViewBox (SVG) proporcionalmente
  $effect(() => {
    // Evitar colapsos matemáticos si el input está incompleto
    const safeW = width > 0 ? width : 1000;
    const safeH = height > 0 ? height : 2100;

    const maxDim = Math.max(safeW, safeH);
    
    // El lado más largo dictamina la escala base
    const scaleFactor = MAX_DRAW_AREA / maxDim;

    animatedWidth.set(safeW * scaleFactor);
    animatedHeight.set(safeH * scaleFactor);
  });

  // Eje de coordenadas centradas en un pedestal inferior
  const rectX = $derived((CANVAS_SIZE / 2) - ($animatedWidth / 2));
  const rectY = $derived(CANVAS_SIZE - PADDING - $animatedHeight);

</script>

<div class="relative w-full aspect-square bg-[#050505] rounded-xl border border-white/10 shadow-inner overflow-hidden flex items-center justify-center group pointer-events-none">
  
  <!-- Rejilla Técnica B2B Background -->
  <div class="absolute inset-0 opacity-20 pointer-events-none" 
       style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 20px 20px;">
  </div>

  <svg 
    viewBox="0 0 {CANVAS_SIZE} {CANVAS_SIZE}" 
    class="w-full h-full p-4 relative z-10 drop-shadow-2xl"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <!-- Gradiente Cristal Templado B2B -->
      <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        {#if hasError}
          <stop offset="0%" stop-color="#FF3B30" stop-opacity="0.4" />
          <stop offset="50%" stop-color="#FF453A" stop-opacity="0.2" />
        {:else if hasWarning}
          <stop offset="0%" stop-color="#FF9500" stop-opacity="0.4" />
          <stop offset="50%" stop-color="#FF9F0A" stop-opacity="0.2" />
        {:else}
          <stop offset="0%" stop-color="#00F0FF" stop-opacity="0.3" />
          <stop offset="50%" stop-color="#00FFA3" stop-opacity="0.1" />
        {/if}
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.05" />
      </linearGradient>

      <!-- Patrón de Reflejo Diagonal -->
      <linearGradient id="flare" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="40%" stop-color="white" stop-opacity="0" />
        <stop offset="45%" stop-color="white" stop-opacity="0.4" />
        <stop offset="50%" stop-color="white" stop-opacity="0" />
      </linearGradient>
    </defs>

    <!-- Contexto Arquitectónico (Piso/Pedestal) -->
    <path 
      d="M {PADDING/2} {CANVAS_SIZE - PADDING} L {CANVAS_SIZE - PADDING/2} {CANVAS_SIZE - PADDING}" 
      stroke="#D4AF37" 
      stroke-width="2" 
      stroke-dasharray="4 4" 
      class="opacity-50"
    />
    <text x={CANVAS_SIZE/2} y={CANVAS_SIZE - PADDING + 20} fill="#666" font-size="12" text-anchor="middle" font-family="monospace">
      NIVEL 0.00
    </text>

    <!-- EL CRISTAL PARAMÉTRICO -->
    <g class="transform-origin-bottom">
      
      <!-- Panel de Vidrio -->
      <rect 
        x={rectX} 
        y={rectY} 
        width={$animatedWidth} 
        height={$animatedHeight} 
        rx="2"
        fill="url(#glassGradient)" 
        stroke={hasError ? '#FF3B30' : hasWarning ? '#FF9500' : '#00F0FF'}
        stroke-width={hasError ? '2.5' : '1.5'}
        class="transition-colors duration-500 {hasError ? '' : 'hover:stroke-[#00FFA3]'}"
      />
      
      <!-- Detalle de Canto Pulido (Glow/Flare interior) -->
      <rect 
        x={rectX} 
        y={rectY} 
        width={$animatedWidth} 
        height={$animatedHeight} 
        rx="2"
        fill="url(#flare)" 
        class="pointer-events-none"
      />

      <!-- PERFILERÍA DEFENSA (Según producto) -->
      {#if productType === 'cabina_ducha'}
        <!-- Rieles acero inoxidable ducha -->
        <rect x={rectX-2} y={rectY - 4} width={$animatedWidth+4} height="6" fill="#A0A0A0" />
      {:else if productType === 'fachada_monumental'}
        <!-- Arañas o perfil cortina perimetral -->
        <rect x={rectX - 4} y={rectY - 4} width={$animatedWidth + 8} height={$animatedHeight + 8} fill="none" stroke="#555" stroke-width="6" />
      {:else if productType === 'puerta_pivotante'}
        <!-- Bisagra Pivot Inferior y Superior -->
        <circle cx={rectX + 20} cy={rectY + 5} r="4" fill="#D4AF37" />
        <circle cx={rectX + 20} cy={rectY + $animatedHeight - 5} r="4" fill="#D4AF37" />
        <!-- Tirador / Manija -->
        <rect x={rectX + $animatedWidth - 15} y={rectY + ($animatedHeight/2) - 30} width="4" height="60" fill="#D4AF37" rx="2" />
      {/if}

    </g>

    <!-- COTAS Y GUÍAS DINÁMICAS (Dimensions) -->
    <g class="font-mono text-[10px]" fill="#00F0FF">
      <!-- Cota ANCHO (X) -->
      {#if width > 0}
      <path 
        d="M {rectX} {rectY - 15} L {rectX + $animatedWidth} {rectY - 15}" 
        stroke="#00F0FF" stroke-width="1" class="opacity-50"
      />
      <!-- Ticks -->
      <line x1={rectX} y1={rectY - 20} x2={rectX} y2={rectY - 10} stroke="#00F0FF" stroke-width="1" />
      <line x1={rectX + $animatedWidth} y1={rectY - 20} x2={rectX + $animatedWidth} y2={rectY - 10} stroke="#00F0FF" stroke-width="1" />
      
      <text x={CANVAS_SIZE/2} y={rectY - 25} text-anchor="middle" font-weight="bold">
        {width} mm
      </text>
      {/if}

      <!-- Cota ALTO (Y) -->
      {#if height > 0}
      <path 
        d="M {rectX + $animatedWidth + 15} {rectY} L {rectX + $animatedWidth + 15} {rectY + $animatedHeight}" 
        stroke="#00F0FF" stroke-width="1" class="opacity-50"
      />
      <!-- Ticks -->
      <line x1={rectX + $animatedWidth + 10} y1={rectY} x2={rectX + $animatedWidth + 20} y2={rectY} stroke="#00F0FF" stroke-width="1" />
      <line x1={rectX + $animatedWidth + 10} y1={rectY + $animatedHeight} x2={rectX + $animatedWidth + 20} y2={rectY + $animatedHeight} stroke="#00F0FF" stroke-width="1" />
      
      <text 
        x={rectX + $animatedWidth + 25} 
        y={rectY + ($animatedHeight/2)} 
        text-anchor="middle" 
        font-weight="bold" 
        transform="rotate(-90 {rectX + $animatedWidth + 25} {rectY + ($animatedHeight/2)})"
      >
        {height} mm
      </text>
      {/if}
    </g>

  </svg>

  <!-- Decoración HUD B2B Overlay -->
  <div class="absolute top-4 left-4 flex gap-2 items-center z-20">
    {#if hasError}
      <div class="w-2 h-2 rounded-full bg-[#FF3B30] animate-pulse shadow-[0_0_10px_#FF3B30]"></div>
      <span class="text-xs font-mono text-[#FF3B30] font-bold uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded border border-[#FF3B30]/30 backdrop-blur-sm">NSR-10 FAILED</span>
    {:else if hasWarning}
      <div class="w-2 h-2 rounded-full bg-[#FF9500] shadow-[0_0_10px_#FF9500]"></div>
      <span class="text-xs font-mono text-[#FF9500] uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded border border-[#FF9500]/30 backdrop-blur-sm">NSR-10 WARNING</span>
    {:else}
      <div class="w-2 h-2 rounded-full bg-al13-cyan animate-pulse shadow-[0_0_10px_#00F0FF]"></div>
      <span class="text-xs font-mono text-al13-cyan uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded border border-al13-cyan/20 backdrop-blur-sm">Live Geometry</span>
    {/if}
  </div>
</div>
