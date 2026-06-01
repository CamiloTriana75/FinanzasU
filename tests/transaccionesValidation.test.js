import test from 'node:test'
import assert from 'node:assert/strict'
import { validateFondosSuficientes } from '../src/utils/validationHelpers.js'

// Tras el fix #8 la validación calcula el balance ACUMULADO hasta la fecha del
// nuevo movimiento, no el balance total. Las transacciones siempre llevan fecha
// (la BD lo garantiza con NOT NULL).

test('validateFondosSuficientes permite editar reduciendo gasto', () => {
  const transacciones = [
    { id: 1, tipo: 'ingreso', monto: 1000, fecha: '2026-01-15' },
    { id: 2, tipo: 'gasto', monto: 500, fecha: '2026-01-20' }
  ]

  // Editar gasto id=2 subiéndolo de 500 a 900 (misma fecha):
  // Excluimos el editando del balance previo → 1000 disponibles antes del nuevo
  // gasto de 900 → permitido (queda 100).
  const anterior = { id: 2, tipo: 'gasto', monto: 500, fecha: '2026-01-20' }
  assert.equal(
    validateFondosSuficientes(transacciones, {
      tipo: 'gasto',
      monto: 900,
      fecha: '2026-01-20',
      editando: anterior
    }),
    null
  )

  // Crear gasto nuevo de 600 con fecha posterior:
  // Balance hasta la fecha = 1000 - 500 = 500 → bloquear.
  const err = validateFondosSuficientes(transacciones, {
    tipo: 'gasto',
    monto: 600,
    fecha: '2026-01-25',
    editando: null
  })
  assert.equal(err, 'Fondos insuficientes a la fecha del gasto')
})

test('validateFondosSuficientes bloquea gasto retroactivo aunque el balance total sea positivo', () => {
  // Caso que el código viejo (basado en balance total) dejaba pasar pero que
  // dejaba al usuario en negativo en un punto histórico del flujo de caja.
  const transacciones = [
    { id: 1, tipo: 'ingreso', monto: 100, fecha: '2026-01-10' },
    { id: 2, tipo: 'ingreso', monto: 1000, fecha: '2026-02-10' }
  ]

  // Balance total = 1100. Pero el 2026-01-15 solo había 100 disponibles.
  // Intentar registrar un gasto de 500 ese día debe bloquearse.
  const err = validateFondosSuficientes(transacciones, {
    tipo: 'gasto',
    monto: 500,
    fecha: '2026-01-15'
  })
  assert.equal(err, 'Fondos insuficientes a la fecha del gasto')
})

test('validateFondosSuficientes no bloquea ingresos', () => {
  const transacciones = [
    { id: 1, tipo: 'gasto', monto: 5000, fecha: '2026-01-01' }
  ]
  assert.equal(
    validateFondosSuficientes(transacciones, {
      tipo: 'ingreso',
      monto: 1,
      fecha: '2026-01-02'
    }),
    null
  )
})
