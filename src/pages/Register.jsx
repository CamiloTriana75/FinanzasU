import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AtSign, Lock, User, Wallet, Eye, EyeOff, Loader2, Users, Sparkles, BarChart3 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { EMAIL_REGEX, PASSWORD_MIN_LENGTH } from '../utils/constants'

const PERKS = [
  { icon: BarChart3, title: 'Todo en un panel', desc: 'Ingresos, gastos y presupuestos en un vistazo.' },
  { icon: Sparkles, title: 'Gratis para estudiantes', desc: 'Sin costos ocultos ni tarjetas requeridas.' },
  { icon: Users, title: 'Miles ya lo usan', desc: 'Únete a la comunidad FinanzasU.' },
]

export default function Register() {
  const { registrar } = useAuth()
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const e = {}
    if (!nombre.trim()) e.nombre = 'El nombre es obligatorio'
    if (!email) e.email = 'El correo es obligatorio'
    else if (!EMAIL_REGEX.test(email)) e.email = 'Correo no válido'
    if (!password) e.password = 'La contraseña es obligatoria'
    else if (password.length < PASSWORD_MIN_LENGTH) {
      e.password = `Mínimo ${PASSWORD_MIN_LENGTH} caracteres`
    }
    if (password !== confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    if (!validate()) return
    try {
      setLoading(true)
      const data = await registrar({ nombre, email, password })
      toast.success('Cuenta creada correctamente.')
      if (data.session) {
        navigate('/dashboard', { replace: true })
      } else {
        navigate('/login', {
          replace: true,
          state: {
            mensaje: 'Cuenta creada. Revisa tu correo para confirmar el acceso antes de iniciar sesión.'
          }
        })
      }
    } catch (err) {
      const msg = err?.message || 'Error al registrarse. Intenta de nuevo.'
      setServerError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#f8f9fa] font-body text-[#191c1d] min-h-screen">
      <main className="flex min-h-screen">
        {/* ── Panel de marca (gradiente verde, distintivo del registro) ── */}
        <section
          className="hidden lg:flex lg:w-1/2 relative items-center overflow-hidden p-16"
          style={{ background: 'linear-gradient(135deg, #006d36 0%, #005227 100%)' }}
        >
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute right-24 top-10 w-44 h-44 bg-[#83fba5]/30 rounded-full blur-2xl" />
          <div className="absolute -left-12 top-1/3 w-64 h-64 bg-[#24389c]/25 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-xl">
            <span className="inline-block text-white/75 text-sm font-semibold tracking-wide mb-6">
              Tu futuro financiero comienza aquí
            </span>
            <h1 className="font-headline font-extrabold text-white text-5xl xl:text-6xl tracking-tighter leading-[1.05] mb-6">
              Únete a la<br />Comunidad<br />FinanzasU.
            </h1>
            <p className="text-[#c8ffd9] text-lg leading-relaxed font-medium mb-12 max-w-md">
              Miles de estudiantes ya controlan sus finanzas de manera inteligente.
            </p>

            <ul className="space-y-5">
              {PERKS.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#83fba5]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-white">{title}</p>
                    <p className="text-white/70 text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute bottom-12 left-16 flex items-center gap-2 z-10">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-md">
              <Wallet className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="font-headline font-bold text-white text-xl tracking-tighter">FinanzasU</span>
          </div>
        </section>

        {/* ── Formulario en tarjeta blanca ── */}
        <section className="w-full lg:w-1/2 flex items-center justify-center p-5 sm:p-10 lg:p-16">
          <div className="w-full max-w-md animate-fade-in">
            <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
              <div className="w-10 h-10 rounded-lg editorial-gradient flex items-center justify-center shadow-lg">
                <Wallet className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="font-headline font-extrabold text-[#24389c] text-2xl tracking-tighter">FinanzasU</span>
            </div>

            <div className="auth-card p-7 sm:p-9">
              <div className="mb-7">
                <h2 className="font-headline font-extrabold text-3xl sm:text-4xl tracking-tight mb-2">Crear cuenta.</h2>
                <p className="text-[#454652] font-medium">Completa el formulario y comienza a gestionar tus finanzas.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold ml-1" htmlFor="reg-nombre">Nombre completo</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757684] group-focus-within:text-[#24389c] transition-colors pointer-events-none" aria-hidden="true" />
                    <input
                      id="reg-nombre"
                      type="text"
                      autoComplete="name"
                      placeholder="Tu nombre completo"
                      value={nombre}
                      aria-invalid={errors.nombre ? 'true' : undefined}
                      aria-describedby={errors.nombre ? 'reg-nombre-error' : undefined}
                      onChange={(e) => {
                        setNombre(e.target.value)
                        setErrors((p) => ({ ...p, nombre: '' }))
                      }}
                      className={`w-full pl-12 pr-4 py-4 bg-[#f8f9fa] border rounded-xl text-[#191c1d] outline-none transition-all duration-200 placeholder:text-[#757684]/50 focus:bg-white focus:ring-4 focus:ring-[#dee0ff] focus:border-[#24389c] ${errors.nombre ? 'border-red-600' : 'border-[#c5c5d4]/40'}`}
                    />
                  </div>
                  {errors.nombre && <p id="reg-nombre-error" className="text-xs text-red-700 ml-1">{errors.nombre}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold ml-1" htmlFor="reg-email">Correo universitario</label>
                  <div className="relative group">
                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757684] group-focus-within:text-[#24389c] transition-colors pointer-events-none" aria-hidden="true" />
                    <input
                      id="reg-email"
                      type="email"
                      autoComplete="email"
                      placeholder="nombre@universidad.edu"
                      value={email}
                      aria-invalid={errors.email ? 'true' : undefined}
                      aria-describedby={errors.email ? 'reg-email-error' : undefined}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setErrors((p) => ({ ...p, email: '' }))
                      }}
                      className={`w-full pl-12 pr-4 py-4 bg-[#f8f9fa] border rounded-xl text-[#191c1d] outline-none transition-all duration-200 placeholder:text-[#757684]/50 focus:bg-white focus:ring-4 focus:ring-[#dee0ff] focus:border-[#24389c] ${errors.email ? 'border-red-600' : 'border-[#c5c5d4]/40'}`}
                    />
                  </div>
                  {errors.email && <p id="reg-email-error" className="text-xs text-red-700 ml-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold ml-1" htmlFor="reg-password">Contraseña</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757684] group-focus-within:text-[#24389c] transition-colors pointer-events-none" aria-hidden="true" />
                    <input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      aria-invalid={errors.password ? 'true' : undefined}
                      aria-describedby={errors.password ? 'reg-password-error' : undefined}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setErrors((p) => ({ ...p, password: '' }))
                      }}
                      className={`w-full pl-12 pr-12 py-4 bg-[#f8f9fa] border rounded-xl text-[#191c1d] outline-none transition-all duration-200 placeholder:text-[#757684]/50 focus:bg-white focus:ring-4 focus:ring-[#dee0ff] focus:border-[#24389c] ${errors.password ? 'border-red-600' : 'border-[#c5c5d4]/40'}`}
                    />
                    <button
                      className="auth-icon-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" aria-hidden="true" /> : <Eye className="w-5 h-5" aria-hidden="true" />}
                    </button>
                  </div>
                  {errors.password && <p id="reg-password-error" className="text-xs text-red-700 ml-1">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold ml-1" htmlFor="reg-confirm">Confirmar contraseña</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757684] group-focus-within:text-[#24389c] transition-colors pointer-events-none" aria-hidden="true" />
                    <input
                      id="reg-confirm"
                      type={showConfirm ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Repite la contraseña"
                      value={confirmPassword}
                      aria-invalid={errors.confirmPassword ? 'true' : undefined}
                      aria-describedby={errors.confirmPassword ? 'reg-confirm-error' : undefined}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        setErrors((p) => ({ ...p, confirmPassword: '' }))
                      }}
                      className={`w-full pl-12 pr-12 py-4 bg-[#f8f9fa] border rounded-xl text-[#191c1d] outline-none transition-all duration-200 placeholder:text-[#757684]/50 focus:bg-white focus:ring-4 focus:ring-[#dee0ff] focus:border-[#24389c] ${errors.confirmPassword ? 'border-red-600' : 'border-[#c5c5d4]/40'}`}
                    />
                    <button
                      className="auth-icon-btn"
                      onClick={() => setShowConfirm(!showConfirm)}
                      type="button"
                      aria-label={showConfirm ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      aria-pressed={showConfirm}
                    >
                      {showConfirm ? <EyeOff className="w-5 h-5" aria-hidden="true" /> : <Eye className="w-5 h-5" aria-hidden="true" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p id="reg-confirm-error" className="text-xs text-red-700 ml-1">{errors.confirmPassword}</p>}
                </div>

                {serverError && (
                  <p className="text-red-700 text-sm bg-red-50 border border-red-200 px-3 py-2 rounded-lg" role="alert">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 editorial-gradient text-white font-bold rounded-xl shadow-lg shadow-[#24389c]/20 hover:opacity-90 active:scale-[0.98] transition-all duration-200 text-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />}
                  {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </button>
              </form>

              <div className="mt-7 text-center">
                <p className="text-[#454652] font-medium">
                  ¿Ya tienes cuenta?
                  <Link to="/login" className="text-[#24389c] font-bold hover:underline ml-1">Inicia sesión</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
