# 💰 FinanzasU

<div align="center">

![FinanzasU Banner](https://img.shields.io/badge/FinanzasU-Gestión%20de%20Finanzas%20para%20Estudiantes-blue?style=for-the-badge&logo=money&logoColor=white)

![Version](https://img.shields.io/badge/version-3.0.0-brightgreen?style=flat-square)
![Status](https://img.shields.io/badge/status-Release%20Candidate-success?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Build](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)
![Tests](https://img.shields.io/badge/tests-18%2F18-brightgreen?style=flat-square)

**Una plataforma integral para que estudiantes universitarios gestionen sus finanzas personales de forma inteligente y controlada.**

[🌐 Demo](#demo) • [🚀 Inicio Rápido](#inicio-rápido) • [📚 Documentación](#documentación) • [🤝 Contribuir](#contribuir)

</div>

---

## 📋 Índice

- [🎯 Acerca del Proyecto](#acerca-del-proyecto)
- [✨ Características Principales](#características-principales)
- [🎓 Objetivos del Proyecto](#objetivos-del-proyecto)
- [🛠️ Stack Tecnológico](#stack-tecnológico)
- [📊 Estadísticas](#estadísticas)
- [🚀 Inicio Rápido](#inicio-rápido)
- [📁 Estructura del Proyecto](#estructura-del-proyecto)
- [👥 Equipo Contribuidor](#equipo-contribuidor)
- [📈 Historias de Usuario](#historias-de-usuario)
- [🔐 Arquitectura](#arquitectura)
- [📖 Documentación](#documentación)
- [🚢 Despliegue en Producción](#-despliegue-en-producción)
- [🤝 Contribuir](#contribuir)
- [📝 Licencia](#licencia)

---

## 🎯 Acerca del Proyecto

**FinanzasU** es una aplicación web moderna diseñada específicamente para estudiantes universitarios que desean tomar control de sus finanzas personales. La plataforma proporciona herramientas visuales intuitivas para rastrear ingresos, gastos, presupuestos y metas financieras, promoviendo hábitos de consumo responsable y educación financiera.

### 💡 Contexto

En el contexto académico, muchos estudiantes carecen de herramientas especializadas para gestionar sus limitados recursos financieros. FinanzasU nace como respuesta a esta necesidad, integrando gamificación (sistema de logros), notificaciones inteligentes y análisis visuales para hacer la gestión financiera accesible y motivadora.

---

## ✨ Características Principales

| Característica                        | Descripción                                               | Estado |
| -------------------------------------- | ---------------------------------------------------------- | ------ |
| 🔐**Autenticación Segura**      | Login/Registro con encriptación y persistencia de sesión | ✅     |
| 👤**Gestión de Perfil**         | Actualización de datos, contraseña y contexto académico | ✅     |
| 💳**Categorías Personalizadas** | Crear/editar categorías de ingresos y gastos              | ✅     |
| 💰**Transacciones**              | Registrar ingresos y gastos con filtros y paginación      | ✅     |
| 📊**Presupuestos Inteligentes**  | Establecer límites con alertas configurables al X%        | ✅     |
| 🎯**Sistema de Logros**          | Gamificación con badges por hitos financieros             | ✅     |
| 🔔**Notificaciones**             | Alertas de presupuestos, logros y transacciones            | ✅     |
| 📈**Reportes Visuales**          | Gráficos por categoría, exportación a CSV/Excel         | ✅     |
| 🎨**Dashboard Intuitivo**        | Resumen visual de finanzas y progreso                      | ✅     |
| 🔍**Análisis Avanzado**         | Filtros por período, categoría y tipo de transacción    | ✅     |

---

## 🎓 Objetivos del Proyecto

### Objetivos Generales

1. **Educar financieramente** a estudiantes universitarios sobre buenas prácticas de gestión del dinero
2. **Facilitar el control** de ingresos y gastos mediante una interfaz intuitiva
3. **Promover la responsabilidad** financiera mediante alertas y feedback visual
4. **Motivar cambios de conducta** a través de gamificación y logros

### Objetivos Específicos

- ✅ Implementar un sistema de autenticación seguro con Supabase Auth
- ✅ Desarrollar CRUD completo para transacciones, categorías y presupuestos
- ✅ Crear sistema de notificaciones inteligentes basado en RLS
- ✅ Integrar visualización de datos con gráficos interactivos
- ✅ Implementar sistema de logros y badges motivacionales
- ✅ Facilitar exportación de reportes en múltiples formatos
- ✅ Garantizar accesibilidad y usabilidad para todos los usuarios

---

## 🛠️ Stack Tecnológico

### Frontend

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-6.0-CA4245?style=flat-square&logo=reactrouter&logoColor=white)

### Backend & Base de Datos

![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?style=flat-square&logo=postgresql&logoColor=white)

### Herramientas & Librerías

![Recharts](https://img.shields.io/badge/Recharts-Charts-ff7300?style=flat-square)
![XLSX](https://img.shields.io/badge/XLSX-Excel%20Export-217346?style=flat-square)
![Lucide Icons](https://img.shields.io/badge/Lucide-Icons-F4A460?style=flat-square)

### Desarrollo

![ESLint](https://img.shields.io/badge/ESLint-Linting-4B3B8C?style=flat-square&logo=eslint&logoColor=white)
![Node Test](https://img.shields.io/badge/Node%20Test-Testing-339933?style=flat-square&logo=node.js&logoColor=white)

---

## 📊 Estadísticas

### Métricas del Proyecto (corte 2026-06-01)

```
📅 Período de Desarrollo:    Marzo 2026 - Junio 2026
💾 Commits Totales:          157
👥 Contribuidores Activos:   7
📝 Historias de Usuario:     28 (HU-01 a HU-28)
✅ HUs Completadas:          26/28 (92.8%)
📋 Criterios de Aceptación:  141/150 (94.0%)
🧪 Tests Automatizados:      18/18 (100% pass) en 8 suites
🛠️ Build de producción:      OK (977 KB inicial · chunk xlsx lazy 424 KB)
🔍 Lint:                     0 errores, 0 warnings ESLint
```

> Las únicas HUs pendientes son **HU-27 (Despliegue en Producción)** y **HU-28 (Pruebas de QA Integral)**, ambas dependientes de la salida a producción.

### 📈 Progreso del Proyecto

<div align="center">

#### Avance General

```
Historias de Usuario       ███████████████████░  93% (26/28)
Criterios de Aceptación    ███████████████████░  94% (141/150)
Características Core       ████████████████████ 100% (10/10)
Sistema de Notificaciones  ████████████████████ 100% (3/3)
Reportes & Exportación     ████████████████████ 100% (2/2)
Documentación              ████████████████████ 100% (8/8)
Testing & QA               ████████████████████ 100% (18 tests / 8 suites)
```

#### Estado por Componente

| Componente                       |                          Avance                          | Commits | Contribuidor       |
| :------------------------------- | :-------------------------------------------------------: | :-----: | :----------------- |
| **Auth & Seguridad**       | ![100%](https://img.shields.io/badge/100%25-✅-brightgreen) |    6    | Juan Camilo Triana |
| **CRUD Transacciones**     | ![100%](https://img.shields.io/badge/100%25-✅-brightgreen) |   12   | Nicolás García   |
| **Presupuestos & Alertas** | ![100%](https://img.shields.io/badge/100%25-✅-brightgreen) |    8    | Luis Pedraza       |
| **Sistema de Logros**      | ![100%](https://img.shields.io/badge/100%25-✅-brightgreen) |   10   | Deibyd Castillo    |
| **Notificaciones RLS**     | ![100%](https://img.shields.io/badge/100%25-✅-brightgreen) |    7    | Luis Pedraza       |
| **Dashboard & Reportes**   | ![100%](https://img.shields.io/badge/100%25-✅-brightgreen) |   15   | Deibyd Castillo    |
| **Contexto Académico**    | ![100%](https://img.shields.io/badge/100%25-✅-brightgreen) |    7    | Yerlin Álvarez    |
| **Filtros & Exportación** | ![100%](https://img.shields.io/badge/100%25-✅-brightgreen) |    8    | Nicolás García   |

#### 📊 Cobertura de Funcionalidades

```
🔐 Seguridad & Auth        ████████████████████ 100%
💰 Gestión Financiera      ████████████████████ 100%
📊 Análisis & Reportes     ████████████████████ 100%
🎯 Gamificación            ████████████████████ 100%
🔔 Notificaciones          ████████████████████ 100%
📱 Responsividad UI        ████████████████████ 100%
🧪 Cobertura de Tests      ████████████████████ 100%
📚 Documentación           ████████████████████ 100%
```

**Resumen de Avance Global: 93% ✨**

</div>

### Distribución de Commits por Mes

```
Marzo 2026:  ███░░░░░░░░░░░░░░░░░  ~12 commits  ( 8%)
Abril 2026:  █████████████░░░░░░░  ~92 commits  (59%)
Mayo 2026:   ██████░░░░░░░░░░░░░░  ~41 commits  (26%)
Junio 2026:  ██░░░░░░░░░░░░░░░░░░  ~12 commits  ( 7%)
```

### Histórico de Commits (Descendente) — `git shortlog -sn`

| Autor                           | Commits | Período  | Contribución                                   |
| ------------------------------- | ------- | -------- | ----------------------------------------------- |
| 🟢 **Luis Carlos Pedraza**      | 49      | Mar-May  | Docs, HU-13, Validaciones, RLS                  |
| 🔵 **Deibyd Castillo**          | 48      | Abr-Jun  | UI/Design, Logros, Dashboard, Metas, Code Review|
| 🟡 **Nicolás García**          | 16      | Abr-May  | HU-11/12, Reportes, Filtros                     |
| 🟣 **Yerlin Álvarez**          | 12      | Abr-May  | HU-14/15, Contexto Académico                   |
| 🟠 **Johan Beltrán**           | 10      | Abr-May  | HU-05/06, Layout, Accesibilidad                 |
| ⚫ **Kevin García**            |  9      | Mar-Abr  | Setup, Documentación                           |
| 🔴 **Juan Camilo Triana**       |  8      | Mar-Abr  | Setup inicial, Auth                             |

> Total: **157 commits** sobre `main` + `develop` + `fix/code-review-bugs` al 01/06/2026.

---

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 16+ y npm/yarn
- Cuenta de Supabase (gratuita en [supabase.com](https://supabase.com))
- Git

### Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/LuisCPedraza/FinanzasU.git
cd FinanzasU
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env.local
```

Actualizar `.env.local` con tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

4. **Inicializar base de datos**

```bash
# Ejecutar migraciones en Supabase (SQL editor)
# Archivos en: supabase/migrations/
```

5. **Iniciar servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Comandos Útiles

```bash
# Desarrollo
npm run dev          # Iniciar servidor Vite

# Producción
npm run build        # Build optimizado
npm run preview      # Preview local del build

# Testing
npm test             # Ejecutar tests con Node native runner

# Linting
npm run lint         # Validar código con ESLint
```

---

## 📁 Estructura del Proyecto

```
FinanzasU/
├── 📂 src/
│   ├── 📂 components/
│   │   ├── 📂 charts/           # Componentes de gráficos
│   │   ├── 📂 layout/           # Layout, Navbar, Notifications
│   │   └── 📂 ui/               # Componentes reutilizables
│   ├── 📂 context/              # Contextos globales (Auth, Data, Notifications)
│   ├── 📂 hooks/                # Custom hooks por módulo
│   ├── 📂 pages/                # Páginas principales
│   ├── 📂 services/             # Servicios Supabase
│   ├── 📂 utils/                # Utilidades y helpers
│   ├── 📂 assets/               # Recursos estáticos
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── 📂 supabase/
│   ├── 📂 migrations/           # Archivos de migración SQL
│   ├── policies.sql             # Políticas RLS
│   └── seed.sql                 # Datos iniciales
├── 📂 public/                    # Archivos públicos
├── 📂 tests/                     # Suite de tests
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## 👥 Equipo Contribuidor

<table>
<tr>
<td align="center">
  <img src="https://github.com/CamiloTriana75.png?size=100" alt="Camilo"><br>
  <b>Juan Camilo Triana</b><br>
  <sub>Frontend Lead, Auth</sub><br>
  <a href="https://github.com/CamiloTriana75">@CamiloTriana75</a>
</td>
<td align="center">
  <img src="https://github.com/LuisCPedraza.png?size=100" alt="Luis"><br>
  <b>Luis Carlos Pedraza</b><br>
  <sub>Backend Lead, Docs</sub><br>
  <a href="https://github.com/LuisCPedraza">@LuisCPedraza</a>
</td>
<td align="center">
  <img src="https://github.com/nicolas-202.png?size=100" alt="Nicolás"><br>
  <b>Nicolás García</b><br>
  <sub>Features, Reportes</sub><br>
  <a href="https://github.com/nicolas-202">@nicolas-202</a>
</td>
</tr>
<tr>
<td align="center">
  <img src="https://github.com/keving2209.png?size=100" alt="Kevin"><br>
  <b>Kevin García</b><br>
  <sub>Setup, Docs</sub><br>
  <a href="https://github.com/keving2209">@keving2209</a>
</td>
<td align="center">
  <img src="https://avatars.githubusercontent.com/u/placeholder?size=100" alt="Deibyd"><br>
  <b>Deibyd Castillo</b><br>
  <sub>UI/Design, Logros</sub><br>
  <a href="https://github.com/CamiloTriana75">@Deibyd07</a>
</td>
<td align="center">
  <img src="https://avatars.githubusercontent.com/u/placeholder?size=100" alt="Yerlin"><br>
  <b>Yerlin Álvarez</b><br>
  <sub>Contexto Académico</sub><br>
  <a href="https://github.com">@YerlinAlvarez</a>
</td>
</tr>
</table>

---

## 📈 Historias de Usuario

### ✅ Implementadas (26/28)

| #        | Título                                              | Estado | Autor Principal   | Fecha      |
| -------- | ---------------------------------------------------- | ------ | ----------------- | ---------- |
| HU-01    | Disponibilidad y coherencia de información          | ✅     | Luis Pedraza      | 2026-04-10 |
| HU-02    | Sesión estable y control de acceso                  | ✅     | Luis Pedraza      | 2026-04-10 |
| HU-03    | Login y registro seguros                             | ✅     | Deibyd Castillo   | 2026-04-12 |
| HU-04    | Actualizar perfil y contraseña                      | ✅     | Deibyd Castillo   | 2026-04-12 |
| HU-05    | Accesibilidad en auth                                | ✅     | Johan Beltrán    | 2026-04-13 |
| HU-06    | Layout sidebar moderno                               | ✅     | Johan Beltrán    | 2026-04-13 |
| HU-07/08 | CRUD Categorías y Presupuestos                      | ✅     | Nicolás García  | 2026-04-13 |
| HU-09    | Sistema de Logros                                    | ✅     | Deibyd Castillo   | 2026-04-23 |
| HU-10    | Logros en Perfil                                     | ✅     | Deibyd Castillo   | 2026-04-23 |
| HU-11/12 | Filtros, Paginación, Exportar                       | ✅     | Nicolás García  | 2026-04-26 |
| HU-13    | Sistema de Notificaciones                            | ✅     | Luis Pedraza      | 2026-04-20 |
| HU-14    | Preferencias de Notificación                        | ✅     | Yerlin Álvarez   | 2026-04-29 |
| HU-15    | Contexto Académico                                  | ✅     | Yerlin Álvarez   | 2026-04-30 |
| HU-16    | Recuperación de Contraseña                         | ✅     | Johan Beltrán    | 2026-04-20 |
| HU-17    | Templates de correo (verificación / recuperación)  | ✅     | Luis Pedraza      | 2026-04-22 |
| HU-18    | Dashboard Mejorado                                   | ✅     | Deibyd Castillo   | 2026-05-04 |
| HU-19    | Depósito desde el dashboard                         | ✅     | Deibyd Castillo   | 2026-05-12 |
| HU-20    | Reportes por Categoría                              | ✅     | Nicolás García  | 2026-05-10 |
| HU-21    | Umbral Configurable de Alertas                       | ✅     | Luis Pedraza      | 2026-05-10 |
| HU-22    | Meta de ahorro mensual                               | ✅     | Camilo Triana     | 2026-05-26 |
| HU-23    | Restricción de Gastos por Capital Disponible        | ✅     | Deibyd Castillo   | 2026-05-19 |
| HU-24    | Estabilidad del Sistema y Pruebas Unitarias          | ✅     | Luis Pedraza      | 2026-05-19 |
| HU-25    | Seguridad, Políticas RLS y Privacidad de Datos      | ✅     | Luis Pedraza      | 2026-05-20 |
| HU-26    | Documentación Técnica y Preparación para Despliegue | ✅     | Deibyd Castillo   | 2026-05-31 |

### ⏳ Pendientes (2/28)

| #     | Título                                    | Estado | Bloqueante                |
| ----- | ------------------------------------------ | ------ | ------------------------- |
| HU-27 | Despliegue en Entorno de Producción       | ⏳     | Requiere ejecutar HU-26   |
| HU-28 | Pruebas de QA Integral y Reporte de Bugs   | ⏳     | Requiere despliegue HU-27 |

---

## 🔐 Arquitectura

```mermaid
flowchart TB
    User["👤 Usuario"]
    UI["🎨 Pages & Components<br/>React 19"]
    Router["🔀 React Router<br/>ProtectedRoute"]
    Context["📦 Contextos Globales<br/>Auth | AppData | Notifications | Logros"]
    Hooks["🪝 Custom Hooks<br/>useAuth | usePresupuestos | etc"]
    Services["🔗 Services Supabase<br/>Wrappers JS Client"]
    Auth["🔐 Supabase Auth<br/>JWT Sessions"]
    DB["🗄️ PostgreSQL<br/>RLS Policies"]
  
    User -->|interacts| UI
    UI -->|routes| Router
    UI -->|reads/writes| Context
    UI -->|fetches data| Hooks
    Hooks -->|calls| Services
    Services -->|calls| Auth
    Services -->|queries| DB
    Auth -->|manages| DB
  
    style UI fill:#61DAFB
    style Context fill:#764ABC
    style Services fill:#3ECF8E
    style Auth fill:#3ECF8E
    style DB fill:#336791
```

### Flujo de Datos

1. **UI** → Componentes React con hooks personalizados
2. **Contextos** → Estado global centralizado (Auth, Notificaciones, Logros)
3. **Services** → Wrappers de Supabase JS Client
4. **RLS** → Row Level Security para datos por usuario
5. **Bases de Datos** → PostgreSQL con triggers e índices optimizados

---

## 📖 Documentación

### Documentos Disponibles

- 📄 **[HU_FinanzasU.md](docs/HU_FinanzasU.md)** - Checklist completo de Historias de Usuario
- 📊 **[diagrama-er.md](docs/diagrama-er.md)** - Diagrama Entidad-Relación
- 🎯 **[HU-21-sidebar-layout.md](docs/HU-06-sidebar-layout.md)** - Especificación del layout

### Más Información

- Estructura de base de datos: `supabase/migrations/`
- Políticas RLS: `supabase/policies.sql`
- Datos de prueba: `supabase/seed.sql`

---

## 🚢 Despliegue en Producción

FinanzasU está preparado para desplegarse como una **SPA estática** servida por cualquier CDN (Vercel, Netlify, Cloudflare Pages…). El backend vive 100% en **Supabase** (Auth + PostgreSQL + RLS), así que no se requiere servidor propio.

### 0. Prerrequisitos (DoR HU-26)

- Código en `main` (o en la rama que apunte el deploy) **sin errores de ESLint** (`npm run lint`).
- `npm run build` genera la carpeta `dist/` correctamente.
- Proyecto Supabase de producción creado con todas las migraciones aplicadas (`supabase/migrations/001…006`) y `supabase/policies.sql` ejecutado.
- Templates de correo de Supabase (verificación + recovery) configurados con la URL pública final — ver HU-17.

### 1. Variables de entorno requeridas

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_SUPABASE_URL` | URL pública del proyecto Supabase de **producción** | `https://abcd1234.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Anon key pública del proyecto (NUNCA service_role) | `eyJhbGciOi...` |

> ⚠️ Ambas variables **deben** llevar el prefijo `VITE_` para que Vite las inyecte en el bundle del cliente. No publiques nunca la `service_role` key.

### 2. Despliegue en Vercel (opción recomendada)

1. En [vercel.com](https://vercel.com) → **Add New… → Project** e importa el repo de GitHub.
2. Framework Preset: **Vite** (autodetectado).
3. Build & Output:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. En **Settings → Environment Variables**, agrega `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` para los entornos *Production*, *Preview* y *Development*.
5. **Deploy**. Vercel asigna automáticamente un dominio `https://*.vercel.app` con SSL.
6. Para rutas SPA con React Router, crea (si no existe) un `vercel.json` en la raíz:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/" }]
   }
   ```
7. En Supabase → **Authentication → URL Configuration**, registra el dominio público como **Site URL** y agrégalo a **Redirect URLs** para que funcionen el login, el callback de OAuth y los enlaces de recuperación de contraseña.

### 3. Despliegue en Netlify (alternativa)

1. En [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project** y conecta GitHub.
2. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. En **Site settings → Environment variables**, define `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
4. Agrega un `public/_redirects` (o `netlify.toml`) con la regla SPA:
   ```
   /*    /index.html   200
   ```
5. **Deploy site**. Netlify provee dominio `https://*.netlify.app` con SSL incluido.
6. Repite el paso de Supabase: actualizar **Site URL** y **Redirect URLs** con el dominio asignado.

### 4. Checklist post-despliegue (entrega a HU-27 / HU-28)

- [ ] La URL pública carga el dashboard tras login.
- [ ] Registro + verificación por correo funcionan con el dominio nuevo.
- [ ] Reset de contraseña redirige correctamente.
- [ ] La consola del navegador no muestra errores críticos en las rutas principales.
- [ ] Las migraciones de Supabase de producción están alineadas con `supabase/migrations/`.
- [ ] Tests verdes en local (`npm test`) y lint limpio (`npm run lint`).

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add amazing feature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Pautas de Desarrollo

- Usar componentes funcionales con hooks
- Centralizar lógica en servicios y contextos
- Escribir tests para funciones críticas
- Mantener consistencia con Tailwind CSS
- Documentar cambios en historias de usuario

### Ramas Principales

- `main` - Versión estable en producción
- `develop` - Rama de integración (más actualizada)
- `feature/*` - Ramas de características

---

## 🔧 Ronda de Code Review (junio 2026)

Auditoría completa del código y aplicación de **12 fixes encadenados** sobre la rama `fix/code-review-bugs` (a partir de `release/HU-27-deploy-main`). Lint y tests siguen verdes; el bundle inicial bajó de **1.26 MB → 977 KB** (gzip 372 KB → 277 KB) gracias al code-splitting de `xlsx`, que ahora vive en un chunk separado cargado bajo demanda.

| Commit    | Categoría             | Descripción                                                                                                                  |
| --------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `54969d9` | `fix(auth)`           | Reemplazo del "Recordarme" basado en `sessionStorage` por `localStorage` + heartbeat. Evita expulsar la sesión al abrir pestañas nuevas. |
| `1c0038d` | `fix(transacciones)`  | `validateFondosSuficientes` calcula el balance acumulado **al cierre de la fecha del gasto**, no el balance lifetime.        |
| `3030c45` | `fix(transacciones)`  | `setState` funcional en las 9 mutaciones (transacciones, categorías, presupuestos) para evitar pisado por doble-click.       |
| `b95cb1a` | `fix(fechas)`         | Dashboard y Presupuestos recalculan mes/año actual en cada render en lugar de congelarlo al montar.                          |
| `5488084` | `fix(dashboard)`      | El resumen de presupuestos ya no mezcla periodos cuando el mes actual no tiene presupuestos definidos.                       |
| `9dd73d8` | `perf(exports)`       | `xlsx` se carga bajo demanda (~300 KB fuera del bundle inicial).                                                             |
| `319abae` | `fix(hooks)`          | Resolución de warnings `react-hooks/exhaustive-deps` en `ModalDeposito` y `NotificationsContext`.                            |
| `4086ecd` | `fix(routing)`        | Catch-all (`*`) redirige según estado de auth en vez de siempre a `/login`.                                                  |
| `84fb1b2` | `fix(categorias)`     | `listarCategorias` reemplaza `.or` con string interpolado por dos queries paralelas.                                         |
| `4cd92a8` | `fix(presupuestos)`   | Cálculo del fin de mes en local para evitar corrimiento UTC en husos positivos.                                              |
| `ada6e70` | `fix(reset-password)` | Timeout de verificación del enlace de recovery 5 s → 15 s.                                                                   |
| `11c1a32` | `chore(env)`          | Placeholders en `.env.example` (URL y anon key reales removidas).                                                            |

### Verificación

```bash
npm run lint   # 0 errores, 0 warnings
npm test       # 18/18 ✓ (16 previos + 2 nuevos cubriendo el balance al momento)
npm run build  # OK · 977 KB inicial · xlsx chunk 424 KB
```

---

## 📈 Próximas Mejoras Planeadas

- 🔄 Sincronización offline-first
- 📱 Aplicación móvil nativa (React Native)
- 🤖 Recomendaciones AI basadas en patrones de gasto
- 💳 Integración con APIs de bancos
- 🌍 Soporte multiidioma
- 📊 Análisis predictivo y forecasting

---

## 📝 Licencia

Este proyecto está bajo licencia **MIT** - ver [LICENSE](LICENSE) para más detalles.

---

## 📞 Contacto & Soporte

- 📧 **Email**: luis.pedraza@correounivalle.edu.co
- 🐛 **Reportar bugs**: [Issues](https://github.com/LuisCPedraza/FinanzasU/issues)
- 💬 **Preguntas**: [Discussions](https://github.com/LuisCPedraza/FinanzasU/discussions)

---

<div align="center">

### 🌟 ¡Si te gusta el proyecto, dale una estrella! ⭐

Desarrollado con ❤️ por el equipo **FinanzasU**

![Last Commit](https://img.shields.io/github/last-commit/LuisCPedraza/FinanzasU/develop?style=flat-square)
![Repo Size](https://img.shields.io/github/repo-size/LuisCPedraza/FinanzasU?style=flat-square)

</div>
