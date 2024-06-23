import { useEffect, useState } from 'react';
import { fetchSubscriptions } from '../services/AnimePrivate/apiAnimeL';
import { useAuthStore } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export const SubscriptionList = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [error, setError] = useState(null);
    const { userId } = useAuthStore(state => state);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSubscriptions();
                setSubscriptions(data);
            } catch (error) {
                setError('Error fetching subscriptions');
            }
        };
        fetchData();
    }, []);

    const handleSubscribe = async (subscriptionId) => {
        if (!userId) {
            toast.error("User ID is not available");
            return;
        }
        navigate(`/payment/${subscriptionId}`);
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg-white w-full flex flex-col items-center justify-start bg-gradient-to-t from-[#d8f3f3] to-transparent">
            <Toaster />
            <div className="relative w-full h-96 mb-5">
                <img
                    src="https://img.freepik.com/foto-gratis/paisaje-anime-persona-que-viaja_23-2151038201.jpg?size=626&ext=jpg&ga=GA1.1.999420897.1709133807&semt=ais_user"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                    <h1 className="text-[#07BEB8] text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 font-mono font-semibold text-shadow-white text-center">
                        Subscription Plans
                    </h1>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 w-full px-6">
                {subscriptions.map((subscription) => (
                    <div
                        key={subscription.id}
                        className="flex flex-col bg-white hover:bg-gray-100 bg-opacity-90 p-6 rounded-lg border-2 border-white hover:shadow-2xl shadow-lg font-mono transition-all duration-500 ease-in-out transform hover:scale-105"
                    >
                        <div className="text-center">
                            <h2 className="uppercase font-bold text-2xl mb-4 text-blue-600">
                                {subscription.name}
                            </h2>
                            <div className="text-lg mb-2">
                                <span className="font-bold">Price:</span> ${subscription.price}
                            </div>
                            <div className="text-lg mb-2">
                                <span className="font-bold">Type:</span> {subscription.typeSubscription}
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-5">
                            <button
                                onClick={() => handleSubscribe(subscription.id)}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all duration-500 ease-in-out transform hover:scale-105"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
