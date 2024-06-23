import axios from 'axios';

const axiosJWT = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

axiosJWT.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const animesObtener = async (title, category) => {
    let url = 'anime-public/';
    if (title || category) {
        url += '?';
        if (title) {
            url += `title=${title}&`;
        }
        if (category) {
            url += `category=${category}&`;
        }
        url = url.slice(0, -1); // Remove trailing '&'
    }
    const response = await axiosJWT.get(url);
    return response.data;
};

export const addToFavorites = async (animeId, userId) => {
    if (!userId) {
        throw new Error("User ID is not available");
    }
    try {
        const response = await axiosJWT.post(`favorites/add/${animeId}/`, { user_id: userId });
        return response.data;
    } catch (error) {
        console.error("Error adding to favorites:", error);
        throw error;
    }
};

export const removeFromFavorites = async (animeId, userId) => {
    if (!userId) {
        throw new Error("User ID is not available");
    }
    try {
        const response = await axiosJWT.post(`favorites/remove/${animeId}/`, { user_id: userId });
        return response.data;
    } catch (error) {
        console.error("Error removing from favorites:", error);
        throw error;
    }
};

export const fetchAnimeDetails = async (id) => {
    try {
        const response = await axiosJWT.get(`anime-public/${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching anime details for id ${id}:`, error);
        throw error;
    }
};

export const fetchSubscriptions = async () => {
    try {
        const response = await axiosJWT.get('subscriptions/');
        return response.data;
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        throw error;
    }
};

export const subscribeToSubscription = async (subscriptionId, userId) => {
    if (!userId) {
        throw new Error("User ID is not available");
    }
    try {
        const response = await axiosJWT.post(`purchase/${subscriptionId}/`, { user_id: userId });
        return response.data;
    } catch (error) {
        console.error("Error subscribing:", error);
        throw error;
    }
};

export const isUserSubscribed = async (userId) => {
    if (!userId) {
        throw new Error("User ID is not available");
    }
    try {
        const response = await axiosJWT.get(`user/subscription-status/?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error checking user subscription status:", error);
        throw error;
    }
};

export const userAnimeFavorites = async (userId) => {
    if (!userId) {
        throw new Error("User ID is not available");
    }
    try {
        const response = await axiosJWT.get(`useranimefavorites/?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user anime favorites:", error);
        throw error;
    }
};

export const fetchCategories = async () => {
    const response = await axiosJWT.get('category/');
    return response.data;
};

export const fetchUserProfile = async (axiosJWT) => {
    const response = await axiosJWT.get('profile/');
    return response.data;
};
