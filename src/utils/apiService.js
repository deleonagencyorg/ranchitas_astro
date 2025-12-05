import axios from 'axios';
import { toast } from 'sonner';
import axiosRetry from 'axios-retry';
import { setupCache } from 'axios-cache-interceptor';
import { QueryClient } from '@tanstack/react-query';

// Configuración de React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      retry: 2,
    },
  },
});

// Configuración base de axios
const api = axios.create({
  baseURL: import.meta.env.PUBLIC_BACK_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configurar reintentos
axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return !error.response || error.response.status >= 500;
  },
});

// Configurar caché básico
setupCache(api);

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(`API Error: ${errorMessage}`);
    return Promise.reject(error);
  }
);

export const apiRequest = async ({ method = 'GET', url, data, params }) => {
  try {
    const response = await api({
      method,
      url,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
