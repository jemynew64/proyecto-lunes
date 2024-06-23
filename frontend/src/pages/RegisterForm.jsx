import { useForm } from "react-hook-form";
import { RegisterPost } from "../services/login_register";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export const RegistrarForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password", "");

  const onSubmit = async (data) => {
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...submitData } = data; // Excluir el campo confirmPassword
    try {
      await RegisterPost(submitData);
      toast.success("Registro exitoso");
      reset();
      navigate("/login");
    } catch (error) {
      toast.error("Error en el registro");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  ">
      <div className="absolute top-0 left-0 m-4  p-2 rounded">
    <Link to={"/"}>
      <button className=" bg-[#9CEAEF] bg-opacity-75 text-black hover:text-white hover:bg-[#68D8D6] py-2 px-4 rounded-md border-2 border-white border-opacity-45 transition-all duration-750 ease-in-out font-mono">Atrás</button>
    </Link>
    </div>
      <Toaster />
      <div className="bg-gradient-to-b from-[#d8f3f3] to-transparent p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          <h2 className="text-[#07BEB8] text-3xl mb-4 font-mono font-semibold text-shadow-white">
            Registro
          </h2>
        </div>
    
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            
            <input
              type="text"
              {...register("username", { required: true, minLength: 3 })}
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#07BEB8] focus:border-[#07BEB8] sm:text-medium font-mono" placeholder="Usuario"
            />
            {errors.username && errors.username.type === "required" && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
            {errors.username && errors.username.type === "minLength" && (
              <span className="text-red-500">
                El nombre de usuario debe tener al menos 3 caracteres
              </span>
            )}
          </div>
          <div className="mb-4">
          
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#07BEB8] focus:border-[#07BEB8] sm:text-medium font-mono" placeholder="Nombres"
            />
            {errors.name && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              {...register("surname", { required: true })}
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#07BEB8] focus:border-[#07BEB8] sm:text-medium font-mono" placeholder="Apellidos"
            />
            {errors.surname && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </div>
          <div className="mb-4">
            
            <input
              type="email"
              {...register("email", {
                required: "El correo electrónico es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Formato de correo electrónico inválido",
                },
              })}
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#07BEB8] focus:border-[#07BEB8] sm:text-medium font-mono" placeholder="Correo Electrónico"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#07BEB8] focus:border-[#07BEB8] sm:text-medium font-mono" placeholder="Contraseña"
            />
            {errors.password && errors.password.type === "required" && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span className="text-red-500">
                La contraseña debe tener al menos 6 caracteres
              </span>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#07BEB8] focus:border-[#07BEB8] sm:text-medium font-mono" placeholder="Repita la Contraseña"
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            
            <button
              type="button"
              onClick={() => reset()}
              className="w-1/3 bg-[#9CEAEF] bg-opacity-75 text-black hover:text-white hover:bg-[#68D8D6] py-2 px-4 rounded-md border-2 border-white border-opacity-45 transition-all duration-750 ease-in-out font-mon"
            >
              Limpiar
            </button>
            <button
              type="submit"
              className="w-1/3 bg-[#9CEAEF] bg-opacity-75 text-black hover:text-white hover:bg-[#07BEB8] py-2 px-4 rounded-md border-2 border-white border-opacity-45 transition-all duration-750 ease-in-out font-mon"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
