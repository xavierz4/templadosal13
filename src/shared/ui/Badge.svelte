<script lang="ts">
  let { text = 'AL13 Certified', type = 'default' } = $props();

  const baseClasses =
    'inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase border transition-all duration-300';

  /** @type {Record<"default" | "premium" | "solid", string>} */
  const typeClasses = {
    default: 'bg-al13-glass-light border-white/10 text-zinc-300 hover:border-white/20',
    premium:
      'bg-gradient-to-r from-al13-gold/10 to-transparent border-al13-gold/20 text-al13-gold shadow-[0_0_15px_rgba(212,175,55,0.08)] backdrop-blur-md',
    solid: 'bg-white text-al13-black border-transparent shadow-lg',
  };

  /** @type {"default" | "premium" | "solid"} */
  const currentType = $derived(type);
</script>

<!-- eslint-disable-next-line @typescript-eslint/ban-ts-comment -->
<!-- @ts-ignore: currentType is strictly limited to keys of typeClasses -->
<span class="{baseClasses} {typeClasses[currentType]}">
  {text}
</span>
