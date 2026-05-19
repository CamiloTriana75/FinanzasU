import test from 'node:test'
import assert from 'node:assert/strict'
import { evaluarLogros } from '../src/services/logrosEngine.js'

test('regla ahorrativo y colchon-financiero responden segun montos', () => {
  const catalogo = [
    { id: 'ahorrativo', nombre: 'Ahorrativo', meta: 1 },
    { id: 'colchon-financiero', nombre: 'Colchon', meta: 1 }
  ]

  const transacciones = [
    { id: 1, tipo: 'ingreso', monto: 1000000 },
    { id: 2, tipo: 'gasto', monto: 200000 }
  ]

  const resultados = evaluarLogros({ transacciones, catalogoLogros: catalogo })
  const ahorrativo = resultados.find((r) => r.logroId === 'ahorrativo')
  const colchon = resultados.find((r) => r.logroId === 'colchon-financiero')
  assert.ok(ahorrativo.avanceNuevo > 0)
  assert.equal(colchon.avanceNuevo, 0)
})
