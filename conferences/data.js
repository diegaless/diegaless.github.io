function buildConferenceGallery(images, altBase) {
    return images.map((image, index) => ({
        ...image,
        alt: `${altBase} (${index + 1}/${images.length})`
    }));
}

window.pageContent = {
    type: 'list',
    command: './conferences.sh',
    title: 'Conferencias',
    emptyMessage: 'No conferences found.',
    statusMessage: 'Conferencias cargadas.',
    entries: [
        {
            slug: 'vulnerabilidades-desarrollo-seguro',
            dateDisplay: '18-11-25',
            dateIso: '2025-11-18',
            title: 'Vulnerabilidades en el código y desarrollo seguro',
            summaryHtml: 'Ayer celebramos en FP Miralmonte el comienzo de nuestro ciclo de conferencias con “Vulnerabilidades en el código y desarrollo seguro”, con Víctor Bravo Martinez (Ethical Hacker) y F. Javier Martínez Robles (Coordinador Ciberseguridad CSIRT).<br><br>Una sesión muy práctica donde nuestros alumnos de FP pudieron conocer de primera mano cómo se detectan vulnerabilidades reales, cómo piensa un atacante y qué buenas prácticas deben aplicar en su código desde el primer día.<br><br>Gracias a los ponentes por compartir su experiencia y por acercar la ciberseguridad al aula de forma tan clara y directa.',
            stackHtml: 'Invitados: Víctor Bravo Martinez (Ethical Hacker) &amp; F. Javier Martínez Robles (CSIRT)',
            images: buildConferenceGallery([
                { src: '../assets/img/charla3/3.2.jpg', webp: '../assets/img/optimized/charla3/3.2.webp', width: 2048, height: 1536 },
                { src: '../assets/img/charla3/3.3.jpg', webp: '../assets/img/optimized/charla3/3.3.webp', width: 2048, height: 1536 },
                { src: '../assets/img/charla3/3.4.jpg', webp: '../assets/img/optimized/charla3/3.4.webp', width: 2048, height: 1535 },
                { src: '../assets/img/charla3/3.5.jpg', webp: '../assets/img/optimized/charla3/3.5.webp', width: 2048, height: 1536 },
                { src: '../assets/img/charla3/3.6.jpg', webp: '../assets/img/optimized/charla3/3.6.webp', width: 2048, height: 1536 },
                { src: '../assets/img/charla3/3.7.jpg', webp: '../assets/img/optimized/charla3/3.7.webp', width: 2048, height: 1535 },
                { src: '../assets/img/charla3/3.8.jpg', webp: '../assets/img/optimized/charla3/3.8.webp', width: 2048, height: 1536 },
                { src: '../assets/img/charla3/3.9.jpg', webp: '../assets/img/optimized/charla3/3.9.webp', width: 1280, height: 1706 },
                { src: '../assets/img/charla3/3.10.jpg', webp: '../assets/img/optimized/charla3/3.10.webp', width: 988, height: 1416 }
            ], 'Fotografía de la charla sobre vulnerabilidades en el código y desarrollo seguro en FP Miralmonte')
        },
        {
            slug: 'francisco-munoz-intel',
            dateDisplay: '07-02-25',
            dateIso: '2025-02-07',
            title: 'Charla con Francisco Muñoz Martínez: De la Universidad a Intel Corporation',
            summaryHtml: '🔙 #Throwback: Una semana después de una charla inspiradora en el Colegio Miralmonte, seguimos reflexionando sobre la increíble trayectoria de Francisco Muñoz Martínez, <strong>Ingeniero de Software en Intel Corporation</strong>.<br><br>El pasado 7 de febrero, tuvimos la oportunidad de conocer de primera mano su camino desde la Universidad de Murcia hasta trabajar en una de las empresas tecnológicas más influyentes del mundo. Nos habló sobre innovación en arquitectura de computadores, el papel clave del hardware y el software, y el impacto de la IA en el futuro del sector.<br><br>Algunos puntos clave de su intervención:<br>✅ Academia vs. Industria: Diferencias, retos y oportunidades en ambos mundos.<br>✅ Búsqueda de empleo en Big Tech: Consejos prácticos sobre entrevistas y preparación técnica.<br>✅ Arquitectura de hardware para IA: Cómo se diseñan los chips para optimizar tareas como el machine learning.<br>✅ Experiencia en Intel: Metodologías ágiles, flexibilidad laboral y el papel de la simulación en el desarrollo de hardware.<br><br>Fue un lujo contar con un experto de su nivel. Gracias, Francisco Muñoz Martínez, por compartir tu conocimiento y experiencia.',
            stackHtml: 'Invitado: Francisco Muñoz Martínez (SW Engineer @ Intel)',
            images: buildConferenceGallery([
                { src: '../assets/img/charla2/charla 2.1.jpg', webp: '../assets/img/optimized/charla2/charla 2.1.webp', width: 2048, height: 1536 },
                { src: '../assets/img/charla2/charla 2.2.jpg', webp: '../assets/img/optimized/charla2/charla 2.2.webp', width: 2048, height: 1536 },
                { src: '../assets/img/charla2/charla2.3.jpg', webp: '../assets/img/optimized/charla2/charla2.3.webp', width: 2048, height: 1536 },
                { src: '../assets/img/charla2/charla2.4.jpg', webp: '../assets/img/optimized/charla2/charla2.4.webp', width: 1280, height: 1706 },
                { src: '../assets/img/charla2/charla2.5.jpg', webp: '../assets/img/optimized/charla2/charla2.5.webp', width: 2048, height: 1536 },
                { src: '../assets/img/charla2/charla2.6.jpg', webp: '../assets/img/optimized/charla2/charla2.6.webp', width: 1536, height: 1536 }
            ], 'Fotografía de la charla de Francisco Muñoz Martínez en Colegio Miralmonte')
        },
        {
            slug: 'ingenieria-datos-infraestructura',
            dateDisplay: '14-01-25',
            dateIso: '2025-01-14',
            title: 'Charla sobre Ingeniería de Datos e Infraestructura en el Colegio Miralmonte',
            summaryHtml: 'La semana pasada tuvimos el honor de recibir a Jose Yago, <strong>Site Reliability Engineer en Kiwigrid, Alemania</strong>, quien ofreció una charla inspiradora para nuestros alumnos.<br><br>Durante su intervención compartió su experiencia profesional, abordando temas clave como la ingeniería de datos, infraestructura, el impacto de la IA en el ámbito laboral y consejos para trabajar en el extranjero. Su claridad y enfoque práctico proporcionaron a los asistentes una visión valiosa sobre el sector y las oportunidades profesionales que ofrece.<br><br>Quiero agradecer a Jose Yago no solo por su tiempo, sino también por inspirar a nuestros alumnos con su pasión y conocimiento.',
            stackHtml: 'Invitado: Jose Yago (SRE @ Kiwigrid)',
            images: buildConferenceGallery([
                { src: '../assets/img/charla1/charla1.jpg', webp: '../assets/img/optimized/charla1/charla1.webp', width: 1280, height: 1706 },
                { src: '../assets/img/charla1/charla1.2.jpg', webp: '../assets/img/optimized/charla1/charla1.2.webp', width: 2048, height: 1536 },
                { src: '../assets/img/charla1/charla1.3.jpg', webp: '../assets/img/optimized/charla1/charla1.3.webp', width: 1280, height: 1706 }
            ], 'Fotografía de la charla sobre ingeniería de datos e infraestructura en Colegio Miralmonte')
        }
    ]
};
