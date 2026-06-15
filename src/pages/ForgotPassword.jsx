import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Wallet, ArrowLeft, Mail, CheckCircle2, Loader2, MailCheck, KeyRound, ShieldCheck } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { EMAIL_REGEX } from '../utils/constants'

/**
 * Pagina de solicitud de recuperacion de contrasena.
 *
 * Flujo:
 * 1. El usuario ingresa su correo electronico.
 * 2. Se envia un enlace de recuperacion por correo (via Supabase Auth).
 * 3. Se muestra un mensaje de confirmacion NEUTRAL, sin revelar
 *    si el correo esta registrado o no (seguridad anti-enumeracion).
 * 4. El usuario puede volver a Login o solicitar otro enlace.
 */
const STEPS = [
  { icon: MailCheck, title: 'Ingresa tu correo', desc: 'El mismo con el que te registraste.' },
  { icon: KeyRound, title: 'Recibe el enlace', desc: 'Te llega un enlace seguro a tu bandeja.' },
  { icon: ShieldCheck, title: 'Crea una nueva clave', desc: 'Restablece tu contraseña en segundos.' },
]

export default function ForgotPassword() {
  const { solicitarRecuperacion } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [enviado, setEnviado] = useState(false)

  const validate = () => {
    const e = {}
    if (!email) e.email = 'El correo es obligatorio'
    else if (!EMAIL_REGEX.test(email)) e.email = 'Correo no válido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    if (!validate()) return

    try {
      setLoading(true)
      const mensaje = await solicitarRecuperacion({ email })
      setEnviado(true)
      toast.success(mensaje)
    } catch (err) {
      const msg = err?.message || 'No se pudo enviar el correo de recuperación. Intenta nuevamente.'
      setServerError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#f8f9fa] font-body text-[#191c1d] min-h-screen">
      <main className="flex min-h-screen">
        {/* ── Panel de marca ── */}
        <section className="hidden lg:flex lg:w-1/2 relative items-center overflow-hidden editorial-gradient p-16">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute right-24 top-10 w-44 h-44 bg-[#83fba5]/25 rounded-full blur-2xl" />
          <div className="absolute -left-12 top-1/3 w-64 h-64 bg-[#006d36]/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-xl">
            <span className="inline-block text-white/75 text-sm font-semibold tracking-wide mb-6">
              Recuperación segura
            </span>
            <h1 className="font-headline font-extrabold text-white text-5xl xl:text-6xl tracking-tighter leading-[1.05] mb-6">
              Recupera tu acceso.
            </h1>
            <p className="text-white/85 text-lg leading-relaxed font-medium mb-12 max-w-md">
              Te enviaremos un enlace seguro a tu correo para que puedas establecer una nueva contraseña.
            </p>

            <ul className="space-y-5">
              {STEPS.map(({ icon: Icon, title, desc }, i) => (
                <li key={title} className="flex items-start gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center relative">
                    <Icon className="w-5 h-5 text-[#83fba5]" aria-hidden="true" />
                    <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#83fba5] text-[#00210c] text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
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
                <h2 className="font-headline font-extrabold text-3xl sm:text-4xl tracking-tight mb-2">
                  {enviado ? 'Correo enviado' : '¿Olvidaste tu contraseña?'}
                </h2>
                <p className="text-[#454652] font-medium">
                  {enviado
                    ? 'Si el correo está registrado, recibirás un enlace de recuperación en tu bandeja de entrada.'
                    : 'Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.'}
                </p>
              </div>

              {!enviado ? (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold ml-1" htmlFor="recovery-email">
                      Correo electrónico
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757684] group-focus-within:text-[#24389c] transition-colors pointer-events-none" aria-hidden="true" />
                      <input
                        id="recovery-email"
                        type="email"
                        autoComplete="email"
                        placeholder="nombre@universidad.edu"
                        value={email}
                        aria-invalid={errors.email ? 'true' : undefined}
                        aria-describedby={errors.email ? 'recovery-email-error' : undefined}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          setErrors((p) => ({ ...p, email: undefined }))
                        }}
                        className={`w-full pl-12 pr-4 py-4 bg-[#f8f9fa] border rounded-xl text-[#191c1d] outline-none transition-all duration-200 placeholder:text-[#757684]/50 focus:bg-white focus:ring-4 focus:ring-[#dee0ff] focus:border-[#24389c] ${errors.email ? 'border-red-600' : 'border-[#c5c5d4]/40'}`}
                      />
                    </div>
                    {errors.email && <p id="recovery-email-error" className="text-xs text-red-700 ml-1">{errors.email}</p>}
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
                    {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-800 text-sm" role="status">
                    <p className="font-semibold mb-1 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#006d36]" aria-hidden="true" />
                      Revisa tu bandeja de entrada
                    </p>
                    <p>
                      Si el correo <strong>{email}</strong> está asociado a una cuenta,
                      recibirás un enlace de recuperación. También revisa tu carpeta de spam.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setEnviado(false)
                      setEmail('')
                      setServerError('')
                    }}
                    className="w-full py-4 border-2 border-[#24389c] text-[#24389c] font-bold rounded-xl hover:bg-[#24389c]/5 active:scale-[0.98] transition-all duration-200 text-lg cursor-pointer"
                    type="button"
                  >
                    Solicitar otro enlace
                  </button>
                </div>
              )}

              <div className="mt-8 text-center">
                <Link
                  className="inline-flex items-center gap-2 text-[#24389c] font-bold hover:underline"
                  to="/login"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Volver a iniciar sesión
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
