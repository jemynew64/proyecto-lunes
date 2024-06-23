import { useForm } from "react-hook-form";
import { loginPost } from "../services/login_register";
import toast, { Toaster } from 'react-hot-toast';
import {useAuthStore} from "../store/auth";
import { useNavigate, Link } from "react-router-dom";



export const Form_login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setToken);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const datos = await loginPost(data);
      toast.success('Login exitoso');
      setAuth(datos.token, datos.user.role, datos.user.id); // Almacena el token y el rol del usuario
      reset();
      // Redirige según el rol del usuario
      if (datos.user.role === 'administrador') {
        navigate("/admin");
      } else {
        navigate("/lista-animes");
      }
    } catch (error) {
      toast.error('Error en el inicio de sesión');
    }
  });



return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="absolute top-0 left-0 m-4  p-2 rounded">
    <Link to={"/"}>
      <button className=" bg-[#9CEAEF] bg-opacity-75 text-black hover:text-white hover:bg-[#68D8D6] py-2 px-4 rounded-md border-2 border-white border-opacity-45 transition-all duration-750 ease-in-out font-mono">Atrás</button>
    </Link>
    </div>
    <Toaster />
    <div className="w-full max-w-md p-8 space-y-4 bg-gradient-to-b from-[#d8f3f3] to-transparent rounded shadow-lg">
      <div className="flex flex-col items-center">
        <h2 className="text-[#07BEB8] text-3xl mb-4 font-mono font-semibold text-shadow-white">Inicio de Sesión</h2>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
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
            placeholder="Usuario"
            className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#07BEB8] focus:border-[#07BEB8] sm:text-medium font-mono"
          />
          {errors.username && <span className="text-sm text-red-600">{errors.username.message}</span>}
        </div>

        <div>
          
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
            placeholder="Contraseña"
            className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#07BEB8] focus:border-[#07BEB8] sm:text-medium"
          />
          {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
        </div>
        <div className="flex flex-col items-center">
        <button 
          type="submit"
          className="w-1/2 bg-[#9CEAEF] bg-opacity-75 text-black hover:text-white hover:bg-[#68D8D6] py-2 px-4 rounded-md border-2 border-white border-opacity-45 transition-all duration-750 ease-in-out font-mono"
        >
          Iniciar Sesión
        </button>
        </div>
      </form>
    </div>
  </div>
);
};


