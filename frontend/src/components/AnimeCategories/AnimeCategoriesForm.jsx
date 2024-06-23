import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  animecategoriescreate,
  animecategoriesupdate,
} from "../../services/AnimeCategories/api";
import { animeObtener } from "../../services/Anime/api";
import { categoryObtener } from "../../services/Category/api";

export const AnimeCategoriesForm = ({ animeCategory, onClose, onSave }) => {
  const [animes, setAnimes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [idAnime, setIdAnime] = useState("");
  const [idCategory, setIdCategory] = useState("");

  useEffect(() => {
    const fetchAnimesAndCategories = async () => {
      try {
        const animesData = await animeObtener();
        const categoriesData = await categoryObtener();
        setAnimes(animesData);
        setCategories(categoriesData);

        if (animeCategory) {
          setIdAnime(animeCategory.idAnime.id);
          setIdCategory(animeCategory.idCategory.id);
        }
      } catch (error) {
        console.error("Error fetching animes or categories:", error);
      }
    };

    fetchAnimesAndCategories();
  }, [animeCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("idAnime", idAnime);
    formData.append("idCategory", idCategory);

    try {
      if (animeCategory && animeCategory.id) {
        formData.append("id", animeCategory.id);
        await animecategoriesupdate(formData);
      } else {
        await animecategoriescreate(formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving anime category:", error);
      // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="anime"
        >
          Anime
        </label>
        <select
          id="anime"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={idAnime}
          onChange={(e) => setIdAnime(e.target.value)}
          required
        >
          <option value="">Seleccione un anime</option>
          {animes.map((anime) => (
            <option key={anime.id} value={anime.id}>
              {anime.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="category"
        >
          Categoría
        </label>
        <select
          id="category"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={idCategory}
          onChange={(e) => setIdCategory(e.target.value)}
          required
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {animeCategory ? "Actualizar" : "Crear"}
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

AnimeCategoriesForm.propTypes = {
  animeCategory: PropTypes.shape({
    id: PropTypes.number,
    idAnime: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
    idCategory: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
