<script lang="ts">
  // Import profundo: el barrel de lucide-svelte evalúa ~1500 módulos en cada
  // render SSR (~2s por petición en dev). Nunca importar desde 'lucide-svelte'.
  import MessageCircle from 'lucide-svelte/icons/message-circle';

  // Configuración del botón
  const phoneNumber = '573000000000'; // Placeholder - Debe ser validado por el cliente
  const defaultMessage =
    'Hola, estoy interesado en los sistemas de cristal templado AL13. Me gustaría recibir asesoría técnica.';

  // Generación de UTM parameters para rastreo CRM
  const utmSource = 'website';
  const utmMedium = 'floating_button';
  const utmCampaign = 'b2b_inbound';

  // Construir link de WhatsApp con texto y UTMs (url encoded)
  // Nota: WhatsApp business puede leer el texto preformateado.
  // Los UTMs se incluyen en el mensaje para que el asesor sepa de dónde vienen,
  // ya que WhatsApp no preserva parámetros HTTP nativamente.
  const encodedText = encodeURIComponent(
    `${defaultMessage}\n\n[Ref: ${utmSource}|${utmMedium}|${utmCampaign}]`
  );
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedText}`;
</script>

<div class="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group">
  <!-- Glowing Rings Behind -->
  <div
    class="absolute inset-0 rounded-full bg-al13-cyan/20 blur-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
  ></div>
  <div
    class="absolute inset-0 rounded-full bg-green-500/10 animate-pulse pointer-events-none"
  ></div>

  <a
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    class="relative flex items-center justify-center w-14 h-14 bg-black/40 backdrop-blur-xl border border-white/10 hover:border-al13-cyan/50 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_0_8px_32px_rgba(0,0,0,0.6)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),_0_0_20px_rgba(103,232,249,0.2)] hover:scale-[1.05] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-al13-cyan/50"
    aria-label="Contactar asesor vía WhatsApp"
  >
    <MessageCircle
      strokeWidth={2}
      class="w-6 h-6 text-zinc-300 group-hover:text-green-400 transition-colors duration-300 drop-shadow-md"
    />

    <!-- Pulse ring on edge -->
    <div
      class="absolute inset-0 rounded-full border border-green-500/30 scale-100 opacity-100 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"
    ></div>
  </a>

  <!-- Tooltip B2B Premium -->
  <div
    class="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-4 py-2 bg-black/90 backdrop-blur-md text-xs font-bold tracking-wide text-zinc-300 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0 whitespace-nowrap"
  >
    Asesoría <span class="text-al13-cyan">Técnica</span>
  </div>
</div>
