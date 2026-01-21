'use client';

import { StudentsTable } from '@/features/students/components/StudentsTable';
import { ImportStudentsDialog } from '@/features/students/components/ImportStudentsDialog';
import { useStudents } from '@/features/students/hooks/useStudents';

export default function Page() {
  const { data: students = [], isLoading } = useStudents();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Estudiantes</h1>
          <p className="text-muted-foreground mt-1">Gestiona la información de los estudiantes</p>
        </div>
        <ImportStudentsDialog />
      </div>

      <StudentsTable students={students} isLoading={isLoading} />
    </div>
  );
}
