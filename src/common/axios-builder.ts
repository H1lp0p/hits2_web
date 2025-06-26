import axios, { AxiosInstance } from 'axios';
import { apiUrl } from '../config/default-config';

export const createApi = (getToken: () => string | null, refreshToken: () => Promise<string | null>): AxiosInstance => {
  const instance = axios.create({
    baseURL: apiUrl,
  });

  // Interceptor with token header
  instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Interceptor with auto-refresh
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newToken = await refreshToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};