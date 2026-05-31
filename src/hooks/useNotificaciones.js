import { useNotificationsContext } from '../context/NotificationsContext'

export function useNotificaciones() {
  const {
    notificaciones,
    noLeidas,
    cargandoNotificaciones,
    errorNotificaciones,
    cargarNotificaciones,
    registrarNotificacion,
    marcarLeida,
    marcarTodasLeidas,
    borrarNotificacionIndividual,
    borrarNotificacionesLeidas,
    limpiarNotificaciones
  } = useNotificationsContext()

  return {
    notificaciones,
    noLeidas,
    cargando: cargandoNotificaciones,
    error: errorNotificaciones,
    cargarNotificaciones,
    registrarNotificacion,
    marcarLeida,
    marcarTodasLeidas,
    borrarNotificacion: borrarNotificacionIndividual,
    borrarNotificacionesLeidas,
    limpiarNotificaciones
  }
}