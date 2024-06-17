import axios from "../../libs/axios";

export const animeObtener = async () => (await axios.get("anime/")).data;

export const animeObtenerid = async (id) =>
  (await axios.get(`anime/${id}`)).data;

export const animeEliminar = async (id) => {
  await axios.delete(`anime/${id}`);
};

export const animecreate = async (data) => {
  await axios.post("anime/", data);
};

export const animeupdate = async (data) => {
  await axios.put(`anime/${data.id}/`, data);
};
