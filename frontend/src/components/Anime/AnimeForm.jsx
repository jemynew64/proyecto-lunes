import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { animecreate, animeupdate } from "../../services/Anime/api";

export const AnimeForm = ({ anime, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pubYear, setPubYear] = useState("");
  const [description, setDescription] = useState("");
  const [imgRoute, setImgRoute] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  useEffect(() => {
    if (anime) {
      setTitle(anime.title);
      setAuthor(anime.author);
      setPubYear(anime.pub_year);
      setDescription(anime.description);
      setImgRoute(null); // Reset imgRoute
      setImgPreview(anime.img_route);
    }
  }, [anime]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgRoute(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("pub_year", pubYear);
    formData.append("description", description);
    if (imgRoute) {
      formData.append("img_route", imgRoute);
    }

    try {
      if (anime && anime.id) {
        formData.append("id", anime.id); // Add ID for update
        await animeupdate(formData);
      } else {
        await animecreate(formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error(
        "Error saving anime:",
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
          htmlFor="title"
        >
          Título
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="author"
        >
          Autor
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="pubYear"
        >
          Año de Publicación
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="pubYear"
          type="text"
          value={pubYear}
          onChange={(e) => setPubYear(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Descripción
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
              alt="Anime"
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
          {anime ? "Actualizar" : "Crear"}
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

AnimeForm.propTypes = {
  anime: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    pub_year: PropTypes.string,
    description: PropTypes.string,
    img_route: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
