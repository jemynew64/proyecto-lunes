import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/AnimePrivate/apiAnimeL';
import { useAuthStore } from '../store/auth';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

const ProfilePage = () => {
    const { token } = useAuthStore(state => state);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const axiosJWT = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const fetchProfile = async () => {
            try {
                const data = await fetchUserProfile(axiosJWT);
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Error fetching profile data');
            }
        };

        fetchProfile();
    }, [token]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-[#d8f3f3] to-transparent">
            <Toaster />
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">User Profile</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                    <div>{profile.username}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                    <div>{profile.name}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Surname:</label>
                    <div>{profile.surname}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <div>{profile.email}</div>
                </div>
                <h3 className="text-xl font-bold mt-6 mb-4">Subscriptions</h3>
                {profile.subscriptions.length > 0 ? (
                    profile.subscriptions.map(sub => (
                        <div key={sub.subscription.id} className="mb-4 p-4 border rounded-lg">
                            <div><strong>Subscription Name:</strong> {sub.subscription.name}</div>
                            <div><strong>Price:</strong> {sub.subscription.price}</div>
                            <div><strong>Type:</strong> {sub.subscription.typeSubscription}</div>
                            <div><strong>Start Date:</strong> {new Date(sub.subscriptionDate).toLocaleDateString()}</div>
                            <div><strong>End Date:</strong> {new Date(sub.terminationDate).toLocaleDateString()}</div>
                            <div><strong>Status:</strong> {sub.activeStatus ? 'Active' : 'Inactive'}</div>
                        </div>
                    ))
                ) : (
                    <div>No subscriptions found.</div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
