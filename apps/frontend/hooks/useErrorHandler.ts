import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import type { ServerErrorResponse } from '@/types/server-error';

export const useErrorHandler = (isError: boolean, error: Error | null) => {
  const router = useRouter();

  useEffect(() => {
    const handleError = async () => {
      // eslint-disable-next-line react-hooks/immutability
      const currentError = error;

      if (isError && currentError) {
        const axiosError = currentError as AxiosError<ServerErrorResponse>;

        // Manejar errores de red (sin respuesta del servidor)
        if (!axiosError.response) {
          let errorMessage = 'No se pudo conectar con el servidor.';

          if (axiosError.code === 'ERR_NETWORK' || axiosError.message.includes('Network Error')) {
            errorMessage =
              'Error de conexión. Verifica tu conexión a internet o que el servidor esté disponible.';
          } else if (axiosError.code === 'ECONNREFUSED') {
            errorMessage = 'Conexión rechazada. El servidor no está disponible en este momento.';
          } else if (axiosError.code === 'ETIMEDOUT') {
            errorMessage = 'Tiempo de espera agotado. El servidor no responde.';
          }

          toast.error('Error de Conexión', {
            description: errorMessage,
          });
          return;
        }

        // Verificar si response.data es un Blob
        if (axiosError.response?.data instanceof Blob) {
          try {
            const text = await axiosError.response.data.text();
            axiosError.response.data = JSON.parse(text);
          } catch (e) {
            console.error('Failed to parse Blob to JSON', e);
          }
        }

        // Redirigir a login en caso de 401
        if (axiosError.response?.status === 401) {
          router.push('/');
        }

        // Construir mensaje de error
        let errorMessage = 'Contacte al administrador del sistema.';

        if (axiosError.response?.data?.message) {
          const message = axiosError.response.data.message;
          if (Array.isArray(message)) {
            errorMessage = message.join(', ');
          } else {
            errorMessage = message;
          }
        } else if (axiosError.message) {
          errorMessage = axiosError.message;
        }

        toast.error('Error', {
          description: errorMessage,
        });
      }
    };

    handleError();
  }, [isError, error, router]);
};
