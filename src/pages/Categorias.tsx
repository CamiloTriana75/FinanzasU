import { useState } from 'react'
import { Plus, Trash2, Pencil } from 'lucide-react'
import { useCategorias } from '@/hooks/useCategorias'
import { EMOJIS_DISPONIBLES } from '@/utils/constants'
import { formValidators, hasErrors, getFieldError } from '@/utils/validationHelpers'
import type { TipoTransaccion } from '@/types'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Spinner from '@/components/ui/Spinner'

const FORM_INICIAL = {
  nombre: '',
  tipo: 'gasto' as TipoTransaccion,
  icono: '📂',
}

export default function Categorias() {
  const { predeterminadas, personalizadas, loading, crear, actualizar, eliminar } = useCategorias()

  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState<string | null>(null)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(FORM_INICIAL)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validarFormulario = (formData: typeof form) => {
    const nuevosErrores = formValidators.categoria(formData)
    setErrors(nuevosErrores)
    return !hasErrors(nuevosErrores)
  }

  const abrirCrear = () => {
    setEditId(null)
    setForm(FORM_INICIAL)
    setErrors({})
    setModalOpen(true)
  }

  const abrirEditar = (id: string, nombre: string, tipo: TipoTransaccion, icono: string) => {
    setEditId(id)
    setForm({ nombre, tipo, icono })
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
      if (editId) {
        await actualizar(editId, form)
      } else {
        await crear(form)
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

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  return (
    <div className="space-y-10 animate-fade-in pb-16">

      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tighter text-on-background mb-2">
            Categorías
          </h2>
          <p className="text-on-surface-variant font-medium">
            Organiza tus ingresos y gastos por categoría.
          </p>
        </div>
        <Button onClick={abrirCrear} size="md" icon={Plus}>
          Agregar categoría
        </Button>
      </div>

      {/* Categorías personalizadas */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-outline">
          Mis categorías ({personalizadas.length})
        </h3>

        {personalizadas.length === 0 ? (
          <Card padding="p-10" className="text-center shadow-sm">
            <p className="text-on-surface font-semibold text-lg">
              No tienes categorías personalizadas
            </p>
            <p className="text-on-surface-variant text-sm mt-1">
              Crea una para organizar mejor tus transacciones.
            </p>
            <Button onClick={abrirCrear} className="mt-4">
              Nueva categoría
            </Button>
          </Card>
        ) : (
          <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/15">

            {/* Cabecera de columnas */}
            <div className="grid grid-cols-12 px-8 py-5 bg-surface-container-low border-b border-outline-variant/10">
              <div className="col-span-6 text-xs font-bold text-outline uppercase tracking-wider">
                Nombre
              </div>
              <div className="col-span-4 text-xs font-bold text-outline uppercase tracking-wider">
                Tipo
              </div>
              <div className="col-span-2 text-xs font-bold text-outline uppercase tracking-wider text-right">
                Acciones
              </div>
            </div>

            {/* Filas */}
            <div className="divide-y divide-outline-variant/10">
              {personalizadas.map((c) => (
                <div
                  key={c.id}
                  className="grid grid-cols-12 px-8 py-5 items-center hover:bg-surface-container-low transition-colors group"
                >
                  <div className="col-span-6 flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-primary-fixed flex items-center justify-center text-2xl group-hover:scale-110 transition-transform flex-shrink-0">
                      {c.icono}
                    </div>
                    <p className="font-bold text-on-surface truncate">{c.nombre}</p>
                  </div>

                  <div className="col-span-4">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        c.tipo === 'ingreso'
                          ? 'bg-secondary-container text-on-secondary-fixed'
                          : 'bg-tertiary-fixed text-tertiary'
                      }`}
                    >
                      {c.tipo === 'ingreso' ? 'Ingreso' : 'Gasto'}
                    </span>
                  </div>

                  <div className="col-span-2 flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => abrirEditar(c.id, c.nombre, c.tipo, c.icono)}
                      className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface-variant transition-colors cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteModal(c.id)}
                      className="p-2 rounded-lg bg-error-container hover:bg-error/20 text-error transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Categorías predeterminadas (solo lectura) */}
      {predeterminadas.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-outline">
            Categorías del sistema ({predeterminadas.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {predeterminadas.map((c) => (
              <Card
                key={c.id}
                padding="p-4"
                variant="solid"
                className="text-center opacity-80 shadow-none border-dashed border-2 rounded-2xl"
              >
                <span className="text-3xl block mb-2 grayscale opacity-80">{c.icono}</span>
                <p className="text-sm font-bold text-on-surface truncate">{c.nombre}</p>
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest mt-1 block ${
                    c.tipo === 'ingreso' ? 'text-secondary' : 'text-tertiary'
                  }`}
                >
                  {c.tipo === 'ingreso' ? 'Ingreso' : 'Gasto'}
                </span>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* FAB móvil */}
      <div className="fixed bottom-8 right-8 z-40 md:hidden">
        <button
          onClick={abrirCrear}
          className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Modal Crear / Editar */}
      <Modal
        isOpen={modalOpen}
        onClose={cerrarModal}
        title={editId ? 'Editar categoría' : 'Nueva categoría'}
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={cerrarModal}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={hasErrors(errors)}>
              {editId ? 'Guardar' : 'Crear categoría'}
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <Input
            id="cat-nombre"
            label="Nombre de la categoría"
            placeholder="Ej. Suscripciones"
            value={form.nombre}
            error={getFieldError(errors, 'nombre')}
            onChange={(e) => {
              const newForm = { ...form, nombre: e.target.value }
              setForm(newForm)
              validarFormulario(newForm)
            }}
          />

          <div className="space-y-2">
            <span className="block text-sm font-semibold text-on-surface ml-1">Tipo</span>
            <div className="flex gap-3 bg-surface-container p-1.5 rounded-xl">
              {(['gasto', 'ingreso'] as TipoTransaccion[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setForm((f) => ({ ...f, tipo: t }))}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm cursor-pointer
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
          </div>

          <div>
            <p className="block text-sm font-semibold text-on-surface ml-1 mb-3">Ícono</p>
            <div className="grid grid-cols-6 gap-2 bg-surface-container-lowest border border-outline-variant/20 p-3 rounded-xl max-h-48 overflow-y-auto">
              {EMOJIS_DISPONIBLES.map((e) => (
                <button
                  key={e}
                  onClick={() => setForm((f) => ({ ...f, icono: e }))}
                  className={`p-2 rounded-xl text-2xl hover:bg-surface-container transition-all cursor-pointer transform hover:scale-110
                    ${form.icono === e ? 'bg-primary-fixed shadow-inner ring-2 ring-primary ring-offset-1' : ''}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal Confirmar Eliminar */}
      <Modal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Confirmar eliminación"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteModal(null)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmarEliminar}>
              Eliminar categoría
            </Button>
          </>
        }
      >
        <p className="text-on-surface-variant font-medium">
          ¿Seguro que deseas eliminar esta categoría? Las transacciones que la usan quedarán sin
          asignar.
        </p>
      </Modal>
    </div>
  )
}