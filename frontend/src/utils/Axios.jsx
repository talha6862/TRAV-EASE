import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8001',
  withCredentials: true, 
  timeout: 10000,
});

export default api;
