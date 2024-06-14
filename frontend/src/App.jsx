import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Form_login } from './components/Form_login.jsx';
import { Navigation } from './components/Navigation.jsx';
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { useAuthStore } from "./store/auth.js";
import { Admin } from "./pages/Admin.jsx";
import { Usuario } from "./pages/Usuario.jsx";
import { RegistrarForm } from "./pages/RegisterForm.jsx";

const App = () => {
  const location = useLocation();
  const isAuth = useAuthStore(state => state.isAuth);
  const isPermissions = useAuthStore(state => state.userRole);



  return (
    <>
      {location.pathname !== '/login' && <Navigation />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
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

        {/* Redirigir a la página usuario si no existe lo cambiariamos a nuestra landing */}
        <Route path="*" element={<Navigate to="/usuario" />} />
      </Routes>
    </>
  );
}

export const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
