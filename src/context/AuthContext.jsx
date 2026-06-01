import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  actualizarPerfilUsuario,
  cambiarContrasenaUsuario,
  cerrarSesionUsuario,
  escucharCambiosAuth,
  iniciarSesionUsuario,
  obtenerSesionActual,
  registrarUsuario,
  solicitarRecuperacionContrasena
} from '../services/authService'

const AuthContext = createContext(null)

/**
 * Persistencia de sesión "Recordarme".
 *
 * Modelo:
 * - PERSIST_KEY:   localStorage. 'true'  → usuario marcó "Recordarme" → sesión persistente.
 *                                 'false' → sesión solo durante el "browser session" actual.
 * - HEARTBEAT_KEY: localStorage. timestamp (ms) que cada pestaña activa refresca cada
 *                   HEARTBEAT_INTERVAL_MS. Permite distinguir "el navegador sigue abierto"
 *                   (alguna pestaña vivía y refrescaba el heartbeat) de "el navegador se cerró
 *                   y volvió a abrir" (heartbeat queda stale).
 *
 * Por qué localStorage (y no sessionStorage):
 * - sessionStorage es PER-PESTAÑA. Si el usuario abre la app en una pestaña nueva
 *   (ctrl+click, target="_blank", etc.), sessionStorage está vacío aunque el navegador
 *   siga abierto. El esquema previo expulsaba al usuario en ese caso.
 * - localStorage es compartido entre pestañas del mismo origen, así que el heartbeat
 *   de cualquier pestaña activa mantiene viva la sesión temporal para las demás.
 */
const PERSIST_KEY = 'finanzasu_persist'
const HEARTBEAT_KEY = 'finanzasu_heartbeat'
const HEARTBEAT_INTERVAL_MS = 30_000
const HEARTBEAT_STALE_MS = 90_000

function escribirHeartbeat() {
  try {
    localStorage.setItem(HEARTBEAT_KEY, String(Date.now()))
  } catch {
    // localStorage puede fallar en modo privado en algunos navegadores: ignoramos.
  }
}

function heartbeatReciente() {
  const ts = Number(localStorage.getItem(HEARTBEAT_KEY) || 0)
  return Number.isFinite(ts) && Date.now() - ts < HEARTBEAT_STALE_MS
}

function debeMantenerSesion() {
  return localStorage.getItem(PERSIST_KEY) === 'true' || heartbeatReciente()
}

function limpiarPersistencia() {
  try {
    localStorage.removeItem(PERSIST_KEY)
    localStorage.removeItem(HEARTBEAT_KEY)
  } catch {
    // Ver comentario en escribirHeartbeat.
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargandoAuth, setCargandoAuth] = useState(true)

  /**
   * Detecta si la URL actual corresponde al flujo de recuperacion
   * de contrasena. En ese caso NO se debe aplicar la limpieza
   * de sesion "Recordarme", porque Supabase establece una sesion
   * temporal de tipo PASSWORD_RECOVERY que necesitamos conservar.
   */
  const esFlujodeRecuperacion = () => {
    const path = window.location.pathname
    const hash = window.location.hash
    return (
      path === '/reset-password' ||
      hash.includes('type=recovery') ||
      hash.includes('access_token')
    )
  }

  useEffect(() => {
    let mounted = true
    let heartbeatInterval = null

    const iniciarHeartbeat = () => {
      escribirHeartbeat()
      if (!heartbeatInterval) {
        heartbeatInterval = setInterval(escribirHeartbeat, HEARTBEAT_INTERVAL_MS)
      }
    }

    const detenerHeartbeat = () => {
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval)
        heartbeatInterval = null
      }
    }

    obtenerSesionActual().then(({ data: { session } }) => {
      if (!mounted) return

      if (session?.user) {
        // Si NO hay marca persistente, NI hay heartbeat reciente (= alguna pestaña
        // de este navegador estuvo viva en los últimos HEARTBEAT_STALE_MS), y NO
        // estamos en el flujo de recovery, asumimos navegador cerrado y reabierto:
        // cerrar sesión.
        if (!debeMantenerSesion() && !esFlujodeRecuperacion()) {
          cerrarSesionUsuario().then(() => {
            if (mounted) {
              setUsuario(null)
              setCargandoAuth(false)
            }
          })
          return
        }

        iniciarHeartbeat()
      }

      setUsuario(session?.user ?? null)
      setCargandoAuth(false)
    })

    const { data: { subscription } } = escucharCambiosAuth(
      (evento, session) => {
        if (evento === 'PASSWORD_RECOVERY' && session?.user) {
          // La sesión de recovery es por definición temporal. Asegurar el flag
          // para que al terminar el flujo no quede persistente sin querer.
          try {
            localStorage.setItem(PERSIST_KEY, 'false')
          } catch { /* ver escribirHeartbeat */ }
          iniciarHeartbeat()
        }

        if (session?.user) {
          iniciarHeartbeat()
        } else {
          detenerHeartbeat()
          limpiarPersistencia()
        }

        setUsuario(session?.user ?? null)
        setCargandoAuth(false)
      }
    )

    return () => {
      mounted = false
      detenerHeartbeat()
      subscription.unsubscribe()
    }
  }, [])

  const registrar = async ({ nombre, email, password }) => {
    return registrarUsuario({ nombre, email, password })
  }

  /**
   * Inicia sesion con email/password.
   *
   * @param {Object} params
   * @param {string} params.email
   * @param {string} params.password
   * @param {boolean} [params.recordar=false] - Si true, la sesión persiste
   *   incluso después de cerrar el navegador. Si false, la sesión vive solo
   *   mientras alguna pestaña refresque el heartbeat (≤ HEARTBEAT_STALE_MS).
   */
  const iniciarSesion = async ({ email, password, recordar = false }) => {
    const data = await iniciarSesionUsuario({ email, password })

    try {
      localStorage.setItem(PERSIST_KEY, recordar ? 'true' : 'false')
    } catch { /* ver escribirHeartbeat */ }
    escribirHeartbeat()

    return data
  }

  /**
   * Cierra sesión y limpia ambos flags de persistencia.
   */
  const cerrarSesion = async () => {
    limpiarPersistencia()
    await cerrarSesionUsuario()
  }

  const actualizarPerfil = async ({ nombre, email }) => {
    const data = await actualizarPerfilUsuario({ nombre, email })
    if (data?.user) {
      setUsuario(data.user)
    }
    return data
  }

  const cambiarContrasena = async ({ newPassword }) => {
    const data = await cambiarContrasenaUsuario({ newPassword })
    if (data?.user) {
      setUsuario(data.user)
    }
    return data
  }

  /**
   * Solicita recuperacion de contrasena por correo.
   * Delega al servicio que devuelve un mensaje neutral.
   */
  const solicitarRecuperacion = async ({ email }) => {
    return solicitarRecuperacionContrasena({ email })
  }

  const value = useMemo(() => ({
    usuario,
    cargandoAuth,
    registrar,
    iniciarSesion,
    cerrarSesion,
    actualizarPerfil,
    cambiarContrasena,
    solicitarRecuperacion
  }), [usuario, cargandoAuth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de AuthProvider')
  }
  return context
}
