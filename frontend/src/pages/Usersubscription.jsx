import { useState, useEffect } from 'react';
import { usersubscriptionEliminar, usersubscriptionObtener } from '../services/UserSubscription/api';
import { UsersubscriptionForm } from "../components/UserSubscription/UsersubscriptionForm";

export const Usersubscription = () => {
  const [usersubscriptions, setUserSubscriptions] = useState([]);
  const [currentUsersubscription, setCurrentUsersubscription] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUserSubscriptions();
  }, []);

  const fetchUserSubscriptions = async () => {
    try {
      const data = await usersubscriptionObtener();
      setUserSubscriptions(data);
    } catch (error) {
      console.error('Error fetching user subscriptions:', error);
    }
  };

  const handleEdit = (usersubscription) => {
    setCurrentUsersubscription(usersubscription);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await usersubscriptionEliminar(id);
      setUserSubscriptions(usersubscriptions.filter((sub) => sub.id !== id));
    } catch (error) {
      console.error('Error deleting user subscription:', error);
    }
  };

  const handleSave = async () => {
    setShowForm(false);
    setCurrentUsersubscription(null);
    fetchUserSubscriptions();
  };

  const handleAdd = () => {
    setCurrentUsersubscription(null);
    setShowForm(true);
  };

  // Función para formatear la fecha en un formato legible
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', minute: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-semibold leading-tight">
            Lista de Suscripciones de Usuarios
          </h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAdd}
          >
            Agregar Suscripción de Usuario
          </button>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Usuario
                </th>
                <th scope="col" className="py-3 px-6">
                  Suscripción
                </th>
                <th scope="col" className="py-3 px-6">
                  Fecha de Suscripción
                </th>
                <th scope="col" className="py-3 px-6">
                  Fecha de Terminación
                </th>
                <th scope="col" className="py-3 px-6">
                  Estado Activo
                </th>
                <th scope="col" className="py-3 px-6">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {usersubscriptions.map((sub) => (
                <tr
                  key={sub.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{sub.id}</td>
                  <td className="py-4 px-6">{sub.Usuario_nombre}</td>
                  <td className="py-4 px-6">{sub.Subscripcion_nombre}</td>
                  <td className="py-4 px-6">{formatDate(sub.subscriptionDate)}</td>
                  <td className="py-4 px-6">{formatDate(sub.terminationDate)}</td>
                  <td className="py-4 px-6">{sub.activeStatus ? 'Activo' : 'Inactivo'}</td>
                  <td className="py-4 px-6 flex space-x-2">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded flex items-center"
                      onClick={() => handleEdit(sub)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center"
                      onClick={() => handleDelete(sub.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <UsersubscriptionForm
                usersubscription={currentUsersubscription}
                onSave={handleSave}
                onClose={() => setShowForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usersubscription;
