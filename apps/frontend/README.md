# Frontend - Sistema de Gestión de Estudiantes

Aplicación web construida con Next.js 14 para la gestión de estudiantes, incluyendo autenticación, importación de archivos y visualización de datos en tiempo real.

## Arquitectura

El proyecto utiliza **Feature-Based Architecture** con los siguientes principios:

- **Organización por features**: Cada funcionalidad (`auth`, `students`, `dashboard`) contiene sus propios componentes, hooks, tipos y schemas, facilitando la localización de código y el desarrollo en equipo
- **Custom Hooks Pattern**: Encapsulación de lógica con `useSignIn`, `useStudents`, `useImportStudents`, separando la lógica de negocio de la presentación
- **Server vs Client Components**: Separación clara entre componentes de servidor (para fetch inicial) y cliente (para interactividad), optimizando el rendimiento
- **TanStack Query**: Manejo de estado del servidor con cache automático, invalidación inteligente y estados de carga/error predecibles
- **Schema Validation**: Validación de formularios con Zod en el cliente antes de enviar requests
- **Middleware Proxy**: Autenticación server-side que protege rutas y reenvía cookies HTTP-only de forma segura

Esta arquitectura es mantenible, escalable y permite que cada feature sea independiente, facilitando testing y desarrollo paralelo.

## Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **TanStack Query** v5 - Estado del servidor y cache
- **Tailwind CSS** - Estilos utility-first
- **shadcn/ui** - Componentes UI accesibles
- **Zod** - Validación de schemas
- **Axios** - Cliente HTTP
- **Sonner** - Toast notifications
- **js-cookie** - Manejo de cookies

## Estructura del Proyecto

```
app/                      # App Router de Next.js
├── dashboard/           # Rutas protegidas
│   ├── layout.tsx      # Layout con sidebar
│   ├── page.tsx        # Dashboard principal
│   └── students/       # Página de estudiantes
components/              # Componentes compartidos
├── providers/          # Context providers (Query, Theme)
└── ui/                 # Componentes UI de shadcn
features/               # Feature-Based Architecture
├── auth/
│   ├── components/     # LoginForm
│   ├── hooks/         # useSignIn
│   ├── lib/           # auth.server.ts (server-side)
│   ├── schemas/       # Validaciones con Zod
│   └── types/         # TypeScript types
├── dashboard/
│   └── components/    # DashboardStats, DashboardSidebar
└── students/
    ├── components/    # StudentsTable, ImportStudentsDialog
    ├── hooks/        # useStudents, useImportStudents
    ├── lib/          # students.server.ts
    └── types/        # Student interface
lib/                   # Utilidades compartidas
├── http.ts           # Cliente HTTP con interceptores
└── utils.ts          # Helpers (cn, etc.)
```

## Instalación y Ejecución

```bash
# Instalar dependencias
$ pnpm install

# Modo desarrollo
$ pnpm run dev

# Build de producción
$ pnpm run build

# Ejecutar producción
$ pnpm run start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Variables de Entorno

```env
# URL del backend
API_URL=http://localhost:4000
```

## Características Principales

### Autenticación

- Login con validación de formulario usando Zod
- JWT almacenado en HTTP-only cookie
- Middleware que protege rutas `/dashboard/*`
- Redirección automática según estado de autenticación

### Dashboard

- Estadísticas en tiempo real (total, activos, graduados)
- Datos fetched server-side para mejor SEO y performance
- Auto-refresh después de operaciones (import, truncate)

### Gestión de Estudiantes

- Tabla con todos los estudiantes
- Importación de archivos CSV/Excel con validación
- Diálogo de errores detallados por fila
- Estados de carga con skeletons
- Validación de promedios (0-10)
- Botón para vaciar tabla con confirmación

### UX/UI

- Dark mode con persistencia
- Toasts informativos con Sonner
- Componentes accesibles de shadcn/ui
- Responsive design con Tailwind
- Loading states y feedback visual

## Flujo de Datos

### Server Components

1. `dashboard/page.tsx` obtiene stats con `getStudentStats()` server-side
2. Datos se pasan como props a componentes cliente
3. `router.refresh()` actualiza datos del servidor cuando es necesario

### Client Components

1. TanStack Query maneja el estado del servidor con query keys
2. Mutations invalidan queries relacionadas automáticamente
3. HTTP interceptor agrega headers de autenticación
4. Error boundaries manejan errores de forma centralizada

## Validaciones

Los formularios usan Zod para validación:

**Login:**

- Email válido
- Password mínimo 6 caracteres

**Importación:**

- Archivo CSV/Excel requerido
- Validación server-side de estructura
- Errores mostrados por fila en diálogo

## Middleware y Autenticación

El archivo `proxy.ts` actúa como middleware que:

- Valida JWT en requests protegidos
- Reenvía cookies HTTP-only al backend
- Redirige usuarios no autenticados a login
- Protege todas las rutas bajo `/dashboard/*`

## Componentes Reutilizables

Todos los componentes UI están en `components/ui/`:

- `button`, `card`, `dialog`, `input`, `label`
- Construidos con Radix UI y Tailwind
- Accesibles y personalizables
- Importados desde shadcn/ui

## Scripts

```bash
# Desarrollo
$ pnpm dev

# Build
$ pnpm build

# Producción
$ pnpm start

# Linting
$ pnpm lint
```

## Integración con Backend

El frontend se comunica con el backend en `http://localhost:4000`:

- Autenticación: `/auth/login`, `/auth/register`, `/auth/me`
- Estudiantes: `/students`, `/students/stats`, `/students/import`, `/students/truncate`

Ver documentación del backend para detalles de la API.
