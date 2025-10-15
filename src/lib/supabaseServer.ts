// src/lib/supabaseServer.ts
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** Cliente Supabase básico para lecturas (seguro en servidor o cliente) */
export function supabaseServer() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Faltan variables de entorno de Supabase");
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

/** Cliente con service role (solo para server side, si usas funciones privadas) */
export function supabaseService() {
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!SUPABASE_URL || !SERVICE_KEY) {
    throw new Error("Faltan variables de entorno de Supabase (service role)");
  }
  return createClient(SUPABASE_URL, SERVICE_KEY);
}
