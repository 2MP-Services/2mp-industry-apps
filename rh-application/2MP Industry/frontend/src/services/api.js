import axios from 'axios';

export const baseURL = 'http://192.168.10.31:1000/api';

const api = axios.create({
  baseURL, // URL du backend
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true, // Add this if using cookies/credentials
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;