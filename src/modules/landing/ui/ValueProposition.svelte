<script lang="ts">
  import { CheckCircle2, ShieldCheck, Ruler, Sparkles, Gem, ArrowRight } from 'lucide-svelte';
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';

  // Pilares de Valor B2B
  const values = [
    {
      title: "Ingeniería Milimétrica",
      description: "Cristales templados procesados con márgenes de error inferiores a 0.5mm. Soluciones que encajan al primer intento.",
      icon: Ruler,
      color: "text-blue-400"
    },
    {
      title: "Resistencia Industrial",
      description: "Aleaciones de aluminio extruido de alta densidad y cristales de seguridad certificados para zonas de alto impacto.",
      icon: ShieldCheck,
      color: "text-orange-400"
    },
    {
      title: "Acabados Premium",
      description: "Herrajes de acero inoxidable pulido y perfilería esmaltada con estética Boutique arquitectónica. El lujo en cada bisagra.",
      icon: Gem,
      color: "text-zinc-300"
    }
  ];

  let sectionRef: HTMLElement;
  let isVisible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        isVisible = true;
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    if (sectionRef) observer.observe(sectionRef);
    return () => observer.disconnect();
  });
</script>

<section bind:this={sectionRef} id="propuesta-valor" class="relative py-24 md:py-32 px-6 md:px-12 bg-[#0A0A0A] overflow-hidden">
  
  <!-- Efectos de Luz Background -->
  <div class="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
  <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
  <div class="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>

  <div class="max-w-7xl mx-auto relative z-10">
    
    <!-- Encabezado de Sección -->
    <div class="text-center mb-20 max-w-3xl mx-auto">
      <div class="inline-flex items-center space-x-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
        <Sparkles class="w-4 h-4 text-orange-400" strokeWidth={2} />
        <span class="text-xs font-bold tracking-widest text-zinc-300 uppercase">El Estándar AL13</span>
      </div>
      <h2 class="text-4xl md:text-5xl font-heading font-bold text-white mb-6 tracking-tight">
        No fabricamos ventanas.<br/> Forjamos arquitectura.
      </h2>
      <p class="text-lg text-zinc-400 font-light">
        La industria se conforma con lo funcional. Nosotros redefinimos la estética industrial a través de sistemas de vidrio y aluminio diseñados para espacios que exigen la máxima sofisticación y durabilidad.
      </p>
    </div>

    <!-- Grid de Propuesta de Valor (Bento Layout) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#if isVisible}
        {#each values as value, index}
          {@const Icon = value.icon}
          <div 
            in:fly={{ y: 50, duration: 800, delay: index * 150 }}
            class="group relative rounded-2xl overflow-hidden p-1 transition-transform duration-500 hover:-translate-y-2"
          >
            
            <!-- Borde animado de la tarjeta -->
            <div class="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <!-- Contenido Interior -->
            <div class="relative h-full bg-[#0D0D0D]/90 backdrop-blur-xl rounded-[14px] p-8 md:p-10 border border-white/10 shadow-2xl flex flex-col items-start text-left z-10 transition-all duration-500 hover:border-white/20 group-hover:bg-[#141414]">
              
              <div class="mb-8 p-4 rounded-xl bg-white/5 border border-white/10 inline-flex items-center justify-center">
                <Icon class="w-8 h-8 {value.color}" strokeWidth={1.5} />
              </div>
              
              <h3 class="text-2xl font-bold text-white mb-4 tracking-tight">{value.title}</h3>
              
              <p class="text-zinc-400 leading-relaxed font-light mb-8 flex-grow">
                {value.description}
              </p>

              <div class="mt-auto flex items-center space-x-2 text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors cursor-pointer">
                <span>Descubrir especificaciones</span>
                <ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
              
            </div>
          </div>
        {/each}
      {/if}
    </div>

  </div>
</section>

<style>
  /* Agrega aquí utilidades específicas si las optimizaciones globales tailwind no se activan. */
</style>
