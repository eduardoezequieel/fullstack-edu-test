import { Student } from '../types';
import { cn } from '@/lib/utils';
import { Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTruncateStudents } from '../hooks/useTruncateStudents';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

type StudentsTableProps = {
  students: Student[];
  isLoading?: boolean;
};

const statusLabels = {
  active: 'Activo',
  graduated: 'Graduado',
};

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  graduated: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
};

export function StudentsTable({ students, isLoading = false }: StudentsTableProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutate: truncateStudents, isPending } = useTruncateStudents();

  const handleTruncate = () => {
    truncateStudents(undefined, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Vaciar Tabla
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Estás seguro?</DialogTitle>
              <DialogDescription>
                Esta acción eliminará todos los estudiantes de la base de datos. Esta operación no
                se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isPending}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleTruncate} disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Eliminando...
                  </>
                ) : (
                  'Sí, eliminar todos'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Nombre</th>
                <th className="px-4 py-3 text-left font-medium">NUE</th>
                <th className="px-4 py-3 text-left font-medium">Año de Inicio</th>
                <th className="px-4 py-3 text-left font-medium">Promedio</th>
                <th className="px-4 py-3 text-left font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="text-muted-foreground">Cargando estudiantes...</span>
                    </div>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-muted-foreground px-4 py-8 text-center">
                    No hay estudiantes registrados
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3">{student.id}</td>
                    <td className="px-4 py-3 font-medium">{student.name}</td>
                    <td className="text-muted-foreground px-4 py-3">{student.nue}</td>
                    <td className="px-4 py-3">{student.startYear}</td>
                    <td className="px-4 py-3">
                      {student.graduationAverage ? student.graduationAverage.toFixed(2) : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'inline-flex rounded-full px-2 py-1 text-xs font-semibold',
                          statusColors[student.status]
                        )}
                      >
                        {statusLabels[student.status]}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
