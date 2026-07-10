<script lang="ts">
  /**
   * QuantitativeImpact.svelte
   * @module landing/ui
   *
   * Sección de impacto numérico B2B con counter animations y blur→focus.
   * Cada stat cuenta desde 0 hasta su valor final al entrar en viewport.
   *
   * REGLA 4: Solo presentación. Sin fetch(), sin SDKs externos.
   * Task 9.3.5: Counter animation + blur(8px→0) effect.
   */
  import ScrollReveal from '@shared/ui/ScrollReveal.svelte';
  import CounterStat from '@shared/ui/CounterStat.svelte';

  const stats = [
    {
      value: 10,
      suffix: '+',
      label: 'Años Promedio',
      description: 'De experiencia técnica aplicable en diseño estructural de aluminios.',
      tooltip: 'Nuestros ingenieros llevan más de una década perfeccionando instalaciones.',
      hoverColor: 'group-hover:to-al13-cyan',
    },
    {
      value: 2,
      suffix: 'mm',
      label: 'Calibre Extrusión',
      description: 'Robustez industrial que garantiza rigidez monolítica ante el Viento.',
      tooltip: 'Aluminio extragrueso (2mm) para evitar vibraciones o deformaciones por viento.',
      hoverColor: 'group-hover:to-al13-gold',
    },
    {
      value: 100,
      suffix: '%',
      label: 'Certificación NSR-10',
      description: 'Nuestra ingeniería base se sujeta al Título B de cargas colombianas.',
      tooltip: 'Norma Sismo-Resistente (NSR-10). Tolerancia máxima ante impactos y sismos.',
      hoverColor: 'group-hover:to-emerald-500',
    },
    {
      value: 0.0,
      suffix: '%',
      decimals: 1,
      label: 'Distorsión Óptica',
      description: 'Superficies templadas de alta pureza reflectiva para fachadas.',
      tooltip: 'Cristal extra-claro que no deforma la vista ni crea efectos de "casa de espejos".',
      hoverColor: 'group-hover:to-blue-400',
    },
  ];
</script>

<section
  class="pt-12 pb-24 text-center bg-al13-dark border-y border-white/5 relative overflow-hidden"
>
  <!-- Glowing subtle gradients para integrarse al look "Glass" -->
  <div
    class="absolute -top-[200px] left-1/4 w-[500px] h-[500px] bg-al13-cyan/10 rounded-full blur-[150px] opacity-30 pointer-events-none"
  ></div>
  <div
    class="absolute -bottom-[200px] right-1/4 w-[500px] h-[500px] bg-al13-gold/10 rounded-full blur-[150px] opacity-20 pointer-events-none"
  ></div>

  <div class="container mx-auto px-4 lg:px-8 relative z-10 w-full max-w-7xl">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
      {#each stats as stat, index (stat.label)}
        <ScrollReveal animation="blur-focus" delay={index * 150} staggerIndex={0}>
          <div class="flex flex-col text-center lg:text-left space-y-2 group">
            <h4 class="font-outfit font-black text-6xl md:text-7xl xl:text-8xl tracking-tighter">
              <CounterStat
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals ?? 0}
                duration={1500}
                class="text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-600 transition-all duration-500 {stat.hoverColor}"
              />
            </h4>
            <div
              class="h-px w-16 bg-gradient-to-r from-white/20 to-transparent mx-auto lg:mx-0 my-2"
            ></div>
            <p
              class="font-mono text-sm uppercase tracking-widest text-zinc-400 relative inline-block cursor-help group/tooltip border-b border-dotted border-zinc-600 hover:border-zinc-400 transition-colors w-max mx-auto lg:mx-0"
            >
              {stat.label}
              <!-- Tooltip B2C -->
              <span
                class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 bg-[#111] border border-white/20 text-zinc-300 text-xs font-sans normal-case tracking-normal rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 shadow-[0_10px_30px_rgba(0,0,0,0.8)] pointer-events-none"
              >
                {stat.tooltip}
                <!-- Tooltip Arrow -->
                <span
                  class="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[#111]"
                ></span>
              </span>
            </p>
            <p class="text-zinc-500 text-sm mt-1">
              {stat.description}
            </p>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>
