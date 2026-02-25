<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import { validateStructuralFeasibility, type PhysicsResult, type ProductType } from '../../../lib/physicsEngine';
  
  // State Machine (Svelte 5 Runes)
  let currentStep = $state(1);

  // Payload a recopilar
  let quoteData = $state({
    productType: '' as ProductType, // 'cabina_ducha', 'divisor_oficina', 'fachada_monumental', 'puerta_pivotante'
    width: '',
    height: '',
    glassColor: '',
    aluminumColor: '',
    // Lead Form
    contactName: '',
    companyName: '',
    phone: ''
  });

  // Resultado del Engine
  let physicsFeedback = $state<PhysicsResult | null>(null);

  const steps = [
    { title: "Aplicación Arquitectónica", desc: "Elige el sistema de vidrio y aluminio a cotizar." },
    { title: "Dimensiones", desc: "Ingresa el milimetraje exacto del vano." },
    { title: "Acabados Boutique", desc: "Tonos del cristal y anodizado del metal." },
    { title: "Viabilidad y Análisis", desc: "Contacto comercial B2B." }
  ];

  // Opciones de Producto B2B
  const products = [
    { id: 'cabina_ducha', label: 'Cabina de Ducha (Premium)', icon: '🚿' },
    { id: 'divisor_oficina', label: 'División de Oficina (Acústico)', icon: '🏢' },
    { id: 'fachada_monumental', label: 'Fachada Monumental', icon: '🏛️' },
    { id: 'puerta_pivotante', label: 'Puerta Pivotante Frontal', icon: '🚪' }
  ];

  function nextStep() {
    if (currentStep < 4) currentStep++;
  }

  function prevStep() {
    if (currentStep > 1) currentStep--;
  }

  function runPhysicsEngine() {
    // Cast strict a Number para la física
    physicsFeedback = validateStructuralFeasibility({
      width: Number(quoteData.width),
      height: Number(quoteData.height),
      productType: quoteData.productType
    });
    nextStep(); // Ir al paso 4
  }

  let isSubmitting = $state(false);
  let submitSuccess = $state(false);

  async function submitLead() {
    isSubmitting = true;
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Server error');
      }
      
      console.log("Lead B2B Capturado Exitosamente:", result);
      submitSuccess = true;
    } catch (err: any) {
      console.error("Error al enviar Lead:", err.message);
      // Aqui podrías mostrar un toast de error en el UI
    } finally {
      isSubmitting = false;
    }
  }

  function selectProduct(id: string) {
    quoteData.productType = id as ProductType;
    setTimeout(nextStep, 300); // Flow automático suave
  }
</script>

<div class="w-full max-w-4xl mx-auto py-12 px-6">
  <!-- Header del State Machine -->
  <div class="mb-12 text-center">
    <h2 class="text-3xl font-heading font-bold text-white mb-2 tracking-tight">
      Validador Técnico
    </h2>
    <p class="text-zinc-400 font-light">
      Cálculo de Viabilidad Geométrica AL13
    </p>
  </div>

  <!-- Progress Bar B2B -->
  <div class="flex items-center justify-between mb-12 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-[1px] before:w-full before:bg-white/10 before:-z-10">
    {#each steps as step, i}
      <div class="flex flex-col items-center gap-3 relative">
        <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500
          {currentStep >= i + 1 
            ? 'bg-gradient-to-br from-al13-gold to-yellow-600 text-al13-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
            : 'bg-[#111] text-zinc-500 border border-white/10'}"
        >
          {i + 1}
        </div>
        <span class="text-xs font-semibold tracking-wider uppercase {currentStep >= i + 1 ? 'text-white' : 'text-zinc-500'} absolute -bottom-6 w-32 text-center">
          {step.title}
        </span>
      </div>
    {/each}
  </div>

  <!-- Contenedor Principal (Glassmorphism) -->
  <div class="relative bg-white/5 backdrop-blur-[16px] border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)] min-h-[400px]">
    
    <!-- PASO 1: TIPO DE PRODUCTO -->
    {#if currentStep === 1}
      <div in:fade={{duration: 400, delay: 100}} out:fade={{duration: 200}} class="space-y-6">
        <div class="text-center mb-10">
          <h3 class="text-2xl font-bold text-white mb-2">{steps[0].title}</h3>
          <p class="text-zinc-400 font-light">{steps[0].desc}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each products as product}
            <button 
              onclick={() => selectProduct(product.id)}
              class="group relative flex items-center p-6 border rounded-xl text-left transition-all duration-300
                {quoteData.productType === product.id 
                  ? 'bg-white/10 border-al13-gold' 
                  : 'bg-black/20 border-white/5 hover:bg-white/5 hover:border-white/20'}"
            >
              <span class="text-3xl mr-4 grayscale group-hover:grayscale-0 transition-all">{product.icon}</span>
              <span class="text-lg font-semibold text-zinc-200 group-hover:text-white transition-colors">{product.label}</span>
            </button>
          {/each}
        </div>
      </div>
    {/if}

    <!-- PASO 2: DIMENSIONES GEOMÉTRICAS -->
    {#if currentStep === 2}
      <div in:fade={{duration: 400, delay: 100}} out:fade={{duration: 200}} class="space-y-8">
         <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-white mb-2">{steps[1].title}</h3>
          <p class="text-zinc-400 font-light">{steps[1].desc} (Mm)</p>
        </div>
        
        <div class="flex flex-col md:flex-row items-center justify-center gap-8 max-w-2xl mx-auto">
          <!-- Input Ancho -->
          <div class="w-full">
            <label class="block text-sm font-semibold text-zinc-300 mb-2" for="width-input">Ancho del Vano (mm)</label>
            <div class="relative">
              <input 
                id="width-input"
                type="number" 
                bind:value={quoteData.width}
                placeholder="Ej. 1200" 
                class="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-al13-gold focus:ring-1 focus:ring-al13-gold transition-all"
              />
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-sm">mm</span>
            </div>
          </div>

          <!-- Cruz Separadora -->
          <div class="hidden md:flex text-al13-gold font-bold mt-6">X</div>

          <!-- Input Alto -->
          <div class="w-full">
            <label class="block text-sm font-semibold text-zinc-300 mb-2" for="height-input">Alto Libre (mm)</label>
            <div class="relative">
              <input 
                id="height-input"
                type="number" 
                bind:value={quoteData.height}
                placeholder="Ej. 2100" 
                class="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-al13-gold focus:ring-1 focus:ring-al13-gold transition-all"
              />
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-sm">mm</span>
            </div>
          </div>
        </div>

        <div class="mt-8 flex gap-4 justify-center">
          <button onclick={prevStep} class="px-6 py-2 rounded border border-white/20 text-zinc-400 hover:text-white transition">Atrás</button>
          <button 
            onclick={nextStep} 
            disabled={!quoteData.width || !quoteData.height}
            class="px-6 py-2 rounded bg-al13-gold text-black font-bold hover:bg-yellow-500 transition shadow-[0_0_10px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Continuar
          </button>
        </div>
      </div>
    {/if}
    
    <!-- PASO 3: ACABADOS BOUTIQUE -->
    {#if currentStep === 3}
      <div in:fade={{duration: 400, delay: 100}} out:fade={{duration: 200}} class="space-y-8">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-white mb-2">{steps[2].title}</h3>
          <p class="text-zinc-400 font-light">{steps[2].desc}</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {#each ['Incoloro Extra-Claro', 'Gris Humo', 'Bronce Espejo', 'Esmerilado Privacy'] as color}
            <button 
              onclick={() => quoteData.glassColor = color}
              class="flex flex-col items-center p-4 border rounded-xl transition-all duration-300
                {quoteData.glassColor === color 
                  ? 'bg-white/10 border-al13-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                  : 'bg-black/20 border-white/5 hover:border-white/20'}"
            >
              <div class="w-12 h-12 rounded-full mb-3 border border-white/10 shadow-inner
                {color === 'Incoloro Extra-Claro' ? 'bg-white/10 backdrop-blur-md' : ''}
                {color === 'Gris Humo' ? 'bg-[#2A2A2A] backdrop-blur-md' : ''}
                {color === 'Bronce Espejo' ? 'bg-gradient-to-br from-[#8C6239] to-[#4A2E12]' : ''}
                {color === 'Esmerilado Privacy' ? 'bg-white/30 backdrop-blur-xl' : ''}
              "></div>
              <span class="text-xs text-center font-semibold text-zinc-300">{color}</span>
            </button>
          {/each}
        </div>

        <div class="mt-8 flex gap-4 justify-center">
          <button onclick={prevStep} class="px-6 py-2 rounded border border-white/20 text-zinc-400 hover:text-white transition">Atrás</button>
          <button 
            onclick={runPhysicsEngine} 
            disabled={!quoteData.glassColor}
            class="px-6 py-2 rounded bg-al13-gold text-black font-bold hover:bg-yellow-500 transition shadow-[0_0_10px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Obtener Diagnóstico Físico
          </button>
        </div>
      </div>
    {/if}

    <!-- PASO 4: FORMULARIO B2B / ANÁLISIS ESTRUCTURAL EXPERTO -->
    {#if currentStep === 4}
      <div in:fade={{duration: 400, delay: 100}} out:fade={{duration: 200}} class="flex flex-col items-center justify-center min-h-[400px]">
        
        {#if physicsFeedback && !physicsFeedback.isValid}
          <!-- ESTADO RECHAZADO: Imposible Fabricar -->
          <div class="text-center w-full max-w-lg mb-8 p-6 bg-red-500/10 border border-red-500/50 rounded-xl">
             <div class="w-16 h-16 mx-auto bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-4 text-3xl">⚠️</div>
             <h3 class="text-2xl font-bold text-red-400 mb-2">Proyecto Inviable</h3>
             <p class="text-white font-light mb-4">{physicsFeedback.explanation}</p>
             <p class="text-sm font-mono text-zinc-400">Dimensión ingresada: {quoteData.width}x{quoteData.height}mm excede la matriz productiva (Jumbo).</p>
          </div>
          <div class="mt-8 flex gap-4">
            <button onclick={() => { currentStep = 2; }} class="px-6 py-2 rounded border border-white/20 text-zinc-400 hover:text-white transition">Ajustar Medidas (Volver)</button>
          </div>

        {:else if physicsFeedback && physicsFeedback.isValid}
          <!-- ESTADO ACEPTADO CONDICIONADO -->
          <div class="w-full max-w-2xl bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <!-- Cabecera Diagnóstico -->
            <div class="bg-gradient-to-r from-al13-gold/20 to-transparent p-6 border-b border-al13-gold/30 flex justify-between items-start">
              <div>
                <h3 class="text-xl font-bold text-al13-gold mb-1">Diagnóstico AL13 Completado</h3>
                <p class="text-zinc-300 text-sm">Validación matemática y estructural aprobada.</p>
              </div>
              <div class="text-right">
                <span class="block text-xs uppercase text-zinc-500 tracking-wider">Espesor Exigido</span>
                <span class="text-3xl font-heading font-bold text-white">{physicsFeedback.recommendedThickness}<span class="text-lg text-al13-gold">mm</span></span>
              </div>
            </div>

            <!-- Cuerpo del Diagnóstico -->
            <div class="p-6 space-y-6">
               <div class="grid grid-cols-2 gap-4 text-sm">
                 <div class="bg-white/5 p-4 rounded-lg border border-white/5">
                   <span class="block text-zinc-500 mb-1">Vano Libre</span>
                   <span class="text-white font-mono">{quoteData.width} x {quoteData.height} mm</span>
                 </div>
                 <div class="bg-white/5 p-4 rounded-lg border border-white/5">
                   <span class="block text-zinc-500 mb-1">Impacto Visual</span>
                   <span class="text-white font-mono">{quoteData.glassColor}</span>
                 </div>
               </div>

               {#if physicsFeedback.warnings.length > 0}
                 <div class="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                   <span class="text-yellow-500 font-bold mb-1 flex items-center gap-2"><span>🛡️</span> Carga Estructural Detectada </span>
                   <ul class="list-disc pl-5 text-zinc-300 text-sm mt-2">
                     {#each physicsFeedback.warnings as warning}
                       <li>{warning}</li>
                     {/each}
                   </ul>
                 </div>
               {/if}
               
               <p class="text-zinc-400 font-light text-sm italic border-t border-white/10 pt-4">
                 "{physicsFeedback.explanation}"
               </p>

               <!-- Lead Form Call to Action -->
               <div class="mt-8 p-6 bg-gradient-to-br from-al13-gold/10 to-[#111] rounded-xl border border-al13-gold/30 text-center">
                 {#if submitSuccess}
                   <div in:fade class="py-4">
                     <div class="w-16 h-16 mx-auto bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 text-3xl">✓</div>
                     <h4 class="text-white font-bold text-xl mb-2">Solicitud Recibida</h4>
                     <p class="text-zinc-400 text-sm">Nuestro equipo de ingeniería revisará los cálculos y contactará a {quoteData.contactName || 'su empresa'} en la brevedad.</p>
                   </div>
                 {:else}
                   <h4 class="text-white font-bold mb-4">Solicita la cotización oficial</h4>
                   
                   <form class="space-y-4 text-left max-w-sm mx-auto mb-6" onsubmit={(e) => { e.preventDefault(); submitLead(); }}>
                     <div>
                       <label class="block text-xs font-semibold text-zinc-400 mb-1" for="name">Nombre Completo *</label>
                       <input bind:value={quoteData.contactName} required type="text" id="name" class="w-full bg-[#0A0A0A]/50 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-al13-gold focus:ring-1 focus:ring-al13-gold" placeholder="Ej. Arquitecto Juan Pérez" />
                     </div>
                     <div>
                       <label class="block text-xs font-semibold text-zinc-400 mb-1" for="company">Empresa / Firma</label>
                       <input bind:value={quoteData.companyName} type="text" id="company" class="w-full bg-[#0A0A0A]/50 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-al13-gold focus:ring-1 focus:ring-al13-gold" placeholder="Opcional" />
                     </div>
                     <div>
                       <label class="block text-xs font-semibold text-zinc-400 mb-1" for="phone">Teléfono de Contacto *</label>
                       <input bind:value={quoteData.phone} required type="tel" id="phone" class="w-full bg-[#0A0A0A]/50 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-al13-gold focus:ring-1 focus:ring-al13-gold" placeholder="Ej. 300 123 4567" />
                     </div>
                     <button type="submit" disabled={isSubmitting || !quoteData.contactName || !quoteData.phone} class="w-full mt-4 py-3 rounded bg-al13-gold text-black font-bold hover:bg-yellow-500 transition shadow-[0_0_15px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center">
                       {#if isSubmitting}
                         <span class="animate-spin h-5 w-5 mr-2 border-2 border-black border-t-transparent rounded-full"></span> Procesando...
                       {:else}
                         Enviar Solicitud B2B
                       {/if}
                     </button>
                   </form>
                 {/if}
               </div>
            </div>
          </div>
          
          <div class="mt-6 flex justify-center">
             <button onclick={() => { currentStep = 1; quoteData.width = ''; quoteData.height = ''; }} class="text-xs text-zinc-500 hover:text-white underline transition">Reiniciar Motor Físico</button>
          </div>
        {/if}

      </div>
    {/if}

  </div>
</div>
