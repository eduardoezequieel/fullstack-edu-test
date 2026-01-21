import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { http } from '@/lib/http';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export const useTruncateStudents = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isError, error, ...rest } = useMutation({
    mutationFn: async () => {
      return http.delete('/students/truncate');
    },
    onSuccess: () => {
      // Invalidar la query de estudiantes para refrescar los datos
      queryClient.invalidateQueries({ queryKey: ['students'] });

      // Refrescar datos del servidor (para las estadísticas del dashboard)
      router.refresh();

      toast.success('Tabla vaciada', {
        description: 'Todos los estudiantes han sido eliminados.',
      });
    },
  });

  useErrorHandler(isError, error);

  return { ...rest };
};
