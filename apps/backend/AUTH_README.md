# 🔐 Sistema de Autenticación - Backend

Sistema de autenticación JWT implementado en NestJS con registro, login y protección de rutas.

## 📋 Características

- ✅ Registro de usuarios con validación
- ✅ Login con JWT
- ✅ Protección de rutas con Guards
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Validación de datos con class-validator
- ✅ CORS habilitado para el frontend
- ✅ **Base de datos SQLite con Prisma ORM**

## 🚀 Cómo usar

### 1. Configurar la base de datos

La base de datos ya está configurada y lista para usar. Prisma usa SQLite por defecto.

Si necesitas regenerar la base de datos:

```bash
cd apps/backend

# Generar el cliente de Prisma
npx prisma generate

# Crear/actualizar la base de datos
npx prisma migrate dev

# Ver la base de datos en el navegador (opcional)
npx prisma studio
```

### 2. Iniciar el servidor

```bash
# Desde la raíz del monorepo
pnpm dev:backend

# O directamente en la carpeta backend
cd apps/backend
pnpm start:dev
```

El servidor estará corriendo en: **http://localhost:4000**

### 3. Variables de entorno (Opcional)

Crea un archivo `.env` en `apps/backend/` con:

```env
PORT=4000
JWT_SECRET=tu-clave-secreta-super-segura
FRONTEND_URL=http://localhost:3000
DATABASE_URL=file:prisma/dev.db
```

## 📡 Endpoints disponibles

### Público - Sin autenticación

#### 1. Health Check

```bash
GET http://localhost:4000
```

**Respuesta:**

```json
"Hello World!"
```

---

#### 2. Registrar usuario

```bash
POST http://localhost:4000/auth/register
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "miPassword123",
  "name": "Juan Pérez"
}
```

**Respuesta exitosa:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "usuario@ejemplo.com",
    "name": "Juan Pérez"
  }
}
```

**Validaciones:**

- Email debe ser válido
- Contraseña mínimo 6 caracteres
- Nombre es obligatorio
- Email debe ser único

---

#### 3. Login

```bash
POST http://localhost:4000/auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "miPassword123"
}
```

**Respuesta exitosa:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "usuario@ejemplo.com",
    "name": "Juan Pérez"
  }
}
```

---

### Protegido - Requiere autenticación

#### 4. Obtener perfil

```bash
GET http://localhost:4000/profile
Authorization: Bearer <access_token>
```

**Respuesta exitosa:**

```json
{
  "message": "This is a protected route",
  "user": {
    "userId": 1,
    "email": "usuario@ejemplo.com"
  }
}
```

---

## 🧪 Probar con cURL

### Registro

```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "test123456",
    "name": "Test User"
  }'
```

### Login

```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "test123456"
  }'
```

### Perfil (con token)

```bash
curl -X GET http://localhost:4000/profile \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

---

## 🛠️ Probar con Thunder Client / Postman

### 1. Registro

- **Método:** POST
- **URL:** `http://localhost:4000/auth/register`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**

```json
{
  "email": "test@test.com",
  "password": "test123456",
  "name": "Test User"
}
```

### 2. Login

- **Método:** POST
- **URL:** `http://localhost:4000/auth/login`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**

```json
{
  "email": "test@test.com",
  "password": "test123456"
}
```

### 3. Ruta protegida

- **Método:** GET
- **URL:** `http://localhost:4000/profile`
- **Headers:** `Authorization: Bearer <copia_el_access_token_aquí>`

---

## 🔒 Proteger tus propias rutas

Para proteger cualquier endpoint, usa el decorator `@UseGuards(JwtAuthGuard)`:

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('mi-ruta')
export class MiController {
  @UseGuards(JwtAuthGuard)
  @Get('protegida')
  rutaProtegida() {
    return { message: 'Solo usuarios autenticados pueden ver esto' };
  }
}
```

---

## 📁 Estructura del código

```
apps/backend/
├── prisma/
│   ├── schema.prisma             # Modelo de datos (User)
│   ├── migrations/               # Migraciones de base de datos
│   └── dev.db                    # Base de datos SQLite
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── login.dto.ts      # Validación login
│   │   │   └── register.dto.ts   # Validación registro
│   │   ├── auth.controller.ts    # Endpoints /auth/register y /auth/login
│   │   ├── auth.service.ts       # Lógica de autenticación
│   │   ├── auth.module.ts        # Módulo de autenticación
│   │   ├── jwt.strategy.ts       # Estrategia JWT de Passport
│   │   └── jwt-auth.guard.ts     # Guard para proteger rutas
│   ├── users/
│   │   ├── users.service.ts      # Gestión de usuarios con Prisma
│   │   ├── users.module.ts       # Módulo de usuarios
│   │   └── user.interface.ts     # Interface de usuario
│   ├── prisma/
│   │   ├── prisma.service.ts     # Servicio de Prisma
│   │   └── prisma.module.ts      # Módulo global de Prisma
│   ├── app.controller.ts         # Ejemplo de ruta protegida (/profile)
│   ├── app.module.ts             # Módulo principal
│   └── main.ts                   # Bootstrap con validación y CORS
└── prisma.config.ts              # Configuración de Prisma
```

---

## 💡 Notas importantes

1. **Base de datos SQLite:** Los usuarios se guardan en `prisma/dev.db`. Es perfecto para desarrollo. Para producción, cambia a PostgreSQL, MySQL, etc.

2. **Prisma Studio:** Ejecuta `npx prisma studio` para ver y editar datos en el navegador.

3. **JWT Secret:** Cambia el `JWT_SECRET` en producción a algo seguro y único.

4. **Expiración del token:** Los tokens expiran en 24 horas. Puedes cambiar esto en `auth.module.ts`.

5. **CORS:** Está configurado para permitir solicitudes desde `http://localhost:3000` (frontend).

---

## 🗃️ Comandos de Prisma útiles

```bash
# Ver la base de datos en el navegador
npx prisma studio

# Generar cliente después de cambios en schema
npx prisma generate

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Resetear la base de datos (CUIDADO: borra todos los datos)
npx prisma migrate reset
```

---

## ⚠️ Errores comunes

### 401 Unauthorized

- Token inválido o expirado
- Token no enviado en el header `Authorization`
- Credenciales incorrectas en login

### 400 Bad Request

- Datos de entrada inválidos (email mal formateado, contraseña muy corta, etc.)

### Email already exists

- Intentaste registrar un email que ya existe

---

## 📦 Dependencias instaladas

```json
{
  "@nestjs/jwt": "^11.0.2",
  "@nestjs/passport": "^11.0.5",
  "@prisma/client": "^7.2.0",
  "passport": "^0.7.0",
  "passport-jwt": "^4.0.1",
  "bcrypt": "^6.0.0",
  "class-validator": "^0.14.3",
  "class-transformer": "^0.5.1",
  "prisma": "^7.2.0" // dev dependency
}
```

---

## 🎯 Próximos pasos

Para mejorar este sistema:

- [x] Conectar una base de datos real con Prisma ✅
- [ ] Implementar refresh tokens
- [ ] Añadir roles y permisos
- [ ] Implementar recuperación de contraseña
- [ ] Añadir rate limiting
- [ ] Implementar logout con blacklist de tokens
- [ ] Añadir verificación de email
- [ ] Migrar de SQLite a PostgreSQL/MySQL para producción
