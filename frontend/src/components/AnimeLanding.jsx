const animes = [
    {
        idAnime: '1',
        title: 'JUJUTSU KAISEN',
        author: 'Gege Akutami, Ballad Kitaguni',
        pub_year: '4 de julio de 2018',
        description: 'JUJUTSU KAISEN es un manga con historia y dibujo de Gege Akutami que se publica en la Weekly Shonen Jump. Poco después de su debut se estrenaba la adaptación animada, producida por Studio MAPPA. Actualmente hay varias temporadas del anime, comenzando con la primera (24 episodios), siguiéndole la aclamada película precuela JUJUTSU KAISEN 0, y posteriormente la segunda temporada en julio de 2023. La serie está disponible subtitulada y doblada.',
        img_route:
            'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1200,height=675/catalog/crunchyroll/8b7f5847f9b97f921e41d4ef59fd2d79.jpe',
    },
    {
        idAnime: '2',
        title: 'My Hero Academia',
        author: 'Kōhei Horikoshi',
        pub_year: '3 de abril de 2016',
        description: 'En un mundo en el que la mayor parte de la población nace con un Don, una habilidad extraordinaria diferente en cada cual, no tardaron en aparecer tanto villanos como héroes dispuestos a detenerlos. Con el tiempo los héroes pasaron a ser funcionarios del gobierno, estando regulados y viviendo de su trabajo, además de convertirse en objeto de admiración de muchos. Ahora, ser héroe es el sueño de la gran mayoría de niños, que esperan desde muy pequeños a que su Don se manifieste para comenzar a entrenar y soñar con convertirse en los héroes número uno.',
        img_route:
            'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1200,height=675/catalog/crunchyroll/ad3c6bbdc8d6e3a236292f3e8223f852.jpe',
    },
    {
        idAnime: '3',
        title: 'ONE PIECE',
        author: 'Eiichirō Oda',
        pub_year: '20 de octubre de 1999',
        description: 'Monkey. D. Luffy se niega a que nadie se interponga en su camino por la búsqueda para convertirse el rey de todos los piratas. Con un camino trazado por las traicioneras aguas del Grand Line y más allá, se trata de un capitán que nunca se dará por vencido hasta que consiga el tesoro más grande de la Tierra: el Legendario One Piece.',
        img_route:
            'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1200,height=675/catalog/crunchyroll/a249096c7812deb8c3c2c907173f3774.jpe',
    },
    {
        idAnime: '4',
        title: 'CHAINSAW MAN',
        author: 'Tatsuki Fujimoto',
        pub_year: '12 de octubre de 2022',
        description: 'Denji es un adolescente que vive con un demonio motosierra llamado Pochita. Para pagar la deuda que le dejó su padre tras su muerte, ha tenido que ganarse el pan como puede matando demonios y vendiendo sus cadáverse a la mafia, aunque su vida siempre ha sido miserable. Cuando una traición provoca la muerte de Denji, Pochita hace un contrato con él y Denji revive como "Chainsaw Man", un ser humano con el corazón de un demonio.',
        img_route:
            'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1200,height=675/catalog/crunchyroll/ea075b926e1073f4eb016bff8cdb434c.jpe',
    },
    {
        idAnime: '4',
        title: 'CHAINSAW MAN',
        author: 'Tatsuki Fujimoto',
        pub_year: '12 de octubre de 2022',
        description: 'Denji es un adolescente que vive con un demonio motosierra llamado Pochita. Para pagar la deuda que le dejó su padre tras su muerte, ha tenido que ganarse el pan como puede matando demonios y vendiendo sus cadáverse a la mafia, aunque su vida siempre ha sido miserable. Cuando una traición provoca la muerte de Denji, Pochita hace un contrato con él y Denji revive como "Chainsaw Man", un ser humano con el corazón de un demonio.',
        img_route:
            'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1200,height=675/catalog/crunchyroll/ea075b926e1073f4eb016bff8cdb434c.jpe',
    },
]

export const Example = () => {
    return (
        <div className="bg-[#1F2937] p-7">
            <div>
                <img src="https://image-0.uhdpaper.com/wallpaper/beautiful-anime-girl-cake-cafe-4k-wallpaper-uhdpaper.com-667@0@j.jpg"/>

                
            </div>
            <div className="m-5 me-6 ms-6 mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {animes.map((anime) => (  
                <div key={anime.idAnime}className="group relative bg-white p-6">
                    <img className="w-full h-48 object-cover" src={anime.img_route} alt={anime.title}/>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 hover:text-[#ffff]">{anime.title}</div>
                        <p className="text-gray-700 text-base hover:text-[#D1D5DB]">{anime.description}</p>
                    </div>
                    <div className="px-6 py-4">
                        <div className="text-sm mb-2">
                            <span className="font-bold">Author:</span> {anime.author}
                        </div>
                        <div className="text-sm mb-2">
                            <span className="font-bold ">Published Year:</span> {anime.pub_year}
                        </div>
                        <button className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-gray-700 bg-gray-100 border border-gray-300 hover:shadow-black">
                            <div className="text-xs font-normal ">Detalles</div>
                        </button>
                    </div>
                </div>
            ))}
        </div>
        </div>
    )
};