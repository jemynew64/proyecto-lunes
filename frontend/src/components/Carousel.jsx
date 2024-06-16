import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

{/**Estaba probando para mostrar las categorias en el landig en forma de carrusel :D*/}

const categories = [
    { idCategory: '1', name: 'Aventura', img_route: 'https://img3.wallspic.com/previews/2/8/6/1/7/171682/171682-yendo_feliz-de_una_sola_pieza-mil_soleado-anime-agua-500x.jpg' },
    { idCategory: '2', name: 'Acción', img_route: 'https://img2.wallspic.com/previews/4/7/7/4/6/164774/164774-tanjiro_kamado-asesino_de_demonios_kimetsu_no_yaiba-anime-morado-arte-500x.jpg' },
    { idCategory: '3', name: 'Horror', img_route: 'https://img1.wallspic.com/previews/6/5/2/9/1/119256/119256-mujer_en_camisa_verde_con_textil_verde-500x.jpg' },
    { idCategory: '4', name: 'Romance', img_route: 'https://img3.wallspic.com/previews/9/1/0/6/7/176019/176019-touka_kirishima-ken_kaneki-anime-tokyo_ghoul-rize_kamishiro-500x.jpg' }
    // Agrega más categorías aquí
];

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000, // Ajusta la velocidad de cambio automático (en milisegundos)
    };

    return (
        <div>
        <Slider {...settings}>
            {categories.map((category, index) => (
                <div key={category.idCategory} className="flex items-center justify-center h-screen">
                    <div className={`w-full flex ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className="w-1/2  flex items-center justify-center bg-gray-100">
                            <div className="text-center p-8">
                                <h2 className="text-4xl font-bold mb-4">{category.name}</h2>
                                <button className="bg-blue-500 text-white py-2 px-4 rounded">Ver Más</button>
                            </div>
                        </div>
                        <div className="w-1/2 ">
                            <img className="w-full  object-cover" src={category.img_route} alt={category.name} />
                        </div>
                    </div>
                </div>
            ))}
        </Slider></div>
    );
};

export default Carousel;