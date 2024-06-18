import { useState, useEffect } from "react";
import { animeObtener, animeEliminar } from "../services/Anime/api";
import { Edit, Trash } from "lucide-react";
import { AnimeForm } from "../components/Anime/AnimeForm";

export const Anime = () => {
  const [animes, setAnimes] = useState([]);
  const [currentAnime, setCurrentAnime] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const data = await animeObtener();
        setAnimes(data);
      } catch (error) {
        console.error("Error fetching animes:", error);
      }
    };

    fetchAnimes();
  }, []);

  const handleEdit = (anime) => {
    setCurrentAnime(anime);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await animeEliminar(id);
      setAnimes(animes.filter((anime) => anime.id !== id));
    } catch (error) {
      console.error("Error deleting anime:", error);
    }
  };

  const handleSave = async () => {
    setShowForm(false);
    setCurrentAnime(null);
    const data = await animeObtener();
    setAnimes(data);
  };

  const handleAdd = () => {
    setCurrentAnime(null);
    setShowForm(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-semibold leading-tight">
            Lista de Animes
          </h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAdd}
          >
            Agregar Anime
          </button>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Título
                </th>
                <th scope="col" className="py-3 px-6">
                  Autor
                </th>
                <th scope="col" className="py-3 px-6">
                  Año de Publicación
                </th>
                <th scope="col" className="py-3 px-6">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {animes.map((anime) => (
                <tr
                  key={anime.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {anime.title}
                  </th>
                  <td className="py-4 px-6">{anime.author}</td>
                  <td className="py-4 px-6">{anime.pub_year}</td>
                  <td className="py-4 px-6 flex space-x-2">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded flex items-center"
                      onClick={() => handleEdit(anime)}
                    >
                      <Edit className="w-4 h-4 mr-1" /> Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center"
                      onClick={() => handleDelete(anime.id)}
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
              <AnimeForm
                anime={currentAnime}
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
