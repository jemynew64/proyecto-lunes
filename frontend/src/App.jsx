import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Form_login } from "./components/Form_login.jsx";
// import { Navigation } from './components/Navigation.jsx';
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { useAuthStore } from "./store/auth.js";
import { Category } from "./pages/Category.jsx";
import { AnimeFavorite } from "./pages/AnimeFavorite.jsx";
import { Anime } from "./pages/Anime.jsx";
import { Admin } from "./pages/Admin.jsx";
import { Usuario } from "./pages/Usuario.jsx";
import { RegistrarForm } from "./pages/RegisterForm.jsx";
import { Landing } from "./components/AnimeLanding.jsx";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import {
  LayoutDashboard,
  PersonStanding,
  BookOpenText,
  Search,
  Heart,
  Library,
} from "lucide-react";
import { AnimeCategories } from "./pages/AnimeCategories.jsx";

const App = () => {
  const location = useLocation();
  const isAuth = useAuthStore((state) => state.isAuth);
  const isPermissions = useAuthStore((state) => state.userRole);
  // en el caso que sea el login que no se muestre si vas a hacer un landing tiene que ser asi tambien
  if (location.pathname === "/login") {
    return <Form_login />;
  }

  if (location.pathname === "/register") {
    return <RegistrarForm />;
  }
  if (location.pathname === "/") {
    return <Landing />;
  }

  return (
    <div className="flex">
      <Sidebar>
        {/* Mostrar elementos del sidebar según el rol del usuario */}
        {isPermissions === "administrador" && (
        <>
          <SidebarItem icon={<PersonStanding size={20} />} text="Admin" to="/admin" />
          <SidebarItem icon={<BookOpenText size={20} />} text="Anime" to="/anime" />
          <SidebarItem icon={<Search size={20} />} text="Categorias" to="/category" />
          <SidebarItem icon={<Library size={20} />} text="Categorizacion" to="/animecategories" />
        </>
          )}
        {isPermissions === "usuario" && (
          <>
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Usuario" to="/usuario" />
          <SidebarItem icon={<Heart size={20} />} text="Favoritos" to="/animefavorite" />
          </>
        )}
      </Sidebar>
      <main className="flex-1 p-4 ml-64">
        <Routes>
          {/* Rutas sin protección */}
          <Route path="/" element={<Navigate to="/" />} />
          <Route path="/login" element={<Form_login />} />
          <Route path="/register" element={<RegistrarForm />} />

          {/* Rutas con protección para rutas admin y rutas del usuario */}
          <Route element={<ProtectedRoute isAllowed={!!isAuth && isPermissions === "administrador"}/>}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/anime" element={<Anime />} />
            <Route path="/category" element={<Category />} />
            <Route path="/animecategories" element={<AnimeCategories />} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={!!isAuth && isPermissions === "usuario"} />}>
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/animefavorite" element={<AnimeFavorite />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
