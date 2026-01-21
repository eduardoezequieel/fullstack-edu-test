// ESTE ADAPTADOR FUNCIONA SOLAMENTE EN EL CLIENTE (BROWSER)

import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';
import Cookie from 'js-cookie';

// Nombre de las cookies para tokens
export const AUTH_COOKIE_NAME = 'access_token';
export const REFRESH_COOKIE_NAME = 'refresh_token';

// Crear instancia de axios con configuración base
const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor de request - Agregar token si existe
httpClient.interceptors.request.use(
  (config) => {
    const token = Cookie.get(AUTH_COOKIE_NAME);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response - Manejar errores globales
httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Manejar 401 Unauthorized
    if (error.response?.status === 401) {
      // Limpiar tokens
      Cookie.remove(AUTH_COOKIE_NAME);
      Cookie.remove(REFRESH_COOKIE_NAME);

      // Redirigir a login si no estamos ya ahí
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth')) {
        const currentPath = window.location.pathname;
        window.location.href = `/auth/login?redirect=${encodeURIComponent(currentPath)}`;
      }
    }

    return Promise.reject(error);
  }
);

// Funciones helper para configuraciones comunes
export const http = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    httpClient.get<T>(url, config).then((res) => res.data),

  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    httpClient.post<T>(url, data, config).then((res) => res.data),

  put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    httpClient.put<T>(url, data, config).then((res) => res.data),

  patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    httpClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    httpClient.delete<T>(url, config).then((res) => res.data),
};

// Exportar la instancia de axios por si se necesita acceso completo
export { httpClient };
