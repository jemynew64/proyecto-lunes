import axios from 'axios';

export const animesObtener = async () => {
    const response = await axios.get('http://127.0.0.1:8000/public/', {
    });
    return response.data;
};