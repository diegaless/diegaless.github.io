function buildExcursionGallery(images, altBase) {
    return images.map((image, index) => ({
        ...image,
        alt: `${altBase} (${index + 1}/${images.length})`
    }));
}

window.pageContent = {
    type: 'list',
    command: './excursions.sh',
    title: 'Excursiones',
    emptyMessage: 'No excursions found.',
    statusMessage: 'Excursiones cargadas.',
    entries: [
        {
            slug: 'visita-atica-um',
            dateDisplay: '20-12-25',
            dateIso: '2025-12-20',
            title: 'Visita a ÁTICA (UM) - Pipelines CI/CD y Salidas Profesionales',
            summaryHtml: 'La semana pasada fuimos de visita a ÁTICA, donde asistimos a las ponencias magistrales de Pedro y Patxi.<br><br>Gracias, Pedro Delgado Yarza, por compartir tu experiencia en desarrollo de software y por mostrarnos pipelines reales de CI/CD en producción. Ver ese flujo motivó enormemente a nuestros alumnos, al conectar de forma clara lo visto en clase con la industria.<br><br>Gracias, Patxi, por mostrarnos los tipos de salidas profesionales que podemos desempeñar en Ática y por abrirnos las puertas de tu casa.<br><br>Gracias a ÁTICA UM, y especialmente a Pedro Delgado Yarza y Patxi, por el tiempo, la cercanía y por compartir conocimiento de forma tan clara y práctica.',
            stackHtml: 'Visita: ÁTICA (Universidad de Murcia)',
            images: buildExcursionGallery([
                { src: '../assets/img/excursion1/4.1.jpg', webp: '../assets/img/optimized/excursion1/4.1.webp', width: 2048, height: 1536 },
                { src: '../assets/img/excursion1/4.2.jpg', webp: '../assets/img/optimized/excursion1/4.2.webp', width: 2048, height: 1536 },
                { src: '../assets/img/excursion1/4.3.jpg', webp: '../assets/img/optimized/excursion1/4.3.webp', width: 2048, height: 1536 },
                { src: '../assets/img/excursion1/4.4.jpg', webp: '../assets/img/optimized/excursion1/4.4.webp', width: 1280, height: 1706 }
            ], 'Fotografía de la visita a ÁTICA UM')
        },
        {
            slug: 'visita-kio-spain',
            dateDisplay: '22-11-25',
            dateIso: '2025-11-22',
            title: 'Visita a KIO Spain Data Center TIER IV',
            summaryHtml: 'Visita técnica al centro de datos de KIO Spain, el único TIER IV en España con certificación de diseño, construcción y operación.',
            stackHtml: 'Visita: KIO Spain Data Center',
            images: buildExcursionGallery([
                { src: '../assets/img/excursion2/5.1.jpg', webp: '../assets/img/optimized/excursion2/5.1.webp', width: 1599, height: 899 }
            ], 'Fotografía de la visita técnica al centro de datos de KIO Spain')
        }
    ]
};
