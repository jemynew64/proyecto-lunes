import PropTypes from 'prop-types';
import { LogOut ,ChevronFirst, ChevronLast } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth";



const SidebarContext = createContext(undefined);



export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded, setExpanded }}>
          <ul className="flex-1 px-3">{children}</ul>
          <div className="border-t flex p-3">
            {/* Información de usuario */}
          </div>
          <div className="p-3">
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="w-full text-left px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center"
              >
            <LogOut size={20} className="mr-2" /> Cerrar Sesión
            </button>
          </div>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}



export function SidebarItem({ icon, text, alert, to }) {
  const context = useContext(SidebarContext);
  const location = useLocation(); // Obtener la ubicación actual
  if (!context) {
    throw new Error("SidebarItem must be used within a SidebarContext");
  }
  const { expanded } = context;

  // Verificar si la ruta actual coincide con la prop `to`
  const isActive = location.pathname === to;

  return (
    <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${isActive ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}>
      {icon}
      <Link to={to} className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
        {text}
      </Link>
      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>
        </div>
      )}
      {!expanded && (
        <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
          {text}
        </div>
      )}
    </li>
  );
}


Sidebar.propTypes = {
    children: PropTypes.node.isRequired,
  };

  SidebarItem.propTypes = {
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
    alert: PropTypes.bool,
    to: PropTypes.string.isRequired,
  };