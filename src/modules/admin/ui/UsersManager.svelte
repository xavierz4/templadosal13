<!--
  UsersManager.svelte — Gestión de usuarios y roles (Fase 5)

  Svelte 5 Runes. Componente island: recibe la lista SSR y permite cambiar roles
  y crear usuarios (delega HTTP a usersAdminClient — REGLA 4).
-->
<script lang="ts">
  import { USER_ROLES } from '@core/domain/userAdminSchema';
  import type { AdminUser, UserRole } from '@core/domain/userAdminSchema';
  import { updateUserRole, createUser } from '../api/usersAdminClient';
  import { untrack } from 'svelte';

  const props: { users: AdminUser[]; currentUserId: string } = $props();

  let localUsers: AdminUser[] = $state(untrack(() => [...props.users]));
  let errorMessage = $state('');
  let successMessage = $state('');

  const ROLE_LABELS: Record<UserRole, string> = {
    user: 'Usuario',
    contractor: 'Contratista',
    admin: 'Administrador',
    ceo: 'CEO',
  };

  const dateFmt = (iso: string | null) =>
    iso ? new Date(iso).toLocaleDateString('es-CO', { dateStyle: 'medium' }) : '—';

  async function changeRole(user: AdminUser, newRole: UserRole) {
    if (!user.id || user.role === newRole) return;
    errorMessage = '';
    successMessage = '';
    const prev = user.role;
    localUsers = localUsers.map((u) => (u.id === user.id ? { ...u, role: newRole } : u));

    const result = await updateUserRole(user.id, newRole);
    if (result.error) {
      localUsers = localUsers.map((u) => (u.id === user.id ? { ...u, role: prev } : u));
      errorMessage = result.error;
    } else {
      successMessage = `Rol de ${user.email} actualizado a ${ROLE_LABELS[newRole]}.`;
    }
  }

  // ── Crear usuario ──
  let showCreate = $state(false);
  let newEmail = $state('');
  let newPassword = $state('');
  let newName = $state('');
  let newRole = $state<UserRole>('admin');
  let creating = $state(false);

  const canCreate = $derived(newEmail.includes('@') && newPassword.length >= 8);

  async function submitCreate() {
    if (!canCreate || creating) return;
    creating = true;
    errorMessage = '';
    successMessage = '';
    const result = await createUser({
      email: newEmail.trim(),
      password: newPassword,
      full_name: newName.trim() || undefined,
      role: newRole,
    });
    creating = false;

    if (result.error) {
      errorMessage = result.error;
      return;
    }
    // Insertar optimista al tope (sin created_at exacto, se verá al recargar)
    localUsers = [
      {
        id: result.id ?? '',
        email: newEmail.trim(),
        role: newRole,
        full_name: newName.trim() || null,
        company_name: null,
        phone_number: null,
        created_at: new Date().toISOString(),
      },
      ...localUsers,
    ];
    successMessage = `Usuario ${newEmail} creado.`;
    newEmail = '';
    newPassword = '';
    newName = '';
    newRole = 'admin';
    showCreate = false;
  }
</script>

{#if errorMessage}
  <div class="banner error" role="alert">
    ⚠️ {errorMessage}
    <button class="dismiss" onclick={() => (errorMessage = '')}>×</button>
  </div>
{/if}
{#if successMessage}
  <div class="banner success">
    ✓ {successMessage}
    <button class="dismiss" onclick={() => (successMessage = '')}>×</button>
  </div>
{/if}

<div class="head">
  <p class="count">{localUsers.length} usuario{localUsers.length === 1 ? '' : 's'}</p>
  <button class="btn-primary" onclick={() => (showCreate = !showCreate)}>
    {showCreate ? 'Cancelar' : '+ Nuevo usuario'}
  </button>
</div>

{#if showCreate}
  <div class="create-form">
    <div class="create-grid">
      <label class="field">
        <span class="field-label">Email *</span>
        <input
          class="field-input"
          type="email"
          bind:value={newEmail}
          placeholder="nuevo@empresa.com"
        />
      </label>
      <label class="field">
        <span class="field-label">Contraseña * (mín. 8)</span>
        <input class="field-input" type="text" bind:value={newPassword} placeholder="••••••••" />
      </label>
      <label class="field">
        <span class="field-label">Nombre</span>
        <input class="field-input" bind:value={newName} placeholder="Nombre completo" />
      </label>
      <label class="field">
        <span class="field-label">Rol</span>
        <select class="field-input" bind:value={newRole}>
          {#each USER_ROLES as r (r)}
            <option value={r}>{ROLE_LABELS[r]}</option>
          {/each}
        </select>
      </label>
    </div>
    <button class="btn-primary" onclick={submitCreate} disabled={!canCreate || creating}>
      {creating ? 'Creando…' : 'Crear usuario'}
    </button>
  </div>
{/if}

<div class="table-wrap">
  <table class="users-table">
    <thead>
      <tr>
        <th>Usuario</th>
        <th>Email</th>
        <th>Alta</th>
        <th>Rol</th>
      </tr>
    </thead>
    <tbody>
      {#each localUsers as user (user.id)}
        <tr>
          <td class="name">{user.full_name || '—'}</td>
          <td class="email">{user.email}</td>
          <td class="muted">{dateFmt(user.created_at)}</td>
          <td>
            {#if user.id === props.currentUserId}
              <span class="you-tag">{ROLE_LABELS[(user.role as UserRole) ?? 'user']} · tú</span>
            {:else}
              <select
                class="role-select"
                value={user.role}
                onchange={(e) => changeRole(user, e.currentTarget.value as UserRole)}
              >
                {#each USER_ROLES as r (r)}
                  <option value={r}>{ROLE_LABELS[r]}</option>
                {/each}
              </select>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }
  .banner.error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #fca5a5;
  }
  .banner.success {
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
    color: #86efac;
  }
  .dismiss {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.1rem;
    cursor: pointer;
    line-height: 1;
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }
  .count {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--color-al13-cyan), var(--color-al13-emerald));
    color: var(--color-al13-black);
    font-weight: 700;
    font-size: 0.82rem;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .btn-primary:hover:not(:disabled) {
    opacity: 0.9;
  }
  .btn-primary:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .create-form {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 0.875rem;
    padding: 1.25rem;
    margin-bottom: 1.5rem;
  }
  .create-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.875rem;
    margin-bottom: 1rem;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .field-label {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: rgba(255, 255, 255, 0.5);
  }
  .field-input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    color: #e0e0e0;
    font-size: 0.85rem;
    padding: 0.5rem 0.75rem;
    outline: none;
    transition: border-color 0.2s;
    font-family: inherit;
  }
  .field-input:focus {
    border-color: rgba(56, 189, 248, 0.5);
  }

  .table-wrap {
    overflow-x: auto;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 0.875rem;
  }
  .users-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.83rem;
  }
  .users-table th {
    text-align: left;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.4);
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .users-table td {
    padding: 0.7rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    color: #d0d0d0;
  }
  .users-table .name {
    font-weight: 600;
    color: #e8e8e8;
  }
  .users-table .email {
    color: rgba(255, 255, 255, 0.6);
  }
  .users-table .muted {
    color: rgba(255, 255, 255, 0.4);
  }

  .role-select {
    background: rgba(56, 189, 248, 0.08);
    border: 1px solid rgba(56, 189, 248, 0.2);
    border-radius: 0.4rem;
    color: var(--color-al13-cyan);
    font-size: 0.78rem;
    font-weight: 600;
    padding: 0.3rem 0.5rem;
    outline: none;
    cursor: pointer;
  }
  .you-tag {
    font-size: 0.72rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.55);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    padding: 0.25rem 0.6rem;
  }
</style>
