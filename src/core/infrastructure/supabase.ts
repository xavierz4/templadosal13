import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';
import { config } from '../config/env';

// Crear cliente Supabase tipado estáticamente con la base de datos y llaves obligatorias
export const supabase = createClient<Database>(
  config.PUBLIC_SUPABASE_URL,
  config.PUBLIC_SUPABASE_ANON_KEY
);
