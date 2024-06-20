import { useState, useEffect } from "react";
import {
  animecategoriesObtener,
  animecategoriesEliminar,
} from "../services/AnimeCategories/api";
import { animeObtenerid } from "../services/Anime/api";
import { categoryObtenerid } from "../services/Category/api";
import { Edit, Trash } from "lucide-react";
import { AnimeCategoriesForm } from "../components/AnimeCategories/AnimeCategoriesForm";

export const AnimeCategories = () => {
  const [animeCategories, setAnimeCategories] = useState([]);
  const [currentAnimeCategory, setCurrentAnimeCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAnimeCategories = async () => {
      try {
        const data = await animecategoriesObtener();
        const detailedData = await Promise.all(
          data.map(async (item) => {
            const anime = await animeObtenerid(item.idAnime);
            const category = await categoryObtenerid(item.idCategory);
            return {
              ...item,
              idAnime: anime,
              idCategory: category,
            };
          })
        );
        setAnimeCategories(detailedData);
      } catch (error) {
        console.error("Error fetching anime categories:", error);
      }
    };

    fetchAnimeCategories();
  }, []);

  const handleEdit = (animeCategory) => {
    setCurrentAnimeCategory(animeCategory);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await animecategoriesEliminar(id);
      setAnimeCategories(
        animeCategories.filter((animeCategory) => animeCategory.id !== id)
      );
    } catch (error) {
      console.error("Error deleting anime category:", error);
    }
  };

  const handleSave = async () => {
    setShowForm(false);
    setCurrentAnimeCategory(null);
    const data = await animecategoriesObtener();
    const detailedData = await Promise.all(
      data.map(async (item) => {
        const anime = await animeObtenerid(item.idAnime);
        const category = await categoryObtenerid(item.idCategory);
        return {
          ...item,
          idAnime: anime,
          idCategory: category,
        };
      })
    );
    setAnimeCategories(detailedData);
  };

  const handleAdd = () => {
    setCurrentAnimeCategory(null);
    setShowForm(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAnimeCategories = animeCategories.filter((animeCategory) =>
    animeCategory.idAnime.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-semibold leading-tight">
            Lista de Categorías de Anime
          </h2>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={handleSearch}
            className="border rounded py-2 px-4"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAdd}
          >
            Agregar Categoría de Anime
          </button>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Anime
                </th>
                <th scope="col" className="py-3 px-6">
                  Categoría
                </th>
                <th scope="col" className="py-3 px-6">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAnimeCategories.map((animeCategory) => (
                <tr
                  key={animeCategory.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {animeCategory.idAnime.title}
                  </th>
                  <td className="py-4 px-6">{animeCategory.idCategory.name}</td>
                  <td className="py-4 px-6 flex space-x-2">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded flex items-center"
                      onClick={() => handleEdit(animeCategory)}
                    >
                      <Edit className="w-4 h-4 mr-1" /> Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center"
                      onClick={() => handleDelete(animeCategory.id)}
                    >
                      <Trash className="w-4 h-4 mr-1" /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <AnimeCategoriesForm
                animeCategory={currentAnimeCategory}
                onSave={handleSave}
                onClose={() => setShowForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
