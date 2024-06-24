// src/pages/ListaAnimes.jsx
import { useState, useEffect } from "react";
import { animesObtener, addToFavorites, fetchCategories } from '../services/AnimePrivate/apiAnimeL';
import { useAuthStore } from "../store/auth";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import PropTypes from 'prop-types';

export const ListaAnimes = () => {
    const [animes, setAnimes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const animesPerPage = 9;
    const { userId } = useAuthStore((state) => state);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [filterCategory, setFilterCategory] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchAnimes = async () => {
        setIsLoading(true);
        const data = await animesObtener(searchTerm, filterCategory);
        setAnimes(data);
        setIsLoading(false);
    };

    const fetchCategoryData = async () => {
        try {
            const categoryData = await fetchCategories();
            setCategories(categoryData);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchAnimes();
    }, [searchTerm, filterCategory]);
    
    useEffect(() => {
        fetchCategoryData();
    }, []);

    const handleAddToFavorites = async (animeId) => {
        try {
            if (!animeId) {
                throw new Error("Anime ID is undefined");
            }
            await addToFavorites(animeId, userId);
            toast.success("Anime added to favorites!");
        } catch (error) {
            console.error("Error adding to favorites:", error);
            toast.error("Error adding anime to favorites!");
        }
    };

    const indexOfLastAnime = currentPage * animesPerPage;
    const indexOfFirstAnime = indexOfLastAnime - animesPerPage;
    const currentAnimes = animes.slice(indexOfFirstAnime, indexOfLastAnime);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-white w-full flex flex-col items-center justify-start bg-gradient-to-t from-[#d8f3f3] to-transparent">
            <Toaster />
            <div className="relative w-full h-96 mb-5">
                <img
                    src="https://img.freepik.com/foto-gratis/paisaje-anime-persona-que-viaja_23-2151038201.jpg?size=626&ext=jpg&ga=GA1.1.999420897.1709133807&semt=ais_user"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                    <h1 className=" text-[#07BEB8] text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 font-mono font-semibold text-shadow-white">
                        Anime List
                    </h1>
                </div>
            </div>
            <div className="w-full max-w-3xl mx-auto flex justify-between mb-6">
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    className="px-4 py-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="px-4 py-2 border rounded"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="">Todas las categorías</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="bg-fixed bg-cover bg-center h-auto w-full m-10 border-2 border-[#07BEB8]"
                style={{
                backgroundImage:'url("https://img.freepik.com/free-photo/magenta-mystical-landscape-with-nature_23-2150693917.jpg?t=st=1718524139~exp=1718527739~hmac=5cf0e58470a7e79a5384755eda2f9c4d29c033b6c51fb22a3110863a3e904a39&w=1380")',
                }}>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p>Cargando animes...</p>
                </div>
            ) : (
                <>
                    {currentAnimes.length > 0 ? (
                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 w-full px-6">
                            {currentAnimes.map((anime) => (
                                <div
                                    key={anime.id}
                                    className="flex flex-col bg-white hover:bg-gray-100 bg-opacity-90 p-6 rounded-lg border-2 border-white hover:shadow-2xl shadow-lg font-mono transition-all duration-500 ease-in-out transform hover:scale-105"
                                >
                                    <img
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                        src={anime.img_route}
                                        alt={anime.title}
                                    />
                                    <div className="text-center">
                                        <h2 className="uppercase font-bold text-2xl mb-2">{anime.title}</h2>
                                        <div className="text-lg mb-2">
                                            <span className="font-bold">Autor:</span> {anime.author}
                                        </div>
                                        <div className="text-lg mb-2">
                                            <span className="font-bold">Año de Publicación:</span> {anime.pub_year}
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center mt-5">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 transition-all duration-500 ease-in-out transform hover:scale-105"
                                            onClick={() => handleAddToFavorites(anime.id)}
                                        >
                                            Añadir a Favorito
                                        </button>
                                        <Link to={`/anime/${anime.id}`}>
                                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all duration-500 ease-in-out transform hover:scale-105">
                                                Detalles
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-64">
                            <p>No hay animes con esta búsqueda.</p>
                        </div>
                    )}
                </>
            )}
            </div>
            <div className="mt-5">
                <Pagination
                    animesPerPage={animesPerPage}
                    totalAnimes={animes.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

const Pagination = ({ animesPerPage, totalAnimes, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalAnimes / animesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="inline-flex -space-x-px">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <a
                            onClick={() => paginate(number)}
                            href="#!"
                            className={`py-2 px-3 leading-tight ${
                                currentPage === number
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
                            } border border-gray-300`}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    animesPerPage: PropTypes.number.isRequired,
    totalAnimes: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
};
