import test from 'node:test'
import assert from 'node:assert/strict'
import { mapAuthError } from '../src/services/authService.js'

test('mapAuthError mapea mensajes conocidos a errores amigables', () => {
  const e1 = mapAuthError({ message: 'Invalid login credentials' })
  assert.equal(e1.message, 'Correo o contrasena incorrectos.')

  const e2 = mapAuthError({ message: 'email not confirmed' })
  assert.equal(e2.message, 'Debes confirmar tu correo antes de iniciar sesion. Revisa tu bandeja de entrada.')

  const e3 = mapAuthError({ message: 'user already registered' })
  assert.equal(e3.message, 'Este correo ya esta registrado. Inicia sesion o recupera tu acceso.')
})
