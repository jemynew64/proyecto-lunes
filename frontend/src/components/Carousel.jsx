import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const categories = [
    { idCategory: '1', name: 'Aventura', img_route: 'https://img3.wallspic.com/previews/2/8/6/1/7/171682/171682-yendo_feliz-de_una_sola_pieza-mil_soleado-anime-agua-500x.jpg' },
    { idCategory: '2', name: 'Acción', img_route: 'https://img2.wallspic.com/previews/4/7/7/4/6/164774/164774-tanjiro_kamado-asesino_de_demonios_kimetsu_no_yaiba-anime-morado-arte-500x.jpg' },
    { idCategory: '3', name: 'Horror', img_route: 'https://img1.wallspic.com/previews/6/5/2/9/1/119256/119256-mujer_en_camisa_verde_con_textil_verde-500x.jpg' },
    { idCategory: '4', name: 'Romance', img_route: 'https://img3.wallspic.com/previews/9/1/0/6/7/176019/176019-touka_kirishima-ken_kaneki-anime-tokyo_ghoul-rize_kamishiro-500x.jpg' }
    // Agrega más categorías aquí si es necesario
];

const Carousel = () => {

    //Izquierda
    const [currentIndexes, setCurrentIndexes] = useState([0, 1, 2]); // Estados para los 

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndexes(prevIndexes => prevIndexes.map(index => (index + 1) % categories.length));
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    //centro
    const [currentIndexes3, setCurrentIndexes3] = useState([2, 0, 1]); // Estados para los 

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndexes3(prevIndexes => prevIndexes.map(index => (index + 1) % categories.length));
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    //Derecha
    const [currentIndexes2, setCurrentIndexes2] = useState([1, 2, 0]); // Estados para los 

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndexes2(prevIndexes => prevIndexes.map(index => (index + 1) % categories.length));
        }, 4000);

        return () => clearInterval(interval);
    }, []);



    return (
        <div className="flex flex-col w-full items-center rounded-lg text-center h-auto ">

            <div className=" justify-center w-full h-auto">

                {/**Titulo de categorias */}
                <div className='items-center'>
                    <h1 className='text-5xl font-mono text-[#fdb3c5] font-bold text-center'>CATEGORÍAS</h1>
                </div>

                {/**Espacio para las cartas-carrusel */}
                <div className="flex justify-center items-center h-auto w-full bg-black">
                    <div className="relative w-full h-auto">
                        {/**Card de la derecha */}
                        {currentIndexes.map((index, cardIndex) => (
                            <div key={cardIndex} className="absolute left-60 -rotate-3 ">
                                <div className="flex flex-col w-2/7 m-10 p-10 shadow-lg rounded-2xl border-[white] border-2 bg-gradient-to-t from-[#C4FFF9] to-[#f0ffff]">
                                    <div className="mb-5">
                                        <h2 className=" uppercase text-[#3DCCC7] text-4xl font-mono text-start text-opacity-70">{categories[index].name}</h2>
                                    </div>
                                    <img className="w-full h-auto object-cover mb-4 border-2 border-[white]" src={categories[index].img_route} alt={categories[index].name} />
                                    <div>
                                        <button className="bg-[#C4FFF9] text-white py-2 px-4 rounded"></button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/**Card de la izquierda */}
                        {currentIndexes2.map((index, cardIndex) => (
                            <div key={cardIndex} className="absolute right-40 rotate-3 ">
                                <div className=" flex flex-col w-2/7 bg-gradient-to-t from-[#C4FFF9] to-[#f0ffff] m-10 p-10 shadow-lg rounded-2xl border-[white] border-2 ">
                                    <div className="mb-5">
                                        <h2 className=" uppercase text-[#3DCCC7] text-4xl font-mono text-end text-opacity-70">{categories[index].name}</h2>
                                    </div>
                                    <img className="w-full h-auto object-cover mb-4 border-2 border-[white]" src={categories[index].img_route} alt={categories[index].name} />
                                    <div>
                                        <button className="bg-[#C4FFF9] text-white py-2 px-4 "></button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/**Card del centro*/}
                        {currentIndexes3.map((index, cardIndex) => (
                            <div key={cardIndex} className="absolute right-96 ">
                                <div className="flex flex-col w-2/7 bg-gradient-to-t from-[#C4FFF9] to-[#f0ffff] m-10 p-10 shadow-lg rounded-2xl border-[white] border-2">
                                    <div className="mb-5">
                                        <h2 className=" uppercase text-[#3DCCC7] text-4xl font-mono animate-pulse">{categories[index].name}</h2>
                                    </div>
                                    <img className="w-full h-auto object-cover mb-4 border-2 border-[white]" src={categories[index].img_route} alt={categories[index].name} />
                                    <div>
                                        <Link to={'/login'}>
                                        <button className="transition duration-500 ease-in-out bg-[#9CEAEF] hover:bg-[#9999A1]-600  hover:-translate-y-1 hover:scale-110  mt-2 py-1 px-4 rounded-full text-gray-700  border border-[white] hover:shadow font-mono font-semibold text-lg">Ver Más</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Carousel;