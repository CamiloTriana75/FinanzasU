import test from 'node:test'
import assert from 'node:assert/strict'
import { validateFondosSuficientes } from '../src/utils/validationHelpers.js'

test('validateFondosSuficientes permite editar reduciendo gasto', () => {
  const transacciones = [
    { id: 1, tipo: 'ingreso', monto: 1000 },
    { id: 2, tipo: 'gasto', monto: 500 }
  ]
  // Editar gasto existente id 2 de 500 a 900 -> balance 1000-500=500 => after edit 1000-900=100 -> allowed
  const anterior = { id: 2, tipo: 'gasto', monto: 500 }
  assert.equal(validateFondosSuficientes(transacciones, { tipo: 'gasto', monto: 900, editando: anterior }), null)

  // Crear nuevo gasto 600 -> would leave -100 (500 balance) -> blocked
  const err = validateFondosSuficientes(transacciones, { tipo: 'gasto', monto: 600, editando: null })
  assert.equal(err, 'Fondos insuficientes')
})
