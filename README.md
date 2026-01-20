# Fullstack Test - Eduardo

A fullstack monorepo using pnpm workspaces, featuring a NestJS backend and Next.js frontend.

## 🏗️ Project Structure

```
fullstack-test-edu/
├── apps/
│   ├── backend/          # NestJS API
│   └── frontend/         # Next.js application
├── package.json          # Root workspace configuration
└── pnpm-workspace.yaml   # pnpm workspace definition
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
pnpm install
```

## 📜 Available Scripts

### Development

```bash
# Run both apps in development mode
pnpm dev

# Run frontend only
pnpm dev:frontend

# Run backend only
pnpm dev:backend
```

### Build

```bash
# Build all apps
pnpm build

# Build frontend only
pnpm build:frontend

# Build backend only
pnpm build:backend
```

### Production

```bash
# Start frontend in production mode
pnpm start:frontend

# Start backend in production mode
pnpm start:backend
```

### Other Commands

```bash
# Run linting on all apps
pnpm lint

# Run tests on all apps
pnpm test
```

## 📦 Apps

### Backend (@fullstack-edu-test/backend)
- **Framework**: NestJS
- **Port**: 3000 (default)
- **Location**: `apps/backend`

### Frontend (@fullstack-edu-test/frontend)
- **Framework**: Next.js 16
- **Styling**: Tailwind CSS 4
- **Port**: 3001 (default)
- **Location**: `apps/frontend`

## 🛠️ Technologies

- **Monorepo Tool**: pnpm workspaces
- **Backend**: NestJS, TypeScript
- **Frontend**: Next.js, React 19, TypeScript, Tailwind CSS
- **Testing**: Jest
- **Linting**: ESLint