import axios from '../../libs/axios';

export const usuariosObtener = async () => (await axios.get('users/')).data;

export const usuariosObtenerid = async (id) => (await axios.get(`users/${id}`)).data;

export const usuariosEliminar = async (id) => {
    await axios.delete(`users/${id}`);
};

export const usuarioscreate = async (data) => {
    await axios.post("users/", data);
};

export const usuariosupdate = async (data) => {
    await axios.put(`users/${data.id}/`, data);
};

