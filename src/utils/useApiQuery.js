import { useQuery } from '@tanstack/react-query';
import { apiRequest } from './apiService';

export const useApiQuery = (key, { url, params = {}, ...options } = {}) => {
  return useQuery({
    queryKey: [key, params],
    queryFn: () => apiRequest({ method: 'GET', url, params }),
    ...options,
  });
};

export const useApiMutation = (method = 'POST') => {
  return useMutation({
    mutationFn: ({ url, data }) => apiRequest({ method, url, data }),
  });
};
