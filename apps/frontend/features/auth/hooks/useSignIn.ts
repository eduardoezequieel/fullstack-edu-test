import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';
import { toast } from 'sonner';
import { http } from '@/lib/http';
import { AUTH_COOKIE_NAME } from '@/lib/http';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import type { LoginFormData } from '../schemas/login.schema';
import type { LoginResponse } from '../types';

export const useSignIn = () => {
  const router = useRouter();

  const { isError, error, ...rest } = useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      return http.post<LoginResponse>('/auth/login', credentials);
    },
    onSuccess: (data) => {
      // Guardar access token en cookie
      Cookie.set(AUTH_COOKIE_NAME, data.access_token, { expires: 1 });

      toast.success('Éxito', {
        description: 'Sesión iniciada correctamente.',
      });

      // Redirigir después de un breve delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    },
  });

  useErrorHandler(isError, error);

  return { ...rest };
};
