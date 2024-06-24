import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { subscriptioncreate, subscriptionupdate } from '../../services/Subscription/api';

export const SubscriptionForm = ({ subscription, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [typeSubscription, setTypeSubscription] = useState('');

  useEffect(() => {
    if (subscription) {
      setName(subscription.name);
      setPrice(subscription.price);
      setTypeSubscription(subscription.typeSubscription);
    }
  }, [subscription]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      price: parseFloat(price),
      typeSubscription,
    };

    try {
      if (subscription && subscription.id) {
        formData.id = subscription.id; 
        await subscriptionupdate(formData);
      } else {
        await subscriptioncreate(formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving subscription:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Nombre
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Precio
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          type="number"
          step="any"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="typeSubscription">
          Tipo de Suscripción
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="typeSubscription"
          type="text"
          value={typeSubscription}
          onChange={(e) => setTypeSubscription(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {subscription ? 'Actualizar' : 'Crear'}
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

SubscriptionForm.propTypes = {
  subscription: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    typeSubscription: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

