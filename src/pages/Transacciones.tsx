import { useState } from 'react'
import { Plus, Trash2, Pencil } from 'lucide-react'
import { useTransacciones } from '@/hooks/useTransacciones'
import { useCategorias } from '@/hooks/useCategorias'
import { formatMoneda } from '@/utils/formatMoneda'
import { formatFechaCorta, formatFechaInput } from '@/utils/dateHelpers'
import { formValidators, hasErrors, getFieldError } from '@/utils/validationHelpers'
import type { TipoTransaccion, Transaccion } from '@/types'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Spinner from '@/components/ui/Spinner'

const FORM_INICIAL = {
  monto: '',
  tipo: 'gasto' as TipoTransaccion,
  categoria_id: '',
  descripcion: '',
  fecha: formatFechaInput(new Date()),
}

export default function Transacciones() {
  const { transacciones, loading, crear, actualizar, eliminar } = useTransacciones()
  const { categorias } = useCategorias()

  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState<string | null>(null)
  const [editando, setEditando] = useState<Transaccion | null>(null)
  const [form, setForm] = useState(FORM_INICIAL)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const categoriasOpciones = categorias
    .filter((c) => c.tipo === form.tipo)
    .map((c) => ({ value: c.id, label: `${c.icono} ${c.nombre}` }))

  const validarFormulario = (formData: typeof form) => {
    const nuevosErrores = formValidators.transaccion(formData)
    setErrors(nuevosErrores)
    return !hasErrors(nuevosErrores)
  }

  const abrirCrear = () => {
    setEditando(null)
    setForm(FORM_INICIAL)
    setErrors({})
    setModalOpen(true)
  }

  const abrirEditar = (t: Transaccion) => {
    setEditando(t)
    setForm({
      monto: String(t.monto),
      tipo: t.tipo,
      categoria_id: t.categoria_id || '',
      descripcion: t.descripcion || '',
      fecha: t.fecha,
    })
    setErrors({})
    setModalOpen(true)
  }

  const cerrarModal = () => {
    setModalOpen(false)
    setErrors({})
  }

  const handleSubmit = async () => {
    if (!validarFormulario(form)) return
    try {
      if (editando) {
        await actualizar(editando.id, { ...form, monto: parseFloat(form.monto) })
      } else {
        await crear({ ...form, monto: parseFloat(form.monto) })
      }
      cerrarModal()
    } catch {
      // manejado por el hook
    }
  }

  const confirmarEliminar = async () => {
    if (deleteModal) {
      await eliminar(deleteModal)
      setDeleteModal(null)
    }
  }

  const filaIconBg = (t: Transaccion) => {
    if (t.tipo === 'ingreso') return 'bg-secondary-container text-secondary'
    const nombre = (t.categorias?.nombre || '').toLowerCase()
    if (nombre.includes('transporte')) return 'bg-primary-fixed text-primary'
    if (nombre.includes('ocio') || nombre.includes('suscrip')) return 'bg-tertiary-fixed-dim/40 text-tertiary'
    return 'bg-tertiary-fixed text-tertiary'
  }

  return (
    <div className="space-y-8 animate-fade-in pb-10">

      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tighter text-on-background mb-2">
            Transacciones
          </h2>
          <p className="text-on-surface-variant font-medium">
            Controla el flujo de tu libertad financiera.
          </p>
        </div>
        <button
          onClick={abrirCrear}
          className="flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-container text-white px-8 py-3.5 rounded-lg font-bold shadow-lg shadow-primary/20 hover:scale-[0.98] transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Añadir Transacción
        </button>
      </div>

      {/* Listado */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : transacciones.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-on-surface-variant">
          <Plus className="w-10 h-10 opacity-30" />
          <p className="font-medium">Sin movimientos. Registra tu primer ingreso o gasto.</p>
          <Button onClick={abrirCrear}>Nueva transacción</Button>
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/15">

          {/* Cabecera de columnas */}
          <div className="grid grid-cols-12 px-8 py-6 bg-surface-container-low border-b border-outline-variant/10">
            <div className="col-span-6 text-xs font-bold text-outline uppercase tracking-wider">
              Concepto y Categoría
            </div>
            <div className="col-span-3 text-xs font-bold text-outline uppercase tracking-wider">
              Fecha
            </div>
            <div className="col-span-3 text-xs font-bold text-outline uppercase tracking-wider text-right">
              Monto
            </div>
          </div>

          {/* Filas */}
          <div className="divide-y divide-outline-variant/10">
            {transacciones.map((t) => (
              <div
                key={t.id}
                className="grid grid-cols-12 px-8 py-6 items-center hover:bg-surface-container-low transition-colors group"
              >
                {/* Concepto */}
                <div className="col-span-6 flex items-center gap-4 min-w-0">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform text-xl ${filaIconBg(t)}`}
                  >
                    {t.categorias?.icono || '💳'}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-primary truncate">
                      {t.descripcion || 'Transacción'}
                    </p>
                    <p className="text-xs text-outline font-medium truncate">
                      {t.categorias?.nombre || 'Sin categoría'}
                    </p>
                  </div>
                </div>

                {/* Fecha */}
                <div className="col-span-3">
                  <p className="text-sm font-semibold text-on-surface-variant">
                    {formatFechaCorta(t.fecha)}
                  </p>
                </div>

                {/* Monto + acciones */}
                <div className="col-span-3 text-right flex items-center justify-end gap-3">
                  <p
                    className={`text-lg font-black tracking-tight ${
                      t.tipo === 'ingreso' ? 'text-secondary' : 'text-tertiary'
                    }`}
                  >
                    {t.tipo === 'ingreso' ? '+' : '-'} {formatMoneda(t.monto)}
                  </p>
                  <div className="hidden md:flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => abrirEditar(t)}
                      className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface-variant transition-colors cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteModal(t.id)}
                      className="p-2 rounded-lg bg-error-container hover:bg-error/20 text-error transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Crear / Editar */}
      <Modal
        isOpen={modalOpen}
        onClose={cerrarModal}
        title={editando ? 'Editar Transacción' : 'Nueva Transacción'}
        footer={
          <>
            <Button variant="ghost" onClick={cerrarModal}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={hasErrors(errors)}>
              {editando ? 'Guardar Cambios' : 'Crear'}
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          {/* Toggle tipo */}
          <div className="flex gap-3 bg-surface-container p-1.5 rounded-xl">
            {(['gasto', 'ingreso'] as TipoTransaccion[]).map((t) => (
              <button
                key={t}
                onClick={() => setForm((f) => ({ ...f, tipo: t, categoria_id: '' }))}
                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all shadow-sm cursor-pointer
                  ${
                    form.tipo === t
                      ? t === 'ingreso'
                        ? 'bg-secondary text-white'
                        : 'bg-error text-white'
                      : 'bg-transparent shadow-none text-on-surface-variant hover:text-on-surface'
                  }`}
              >
                {t === 'ingreso' ? 'Ingreso' : 'Gasto'}
              </button>
            ))}
          </div>

          <Input
            id="tx-monto"
            label="Monto (COP)"
            type="number"
            placeholder="50000"
            value={form.monto}
            error={getFieldError(errors, 'monto')}
            onChange={(e) => {
              const newForm = { ...form, monto: e.target.value }
              setForm(newForm)
              validarFormulario(newForm)
            }}
          />

          <Select
            id="tx-categoria"
            label="Categoría"
            options={categoriasOpciones}
            value={form.categoria_id}
            error={getFieldError(errors, 'categoria_id')}
            onChange={(e) => {
              const newForm = { ...form, categoria_id: e.target.value }
              setForm(newForm)
              validarFormulario(newForm)
            }}
          />

          <Input
            id="tx-desc"
            label="Descripción (opcional)"
            placeholder="Ej. Almuerzo, Transporte"
            value={form.descripcion}
            onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
          />

          <Input
            id="tx-fecha"
            label="Fecha"
            type="date"
            value={form.fecha}
            error={getFieldError(errors, 'fecha')}
            onChange={(e) => {
              const newForm = { ...form, fecha: e.target.value }
              setForm(newForm)
              validarFormulario(newForm)
            }}
          />
        </div>
      </Modal>

      {/* Modal Confirmar Eliminar */}
      <Modal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Eliminar transacción"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteModal(null)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmarEliminar}>
              Eliminar
            </Button>
          </>
        }
      >
        <p className="text-on-surface-variant font-medium">
          ¿Estás seguro? Esta acción no se puede deshacer.
        </p>
      </Modal>
    </div>
  )
}