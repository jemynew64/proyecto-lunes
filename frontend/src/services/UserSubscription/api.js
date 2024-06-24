import axios from '../../libs/axios';

export const usersubscriptionObtener = async () => (await axios.get('usersubscription/')).data;

export const usersubscriptionObtenerid = async (id) => (await axios.get(`usersubscription/${id}`)).data;

export const usersubscriptionEliminar = async (id) => {
    await axios.delete(`usersubscription/${id}`);
};

export const usersubscriptioncreate = async (data) => {
    await axios.post("usersubscription/", data);
};

export const usersubscriptionupdate = async (data) => {
    await axios.put(`usersubscription/${data.id}/`, data);
};
