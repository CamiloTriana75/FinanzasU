import test from 'node:test'
import assert from 'node:assert/strict'
import { buildExcelRows } from '../src/utils/exportarExcel.js'

test('buildExcelRows prepara filas correctas para XLSX', () => {
  const transacciones = [{ fecha: '2026-05-19', descripcion: 'Prueba', categoria_id: 1, tipo: 'gasto', monto: 150 }]
  const categorias = [{ id: 1, nombre: 'Comida' }]
  const rows = buildExcelRows(transacciones, categorias)
  assert.equal(rows.length, 1)
  assert.equal(rows[0].Categoria, 'Comida')
  assert.equal(rows[0].Monto, 150)
})
