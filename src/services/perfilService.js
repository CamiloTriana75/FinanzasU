import { supabase } from './supabaseClient'

const MAX_SEMESTRES = 10
const SEMESTRES_OPCIONES = Array.from({ length: MAX_SEMESTRES }, (_, i) => i + 1)
const ESTADOS_VALIDOS = ['Activo', 'Pausado', 'Egresado']

export async function obtenerContextoAcademico(userId) {
  const { data, error } = await supabase
    .from('perfiles')
    .select('semestre_actual, total_semestres, meta_grado, estado_academico')
    .eq('id', userId)
    .maybeSingle()

  if (error) throw error

  return {
    semestre_actual: data?.semestre_actual || '',
    total_semestres: data?.total_semestres || '',
    meta_grado: data?.meta_grado || '',
    estado_academico: data?.estado_academico || 'Activo'
  }
}

export async function guardarContextoAcademico(userId, { semestre_actual, total_semestres, meta_grado, estado_academico }) {
  const totalSem = Number(total_semestres)
  if (!totalSem || totalSem < 1 || totalSem > MAX_SEMESTRES) {
    throw new Error(`Total de semestres debe ser entre 1 y ${MAX_SEMESTRES}.`)
  }

  const semestreActual = Number(semestre_actual)
  if (!semestreActual || semestreActual < 1 || semestreActual > totalSem) {
    throw new Error(`Semestre actual debe ser entre 1 y ${totalSem}.`)
  }

  const anio = Number(meta_grado)
  if (!anio || anio < 2024 || anio > 2040) {
    throw new Error('Meta de grado debe ser un año válido entre 2024 y 2040.')
  }

  if (!estado_academico || !ESTADOS_VALIDOS.includes(estado_academico)) {
    throw new Error('Estado académico no válido.')
  }

  const { data, error } = await supabase
    .from('perfiles')
    .update({
      semestre_actual: semestreActual,
      total_semestres: totalSem,
      meta_grado: anio,
      estado_academico
    })
    .eq('id', userId)
    .select('semestre_actual, total_semestres, meta_grado, estado_academico')
    .single()

  if (error) throw error
  return data
}

/**
 * Obtiene la meta de ahorro mensual del usuario.
 * Devuelve 0 si aún no ha configurado ninguna meta.
 */
export async function obtenerMetaAhorro(userId) {
  const { data, error } = await supabase
    .from('perfiles')
    .select('meta_ahorro_mensual')
    .eq('id', userId)
    .maybeSingle()

  if (error) throw error
  return Number(data?.meta_ahorro_mensual ?? 0)
}

/**
 * Guarda la meta de ahorro mensual del usuario.
 * Valida que el monto sea un número positivo y razonable (máx. 999,999,999).
 *
 * @param {string} userId - ID del usuario
 * @param {number} monto  - Nueva meta de ahorro mensual
 */
export async function guardarMetaAhorro(userId, monto) {
  const montoNum = Number(monto)

  if (!Number.isFinite(montoNum) || montoNum < 0) {
    throw new Error('La meta de ahorro debe ser un número igual o mayor a 0.')
  }

  if (montoNum > 999_999_999) {
    throw new Error('La meta de ahorro no puede exceder 999,999,999.')
  }

  const { data, error } = await supabase
    .from('perfiles')
    .update({ meta_ahorro_mensual: montoNum })
    .eq('id', userId)
    .select('meta_ahorro_mensual')
    .single()

  if (error) throw error
  return Number(data.meta_ahorro_mensual)
}

export { SEMESTRES_OPCIONES, MAX_SEMESTRES, ESTADOS_VALIDOS }