// src/services/api.js ou api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

// Interceptador para adicionar o token antes de cada requisição
api.interceptors.request.use(
  (config) => {
    const publicRoutes = ['/auth/register', '/auth/login'];
    if (!publicRoutes.includes(config.url)) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
