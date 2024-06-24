import axios from '../../libs/axios';

export const subscriptionObtener = async () => (await axios.get('subscriptions/')).data;

export const subscriptionObtenerid = async (id) => (await axios.get(`subscriptions/${id}`)).data;

export const subscriptionEliminar = async (id) => {
    await axios.delete(`subscriptions/${id}`);
};

export const subscriptioncreate = async (data) => {
    await axios.post("subscriptions/", data);
};

export const subscriptionupdate = async (data) => {
    await axios.put(`subscriptions/${data.id}/`, data);
};
