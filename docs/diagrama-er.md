# Diagrama ER - FinanzasU

## Objetivo

Este documento presenta el modelo entidad-relacion (ER) actual de la base de datos de FinanzasU,
alineado con los scripts SQL de migracion y politicas RLS.

> Nota: este ER refleja el estado actual de la base de datos después de las migraciones 001 a 005.

## Diagrama entidad-relacion

```mermaid
erDiagram
    AUTH_USERS {
        uuid id PK
    }

    PERFILES {
        uuid id PK
        text nombre
        text email
        text avatar_url
        timestamptz created_at
    }

    CATEGORIAS {
        bigint id PK
        text nombre
        text icono
        text color
        text tipo
        uuid user_id FK
        boolean es_predeterminada
        timestamptz created_at
    }

    TRANSACCIONES {
        bigint id PK
        uuid user_id FK
        text tipo
        numeric monto
        text descripcion
        bigint categoria_id FK
        date fecha
        timestamptz created_at
    }

    PRESUPUESTOS {
        bigint id PK
        uuid user_id FK
        bigint categoria_id FK
        numeric monto_limite
        int mes
        int anio
        timestamptz created_at
    }

    NOTIFICACIONES {
      bigint id PK
      uuid user_id FK
      text tipo
      text titulo
      text mensaje
      text modulo_origen
      boolean leida
      text ruta_destino
      text recurso_tipo
      text recurso_id
      text event_key
      timestamptz created_at
    }

    PREFERENCIAS_NOTIFICACION {
      bigint id PK
      uuid user_id FK
      boolean alertas_diarias
      boolean resumen_semanal
      boolean novedades_sistema
      timestamptz updated_at
    }

    CATALOGO_LOGROS {
      text id PK
      text nombre
      text descripcion
      text icono
      text categoria
      text tipo
      int meta
      boolean activo
      int orden
      timestamptz created_at
    }

    PROGRESO_LOGROS {
      bigint id PK
      uuid user_id FK
      text logro_id FK
      int avance_actual
      numeric porcentaje
      boolean desbloqueado
      timestamptz fecha_desbloqueo
      timestamptz updated_at
    }

    AUTH_USERS ||--|| PERFILES : "1 a 1"
    AUTH_USERS ||--o{ CATEGORIAS : "1 a N (solo personalizadas)"
    AUTH_USERS ||--o{ TRANSACCIONES : "1 a N"
    AUTH_USERS ||--o{ PRESUPUESTOS : "1 a N"
    AUTH_USERS ||--o{ NOTIFICACIONES : "1 a N"
    AUTH_USERS ||--|| PREFERENCIAS_NOTIFICACION : "1 a 1"
    AUTH_USERS ||--o{ PROGRESO_LOGROS : "1 a N"

    CATEGORIAS ||--o{ TRANSACCIONES : "1 a N"
    CATEGORIAS ||--o{ PRESUPUESTOS : "1 a N"
    CATALOGO_LOGROS ||--o{ PROGRESO_LOGROS : "1 a N"
```

## Reglas de negocio clave

- Categorias globales del sistema:
  - `categorias.user_id IS NULL`
  - `categorias.es_predeterminada = true`
- Categorias personalizadas:
  - `categorias.user_id = auth.uid()`
- Presupuesto unico por periodo:
  - `UNIQUE (user_id, categoria_id, mes, anio)`
- Preferencias de notificacion por usuario:
  - `UNIQUE (user_id)`
- Progreso de logros por usuario y logro:
  - `UNIQUE (user_id, logro_id)`
- Validaciones de integridad:
  - `transacciones.monto > 0`
  - `presupuestos.monto_limite > 0`
  - `presupuestos.mes BETWEEN 1 AND 12`
- Notificaciones sin duplicados por evento:
  - `event_key` se usa para evitar repeticiones en ventanas de tiempo definidas

## Comportamiento de claves foraneas

- `perfiles.id -> auth.users.id` con `ON DELETE CASCADE`
- `categorias.user_id -> auth.users.id` con `ON DELETE CASCADE`
- `transacciones.user_id -> auth.users.id` con `ON DELETE CASCADE`
- `transacciones.categoria_id -> categorias.id` con `ON DELETE SET NULL`
- `presupuestos.user_id -> auth.users.id` con `ON DELETE CASCADE`
- `presupuestos.categoria_id -> categorias.id` con `ON DELETE CASCADE`
- `notificaciones.user_id -> auth.users.id` con `ON DELETE CASCADE`
- `preferencias_notificacion.user_id -> auth.users.id` con `ON DELETE CASCADE`
- `progreso_logros.user_id -> auth.users.id` con `ON DELETE CASCADE`
- `progreso_logros.logro_id -> catalogo_logros.id` con `ON DELETE CASCADE`

## Seguridad (RLS)

RLS esta habilitado en:

- `public.perfiles`
- `public.categorias`
- `public.transacciones`
- `public.presupuestos`
- `public.notificaciones`
- `public.preferencias_notificacion`
- `public.catalogo_logros`
- `public.progreso_logros`

Principio aplicado:

- Cada usuario solo puede operar sobre sus propios datos.
- En categorias, lectura combinada de categorias propias + categorias globales.
- El catálogo de logros es de solo lectura para todos los usuarios autenticados.

## Fuente tecnica

Este diagrama se deriva de:

- `supabase/migrations/001_initial_schema.sql`
- `supabase/migrations/002_notifications.sql`
- `supabase/migrations/003_logros.sql`
- `supabase/migrations/004_notifications_preferences.sql`
- `supabase/policies.sql`
