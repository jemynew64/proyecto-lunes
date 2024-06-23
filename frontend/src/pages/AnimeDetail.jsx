import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAnimeDetails, isUserSubscribed } from '../services/AnimePrivate/apiAnimeL';
import { useAuthStore } from "../store/auth";
import toast, { Toaster } from 'react-hot-toast';

export const AnimeDetail = () => {
    const { idAnime } = useParams();
    const [anime, setAnime] = useState(null);
    const [error, setError] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const { userId } = useAuthStore(state => state);
    const navigate = useNavigate();

    useEffect(() => {
        const getAnimeDetails = async () => {
            try {
                const data = await fetchAnimeDetails(idAnime);
                setAnime(data);
            } catch (error) {
                setError("Error fetching anime details");
            }
        };
        getAnimeDetails();

        const checkSubscriptionStatus = async () => {
            try {
                const status = await isUserSubscribed(userId);
                setIsSubscribed(status.isSubscribed);
            } catch (error) {
                setError("Error checking subscription status");
            }
        };
        checkSubscriptionStatus();
    }, [idAnime, userId]);

    const handleDownload = () => {
        if (isSubscribed) {
            downloadImage(anime.img_route, `${anime.title}.jpg`);
        } else {
            navigate("/subscriptions");
        }
    };

    const downloadImage = (url, filename) => {
        fetch(url, {
            method: "GET",
            headers: {}
        })
        .then(response => {
            response.arrayBuffer().then(function(buffer) {
                const url = window.URL.createObjectURL(new Blob([buffer]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toast.success("Descarga completada!");
            });
        })
        .catch(err => {
            console.error("Error al descargar la imagen:", err);
            toast.error("Error al descargar la imagen");
        });
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg-white w-full flex flex-col items-center justify-start min-h-screen bg-gradient-to-t from-[#d8f3f3] to-transparent">
            <Toaster />
            <div className="relative w-full h-96 mb-5">
                <img
                    src="https://img.freepik.com/foto-gratis/paisaje-anime-persona-que-viaja_23-2151038201.jpg?size=626&ext=jpg&ga=GA1.1.999420897.1709133807&semt=ais_user"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                    <h1 className="text-[#07BEB8] text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 font-mono font-semibold text-shadow-white">
                        {anime?.title}
                    </h1>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center p-5 w-full">
                <div className="w-full md:w-1/2 lg:w-1/3 p-5">
                    <img
                        src={anime?.img_route}
                        alt={anime?.title}
                        className="rounded-lg shadow-lg w-full object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 lg:w-2/3 p-5">
                    <div className="bg-white rounded-lg shadow-lg p-5 w-full">
                        <h1 className="text-3xl font-bold mb-4">{anime?.title}</h1>
                        <p className="mb-4">{anime?.description}</p>
                        <div className="mb-4">
                            <span className="font-bold">Autor:</span> {anime?.author}
                        </div>
                        <div className="mb-4">
                            <span className="font-bold">Año de Publicación:</span> {anime?.pub_year}
                        </div>
                        <div className="mb-4">
                            <span className="font-bold">Categorías:</span> {anime?.categories?.length ? anime.categories.join(", ") : "Sin Categorías"}
                        </div>
                        <div className="flex flex-col items-center">
                            <button
                                onClick={handleDownload}
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                            >
                                Descargar
                            </button>
                            <p className="mt-2 text-gray-500">{isSubscribed ? "You can download this anime." : "Subscribe to download."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
