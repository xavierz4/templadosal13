<script lang="ts">
  import ScrollReveal from '@shared/ui/ScrollReveal.svelte';
  import Quote from 'lucide-svelte/icons/quote';

  const clients = [
    {
      name: 'Constructora Bolívar',
      src: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&h=100&q=80',
      type: 'Constructora',
    },
    {
      name: 'Amarilo',
      src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=200&h=100&q=80',
      type: 'Desarrollo',
    },
    {
      name: 'Arquitectura & Concreto',
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&h=100&q=80',
      type: 'Estudio',
    },
    {
      name: 'Cusezar',
      src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&h=100&q=80',
      type: 'Constructora',
    },
  ];

  const testimonials = [
    {
      quote:
        'AL13 redefinió nuestros tiempos de entrega. Las tolerancias de ±0.5mm en los cristales templados eliminaron los retrabajos en la obra del proyecto Prisma.',
      author: 'Carlos Mendoza',
      role: 'Director de Obra',
      company: 'Constructora Élite',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80',
    },
    {
      quote:
        'La asesoría técnica para cumplir con la NSR-10 Título B fue impecable. El cotizador interactivo nos permite calcular costos en tiempo real.',
      author: 'Elena Restrepo',
      role: 'Arquitecta Principal',
      company: 'Estudio ARQ+D',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
    },
  ];
</script>

<section class="py-24 bg-al13-black border-t border-white/5 relative overflow-hidden">
  <div class="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
    <ScrollReveal animation="fade-up">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-heading font-bold text-white mb-4 tracking-tight">
          Respaldados por la Industria
        </h2>
        <p class="text-zinc-400 font-light text-lg max-w-2xl mx-auto">
          Aliados estratégicos que respaldan nuestros sistemas de cristal templado en proyectos de
          alta complejidad.
        </p>
      </div>
    </ScrollReveal>

    <!-- Client Logos Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
      {#each clients as client, i (client.name)}
        <ScrollReveal animation="scale" delay={i * 100} staggerIndex={i}>
          <div
            class="relative group p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 overflow-hidden flex items-center justify-center h-32 cursor-pointer grayscale hover:grayscale-0"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-al13-cyan/10 to-al13-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
            <!-- Mock image placeholder representing logo -->
            <img
              src={client.src}
              alt={'Logo ' + client.name}
              class="max-h-12 object-contain filter blend-screen opacity-70 group-hover:opacity-100 transition-all duration-500 mix-blend-screen"
            />
            <div
              class="absolute bottom-2 text-[10px] uppercase tracking-widest text-zinc-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              {client.name}
            </div>
          </div>
        </ScrollReveal>
      {/each}
    </div>

    <!-- Testimonials -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each testimonials as testimonial, i (testimonial.author)}
        <ScrollReveal
          animation={i % 2 === 0 ? 'slide-right' : 'slide-left'}
          delay={i * 150}
          staggerIndex={i}
        >
          <div
            class="p-8 md:p-10 rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-black/40 backdrop-blur-sm relative group hover:border-white/10 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_0_30px_rgba(103,232,249,0.05)] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition-all duration-500 h-full flex flex-col"
          >
            <Quote
              class="w-10 h-10 text-white/10 mb-6 group-hover:text-al13-cyan transition-colors duration-500"
            />

            <p class="text-lg md:text-xl font-light text-zinc-300 leading-relaxed mb-8 flex-grow">
              "{testimonial.quote}"
            </p>

            <div class="flex items-center space-x-4">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                class="w-14 h-14 rounded-full object-cover border border-white/20"
              />
              <div>
                <h4 class="text-white font-bold">{testimonial.author}</h4>
                <p class="text-zinc-500 text-sm">
                  {testimonial.role}, <span class="text-al13-cyan">{testimonial.company}</span>
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>
