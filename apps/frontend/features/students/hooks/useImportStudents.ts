import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { http } from '@/lib/http';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import type { ImportStudentsResponse } from '../types';

export const useImportStudents = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isError, error, ...rest } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      return http.post<ImportStudentsResponse>('/students/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: (data) => {
      // Refrescar datos del servidor (para las estadísticas del dashboard)
      router.refresh();
      // Invalidar la query de estudiantes para refrescar los datos
      queryClient.invalidateQueries({ queryKey: ['students'] });

      // Mostrar resumen de la importación
      if (data.failed === 0) {
        toast.success('Importación exitosa', {
          description: `Se importaron ${data.success} estudiante(s) correctamente.`,
        });
      } else {
        // Solo mostrar un toast de resumen, los errores se muestran en el diálogo
        toast.warning('Importación completada con errores', {
          description: `${data.success} exitoso(s), ${data.failed} fallido(s).`,
          duration: 5000,
        });
      }
    },
  });

  useErrorHandler(isError, error);

  return { ...rest };
};
