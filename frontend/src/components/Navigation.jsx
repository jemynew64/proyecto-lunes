import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useAuthStore } from "../store/auth"

export const Navigation = () => {
    
  const logout = useAuthStore(state => state.logout)
  const navigate = useNavigate()
  
  const [showButtons, setShowButtons] = useState(true);

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setShowButtons(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <>
      <div className="fixed top-0 w-full z-10 bg-sky-300 shadow-xl ring-1 ring-gray-900/5">
        <nav className="px-4 py-4 sm:flex sm:items-center sm:justify-between">
          <section className="flex justify-between">
            <img src="/img/logo.svg" className="h-6" alt="Tailwind Play" />
            <button className="text-gray-700 sm:hidden" onClick={toggleButtons}>
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
              </svg>
            </button>
          </section>
          <div className={`flex flex-col items-start mt-3 gap-2 sm:flex-row sm:m-0 ${showButtons ? '' : 'hidden'}`}>
            <Link to="/" className="text-gray-600 hover:bg-gray-200 w-full text-left px-2 rounded hover:text-gray-900">Home</Link>
            <Link to="/docs" className="text-gray-600 hover:bg-gray-200 w-full text-left px-2 rounded hover:text-gray-900">Docs</Link>
            <Link to="/contacto" className="text-gray-600 hover:bg-gray-200 w-full text-left px-2 rounded hover:text-gray-900">Contacto</Link>
            <button onClick={() => {
              logout()
              navigate("/")
            }}>Logout</button>
          </div>
        </nav>
      </div>
      <div className="h-16"></div>
    </>
  );
}