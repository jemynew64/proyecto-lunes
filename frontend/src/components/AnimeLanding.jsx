import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { animesObtener } from "../services/Anime/apiAnimeL";

export const Landing = () => {
  const [animes, setAnimes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const data = await animesObtener();
        setAnimes(data);
      } catch (error) {
        setError("Error en obtener datos");
      }
    };

    fetchAnimes();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="bg-white w-full flex flex-col items-center justify-start bg-gradient-to-t from-[#d8f3f3] to-transparent ">
      {/*Head del landing */}
      <div className="relative w-full h-96 mb-5">
        {/**Background principal */}
        <img
          src="https://img.freepik.com/foto-gratis/paisaje-anime-persona-que-viaja_23-2151038201.jpg?size=626&ext=jpg&ga=GA1.1.999420897.1709133807&semt=ais_user"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        />

        {/*Contenido dentro del background */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          {/*TITULO DEL PROYECTO  y descripcion*/}
          <h1 className=" text-[#07BEB8] text-8xl mb-4 font-mono font-semibold text-shadow-white">
            CrunchyTEC
          </h1>
          <div className="px-60">
            <p className="text-white text-xl font-mono text-center">
              CrunchyTec es un una plataforma streaming de animes, encontraras
              los mejores animes del momento.{" "}
            </p>
          </div>

          {/*Botones de Inicio de Registro e Inicio de sesion*/}
          <div className="absolute top-0 right-0 m-4  p-2 rounded">
            <Link to="/register">
              <button className="bg-[#9CEAEF] bg-opacity-75 text-black hover:text-white hover:bg-[#68D8D6] py-2 px-4 mr-2 rounded-md border-2 border-white border-opacity-45 transition-all duration-750 ease-in-out font-mono">
                Registrarse
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-[#9CEAEF] bg-opacity-75 text-black hover:text-white hover:bg-[#68D8D6] py-2 px-4 rounded-md border-2 border-white border-opacity-45 transition-all duration-750 ease-in-out font-mono">
                Iniciar Sesión
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/**Explora titulo */}
      <h1 className="text-5xl font-mono pt-5 m-5 text-[#fdb3c5] font-bold text-center">
        EXPLORA{" "}
      </h1>

      {/*Contenido*/}
      <div
        className="bg-fixed bg-cover bg-center h-auto m-10 border-2 border-[#07BEB8]"
        style={{
          backgroundImage:
            'url("https://img.freepik.com/free-photo/magenta-mystical-landscape-with-nature_23-2150693917.jpg?t=st=1718524139~exp=1718527739~hmac=5cf0e58470a7e79a5384755eda2f9c4d29c033b6c51fb22a3110863a3e904a39&w=1380")',
        }}
      >
        <div className="flex items-center w-full mb-10">
          {/*Cards del landing page*/}
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 w-full px-6 ">
            {animes.map((anime) => (
              <div
                key={anime.id}
                className="flex flex-col bg-white hover:bg-[#ffffffe0] bg-opacity-70 p-6 rounded-md border-2 border-[white] hover:shadow-2xl  shadow-lg font-mono "
              >
                {/**Imagen y titulo del card */}
                <img
                  className="w-full h-48 object-cover rounded border-white border-2"
                  src={anime.img_route}
                  alt={anime.title}
                />
                <div className="mt-4 text-center">
                  <h2 className="animate-pulse uppercase font-bold text-2xl mb-2">
                    {anime.title}
                  </h2>
                </div>

                {/**Contenido del card */}
                <div className="mt-4 flex-1">
                  <div className="text-lg mb-2">
                    <span className="font-bold">Autor:</span> {anime.author}
                  </div>
                  <div className="text-lg mb-2">
                    <span className="font-bold">Año de Publicación:</span>{" "}
                    {anime.pub_year}
                  </div>
                </div>

                {/**Botón para mas detalles */}
                <div className="flex justify-center items-center mt-5 pb-0">
                  <Link to={"/login"}>
                    <button className="transition duration-500 ease-in-out bg-[#C4FFF9] hover:bg-[#9999A1]-600  hover:-translate-y-1 hover:scale-110  mt-2 py-1 px-4 rounded-full text-gray-700  border border-[white] hover:shadow font-semibold">
                      <div className="text-medium">Detalles</div>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/**Carrusel de categorias */}
      <div className="pt-20 static text-center w-full h-screen">
        <Carousel />
      </div>
      
      {/**VIDEO */}
      <div className='items-center mt-5'>
                <h1 className='text-5xl font-mono text-[#fdb3c5] font-bold text-center'>EN TENDENCIA ...</h1>

            </div>
            <div className="w-full py-5  flex justify-center">
                <iframe
                    className="w-1/2 aspect-video border-2 border-[white]  shadow-xl"
                    src="https://www.youtube.com/embed/Yv0HPwz5KTQ?si=Ny3aTAgPgjxC5t8s"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

      {/*Pie del landing page */}
      <footer className="w-full mt-20 bg-scroll bg-cover bg-center opacity-80 ">
        <div className="items-center mb-10 p-7 w-full flex justify-between px-60">
          {/**Logo de Tecsup */}
          <div className="ms-10 mt-2">
            <a
              href="https://www.tecsup.edu.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <img
                className="h-20 w-100"
                src="https://www.tecsup.edu.pe/themes/tecsup/logo.svg"
                alt="Logo"
              />
            </a>
          </div>

          {/*Texto del footer */}
          <div className="flex flex-col items-center text-black">
            {/*Iconos de las redes sociales */}
            <div className="mt-2 flex space-x-4 mb-4">
              {/* <!-- Github --> */}
              <a
                href="https://github.com/jemynew64/proyecto-lunes.git"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* <!-- Facebook --> */}
              <a
                href="https://www.facebook.com/MatthewDota"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              {/* <!-- Whatsapp --> */}
              <a
                href="https://wa.me/+51976202040"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            </div>

            {/**Mas información */}
            <p className="text">
              Diseño y Desarrollo de Software | OPEN SOURCE
            </p>
            <p>© 2024 Derechos reservados / CRUNCHYTEC - TECSUP</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
