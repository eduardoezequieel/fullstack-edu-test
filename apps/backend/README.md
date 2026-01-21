# Backend - Sistema de Gestión de Estudiantes

API REST construida con NestJS para la gestión de estudiantes, incluyendo autenticación JWT, importación de archivos CSV/Excel y validación de datos.

## Arquitectura

El proyecto utiliza la **arquitectura modular de NestJS** con los siguientes principios:

- **Módulos por dominio**: Separación clara entre `auth`, `users` y `students`, cada uno con su responsabilidad específica
- **Inyección de dependencias**: Facilita el testing y mantiene bajo acoplamiento entre componentes
- **DTOs con validación**: `class-validator` asegura integridad de datos en el boundary de la aplicación
- **TypeORM con Repository Pattern**: Abstracción de la capa de datos que permite cambiar el motor de BD sin afectar la lógica de negocio
- **Guards y Strategies**: Autenticación JWT desacoplada usando Passport.js para proteger rutas de forma declarativa

Esta arquitectura es escalable, testeable y sigue las mejores prácticas de NestJS, permitiendo agregar nuevos módulos sin afectar los existentes.

## Tecnologías

- **NestJS** v11 - Framework backend
- **TypeORM** - ORM para manejo de base de datos
- **SQLite** (better-sqlite3) - Base de datos
- **Passport JWT** - Autenticación
- **XLSX** - Procesamiento de archivos Excel/CSV
- **class-validator** - Validación de DTOs
- **bcrypt** - Hash de contraseñas

## Estructura del Proyecto

```
src/
├── auth/              # Módulo de autenticación
│   ├── dto/          # DTOs para login y registro
│   ├── jwt.strategy.ts
│   └── jwt-auth.guard.ts
├── users/            # Módulo de usuarios
│   ├── user.entity.ts
│   └── users.service.ts
└── students/         # Módulo de estudiantes
    ├── dto/          # DTOs con validaciones
    ├── student.entity.ts
    ├── students.controller.ts
    └── students.service.ts
```

## Instalación y Ejecución

```bash
# Instalar dependencias
$ pnpm install

# Ejecutar seed para datos iniciales
$ pnpm run seed

# Modo desarrollo
$ pnpm run start:dev

# Modo producción
$ pnpm run start:prod
```

## API Endpoints

### Autenticación

- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Login (retorna JWT)
- `GET /auth/me` - Obtener usuario actual (requiere JWT)

### Estudiantes

- `GET /students` - Listar todos los estudiantes
- `GET /students/stats` - Estadísticas (total, activos, graduados)
- `POST /students` - Crear estudiante
- `POST /students/import` - Importar desde CSV/Excel
- `DELETE /students/truncate` - Eliminar todos los estudiantes
- `DELETE /students/:id` - Eliminar estudiante

## Variables de Entorno

```env
JWT_SECRET=your_jwt_secret_key
PORT=4000
```

## Base de Datos

El proyecto usa SQLite con TypeORM. La base de datos se crea automáticamente en `database.sqlite`.

### Seed Data

Para poblar la base de datos con datos iniciales:

```bash
pnpm run seed
```

Esto crea un usuario de prueba:

- Email: `admin@admin.com`
- Password: `admin123`

## Validaciones

Los estudiantes deben cumplir:

- **name**: String no vacío
- **startYear**: Entre 1900 y año actual
- **nue**: String único
- **status**: "active" o "graduated"
- **graduationAverage**: 0-10 (obligatorio si status es "graduated")

## Importación de Archivos

El endpoint `/students/import` acepta archivos CSV y Excel (.xls, .xlsx) con las siguientes columnas:

- `nombre_estudiante`
- `anio_inicio`
- `nue`
- `estado` (activo/graduado)
- `promedio_graduacion`

El sistema procesa cada fila independientemente y retorna un resumen con éxitos y errores detallados por fila.

## License

[MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
