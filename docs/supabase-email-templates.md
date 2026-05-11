# Templates de Correo para Supabase — FinanzasU

## ¿Dónde configurarlos?

1. Ir a **Supabase Dashboard → Authentication → Email Templates**
2. Seleccionar el template correspondiente
3. Pegar el HTML del template y guardar

Variables disponibles de Supabase:
- `{{ .ConfirmationURL }}` — URL de confirmación/recuperación generada por Supabase
- `{{ .Email }}` — correo del usuario
- `{{ .Token }}` — OTP token (si aplica)
- `{{ .SiteURL }}` — URL base del proyecto

---

## Template 1: Confirmación de Correo (Confirm signup)

Usado cuando un usuario se registra y debe verificar su email.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirma tu correo — FinanzasU</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f3f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f3f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#24389c,#3f51b5);border-radius:12px;padding:10px 14px;">
                    <span style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:-0.5px;">FinanzasU</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#ffffff;border-radius:16px;padding:48px 40px;box-shadow:0 4px 24px rgba(36,56,156,0.08);">

              <!-- Icono -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:28px;">
                    <div style="width:64px;height:64px;background:linear-gradient(135deg,#24389c,#3f51b5);border-radius:16px;display:inline-block;text-align:center;line-height:64px;font-size:28px;">
                      ✉️
                    </div>
                  </td>
                </tr>

                <!-- Titulo -->
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <h1 style="margin:0;font-size:26px;font-weight:800;color:#191c1d;letter-spacing:-0.5px;">
                      Confirma tu correo
                    </h1>
                  </td>
                </tr>

                <!-- Subtitulo -->
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <p style="margin:0;font-size:15px;color:#454652;line-height:1.6;max-width:420px;">
                      Gracias por registrarte en <strong>FinanzasU</strong>. Solo falta un paso: confirma tu dirección de correo para activar tu cuenta.
                    </p>
                  </td>
                </tr>

                <!-- CTA Button -->
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <a href="{{ .ConfirmationURL }}"
                       style="display:inline-block;background:linear-gradient(135deg,#24389c,#3f51b5);color:#ffffff;text-decoration:none;font-size:16px;font-weight:700;padding:16px 40px;border-radius:12px;letter-spacing:0.2px;">
                      Confirmar mi correo
                    </a>
                  </td>
                </tr>

                <!-- Aviso de expiración -->
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <p style="margin:0;font-size:13px;color:#757684;line-height:1.5;">
                      Este enlace expira en <strong>24 horas</strong>. Si no creaste una cuenta en FinanzasU, puedes ignorar este correo con total seguridad.
                    </p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="border-top:1px solid #e8e9f0;padding-top:24px;">
                    <p style="margin:0;font-size:12px;color:#757684;line-height:1.6;">
                      Si el botón no funciona, copia y pega este enlace en tu navegador:<br />
                      <a href="{{ .ConfirmationURL }}" style="color:#24389c;word-break:break-all;font-size:12px;">
                        {{ .ConfirmationURL }}
                      </a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;font-size:12px;color:#9899ab;">
                © 2025 FinanzasU — Finanzas ágiles y claras para estudiantes.<br />
                Este correo fue enviado a <strong>{{ .Email }}</strong>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## Template 2: Recuperación de Contraseña (Reset password)

Usado cuando el usuario solicita restablecer su contraseña desde `/forgot-password`.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Recupera tu contraseña — FinanzasU</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f3f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f3f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#24389c,#3f51b5);border-radius:12px;padding:10px 14px;">
                    <span style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:-0.5px;">FinanzasU</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#ffffff;border-radius:16px;padding:48px 40px;box-shadow:0 4px 24px rgba(36,56,156,0.08);">

              <table width="100%" cellpadding="0" cellspacing="0">

                <!-- Icono -->
                <tr>
                  <td align="center" style="padding-bottom:28px;">
                    <div style="width:64px;height:64px;background:linear-gradient(135deg,#24389c,#3f51b5);border-radius:16px;display:inline-block;text-align:center;line-height:64px;font-size:28px;">
                      🔒
                    </div>
                  </td>
                </tr>

                <!-- Titulo -->
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <h1 style="margin:0;font-size:26px;font-weight:800;color:#191c1d;letter-spacing:-0.5px;">
                      Recupera tu contraseña
                    </h1>
                  </td>
                </tr>

                <!-- Subtitulo -->
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <p style="margin:0;font-size:15px;color:#454652;line-height:1.6;max-width:420px;">
                      Recibimos una solicitud para restablecer la contraseña de tu cuenta de <strong>FinanzasU</strong>. Haz clic en el botón para crear una nueva contraseña.
                    </p>
                  </td>
                </tr>

                <!-- CTA Button -->
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <a href="{{ .ConfirmationURL }}"
                       style="display:inline-block;background:linear-gradient(135deg,#24389c,#3f51b5);color:#ffffff;text-decoration:none;font-size:16px;font-weight:700;padding:16px 40px;border-radius:12px;letter-spacing:0.2px;">
                      Restablecer contraseña
                    </a>
                  </td>
                </tr>

                <!-- Aviso de seguridad -->
                <tr>
                  <td style="background-color:#fff8e1;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;padding:14px 16px;margin-bottom:24px;">
                    <p style="margin:0;font-size:13px;color:#92400e;line-height:1.5;">
                      ⚠️ <strong>Aviso de seguridad:</strong> Este enlace es de uso único y expira en <strong>1 hora</strong>. Si no solicitaste este cambio, ignora este correo y tu contraseña permanecerá sin cambios.
                    </p>
                  </td>
                </tr>

                <!-- Espacio -->
                <tr><td style="height:24px;"></td></tr>

                <!-- Divider -->
                <tr>
                  <td style="border-top:1px solid #e8e9f0;padding-top:24px;">
                    <p style="margin:0;font-size:12px;color:#757684;line-height:1.6;">
                      Si el botón no funciona, copia y pega este enlace en tu navegador:<br />
                      <a href="{{ .ConfirmationURL }}" style="color:#24389c;word-break:break-all;font-size:12px;">
                        {{ .ConfirmationURL }}
                      </a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;font-size:12px;color:#9899ab;">
                © 2025 FinanzasU — Finanzas ágiles y claras para estudiantes.<br />
                Este correo fue enviado a <strong>{{ .Email }}</strong> porque se solicitó un restablecimiento de contraseña.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---
