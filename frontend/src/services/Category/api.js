import axios from "../../libs/axios";

export const categoryObtener = async () => (await axios.get("category/")).data;

export const categoryObtenerid = async (id) =>
  (await axios.get(`category/${id}/`)).data;

export const categoryEliminar = async (id) => {
  await axios.delete(`category/${id}/`);
};

export const categorycreate = async (data) => {
  await axios.post("category/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const categoryupdate = async (data) => {
  const id = data.get("id");
  await axios.put(`category/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
