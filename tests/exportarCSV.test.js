import test from 'node:test'
import assert from 'node:assert/strict'
import { buildCSVContent } from '../src/utils/exportarCSV.js'

test('buildCSVContent genera encabezados y filas correctamente y escapa comas', () => {
  const encabezados = ['Fecha', 'Descripcion']
  const filas = [["2026-05-19", 'Texto simple'], ["2026-05-20", '"Texto, con coma"']]
  const contenido = buildCSVContent(encabezados, filas)
  assert.ok(contenido.includes('sep=,'))
  assert.ok(contenido.includes('Fecha,Descripcion'))
  // la fila con coma debe estar escapada con comillas
  assert.ok(contenido.includes('"Texto, con coma"'))
})
