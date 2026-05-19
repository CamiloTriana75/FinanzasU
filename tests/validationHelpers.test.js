import test from 'node:test'
import assert from 'node:assert/strict'
import { validateMonto, validateFecha, validateTransaccionForm, validateFondosSuficientes } from '../src/utils/validationHelpers.js'

test('validateMonto valida correctamente montos invalidos y validos', () => {
  assert.equal(validateMonto(''), 'El monto es obligatorio')
  assert.equal(validateMonto('abc'), 'El monto debe ser un valor numerico')
  assert.equal(validateMonto(-5), 'El monto debe ser mayor a 0')
  assert.equal(validateMonto(100), null)
})

test('validateFecha detecta fechas invalidas', () => {
  assert.equal(validateFecha(''), 'La fecha es obligatoria')
  assert.equal(validateFecha('not-a-date'), 'La fecha no es valida')
  assert.equal(validateFecha('2026-05-19'), null)
})

test('validateTransaccionForm detecta errores basicos', () => {
  const errors = validateTransaccionForm({ tipo: '', monto: '', categoria_id: '', fecha: '' })
  assert.ok(errors.tipo)
  assert.ok(errors.monto)
  assert.ok(errors.categoria_id)
  assert.ok(errors.fecha)
})

test('validateFondosSuficientes bloquea gasto que excede balance', () => {
  const transacciones = [
    { tipo: 'ingreso', monto: 1000 },
    { tipo: 'gasto', monto: 200 }
  ]
  // balance = 800; intento gasto 900 -> insuficiente
  const err = validateFondosSuficientes(transacciones, { tipo: 'gasto', monto: 900 })
  assert.equal(err, 'Fondos insuficientes')
  // gasto 700 ok
  assert.equal(validateFondosSuficientes(transacciones, { tipo: 'gasto', monto: 700 }), null)
})
