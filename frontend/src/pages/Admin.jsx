import { useState, useEffect } from "react";
import { usuariosObtener, usuariosEliminar } from "../services/Usuario/api";
import { UsuarioForm } from "../components/Usuarios/UsuarioForm";

export const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUsuario, setCurrentUsuario] = useState(null);

  const fetchUsuarios = async () => {
    const data = await usuariosObtener();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleDelete = async (id) => {
    await usuariosEliminar(id);
    fetchUsuarios();
  };

  const handleAdd = () => {
    setCurrentUsuario(null);
    setShowModal(true);
  };

  const handleEdit = (usuario) => {
    setCurrentUsuario(usuario);
    setShowModal(true);
  };

  const handleSave = () => {
    fetchUsuarios();
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-semibold leading-tight">
            Registro de Usuarios
          </h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAdd}
          >
            Agregar Usuario
          </button>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Nombre de Usuario
                </th>
                <th scope="col" className="py-3 px-6">
                  Nombre
                </th>
                <th scope="col" className="py-3 px-6">
                  Apellido
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Rol
                </th>
                <th scope="col" className="py-3 px-6">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr
                  key={usuario.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {usuario.username}
                  </th>
                  <td className="py-4 px-6">{usuario.name}</td>
                  <td className="py-4 px-6">{usuario.surname}</td>
                  <td className="py-4 px-6">{usuario.email}</td>
                  <td className="py-4 px-6">{usuario.role}</td>
                  <td className="py-4 px-6">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleEdit(usuario)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleDelete(usuario.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <UsuarioForm
              usuario={currentUsuario}
              onClose={() => setShowModal(false)}
              onSave={handleSave}
            />
          </div>
        </div>
      )}
    </div>
  );
};
