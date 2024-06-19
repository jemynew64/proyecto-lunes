import axios from "../../libs/axios";

export const animecategoriesObtener = async () => {
  const response = await axios.get("animecategories/");
  return response.data;
};

export const animecategoriesEliminar = async (id) => {
  await axios.delete(`animecategories/${id}/`);
};

export const animecategoriescreate = async (data) => {
  await axios.post("animecategories/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const animecategoriesupdate = async (data) => {
  const id = data.get("id");
  await axios.put(`animecategories/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Servicio para obtener detalles de un anime por ID
export const animeObtenerid = async (id) => {
  const response = await axios.get(`anime/${id}/`);
  return response.data;
};

// Servicio para obtener detalles de una categoría por ID
export const categoryObtenerid = async (id) => {
  const response = await axios.get(`category/${id}/`);
  return response.data;
};
