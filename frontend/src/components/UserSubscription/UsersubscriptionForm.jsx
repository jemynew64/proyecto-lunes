import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usersubscriptionupdate, usersubscriptioncreate } from "../../services/UserSubscription/api";
import { usuariosObtener } from "../../services/Usuario/api";
import { subscriptionObtener } from "../../services/Subscription/api";

export const UsersubscriptionForm = ({ usersubscription, onClose, onSave }) => {
  const [idUser, setIdUser] = useState('');
  const [idSubscription, setIdSubscription] = useState('');
  const [subscriptionDate, setSubscriptionDate] = useState('');
  const [terminationDate, setTerminationDate] = useState('');
  const [activeStatus, setActiveStatus] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetchUsuarios();
    fetchSubscriptions();

    if (usersubscription) {
      setIdUser(usersubscription.idUser.toString());
      setIdSubscription(usersubscription.idSubscription.toString());
      // Formatear las fechas para que sean compatibles con datetime-local
      setSubscriptionDate(usersubscription.subscriptionDate.slice(0, 16)); // Eliminar la "Z"
      setTerminationDate(usersubscription.terminationDate.slice(0, 16)); // Eliminar la "Z"
      setActiveStatus(usersubscription.activeStatus);
    }
  }, [usersubscription]);

  const fetchUsuarios = async () => {
    try {
      const data = await usuariosObtener();
      setUsuarios(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const data = await subscriptionObtener();
      setSubscriptions(data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      idUser: parseInt(idUser),
      idSubscription: parseInt(idSubscription),
      // Ajustar las fechas para enviarlas al servidor
      subscriptionDate: subscriptionDate + ":00Z", // Añadir segundos y "Z"
      terminationDate: terminationDate + ":00Z", // Añadir segundos y "Z"
      activeStatus,
    };

    try {
      if (usersubscription && usersubscription.id) {
        formData.id = usersubscription.id; // Agregar ID para actualizar
        await usersubscriptionupdate(formData);
      } else {
        await usersubscriptioncreate(formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving user subscription:', error);
      // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="idUser"
        >
          Usuario
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="idUser"
          value={idUser}
          onChange={(e) => setIdUser(e.target.value)}
        >
          <option value="">Seleccionar Usuario</option>
          {usuarios.map((user) => (
            <option key={user.id} value={user.id.toString()}>
              {user.name} {user.surname}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="idSubscription"
        >
          Suscripción
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="idSubscription"
          value={idSubscription}
          onChange={(e) => setIdSubscription(e.target.value)}
        >
          <option value="">Seleccionar Suscripción</option>
          {subscriptions.map((subscription) => (
            <option key={subscription.id} value={subscription.id.toString()}>
              {subscription.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="subscriptionDate"
        >
          Fecha de Suscripción
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subscriptionDate"
          type="datetime-local"
          value={subscriptionDate}
          onChange={(e) => setSubscriptionDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="terminationDate"
        >
          Fecha de Terminación
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="terminationDate"
          type="datetime-local"
          value={terminationDate}
          onChange={(e) => setTerminationDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="activeStatus"
        >
          Estado Activo
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="activeStatus"
          value={activeStatus ? 'true' : 'false'}
          onChange={(e) => setActiveStatus(e.target.value === 'true')}
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {usersubscription ? 'Actualizar' : 'Crear'}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

UsersubscriptionForm.propTypes = {
  usersubscription: PropTypes.shape({
    id: PropTypes.number,
    idUser: PropTypes.number,
    idSubscription: PropTypes.number,
    subscriptionDate: PropTypes.string,
    terminationDate: PropTypes.string,
    activeStatus: PropTypes.bool,
  }),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default UsersubscriptionForm;
