import { Student } from '../types';

export const mockStudents: Student[] = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    enrollmentDate: '2024-01-15',
    status: 'active',
    program: 'Ingeniería de Software',
  },
  {
    id: 2,
    name: 'María García',
    email: 'maria.garcia@example.com',
    enrollmentDate: '2024-02-20',
    status: 'active',
    program: 'Ciencias de la Computación',
  },
  {
    id: 3,
    name: 'Carlos López',
    email: 'carlos.lopez@example.com',
    enrollmentDate: '2023-09-10',
    status: 'graduated',
    program: 'Ingeniería de Software',
  },
  {
    id: 4,
    name: 'Ana Martínez',
    email: 'ana.martinez@example.com',
    enrollmentDate: '2024-03-05',
    status: 'inactive',
    program: 'Desarrollo Web',
  },
  {
    id: 5,
    name: 'Pedro Sánchez',
    email: 'pedro.sanchez@example.com',
    enrollmentDate: '2024-01-22',
    status: 'active',
    program: 'Ciencias de Datos',
  },
];
