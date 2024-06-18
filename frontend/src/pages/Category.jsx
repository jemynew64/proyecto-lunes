import { useState, useEffect } from "react";
import { categoryObtener, categoryEliminar } from "../services/Category/api";
import { Edit, Trash } from "lucide-react";
import { CategoryForm } from "../components/Categoria/CategoryForm";

export const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryObtener();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await categoryEliminar(id);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleSave = async () => {
    setShowForm(false);
    setCurrentCategory(null);
    const data = await categoryObtener();
    setCategories(data);
  };

  const handleAdd = () => {
    setCurrentCategory(null);
    setShowForm(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-semibold leading-tight">
            Lista de Categorías
          </h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAdd}
          >
            Agregar Categoría
          </button>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Nombre
                </th>
                <th scope="col" className="py-3 px-6">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {category.name}
                  </th>
                  <td className="py-4 px-6 flex space-x-2">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded flex items-center"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="w-4 h-4 mr-1" /> Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center"
                      onClick={() => handleDelete(category.id)}
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
              <CategoryForm
                category={currentCategory}
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
