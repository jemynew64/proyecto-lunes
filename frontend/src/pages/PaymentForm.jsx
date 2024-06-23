import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { subscribeToSubscription } from '../services/AnimePrivate/apiAnimeL';
import { useAuthStore } from '../store/auth';
import toast, { Toaster } from 'react-hot-toast';

export const PaymentForm = () => {
    const { subscriptionId } = useParams();
    const { userId } = useAuthStore(state => state);
    const navigate = useNavigate();
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expirationMonth, setExpirationMonth] = useState('');
    const [expirationYear, setExpirationYear] = useState('');
    const [cvv, setCvv] = useState('');

    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); 
        const formattedValue = value.replace(/(.{4})/g, '$1-').slice(0, 19); 
        setCardNumber(formattedValue);
    };

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); 
        setCvv(value.slice(0, 3)); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cardNumber.replace(/-/g, '').length !== 16) {
            toast.error("Card number must be 16 digits");
            return;
        }

        if (cvv.length !== 3) {
            toast.error("CVV must be 3 digits");
            return;
        }

        try {
            await subscribeToSubscription(subscriptionId, userId);
            toast.success("Subscription purchased successfully!");
            setTimeout(() => navigate(`/anime/${subscriptionId}`), 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error("Error subscribing:", error);
            toast.error("Error subscribing to the subscription!");
        }
    };

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-[#d8f3f3] to-transparent">
            <Toaster />
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="mb-8">
                    <div className="bg-blue-700 text-white text-center p-4 rounded-t-lg">
                        <h2 className="text-lg font-bold">Imformacion de Pago</h2>
                    </div>
                    <div className="flex justify-center bg-blue-500 p-4 rounded-b-lg relative">
                        <div className="w-80 h-48 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg shadow-lg p-4">
                            <div className="flex justify-between text-white font-semibold text-lg">
                                <span>{cardNumber || '####-####-####-####'}</span>
                            </div>
                            <div className="mt-8 flex justify-between">
                                <div className="flex flex-col">
                                    <span className="text-white text-sm">Titular</span>
                                    <span className="font-semibold">{cardName || 'Your Name'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white text-sm">Expires</span>
                                    <span className="font-semibold">{expirationMonth || 'MM'}/{expirationYear || 'YY'}</span>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 m-4 text-white font-semibold">
                                <span>{cvv || 'CVV'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                            Número de Tarjeta
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardName">
                            Nombre del Titular
                        </label>
                        <input
                            type="text"
                            id="cardName"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expirationDate">
                            Fecha de Vencimiento
                        </label>
                        <div className="flex space-x-2">
                            <select
                                value={expirationMonth}
                                onChange={(e) => setExpirationMonth(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="" disabled>Mes</option>
                                {months.map(month => (
                                    <option key={month} value={month}>
                                        {month < 10 ? `0${month}` : month}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={expirationYear}
                                onChange={(e) => setExpirationYear(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="" disabled>Año</option>
                                {years.map(year => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
                            CVV
                        </label>
                        <input
                            type="text"
                            id="cvv"
                            value={cvv}
                            onChange={handleCvvChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Pagar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
