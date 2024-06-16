import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Form_login } from './components/Form_login.jsx';
// import { Navigation } from './components/Navigation.jsx';
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { useAuthStore } from "./store/auth.js";
import { Admin } from "./pages/Admin.jsx";
import { Usuario } from "./pages/Usuario.jsx";
import { RegistrarForm } from "./pages/RegisterForm.jsx";
import {Landing } from "./components/AnimeLanding.jsx";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import { LayoutDashboard, PersonStanding } from "lucide-react";


const App = () => {
  const location = useLocation();
  const isAuth = useAuthStore(state => state.isAuth);
  const isPermissions = useAuthStore(state => state.userRole);
  // en el caso que sea el login que no se muestre si vas a hacer un landing tiene que ser asi tambien 
  if (location.pathname === '/login') {
    return <Form_login />;
  }

  if (location.pathname === '/register') {
    return <RegistrarForm />;
  }
  if (location.pathname === '/landing'){
    return <Landing/>
  }

  return (
    <div className="flex">
      <Sidebar>
        {/* Mostrar elementos del sidebar según el rol del usuario */}
        {isPermissions === "administrador" && (
          <SidebarItem icon={<PersonStanding size={20} />} text="admin" to="/admin" />
        )}
        {isAuth && (
          <SidebarItem icon={<LayoutDashboard size={20} />} text="usuario" to="/usuario" />
        )}
      </Sidebar>
      <main className="flex-1 p-4">
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/login" element={<Form_login />} />
        {/* Rutas sin protección */}
        <Route path="/register" element={<RegistrarForm />} />

        {/* Rutas con protección para rutas admin y rutas del usuario */}
        <Route element={<ProtectedRoute isAllowed={!!isAuth && isPermissions === "administrador"} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!isAuth} />}>
          <Route path="/usuario" element={<Usuario />} />
        </Route>
      </Routes>
      </main>
    </div>
  );
}

export const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
