import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { categorycreate, categoryupdate } from "../../services/Category/api";

export const CategoryForm = ({ category, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [imgRoute, setImgRoute] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setImgRoute(null); // Reset imgRoute
      setImgPreview(category.img_route);
    }
  }, [category]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgRoute(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (imgRoute) {
      formData.append("img_route", imgRoute);
    }

    try {
      if (category && category.id) {
        formData.append("id", category.id); // Add ID for update
        await categoryupdate(formData);
      } else {
        await categorycreate(formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error(
        "Error saving category:",
        error.response ? error.response.data : error.message
      );
      // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Nombre
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="imgRoute"
        >
          Imagen
        </label>
        {imgPreview && (
          <div className="mb-4">
            <img
              src={imgPreview}
              alt="Category"
              className="h-32 w-32 object-cover"
            />
          </div>
        )}
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="imgRoute"
          type="file"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {category ? "Actualizar" : "Crear"}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

CategoryForm.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img_route: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
