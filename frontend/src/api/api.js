// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Your API base URL
  withCredentials: true, 
});

// Request interceptor to add the Authorization token to headers
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage or any storage you prefer
    const token = localStorage.getItem('admin_token');
    if (token) {
      // Set the Authorization header with the token
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
