import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Wallet, Mail, Lock, Eye, EyeOff, Loader2, TrendingUp, PiggyBank, ShieldCheck } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { EMAIL_REGEX } from '../utils/constants'

const FEATURES = [
  { icon: TrendingUp, title: 'Controla tus gastos', desc: 'Visualiza a dónde va tu dinero cada mes.' },
  { icon: PiggyBank, title: 'Metas de ahorro', desc: 'Define objetivos y sigue tu progreso en tiempo real.' },
  { icon: ShieldCheck, title: 'Datos protegidos', desc: 'Tu información financiera siempre segura.' },
]

export default function Login() {
  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const mensaje = location.state?.mensaje || ''

  const validate = () => {
    const e = {}
    if (!email) e.email = 'El correo es obligatorio'
    else if (!EMAIL_REGEX.test(email)) e.email = 'Correo no válido'
    if (!password) e.password = 'La contraseña es obligatoria'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    if (!validate()) return
    try {
      setLoading(true)
      await iniciarSesion({ email, password, recordar: remember })
      toast.success('Inicio de sesión exitoso.')
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const msg = err?.message || 'Correo o contraseña incorrectos.'
      setServerError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#f8f9fa] font-body text-[#191c1d] min-h-screen">
      <main className="flex min-h-screen">
        {/* ── Panel de marca (estilo hero del dashboard) ── */}
        <section className="hidden lg:flex lg:w-1/2 relative items-center overflow-hidden editorial-gradient p-16">
          {/* Decoración difuminada, visible como en el dashboard */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute right-24 top-10 w-44 h-44 bg-[#83fba5]/25 rounded-full blur-2xl" />
          <div className="absolute -left-12 top-1/3 w-64 h-64 bg-[#006d36]/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-xl">
            <span className="inline-block text-white/75 text-sm font-semibold tracking-wide mb-6">
              Diseñado para estudiantes universitarios
            </span>
            <h1 className="font-headline font-extrabold text-white text-5xl xl:text-6xl tracking-tighter leading-[1.05] mb-6">
              Finanzas ágiles y claras.
            </h1>
            <p className="text-white/85 text-lg leading-relaxed font-medium mb-12 max-w-md">
              Impulsamos a la nueva generación de líderes académicos con herramientas financieras inteligentes.
            </p>

            <ul className="space-y-5">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
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
              <div className="mb-8">
                <h2 className="font-headline font-extrabold text-3xl sm:text-4xl tracking-tight mb-2">Bienvenido de nuevo.</h2>
                <p className="text-[#454652] font-medium">Continúa tu camino hacia la libertad financiera.</p>
              </div>

              {mensaje && (
                <p className="text-sm bg-[#dee0ff]/60 border border-[#c5c5d4]/30 text-[#24389c] px-3 py-2 rounded-lg mb-5" role="status">
                  {mensaje}
                </p>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold ml-1" htmlFor="email">Correo universitario</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757684] group-focus-within:text-[#24389c] transition-colors pointer-events-none" aria-hidden="true" />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="nombre@universidad.edu"
                      value={email}
                      aria-invalid={errors.email ? 'true' : undefined}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setErrors((p) => ({ ...p, email: undefined }))
                      }}
                      className={`w-full pl-12 pr-4 py-4 bg-[#f8f9fa] border rounded-xl text-[#191c1d] outline-none transition-all duration-200 placeholder:text-[#757684]/50 focus:bg-white focus:ring-4 focus:ring-[#dee0ff] focus:border-[#24389c] ${errors.email ? 'border-red-600' : 'border-[#c5c5d4]/40'}`}
                    />
                  </div>
                  {errors.email && <p id="email-error" className="text-xs text-red-700 ml-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="block text-sm font-semibold" htmlFor="password">Contraseña</label>
                    <Link className="text-sm text-[#24389c] font-semibold hover:underline" to="/forgot-password">¿Olvidaste tu contraseña?</Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757684] group-focus-within:text-[#24389c] transition-colors pointer-events-none" aria-hidden="true" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      aria-invalid={errors.password ? 'true' : undefined}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setErrors((p) => ({ ...p, password: undefined }))
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
                  {errors.password && <p id="password-error" className="text-xs text-red-700 ml-1">{errors.password}</p>}
                </div>

                <div className="flex items-center gap-3 px-1">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="login-checkbox w-5 h-5 rounded"
                  />
                  <label className="text-sm font-medium text-[#454652]" htmlFor="remember">Recordarme en este dispositivo</label>
                </div>

                {serverError && (
                  <p className="text-red-700 text-sm bg-red-50 border border-red-200 px-3 py-2 rounded-lg" role="alert">
                    {serverError}
                  </p>
                )}

                <button
                  className="w-full py-4 editorial-gradient text-white font-bold rounded-xl shadow-lg shadow-[#24389c]/20 hover:opacity-90 active:scale-[0.98] transition-all duration-200 text-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                  disabled={loading}
                  type="submit"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />}
                  {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-[#454652] font-medium">
                  ¿Nuevo en FinanzasU?
                  <Link className="text-[#24389c] font-bold hover:underline ml-1" to="/register">Crear una cuenta</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
