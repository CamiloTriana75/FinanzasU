import { useState, useCallback } from 'react'
import { X, ArrowDownLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { useAppDataContext } from '../../context/AppDataContext'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hoy() {
  return new Date().toISOString().split('T')[0]
}

const ESTADO_INICIAL = {
  monto: '',
  categoriaId: '',
  fecha: hoy(),
  descripcion: ''
}

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Modal de depósito – HU-19
 *
 * Props:
 *   abierto   {boolean}   - controla visibilidad
 *   onCerrar  {function}  - callback para cerrar el modal
 */
export default function ModalDeposito({ abierto, onCerrar }) {
  const { categorias, crearTransaccion } = useAppDataContext()

  const [form, setForm] = useState(ESTADO_INICIAL)
  const [errores, setErrores] = useState({})
  const [cargando, setCargando] = useState(false)
  const [exito, setExito] = useState(false)
  const [errorServidor, setErrorServidor] = useState('')

  // Solo categorías de tipo ingreso (o todas si no hay distinción)
  const categoriasIngreso = categorias.filter(
    (c) => !c.tipo || c.tipo === 'ingreso'
  )

  // ── Validación ─────────────────────────────────────────────────────────────
  const validar = useCallback(() => {
    const nuevosErrores = {}

    const montoNum = Number(String(form.monto).replace(/\./g, '').replace(',', '.'))
    if (!form.monto || isNaN(montoNum) || montoNum <= 0) {
      nuevosErrores.monto = 'El monto debe ser un número mayor a cero.'
    }

    if (!form.categoriaId) {
      nuevosErrores.categoriaId = 'Selecciona una categoría.'
    }

    if (!form.fecha) {
      nuevosErrores.fecha = 'La fecha es obligatoria.'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }, [form])

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrores((prev) => ({ ...prev, [name]: '' }))
    setErrorServidor('')
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (!validar()) return

    setCargando(true)
    setErrorServidor('')

    try {
      const montoNum = parseFloat(
        String(form.monto).replace(/\./g, '').replace(',', '.')
      )

      await crearTransaccion({
        tipo: 'ingreso',
        monto: montoNum,
        descripcion: form.descripcion.trim() || null,
        categoriaId: Number(form.categoriaId),
        fecha: form.fecha
      })

      setExito(true)

      // Cerrar tras 1.8 s mostrando el mensaje de éxito
      setTimeout(() => {
        setExito(false)
        setForm(ESTADO_INICIAL)
        setErrores({})
        onCerrar()
      }, 1800)
    } catch (err) {
      setErrorServidor(err.message || 'No se pudo registrar el depósito. Intenta nuevamente.')
    } finally {
      setCargando(false)
    }
  }, [form, crearTransaccion, onCerrar, validar])

  const handleCerrar = useCallback(() => {
    if (cargando) return
    setForm(ESTADO_INICIAL)
    setErrores({})
    setErrorServidor('')
    setExito(false)
    onCerrar()
  }, [cargando, onCerrar])

  if (!abierto) return null

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) handleCerrar() }}
    >
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl shadow-[#24389c]/20 overflow-hidden">

        {/* ── Header ── */}
        <div className="editorial-gradient p-6 relative">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#83fba5]/20 rounded-xl flex items-center justify-center">
                <ArrowDownLeft className="w-5 h-5 text-[#83fba5]" />
              </div>
              <div>
                <h2 className="font-headline font-bold text-white text-lg leading-tight">
                  Nuevo Depósito
                </h2>
                <p className="text-white/60 text-xs">Registra un ingreso desde el dashboard</p>
              </div>
            </div>
            <button
              onClick={handleCerrar}
              disabled={cargando}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Decorativo */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        </div>

        {/* ── Éxito ── */}
        {exito ? (
          <div className="flex flex-col items-center justify-center gap-4 py-14 px-8">
            <div className="w-16 h-16 rounded-full bg-[#d1fae5] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#006d36]" />
            </div>
            <div className="text-center">
              <p className="font-headline font-bold text-[#191c1d] text-lg">¡Depósito registrado!</p>
              <p className="text-sm text-[#757684] mt-1">Tu saldo ha sido actualizado correctamente.</p>
            </div>
          </div>
        ) : (
          /* ── Formulario ── */
          <form onSubmit={handleSubmit} noValidate className="p-6 space-y-5">

            {/* Error del servidor */}
            {errorServidor && (
              <div className="flex items-start gap-3 bg-[#ffdad6] text-[#93000a] rounded-xl px-4 py-3 text-sm font-medium">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{errorServidor}</span>
              </div>
            )}

            {/* Monto */}
            <div>
              <label className="block text-xs font-bold text-[#454652] uppercase tracking-widest mb-1.5">
                Monto <span className="text-[#ba1a1a]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#757684] font-bold text-sm pointer-events-none">
                  $
                </span>
                <input
                  type="number"
                  name="monto"
                  value={form.monto}
                  onChange={handleChange}
                  placeholder="0"
                  min="1"
                  step="any"
                  disabled={cargando}
                  className={`w-full pl-8 pr-4 py-3 rounded-xl border bg-[#f8f9fa] text-[#191c1d] font-headline font-bold text-lg focus:outline-none focus:ring-2 transition-all disabled:opacity-60
                    ${errores.monto
                      ? 'border-[#ba1a1a] focus:ring-[#ba1a1a]/30'
                      : 'border-[#c5c5d4]/40 focus:ring-[#24389c]/30 focus:border-[#24389c]'
                    }`}
                />
              </div>
              {errores.monto && (
                <p className="mt-1.5 text-xs text-[#ba1a1a] font-medium">{errores.monto}</p>
              )}
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-xs font-bold text-[#454652] uppercase tracking-widest mb-1.5">
                Categoría <span className="text-[#ba1a1a]">*</span>
              </label>
              <select
                name="categoriaId"
                value={form.categoriaId}
                onChange={handleChange}
                disabled={cargando}
                className={`w-full px-4 py-3 rounded-xl border bg-[#f8f9fa] text-[#191c1d] font-medium focus:outline-none focus:ring-2 transition-all disabled:opacity-60 appearance-none cursor-pointer
                  ${errores.categoriaId
                    ? 'border-[#ba1a1a] focus:ring-[#ba1a1a]/30'
                    : 'border-[#c5c5d4]/40 focus:ring-[#24389c]/30 focus:border-[#24389c]'
                  }`}
              >
                <option value="">Selecciona una categoría…</option>
                {categoriasIngreso.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icono ? `${cat.icono} ` : ''}{cat.nombre}
                  </option>
                ))}
              </select>
              {errores.categoriaId && (
                <p className="mt-1.5 text-xs text-[#ba1a1a] font-medium">{errores.categoriaId}</p>
              )}
            </div>

            {/* Fecha */}
            <div>
              <label className="block text-xs font-bold text-[#454652] uppercase tracking-widest mb-1.5">
                Fecha <span className="text-[#ba1a1a]">*</span>
              </label>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                disabled={cargando}
                className={`w-full px-4 py-3 rounded-xl border bg-[#f8f9fa] text-[#191c1d] font-medium focus:outline-none focus:ring-2 transition-all disabled:opacity-60
                  ${errores.fecha
                    ? 'border-[#ba1a1a] focus:ring-[#ba1a1a]/30'
                    : 'border-[#c5c5d4]/40 focus:ring-[#24389c]/30 focus:border-[#24389c]'
                  }`}
              />
              {errores.fecha && (
                <p className="mt-1.5 text-xs text-[#ba1a1a] font-medium">{errores.fecha}</p>
              )}
            </div>

            {/* Descripción (opcional) */}
            <div>
              <label className="block text-xs font-bold text-[#454652] uppercase tracking-widest mb-1.5">
                Descripción <span className="text-[#757684] font-normal normal-case">(opcional)</span>
              </label>
              <input
                type="text"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Ej: Mesada, venta de apuntes…"
                maxLength={120}
                disabled={cargando}
                className="w-full px-4 py-3 rounded-xl border border-[#c5c5d4]/40 bg-[#f8f9fa] text-[#191c1d] font-medium placeholder:text-[#c5c5d4] focus:outline-none focus:ring-2 focus:ring-[#24389c]/30 focus:border-[#24389c] transition-all disabled:opacity-60"
              />
            </div>

            {/* Acciones */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={handleCerrar}
                disabled={cargando}
                className="flex-1 py-3 rounded-xl border border-[#c5c5d4]/40 text-[#454652] font-bold text-sm hover:bg-[#f3f4f5] transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={cargando}
                className="flex-1 py-3 rounded-xl bg-[#83fba5] text-[#00210c] font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60 shadow-lg shadow-[#006d36]/20"
              >
                {cargando ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Registrando…
                  </>
                ) : (
                  <>
                    <ArrowDownLeft className="w-4 h-4" />
                    Depositar
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
