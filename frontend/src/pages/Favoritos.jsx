import { useEffect, useState } from 'react';
import { userAnimeFavorites, removeFromFavorites } from '../services/AnimePrivate/apiAnimeL';
import { useAuthStore } from '../store/auth';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';

export const Favoritos = () => {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);
    const { userId } = useAuthStore((state) => state);
    const [currentPage, setCurrentPage] = useState(1);
    const favoritesPerPage = 9;

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await userAnimeFavorites(userId);
                // console.log('Fetched favorites:', data); // Verificar los datos recibidos
                setFavorites(data);
            } catch (error) {
                setError('Error fetching favorites');
            }
        };
        fetchFavorites();
    }, [userId]);

    const handleRemoveFromFavorites = async (animeId) => {
        if (!animeId) {
            toast.error("Anime ID is missing");
            return;
        }
        try {
            await removeFromFavorites(animeId, userId);
            setFavorites(favorites.filter((fav) => fav.idAnime.id !== animeId));
            toast.success("Anime removed from favorites!");
        } catch (error) {
            console.error("Error removing from favorites:", error);
            toast.error("Error removing anime from favorites!");
        }
    };

    const indexOfLastFavorite = currentPage * favoritesPerPage;
    const indexOfFirstFavorite = indexOfLastFavorite - favoritesPerPage;
    const currentFavorites = favorites.slice(indexOfFirstFavorite, indexOfLastFavorite);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(favorites.length / favoritesPerPage);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg-white w-full flex flex-col items-center justify-start bg-gradient-to-t from-[#d8f3f3] to-transparent min-h-screen">
            <Toaster />
            <div className="relative w-full h-96 mb-5">
                <img
                    src="https://img.freepik.com/foto-gratis/paisaje-anime-persona-que-viaja_23-2151038201.jpg?size=626&ext=jpg&ga=GA1.1.999420897.1709133807&semt=ais_user"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                    <h1 className="text-[#07BEB8] text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 font-mono font-semibold text-shadow-white">
                        Favorites
                    </h1>
                </div>
            </div>
            <div className="bg-fixed bg-cover bg-center h-auto w-full m-10 border-2 border-[#07BEB8]"
                style={{
                    backgroundImage: 'url("https://img.freepik.com/free-photo/magenta-mystical-landscape-with-nature_23-2150693917.jpg?t=st=1718524139~exp=1718527739~hmac=5cf0e58470a7e79a5384755eda2f9c4d29c033b6c51fb22a3110863a3e904a39&w=1380")',
                }}>
                {currentFavorites.length > 0 ? (
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 w-full px-6">
                        {currentFavorites.map((fav, index) => (
                            <div
                                key={`${fav.idUsuario}-${fav.idAnime?.id || index}`} // Cambiado a una clave combinada con índice como fallback
                                className="flex flex-col bg-white hover:bg-gray-100 bg-opacity-90 p-6 rounded-lg border-2 border-white hover:shadow-2xl shadow-lg font-mono transition-all duration-500 ease-in-out transform hover:scale-105"
                            >
                                {fav.idAnime ? (
                                    <>
                                        <img
                                            className="w-full h-48 object-cover rounded-md mb-4"
                                            src={fav.idAnime.img_route}
                                            alt={fav.idAnime.title}
                                        />
                                        <div className="text-center">
                                            <h2 className="uppercase font-bold text-2xl mb-2">{fav.idAnime.title}</h2>
                                            <div className="text-lg mb-2">
                                                <span className="font-bold">Autor:</span> {fav.idAnime.author}
                                            </div>
                                            <div className="text-lg mb-2">
                                                <span className="font-bold">Año de Publicación:</span> {fav.idAnime.pub_year}
                                            </div>
                                        </div>
                                        <div className="flex justify-center items-center mt-5">
                                            <button
                                                onClick={() => handleRemoveFromFavorites(fav.idAnime.id)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-500 ease-in-out transform hover:scale-105"
                                            >
                                                Remove from Favorites
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center text-lg text-red-500">Anime data is missing</div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p>No hay animes añadidos a Favoritos.</p>
                    </div>
                )}
            </div>
            {currentFavorites.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                />
            )}
        </div>
    );
};

const Pagination = ({ currentPage, totalPages, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-5">
            <ul className="inline-flex -space-x-px">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <a
                            onClick={() => paginate(number)}
                            href="#!"
                            className={`py-2 px-3 leading-tight border border-gray-300 ${
                                currentPage === number
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
                            }`}
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
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
};
