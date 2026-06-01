import { supabase } from './supabaseClient.js'

// Las globales (user_id IS NULL) y las propias (user_id = userId) se piden
// por separado y se mezclan en cliente. Evita interpolar userId en filtros
// PostgREST (.or) y resulta más explícito que un OR.
export async function listarCategorias(userId) {
  const [propiasRes, globalesRes] = await Promise.all([
    supabase
      .from('categorias')
      .select('*')
      .eq('user_id', userId),
    supabase
      .from('categorias')
      .select('*')
      .is('user_id', null)
  ])

  if (propiasRes.error) throw propiasRes.error
  if (globalesRes.error) throw globalesRes.error

  const todas = [...(propiasRes.data ?? []), ...(globalesRes.data ?? [])]

  // es_predeterminada DESC, luego nombre ASC (case-insensitive)
  todas.sort((a, b) => {
    if (a.es_predeterminada !== b.es_predeterminada) {
      return a.es_predeterminada ? -1 : 1
    }
    return String(a.nombre).localeCompare(String(b.nombre), 'es', { sensitivity: 'base' })
  })

  return todas
}

export async function crearCategoria(payload) {
  const { data, error } = await supabase
    .from('categorias')
    .insert(payload)
    .select('*')
    .single()

  if (error) throw error
  return data
}

export async function actualizarCategoria(id, userId, updates) {
  const { data, error } = await supabase
    .from('categorias')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId)
    .select('*')
    .single()

  if (error) throw error
  return data
}

export async function eliminarCategoria(id, userId) {
  const { error } = await supabase
    .from('categorias')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) throw error
}
