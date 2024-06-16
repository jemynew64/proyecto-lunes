//estos accions no me pediran eso xd el header los otros si l otengo que hacer con eso  aca tpdas las que no sean jwt 
import axios from 'axios';


const axiosAuth = axios.create({
    //SI POR ALGUNA RAZON NO SALE PRUEBA CON EL MIN56 DEL VIDEO Y EL NO CHAPO TU /API/
    baseURL: import.meta.env.VITE_API_URL,
 });


export const loginPost = async (userData) => (await axiosAuth.post('login', userData)).data;
export const RegisterPost = async (RegisterData) => (await axiosAuth.post('register', RegisterData)).data;
//metodo get para obtener xd


// export const loginPost = async (userData: UserLogin) => {
//     try {
//         const response = await axios.post('login', userData);
//         return response.data;
//     } catch (error) {
//         console.error('Error en la solicitud de inicio de sesión:', error);
//         throw error; 
//     }
// };