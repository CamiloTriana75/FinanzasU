import test from 'node:test'
import assert from 'node:assert/strict'
import { evaluarLogros } from '../src/services/logrosEngine.js'

test('evaluarLogros debe evaluar reglas basicas correctamente', () => {
  const catalogo = [
    { id: 'el-gaston', nombre: 'El gaston', meta: 1 },
    { id: 'primer-ingreso', nombre: 'Primer ingreso', meta: 1 }
  ]

  const transacciones = [
    { id: 1, tipo: 'gasto', monto: 1000, fecha: '2026-05' },
    { id: 2, tipo: 'ingreso', monto: 2000, fecha: '2026-05' }
  ]

  const resultados = evaluarLogros({ transacciones, catalogoLogros: catalogo })
  const ids = resultados.map((r) => r.logroId)
  assert.deepEqual(ids.sort(), ['el-gaston', 'primer-ingreso'].sort())
  const elGaston = resultados.find((r) => r.logroId === 'el-gaston')
  const primerIngreso = resultados.find((r) => r.logroId === 'primer-ingreso')
  assert.equal(elGaston.avanceNuevo, 1)
  assert.equal(primerIngreso.avanceNuevo, 1)
})
