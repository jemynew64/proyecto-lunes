import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist((set) => ({
    token: "",
    isAuth: false,
    userRole: "", // Estado para el rol del usuario
    setToken: (token, userRole) => set({ token, isAuth: true, userRole }), // Actualiza el token, isAuth y el rol del usuario
    logout: () => set({ token: "", isAuth: false, userRole: "" }), // Limpia el token, isAuth y el rol del usuario
  }), 
  { 
    name: "auth", // El estado se guardará con el nombre 'auth' en el almacenamiento local
  })
);
