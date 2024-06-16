
import axios from "axios";
import { useAuthStore } from "../store/auth";

const axiosAuth = axios.create({
    // baseURL: 'http://127.0.0.1:8000/api/',
     baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
 });

// Obtener el token directamente del estado de la tienda
const token = useAuthStore.getState().token;

// Interceptor para incluir el token de autorización en las solicitudes
 axiosAuth.interceptors.request.use((config) => {
     config.headers.Authorization = `Bearer ${token}`;
     return config;
 });

 export default axiosAuth;
