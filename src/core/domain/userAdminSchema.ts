/**
 * Tipos de dominio para la gestión de usuarios del Admin (Fase 5).
 */
import { z } from 'zod';
import type { Database } from '../types/database.types';

export const USER_ROLES = ['user', 'contractor', 'admin', 'ceo'] as const;
export type UserRole = (typeof USER_ROLES)[number];

/** Fila devuelta por el RPC get_admin_users (perfil + email). */
export type AdminUser = Database['public']['Functions']['get_admin_users']['Returns'][number];

/** Schema para actualizar el rol de un usuario. */
export const RoleUpdateSchema = z.object({
  role: z.enum(USER_ROLES),
});
export type RoleUpdate = z.infer<typeof RoleUpdateSchema>;

/** Schema para crear un nuevo usuario admin (email + password + rol). */
export const CreateUserSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  full_name: z.string().max(255).optional(),
  role: z.enum(USER_ROLES).default('admin'),
});
export type CreateUser = z.infer<typeof CreateUserSchema>;
