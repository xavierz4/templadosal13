<!--
  LoginForm.svelte — Componente de UI "Dumb" (REGLA 4)
  
  NO hace fetch() directo. Delega a authClient.ts.
  Svelte 5 con Runes ($state, $derived).
  Diseño: Glassmorphism premium con paleta AL13.
-->
<script lang="ts">
  import { loginAdmin } from '../api/authClient';

  // Svelte 5 Runes — Estado reactivo
  let email = $state('');
  let password = $state('');
  let errorMessage = $state('');
  let isLoading = $state(false);

  // Derived state para validación visual del botón
  let isFormValid = $derived(email.length > 0 && password.length >= 8);

  async function handleSubmit(event: Event) {
    event.preventDefault();
    errorMessage = '';
    isLoading = true;

    try {
      const result = await loginAdmin(email, password);

      if (result.success) {
        // Redirect al dashboard admin
        window.location.href = '/admin';
      } else {
        errorMessage = result.error ?? 'Credenciales inválidas. Verifique su email y contraseña.';
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('[LoginForm] Submit error:', { message: error.message });
      }
      errorMessage = 'Error de conexión. Intente de nuevo.';
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="login-container">
  <div class="glass-panel login-card">
    <!-- Logo / Branding -->
    <div class="brand-section">
      <div class="brand-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon-shield"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      </div>
      <h1 class="brand-title">Templados AL13</h1>
      <p class="brand-subtitle">Panel de Administración</p>
    </div>

    <!-- Formulario -->
    <form onsubmit={handleSubmit} class="login-form">
      <div class="input-group">
        <label for="admin-email" class="input-label">Correo electrónico</label>
        <input
          id="admin-email"
          type="email"
          bind:value={email}
          placeholder="admin@templados.co"
          required
          autocomplete="email"
          class="input-field"
          disabled={isLoading}
        />
      </div>

      <div class="input-group">
        <label for="admin-password" class="input-label">Contraseña</label>
        <input
          id="admin-password"
          type="password"
          bind:value={password}
          placeholder="••••••••"
          required
          minlength="8"
          autocomplete="current-password"
          class="input-field"
          disabled={isLoading}
        />
      </div>

      {#if errorMessage}
        <div class="error-banner" role="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="error-icon"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      {/if}

      <button type="submit" class="submit-btn" disabled={!isFormValid || isLoading}>
        {#if isLoading}
          <span class="spinner"></span>
          Autenticando...
        {:else}
          Ingresar al Panel
        {/if}
      </button>
    </form>

    <p class="security-note">🔒 Acceso exclusivo para administradores autorizados</p>
  </div>
</div>

<style>
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 1.5rem;
  }

  .login-card {
    width: 100%;
    max-width: 420px;
    padding: 2.5rem;
    border-radius: 1.25rem;
    animation: fadeInUp 0.6s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Branding */
  .brand-section {
    text-align: center;
    margin-bottom: 2rem;
  }

  .brand-icon {
    width: 56px;
    height: 56px;
    margin: 0 auto 1rem;
    padding: 0.75rem;
    border-radius: 1rem;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05));
    border: 1px solid rgba(212, 175, 55, 0.2);
  }

  .icon-shield {
    width: 100%;
    height: 100%;
    color: #d4af37;
  }

  .brand-title {
    font-family: 'Outfit', sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    background: linear-gradient(to right, #e0e0e0, #ffffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.25rem;
  }

  .brand-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 0.05em;
  }

  /* Form */
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .input-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 0.02em;
  }

  .input-field {
    width: 100%;
    padding: 0.75rem 1rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: #f5f5f5;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    outline: none;
    transition: all 0.3s ease;
  }

  .input-field::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }

  .input-field:focus {
    border-color: rgba(212, 175, 55, 0.5);
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
    background: rgba(255, 255, 255, 0.08);
  }

  .input-field:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Error */
  .error-banner {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 0.75rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: #fca5a5;
    animation: shakeX 0.5s ease-in-out;
  }

  @keyframes shakeX {
    0%,
    100% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(-8px);
    }
    40% {
      transform: translateX(8px);
    }
    60% {
      transform: translateX(-4px);
    }
    80% {
      transform: translateX(4px);
    }
  }

  .error-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: #ef4444;
  }

  /* Submit Button */
  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.85rem;
    margin-top: 0.5rem;
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: #0f1115;
    background: linear-gradient(135deg, #d4af37, #f0d060);
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.02em;
  }

  .submit-btn:hover:not(:disabled) {
    transform: scale(1.02);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
  }

  .submit-btn:active:not(:disabled) {
    transform: scale(0.98);
  }

  .submit-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }

  /* Spinner */
  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(15, 17, 21, 0.3);
    border-top-color: #0f1115;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Footer note */
  .security-note {
    text-align: center;
    margin-top: 1.5rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.3);
  }
</style>
