export function validateRequired(value, fieldName = 'Este campo') {
  if (value === null || value === undefined || String(value).trim() === '') {
    return `${fieldName} es obligatorio`
  }
  return null
}

export function validateMonto(value) {
  if (value === null || value === undefined || value === '') {
    return 'El monto es obligatorio'
  }
  const num = Number(value)
  if (isNaN(num)) return 'El monto debe ser un valor numerico'
  if (num <= 0) return 'El monto debe ser mayor a 0'
  return null
}

export function validateFecha(value) {
  if (!value) return 'La fecha es obligatoria'
  const date = new Date(value)
  if (isNaN(date.getTime())) return 'La fecha no es valida'
  // BUG-03: No se permiten fechas futuras en transacciones
  const hoy = new Date()
  hoy.setHours(23, 59, 59, 999)
  if (date > hoy) return 'La fecha no puede ser en el futuro'
  return null
}

export function validateNombre(value, min = 2, max = 50) {
  if (!value || !String(value).trim()) return 'El nombre es obligatorio'
  const trimmed = String(value).trim()
  if (trimmed.length < min) return `Minimo ${min} caracteres`
  if (trimmed.length > max) return `Maximo ${max} caracteres`
  return null
}

const MAX_DESCRIPCION_LENGTH = 100

export function validateDescripcion(value) {
  if (!value) return null // La descripcion es opcional
  if (String(value).length > MAX_DESCRIPCION_LENGTH) {
    return `La descripcion no puede superar ${MAX_DESCRIPCION_LENGTH} caracteres`
  }
  return null
}

export function validateTransaccionForm({ tipo, monto, categoria_id, fecha, descripcion }) {
  const errors = {}
  const tipoErr = validateRequired(tipo, 'El tipo')
  if (tipoErr) errors.tipo = tipoErr
  else if (!['ingreso', 'gasto'].includes(tipo)) errors.tipo = 'Tipo no valido'

  const montoErr = validateMonto(monto)
  if (montoErr) errors.monto = montoErr

  const catErr = validateRequired(categoria_id, 'La categoria')
  if (catErr) errors.categoria_id = catErr

  const fechaErr = validateFecha(fecha)
  if (fechaErr) errors.fecha = fechaErr

  // BUG-02: Validar longitud de descripcion
  const descErr = validateDescripcion(descripcion)
  if (descErr) errors.descripcion = descErr

  return errors
}

/**
 * Valida si hay fondos suficientes para registrar un GASTO en la fecha indicada.
 *
 * Calcula el balance acumulado al cierre de `fecha` (todas las transacciones
 * con fecha ≤ `fecha`, excluyendo el registro que se está editando), y
 * comprueba que aún queden fondos tras descontar el nuevo monto.
 *
 * Los ingresos siempre se permiten (no requieren fondos previos).
 *
 * @param {Array} transacciones Lista actual de transacciones del usuario.
 * @param {Object} params
 * @param {'ingreso'|'gasto'} params.tipo
 * @param {number|string} params.monto Monto del nuevo registro.
 * @param {string} [params.fecha] Fecha del nuevo registro en formato YYYY-MM-DD.
 *   Si se omite se asume hoy.
 * @param {Object|null} [params.editando] Transacción previa (al editar).
 * @returns {string|null} Mensaje de error o null si todo bien.
 */
export function validateFondosSuficientes(transacciones, { tipo, monto, fecha, editando = null }) {
  if (tipo !== 'gasto') return null

  const numMonto = Number(monto || 0)
  const fechaGasto = fecha || new Date().toISOString().split('T')[0]

  const balanceEnFecha = transacciones.reduce((acc, t) => {
    if (editando && t.id === editando.id) return acc
    if (!t.fecha || t.fecha > fechaGasto) return acc
    return acc + (t.tipo === 'ingreso' ? Number(t.monto || 0) : -Number(t.monto || 0))
  }, 0)

  if (balanceEnFecha - numMonto < 0) {
    return 'Fondos insuficientes a la fecha del gasto'
  }
  return null
}

export function validateCategoriaForm({ nombre, tipo }) {
  const errors = {}
  const nombreErr = validateNombre(nombre)
  if (nombreErr) errors.nombre = nombreErr

  const tipoErr = validateRequired(tipo, 'El tipo')
  if (tipoErr) errors.tipo = tipoErr
  else if (!['ingreso', 'gasto'].includes(tipo)) errors.tipo = 'Tipo no valido'

  return errors
}

export function validatePresupuestoForm({ categoria_id, monto_limite }) {
  const errors = {}
  const catErr = validateRequired(categoria_id, 'La categoria')
  if (catErr) errors.categoria_id = catErr

  const montoErr = validateMonto(monto_limite)
  if (montoErr) errors.monto_limite = montoErr

  return errors
}

export function validateUmbralAlertaPct(value) {
  if (value === null || value === undefined || value === '') {
    return 'El umbral de alerta es obligatorio'
  }

  const num = Number(value)
  if (Number.isNaN(num)) return 'El umbral debe ser un valor numerico'
  if (num < 1 || num > 100) return 'El umbral debe estar entre 1 y 100'

  return null
}

export function validatePresupuestoUmbralForm({ categoria_id, monto_limite, umbral_alerta_pct }) {
  const errors = validatePresupuestoForm({ categoria_id, monto_limite })
  const umbralErr = validateUmbralAlertaPct(umbral_alerta_pct)
  if (umbralErr) errors.umbral_alerta_pct = umbralErr

  return errors
}

export function hasErrors(errorsObj) {
  if (!errorsObj) return false
  return Object.values(errorsObj).some((v) => v)
}
