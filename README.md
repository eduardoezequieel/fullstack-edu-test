# Sistema de Gestión de Estudiantes - Fullstack

Monorepo con arquitectura fullstack para la gestión de estudiantes, construido con **NestJS** (backend) y **Next.js 14** (frontend).

## 🏗️ Arquitectura del Monorepo

Este proyecto usa **pnpm workspaces** para manejar un monorepo con múltiples aplicaciones:

```
fullstack-test-edu/
├── apps/
│   ├── backend/          # API REST con NestJS
│   └── frontend/         # Aplicación web con Next.js
├── package.json          # Scripts del workspace
└── pnpm-workspace.yaml   # Configuración de workspace
```

**Ventajas del monorepo:**

- Dependencias compartidas (instalación única)
- Scripts centralizados para dev, build y deploy
- Sincronización de versiones y configuraciones
- Desarrollo simultáneo de frontend y backend

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0

```bash
# Instalar pnpm globalmente si no lo tienes
npm install -g pnpm
```

### Instalación

```bash
# Instalar todas las dependencias del monorepo
pnpm install
```

### Desarrollo

```bash
# Ejecutar ambas aplicaciones en modo desarrollo
pnpm dev:frontend    # Frontend en http://localhost:3000
pnpm dev:backend     # Backend en http://localhost:4000

# O ejecutarlas en terminales separadas para mejor control
```

## 📦 Aplicaciones

### Backend - API REST

- **Framework**: NestJS v11 + TypeORM + SQLite
- **Puerto**: 4000
- **Características**:
  - Autenticación JWT
  - Importación CSV/Excel
  - Validación con class-validator
  - Arquitectura modular
- **Documentación**: Ver [apps/backend/README.md](apps/backend/README.md)

### Frontend - Aplicación Web

- **Framework**: Next.js 14 + React + TypeScript
- **Puerto**: 3000
- **Características**:
  - Feature-based architecture
  - TanStack Query para estado del servidor
  - Componentes shadcn/ui + Tailwind CSS
  - Server-side rendering
- **Documentación**: Ver [apps/frontend/README.md](apps/frontend/README.md)

## 📜 Scripts Disponibles

### Desarrollo

```bash
pnpm dev:frontend       # Frontend en modo desarrollo
pnpm dev:backend        # Backend en modo desarrollo
```

### Build

```bash
pnpm build              # Build de todas las apps
pnpm build:frontend     # Build solo frontend
pnpm build:backend      # Build solo backend
```

### Producción

```bash
pnpm start:frontend     # Ejecutar frontend en producción
pnpm start:backend      # Ejecutar backend en producción
```

### Utilidades

```bash
pnpm lint               # Linting en todas las apps
pnpm format             # Formatear código con Prettier
pnpm clean              # Limpiar archivos de build
```

## 🔧 Comandos de pnpm Workspace

```bash
# Ejecutar comando en app específica
pnpm --filter @fullstack-edu-test/backend <comando>
pnpm --filter @fullstack-edu-test/frontend <comando>
```

## 🗄️ Base de Datos

El backend usa **SQLite** con la base de datos en `apps/backend/database.sqlite`.

**Usuario de prueba:**

- Email: `admin@admin.com`
- Password: `admin123`

## 🛠️ Stack Tecnológico

**Backend:**

- NestJS, TypeORM, SQLite (better-sqlite3)
- Passport JWT, bcrypt, XLSX
- class-validator, class-transformer

**Frontend:**

- Next.js 14, React, TypeScript
- TanStack Query v5, Axios
- Tailwind CSS, shadcn/ui, Sonner
- Zod para validación

**Monorepo:**

- pnpm workspaces
- Prettier con plugin de Tailwind
- ESLint compartido

## 📚 Documentación Adicional

- **Backend**: [apps/backend/README.md](apps/backend/README.md) - Arquitectura modular, endpoints, validaciones
- **Frontend**: [apps/frontend/README.md](apps/frontend/README.md) - Feature-based architecture, componentes, flujo de datos

Configurar variables de entorno según el ambiente:

- Backend: `JWT_SECRET`, `PORT`
- Frontend: `API_URL`
