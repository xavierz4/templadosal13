<!--
  ColdContactForm.svelte — Formulario de contacto en frío
  Svelte 5 Runes.
-->
<script lang="ts">
  import { submitColdContact } from '../api/contactClient';
  import { Loader2, CheckCircle2, AlertCircle } from 'lucide-svelte';

  let name = $state('');
  let phone = $state('');
  let email = $state('');
  let message = $state('');
  
  let isLoading = $state(false);
  let errorMsg = $state<string | null>(null);
  let isSuccess = $state(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!name || !phone || !email || !message) {
      errorMsg = 'Todos los campos son obligatorios';
      return;
    }

    isLoading = true;
    errorMsg = null;

    try {
      await submitColdContact({ name, phone, email, message });
      isSuccess = true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      errorMsg = err instanceof Error ? err.message : 'Error inesperado al enviar el mensaje';
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 relative">
  <!-- Glowing background effect -->
  <div class="absolute inset-0 bg-al13-cyan/5 blur-3xl rounded-full pointer-events-none"></div>

  {#if isSuccess}
    <div class="relative z-10 flex flex-col items-center justify-center text-center space-y-4 py-8">
      <div class="w-16 h-16 rounded-full bg-al13-emerald/10 flex items-center justify-center text-al13-emerald mb-2">
        <CheckCircle2 size={32} />
      </div>
      <h3 class="text-2xl font-heading font-bold text-white">Mensaje Enviado</h3>
      <p class="text-zinc-400 max-w-sm">
        Hemos recibido tu consulta corporativa. Nuestro equipo te contactará a la brevedad.
      </p>
      <button 
        class="mt-6 px-6 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
        onclick={() => {
          isSuccess = false;
          name = '';
          phone = '';
          email = '';
          message = '';
        }}
      >
        Enviar otro mensaje
      </button>
    </div>
  {:else}
    <form class="relative z-10 space-y-5" onsubmit={handleSubmit}>
      <div class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-zinc-400 mb-1">Nombre o Empresa</label>
          <input 
            type="text" 
            id="name" 
            bind:value={name}
            disabled={isLoading}
            class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-al13-cyan transition-colors"
            placeholder="Arquitectura S.A.S"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="phone" class="block text-sm font-medium text-zinc-400 mb-1">Teléfono</label>
            <input 
              type="tel" 
              id="phone" 
              bind:value={phone}
              disabled={isLoading}
              class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-al13-cyan transition-colors"
              placeholder="+57 300 000 0000"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-zinc-400 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              bind:value={email}
              disabled={isLoading}
              class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-al13-cyan transition-colors"
              placeholder="hola@empresa.com"
            />
          </div>
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-zinc-400 mb-1">Mensaje o Requerimiento</label>
          <textarea 
            id="message" 
            bind:value={message}
            disabled={isLoading}
            rows="4"
            class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-al13-cyan transition-colors resize-none"
            placeholder="Describa brevemente su requerimiento..."
          ></textarea>
        </div>
      </div>

      {#if errorMsg}
        <div class="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg text-sm border border-red-400/20">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      {/if}

      <div class="pt-4">
        <button 
          type="submit" 
          disabled={isLoading}
          class="w-full py-3.5 bg-al13-cyan hover:bg-al13-cyan/90 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
        >
          {#if isLoading}
            <Loader2 class="animate-spin w-5 h-5" />
          {:else}
            Enviar Mensaje
          {/if}
        </button>
        <p class="text-center text-zinc-500 text-xs mt-3">Tus datos están protegidos por SSL y no son compartidos a terceros.</p>
      </div>
    </form>
  {/if}
</div>
