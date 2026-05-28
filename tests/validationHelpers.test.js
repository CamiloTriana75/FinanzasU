import test from 'node:test'
import assert from 'node:assert/strict'
import { validateMonto, validateFecha, validateTransaccionForm, validateFondosSuficientes, validateDescripcion } from '../src/utils/validationHelpers.js'

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

// BUG-03: Fechas futuras deben ser rechazadas
test('validateFecha rechaza fechas en el futuro', () => {
  assert.equal(validateFecha('2099-12-31'), 'La fecha no puede ser en el futuro')
  assert.equal(validateFecha('2050-01-01'), 'La fecha no puede ser en el futuro')
})

// BUG-02: Descripciones largas deben ser rechazadas
test('validateDescripcion acepta textos cortos y rechaza los que superan 100 caracteres', () => {
  assert.equal(validateDescripcion(''), null)
  assert.equal(validateDescripcion(null), null)
  assert.equal(validateDescripcion('Almuerzo en la cafeteria'), null)
  const textoLargo = 'A'.repeat(101)
  assert.equal(validateDescripcion(textoLargo), 'La descripcion no puede superar 100 caracteres')
  const textoEnLimite = 'B'.repeat(100)
  assert.equal(validateDescripcion(textoEnLimite), null)
})

test('validateTransaccionForm detecta errores basicos', () => {
  const errors = validateTransaccionForm({ tipo: '', monto: '', categoria_id: '', fecha: '', descripcion: '' })
  assert.ok(errors.tipo)
  assert.ok(errors.monto)
  assert.ok(errors.categoria_id)
  assert.ok(errors.fecha)
})

// BUG-02: El formulario de transaccion ahora valida la descripcion
test('validateTransaccionForm detecta descripcion demasiado larga', () => {
  const errors = validateTransaccionForm({
    tipo: 'gasto',
    monto: '100',
    categoria_id: '1',
    fecha: '2026-05-28',
    descripcion: 'X'.repeat(101)
  })
  assert.ok(errors.descripcion, 'Debe reportar error de descripcion larga')
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
