/**
 * Blog Data Source
 * Loaded before script.js to provide content without requiring a backend/fetch.
 */
const blogData = [
    {
        date: "01-01-26",
        content: "<b>DevTrack (LMS)</b> - So what’s the difference between a harness and me?",
        stack: "Features a FastAPI backend, Next.js frontend, and a Docker-based Judge service for automated code execution. Harness for (HTML, CSS, JS, Java, Bash)"
    },
    {
        date: "01-11-25",
        content: "<b>Gestión FCT</b> - Way too much bureaucracy with FEM, and it’s boring as hell.I should automate it and focus on solid KPIs.",
        stack: "Enterprise-grade automation suite. <b>Frontend:</b> Next.js 16, React 19, Tailwind v4, <i>Shadcn/UI</i>, TanStack Table & Recharts. <b>Backend:</b> Python CLI (Typer), FastAPI, Playwright (Headless Automation), pyHanko (PAdES Signatures), SQLAlchemy."
    },
    {
        date: "01-09-25",
        content: "<b>Interuniversity Master’s Degree (URV · UMU · UdL · UIB) </b> - I guess I just prefer determinism over probability. +1 point.",
        stack: " "
    },
    {
        date: "18-10-23",
        content: "<b>Side job </b> - Not bad for a side gig — best pay package nationwide.",
        stack: " "
    },
    {
        date: "30-08-18",
        content: "Added support for SSL (https enabled)."
    }
];

const conferencesData = [
    {
        date: "18-11-25",
        content: "<b>Vulnerabilidades en el código y desarrollo seguro</b> - Ayer celebramos en FP Miralmonte el comienzo de nuestro ciclo de conferencias con “Vulnerabilidades en el código y desarrollo seguro”, con Víctor Bravo Martinez (Ethical Hacker) y F. Javier Martínez Robles (Coordinador Ciberseguridad CSIRT).<br><br>Una sesión muy práctica donde nuestros alumnos de FP pudieron conocer de primera mano cómo se detectan vulnerabilidades reales, cómo piensa un atacante y qué buenas prácticas deben aplicar en su código desde el primer día.<br><br>Gracias a los ponentes por compartir su experiencia y por acercar la ciberseguridad al aula de forma tan clara y directa.",
        stack: "Invitados: Víctor Bravo Martinez (Ethical Hacker) & F. Javier Martínez Robles (CSIRT)",
        images: [
            "../assets/img/charla3/3.2.jpg",
            "../assets/img/charla3/3.3.jpg",
            "../assets/img/charla3/3.4.jpg",
            "../assets/img/charla3/3.5.jpg",
            "../assets/img/charla3/3.6.jpg",
            "../assets/img/charla3/3.7.jpg",
            "../assets/img/charla3/3.8.jpg",
            "../assets/img/charla3/3.9.jpg",
            "../assets/img/charla3/3.10.jpg"
        ]
    },
    {
        date: "07-02-25",
        content: "<b>Charla con Francisco Muñoz Martínez: De la Universidad a Intel Corporation</b> - 🔙 #Throwback: Una semana después de una charla inspiradora en el Colegio Miralmonte, seguimos reflexionando sobre la increíble trayectoria de Francisco Muñoz Martínez, <b>Ingeniero de Software en Intel Corporation</b>.<br><br>El pasado 7 de febrero, tuvimos la oportunidad de conocer de primera mano su camino desde la Universidad de Murcia hasta trabajar en una de las empresas tecnológicas más influyentes del mundo. Nos habló sobre innovación en arquitectura de computadores, el papel clave del hardware y el software, y el impacto de la IA en el futuro del sector.<br><br>Algunos puntos clave de su intervención:<br>✅ Academia vs. Industria: Diferencias, retos y oportunidades en ambos mundos.<br>✅ Búsqueda de empleo en Big Tech: Consejos prácticos sobre entrevistas y preparación técnica.<br>✅ Arquitectura de hardware para IA: Cómo se diseñan los chips para optimizar tareas como el machine learning.<br>✅ Experiencia en Intel: Metodologías ágiles, flexibilidad laboral y el papel de la simulación en el desarrollo de hardware.<br><br>Fue un lujo contar con un experto de su nivel ¡Gracias Francisco Muñoz Martínez por compartir tu conocimiento y experiencia! 🙌👏",
        stack: "Invitado: Francisco Muñoz Martínez (SW Engineer @ Intel)",
        images: [
            "../assets/img/charla2/charla 2.1.jpg",
            "../assets/img/charla2/charla 2.2.jpg",
            "../assets/img/charla2/charla2.3.jpg",
            "../assets/img/charla2/charla2.4.jpg",
            "../assets/img/charla2/charla2.5.jpg",
            "../assets/img/charla2/charla2.6.jpg"
        ]
    },
    {
        date: "14-01-25",
        content: "<b>Charla sobre Ingeniería de Datos e Infraestructura en el Colegio Miralmonte</b> - La semana pasada, tuvimos el honor de recibir a Jose Yago, <b>Site Reliability Engineer en Kiwigrid, Alemania</b>, quien ofreció una charla inspiradora para nuestros alumnos.<br><br>Durante su intervención, compartió su experiencia profesional, abordando temas clave como la ingeniería de datos, infraestructura, el impacto de la IA en el ámbito laboral y consejos para trabajar en el extranjero. Su claridad y enfoque práctico proporcionaron a los asistentes una visión valiosa sobre el sector y las oportunidades profesionales que ofrece.<br><br>Quiero agradecer a Jose Yago no solo por su tiempo, sino también por inspirar a nuestros alumnos con su pasión y conocimiento. Este tipo de charlas no solo amplían horizontes, sino que también motivan a las nuevas generaciones a seguir creciendo en sectores fuera del scope general.",
        stack: "Invitado: Jose Yago (SRE @ Kiwigrid)",
        images: [
            "../assets/img/charla1/charla1.jpg",
            "../assets/img/charla1/charla1.2.jpg",
            "../assets/img/charla1/charla1.3.jpg"
        ]
    }
];

const excursionsData = [
    {
        date: "20-12-25",
        content: "<b>Visita a ÁTICA (UM) - Pipelines CI/CD y Salidas Profesionales</b> - La semana pasada fuimos de visita a ÁTICA donde asistimos a las ponencias magistrales de Pedro y Patxi.<br><br>Gracias, Pedro Delgado Yarza por compartir tu experiencia en desarrollo de software y por mostrarnos, pipelines reales de CI/CD en prod. Ver ese flujo motivó enormemente a nuestros alumnos, al conectar de forma clara lo visto en clase con la industria. Has sido trending topic en nuestro colegio durante días.<br><br>Gracias Patxi, por mostrarnos todo los tipos de salidas profesionales que podemos desempeñar en Ática abrirnos las puertas de tu casa.<br><br>Gracias a ÁTICA UM, y especialmente a Pedro Delgado Yarza y Patxi, por el tiempo, la cercanía y por compartir conocimiento de forma tan clara y práctica. ¡Repetiríamos mañana!",
        stack: "Visita: ÁTICA (Universidad de Murcia)",
        images: [
            "../assets/img/excursion1/4.1.jpg",
            "../assets/img/excursion1/4.2.jpg",
            "../assets/img/excursion1/4.3.jpg",
            "../assets/img/excursion1/4.4.jpg"
        ]
    },
    {
        date: "22-11-25",
        content: "<b>Visita a KIO Spain Data Center TIER IV</b> - Visita técnica al centro de datos de KIO Spain, el único TIER IV en España con certificación de diseño, construcción y operación.",
        stack: "Visita: KIO Spain Data Center",
        images: [
            "../assets/img/excursion2/5.1.jpg"
        ]
    }
];
