import { useForm } from "react-hook-form";
import { loginPost } from "../services/login_register";
import toast, { Toaster } from 'react-hot-toast';
import {useAuthStore} from "../store/auth";
import { useNavigate } from "react-router-dom";



export const Form_login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setToken);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const datos = await loginPost(data);
      toast.success('Login exitoso');
      setAuth(datos.token, datos.user.role); // Almacena el token y el rol del usuario
      reset();
      // Redirige según el rol del usuario
      if (datos.user.role === 'administrador') {
        navigate("/admin");
      } else {
        navigate("/usuario");
      }
    } catch (error) {
      toast.error('Error en el inicio de sesión');
    }
  });



return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <Toaster />
    <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input 
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "El nombre es requerido"
              }, 
              minLength: {
                value: 2,
                message: 'Nombre debe tener al menos 2 caracteres'
              },
              maxLength: {
                value: 20,
                message: 'Nombre debe tener máximo 20 caracteres'
              }
            })}
            className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.username && <span className="text-sm text-red-600">{errors.username.message}</span>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password"
            id="password"
            {...register("password", {
              required: {
                value: true,
                message: "El password es requerido"
              }, 
              minLength: {
                value: 2,
                message: 'El password debe tener al menos 2 caracteres'
              },
              maxLength: {
                value: 20,
                message: 'El password debe tener máximo 20 caracteres'
              }
            })}
            className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
        </div>

        <button 
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Logearse
        </button>
      </form>
    </div>
  </div>
);
};


