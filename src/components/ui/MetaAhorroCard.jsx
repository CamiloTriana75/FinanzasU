import { useState, useMemo } from 'react'
import { Target, Edit3, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppDataContext } from '../../context/AppDataContext'

/**
 * Formatea un número como moneda colombiana (COP) sin decimales.
 */
function formatCOP(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(valor)
}

/**
 * Calcula el ahorro real del mes actual a partir de las transacciones.
 * Ahorro real = ingresos del mes - gastos del mes.
 */
function calcularAhorroMesActual(transacciones) {
  const ahora = new Date()
  const mesActual = ahora.getMonth() + 1
  const anioActual = ahora.getFullYear()

  return transacciones.reduce((acum, t) => {
    const [anioTxt, mesTxt] = String(t.fecha || '').split('-')
    if (Number(anioTxt) !== anioActual || Number(mesTxt) !== mesActual) return acum
    const monto = Number(t.monto || 0)
    return t.tipo === 'ingreso' ? acum + monto : acum - monto
  }, 0)
}

/**
 * Determina el estado visual de la meta de ahorro:
 * - sin_meta:    Meta == 0, aún no configurada.
 * - cumplido:    Ahorro real >= Meta.
 * - en_progreso: Ahorro real > 0 pero menor que la meta.
 * - en_riesgo:   Ahorro real <= 0 (gastos >= ingresos este mes).
 */
function calcularEstado(metaAhorro, ahorroReal) {
  if (metaAhorro <= 0) return 'sin_meta'
  if (ahorroReal >= metaAhorro) return 'cumplido'
  if (ahorroReal > 0) return 'en_progreso'
  return 'en_riesgo'
}

const ESTADO_CONFIG = {
  sin_meta: {
    label: 'Sin meta configurada',
    color: 'text-[#757684]',
    barColor: 'bg-[#c5c5d4]',
    bgChip: 'bg-[#f1f3f9] text-[#757684]',
    icono: '⚪'
  },
  cumplido: {
    label: '¡Meta cumplida!',
    color: 'text-emerald-700',
    barColor: 'bg-emerald-500',
    bgChip: 'bg-emerald-50 text-emerald-700',
    icono: '🟢'
  },
  en_progreso: {
    label: 'En progreso',
    color: 'text-amber-700',
    barColor: 'bg-amber-400',
    bgChip: 'bg-amber-50 text-amber-700',
    icono: '🟡'
  },
  en_riesgo: {
    label: 'En riesgo',
    color: 'text-red-700',
    barColor: 'bg-red-400',
    bgChip: 'bg-red-50 text-red-700',
    icono: '🔴'
  }
}

/**
 * MetaAhorroCard — Tarjeta reutilizable para ver y editar la meta de ahorro mensual.
 *
 * Se puede colocar en el Dashboard y en la vista de Presupuestos.
 * Calcula el ahorro real del mes actual usando las transacciones del contexto.
 */
export default function MetaAhorroCard() {
  const { metaAhorro, transacciones, actualizarMetaAhorro } = useAppDataContext()

  const [editando, setEditando] = useState(false)
  const [inputMeta, setInputMeta] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [errorInput, setErrorInput] = useState('')

  const ahorroReal = useMemo(() => calcularAhorroMesActual(transacciones), [transacciones])
  const estado = calcularEstado(metaAhorro, ahorroReal)
  const config = ESTADO_CONFIG[estado]

  // Porcentaje de avance (limitado entre 0 y 100 visualmente)
  const porcentaje = metaAhorro > 0
    ? Math.min(100, Math.max(0, (ahorroReal / metaAhorro) * 100))
    : 0

  const mesActual = new Date().toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })

  // Abrir edición con el valor actual pre-rellenado
  const abrirEdicion = () => {
    setInputMeta(metaAhorro > 0 ? String(metaAhorro) : '')
    setErrorInput('')
    setEditando(true)
  }

  const cancelarEdicion = () => {
    setEditando(false)
    setErrorInput('')
    setInputMeta('')
  }

  const guardarMeta = async () => {
    const valor = Number(inputMeta)

    if (inputMeta.trim() === '' || !Number.isFinite(valor) || valor < 0) {
      setErrorInput('Ingresa un monto válido (mayor o igual a 0).')
      return
    }

    if (valor > 999_999_999) {
      setErrorInput('El monto no puede superar 999,999,999.')
      return
    }

    try {
      setGuardando(true)
      await actualizarMetaAhorro(valor)
      toast.success('Meta de ahorro actualizada.')
      setEditando(false)
      setInputMeta('')
    } catch (err) {
      toast.error(err?.message || 'No se pudo guardar la meta.')
    } finally {
      setGuardando(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') guardarMeta()
    if (e.key === 'Escape') cancelarEdicion()
  }

  return (
    <div className="rounded-2xl border border-[#e8e9f0] bg-white shadow-sm p-6 transition-shadow hover:shadow-md">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#24389c]/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-[#24389c]" />
          </div>
          <div>
            <p className="font-semibold text-[#191c1d] text-sm leading-tight">Meta de ahorro mensual</p>
            <p className="text-xs text-[#757684] capitalize">{mesActual}</p>
          </div>
        </div>

        {/* Estado chip */}
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${config.bgChip}`}>
          {config.icono} {config.label}
        </span>
      </div>

      {/* Montos */}
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-2xl font-extrabold text-[#191c1d] tracking-tight">
            {formatCOP(Math.max(0, ahorroReal))}
          </p>
          <p className="text-xs text-[#757684] mt-0.5">
            ahorrado {ahorroReal < 0 ? <span className="text-red-600 font-semibold">(déficit {formatCOP(Math.abs(ahorroReal))})</span> : ''}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-[#454652]">
            {metaAhorro > 0 ? formatCOP(metaAhorro) : '—'}
          </p>
          <p className="text-xs text-[#757684]">meta</p>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="h-2 bg-[#f1f3f9] rounded-full overflow-hidden mb-4">
        <div
          className={`h-full rounded-full transition-all duration-700 ${config.barColor}`}
          style={{ width: `${porcentaje}%` }}
        />
      </div>

      {/* Porcentaje */}
      {metaAhorro > 0 && (
        <p className={`text-xs font-semibold mb-4 ${config.color}`}>
          {porcentaje.toFixed(1)}% de la meta alcanzado
        </p>
      )}

      {/* Editor de meta */}
      {editando ? (
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number"
                min="0"
                max="999999999"
                step="1000"
                value={inputMeta}
                onChange={(e) => { setInputMeta(e.target.value); setErrorInput('') }}
                onKeyDown={handleKeyDown}
                placeholder="Ej: 500000"
                autoFocus
                className="w-full border border-[#c5c5d4] rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#24389c]/30 focus:border-[#24389c] transition-all"
              />
              {errorInput && <p className="text-xs text-red-600 mt-1">{errorInput}</p>}
            </div>
            <button
              onClick={guardarMeta}
              disabled={guardando}
              className="w-10 h-10 bg-[#24389c] text-white rounded-xl flex items-center justify-center hover:bg-[#1a2b7a] transition-colors disabled:opacity-50 shrink-0"
              title="Guardar"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={cancelarEdicion}
              className="w-10 h-10 border border-[#e8e9f0] text-[#757684] rounded-xl flex items-center justify-center hover:bg-[#f1f3f9] transition-colors shrink-0"
              title="Cancelar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={abrirEdicion}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#e8e9f0] rounded-xl text-sm font-semibold text-[#454652] hover:bg-[#f1f3f9] hover:border-[#24389c]/30 hover:text-[#24389c] transition-all duration-200"
        >
          <Edit3 className="w-4 h-4" />
          {metaAhorro > 0 ? 'Editar meta' : 'Configurar meta de ahorro'}
        </button>
      )}
    </div>
  )
}
