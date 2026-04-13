import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ FinanzasU: Variables de Supabase no configuradas.\n' +
    'Crea un archivo .env.local con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.\n' +
    'Consulta .env.example para referencia.'
  )
}

// Debug: Verification of loaded credentials
console.log('📊 Supabase Connection Status:', {
  url: supabaseUrl ? '✅ Loaded' : '❌ Missing',
  key: supabaseAnonKey ? '✅ Loaded' : '❌ Missing',
  authMode: import.meta.env.VITE_AUTH_MODE || 'real (Supabase)',
  urlPreview: supabaseUrl?.substring(0, 30) + '...',
})

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
)
