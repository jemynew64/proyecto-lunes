import { useState, useEffect } from 'react';
import { subscriptionObtener, subscriptionEliminar } from '../services/Subscription/api';
import { Edit, Trash } from 'lucide-react';
import { SubscriptionForm } from '../components/Subscription/SubscriptionForm';

export const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await subscriptionObtener();
        setSubscriptions(data);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleEdit = (subscription) => {
    setCurrentSubscription(subscription);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await subscriptionEliminar(id);
      setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  };

  const handleSave = async () => {
    setShowForm(false);
    setCurrentSubscription(null);
    const data = await subscriptionObtener();
    setSubscriptions(data);
  };

  const handleAdd = () => {
    setCurrentSubscription(null);
    setShowForm(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-semibold leading-tight">Lista de Suscripciones</h2>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={handleSearch}
            className="border rounded py-2 px-4"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAdd}
          >
            Agregar Suscripción
          </button>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Nombre
                </th>
                <th scope="col" className="py-3 px-6">
                  Precio
                </th>
                <th scope="col" className="py-3 px-6">
                  Tipo
                </th>
                <th scope="col" className="py-3 px-6">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((sub) => (
                <tr
                  key={sub.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {sub.name}
                  </th>
                  <td className="py-4 px-6">{sub.price}</td>
                  <td className="py-4 px-6">{sub.typeSubscription}</td>
                  <td className="py-4 px-6 flex space-x-2">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded flex items-center"
                      onClick={() => handleEdit(sub)}
                    >
                      <Edit className="w-4 h-4 mr-1" /> Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center"
                      onClick={() => handleDelete(sub.id)}
                    >
                      <Trash className="w-4 h-4 mr-1" /> Eliminar
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
              <SubscriptionForm
                subscription={currentSubscription}
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

