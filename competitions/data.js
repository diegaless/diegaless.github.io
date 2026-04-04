function buildCompetitionGallery(images, altBase) {
    return images.map((image, index) => ({
        ...image,
        alt: `${altBase} (${index + 1}/${images.length})`
    }));
}

window.pageContent = {
    type: 'list',
    command: './competitions.sh',
    title: 'Competiciones',
    emptyMessage: 'No competitions found.',
    statusMessage: 'Competiciones cargadas.',
    entries: [
        {
            slug: 'spainskills-desarrollo-web-2026',
            dateDisplay: '04-03-26',
            dateIso: '2026-03-04',
            title: 'Tutoría en Desarrollo Web',
            summaryHtml: 'Durante toda la semana pasada tuve el privilegio de ser tutor de Laura Barrero Sánchez en las SpainSkills, en la modalidad de Desarrollo Web.<br><br>Cuando compites a este nivel, no es solo cuestión de conocimientos técnicos, sino saber enfrentarse a la presión y nunca rendirse.<br><br>Al ver tú esfuerzo, compromiso y las ganas de mejorar en cada momento es imposible no sentirse orgulloso.<br><br>Para mi eres la campeona, experiencias como esta te dejarán un aprendizaje que va mucho más allá de la competición.<br><br>Eventos como SpainSkills son clave para posicionar la FP como la rama mas importante de la educación, a la vez que creamos el ecosistema entre empresa, formación y talento.<br><br>Gracias también a los partners y sus evaluadores que hacen posible estas iniciativas y apuestan por la FP: Pilar Atienza, Jose Ignacio de la Hera Cibrian, Juan Carlos Blázquez Muñoz.<br><br>Por último, dar las gracias también a mi centro Colegio Miralmonte, por confiar en mí.<br><br>SAP · Accenture · IBM · Microsoft<br><a class="term-link" href="https://www.linkedin.com/feed/update/urn:li:activity:7434886609336082433/?originTrackingId=GmHGH19AgNewaNfjUuBhQw%3D%3D" target="_blank" rel="noopener noreferrer">Ver publicación original en LinkedIn</a>',
            stackHtml: 'Competición: SpainSkills 2026 · Modalidad: Desarrollo Web · Tutor: Diego Ayala · Participante: Laura Barrero Sánchez',
            images: buildCompetitionGallery([
                { src: '../assets/img/competition1/1.jpg', webp: '../assets/img/optimized/competition1/1.webp', width: 1152, height: 1536 },
                { src: '../assets/img/competition1/2.jpg', webp: '../assets/img/optimized/competition1/2.webp', width: 800, height: 600 },
                { src: '../assets/img/competition1/3.jpg', webp: '../assets/img/optimized/competition1/3.webp', width: 800, height: 600 },
                { src: '../assets/img/competition1/4.jpg', webp: '../assets/img/optimized/competition1/4.webp', width: 800, height: 600 },
                { src: '../assets/img/competition1/5.jpg', webp: '../assets/img/optimized/competition1/5.webp', width: 800, height: 600 },
                { src: '../assets/img/competition1/6.jpg', webp: '../assets/img/optimized/competition1/6.webp', width: 800, height: 600 },
                { src: '../assets/img/competition1/7.jpg', webp: '../assets/img/optimized/competition1/7.webp', width: 800, height: 600 },
                { src: '../assets/img/competition1/8.jpg', webp: '../assets/img/optimized/competition1/8.webp', width: 800, height: 600 },
                { src: '../assets/img/competition1/9.jpg', webp: '../assets/img/optimized/competition1/9.webp', width: 800, height: 600 },
                { src: '../assets/img/competition1/10.jpg', webp: '../assets/img/optimized/competition1/10.webp', width: 800, height: 600 },
                { src: '../assets/img/competition1/11.jpg', webp: '../assets/img/optimized/competition1/11.webp', width: 654, height: 368 }
            ], 'Fotografía de la participación en SpainSkills 2026 en la modalidad de Desarrollo Web')
        }
    ]
};
