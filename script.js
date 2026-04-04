/**
 * diegaleesss.com Main Script
 * Progressive enhancement for a static GitHub Pages deployment.
 */

document.addEventListener('DOMContentLoaded', () => {
    const config = {
        typingSpeed: 50,
        initialDelay: 1000,
        terminalId: 'term',
        navbarId: 'topnav',
        statusId: 'page-status',
        emailId: 'em',
        emailLinkId: 'email-link'
    };

    const homePageContent = {
        type: 'sections',
        title: 'diegaleesss.com',
        statusMessage: 'Contenido principal cargado.',
        sections: [
            {
                title: 'NAME',
                paragraphs: ['diegaleesss.com -- A website about diegaless.']
            },
            {
                title: 'SYNOPSIS',
                html: '<strong>diegaleesss.com</strong>'
            },
            {
                title: 'DESCRIPTION',
                html: 'The <strong>diegaleesss.com</strong> utility provides information on diegaless, including his current and past projects. It also contains what he\'s gained from them and how they <strong>could</strong> be made so much better, in addition to why they won\'t be.'
            },
            {
                title: 'BUGS',
                html: 'Hopefully none, but if there are any report them <a class="term-link" href="https://github.com/diegaless/diegaless.github.io/issues" target="_blank" rel="noopener noreferrer">here</a>.'
            },
            {
                title: 'AUTHOR',
                html: 'diegaless &lt;<span id="em"><a class="term-link" href="#" id="email-link">click for email</a></span>&gt;'
            },
            {
                title: 'SEE ALSO',
                paragraphs: ['blog(1), about(2), cowsay(1), github(3)']
            }
        ]
    };

    const state = {
        timers: new Set(),
        stopVimAnimation: false
    };

    const terminal = document.getElementById(config.terminalId);
    const navbar = document.getElementById(config.navbarId);
    const pageStatus = document.getElementById(config.statusId);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const staticPageMap = {
        'page-home': {
            command: 'man diegaleesss.com',
            render: () => renderPageContent(homePageContent)
        },
        'page-about': {
            command: 'cat about-me.txt',
            render: renderAboutVim
        },
        'page-404': {
            command: 'ping -c 1 unknown_host',
            render: render404
        }
    };

    init();

    function init() {
        setContentBusy(true);
        setupStickyNavbar();
        setupNavigation();
        setupContentInteractions();
        setupCopyright();

        const pageContext = getCurrentPageContext();

        if (prefersReducedMotion) {
            pageContext.render();
            return;
        }

        schedule(() => runTypeSequence(pageContext.command, pageContext.render), config.initialDelay);
    }

    function getCurrentPageContext() {
        if (window.pageContent) {
            return {
                command: window.pageContent.command || 'cat page-content.js',
                render: () => renderPageContent(window.pageContent)
            };
        }

        return staticPageMap[getPageId()] || staticPageMap['page-home'];
    }

    function getPageId() {
        return document.body.id || 'page-home';
    }

    function schedule(callback, delay) {
        const timerId = window.setTimeout(() => {
            state.timers.delete(timerId);
            callback();
        }, delay);

        state.timers.add(timerId);
        return timerId;
    }

    function clearPendingTimers() {
        state.timers.forEach((timerId) => window.clearTimeout(timerId));
        state.timers.clear();
    }

    function setContentBusy(isBusy) {
        if (terminal) {
            terminal.setAttribute('aria-busy', String(isBusy));
        }
    }

    function completeRender(message) {
        setContentBusy(false);
        if (pageStatus) {
            pageStatus.textContent = message;
        }
    }

    function setupStickyNavbar() {
        if (!navbar) return;
        const stickyOffset = navbar.offsetTop;

        window.addEventListener('scroll', () => {
            if (window.scrollY >= stickyOffset) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        }, { passive: true });
    }

    function setupNavigation() {
        document.addEventListener('click', (event) => {
            const link = event.target.closest('.nav-link');
            if (!link) {
                return;
            }

            if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            const destination = link.getAttribute('data-dest');
            if (!destination) {
                return;
            }

            event.preventDefault();
            handlePageExit(destination);
        });
    }

    function setupContentInteractions() {
        document.addEventListener('click', (event) => {
            const emailTrigger = event.target.closest(`#${config.emailLinkId}`);
            if (emailTrigger) {
                event.preventDefault();
                revealEmail();
                return;
            }

            const stackToggle = event.target.closest('[data-toggle="stack"]');
            if (stackToggle) {
                event.preventDefault();
                toggleStack(stackToggle);
                return;
            }

            const carouselButton = event.target.closest('[data-carousel-id]');
            if (carouselButton) {
                event.preventDefault();
                moveCarousel(
                    carouselButton.dataset.carouselId,
                    Number(carouselButton.dataset.carouselStep),
                    Number(carouselButton.dataset.carouselTotal)
                );
            }
        });
    }

    function setupCopyright() {
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    function runTypeSequence(text, onComplete) {
        let index = 0;

        if (!terminal) return;

        function typeNextCharacter() {
            if (index < text.length) {
                terminal.insertAdjacentText('beforeend', text.charAt(index));
                index += 1;
                schedule(typeNextCharacter, config.typingSpeed);
                return;
            }

            schedule(onComplete, 500);
        }

        typeNextCharacter();
    }

    function renderPageContent(pageContent) {
        if (pageContent.type === 'sections') {
            renderSectionsPage(pageContent);
            return;
        }

        if (pageContent.type === 'list' || Array.isArray(pageContent.entries)) {
            renderListPage(pageContent);
            return;
        }

        renderContentError();
    }

    function renderSectionsPage(pageContent) {
        const sectionsHtml = (pageContent.sections || [])
            .map((section) => renderSection(section))
            .join('\n');

        const pageHtml = `<h1 class="term-title">${escapeHtml(pageContent.title)}</h1>
${sectionsHtml}`;

        setTerminalContent(pageHtml, pageContent.statusMessage || `${pageContent.title} cargado.`);
    }

    function renderSection(section) {
        let contentHtml = '';

        if (Array.isArray(section.paragraphs)) {
            contentHtml += section.paragraphs
                .map((paragraph) => `<p class="term-paragraph">${escapeHtml(paragraph)}</p>`)
                .join('');
        }

        if (section.html) {
            contentHtml += section.html;
        }

        return `<section class="term-section">
<h2 class="term-section-title">${escapeHtml(section.title)}</h2>
<div class="tabbed">${contentHtml}</div>
</section>`;
    }

    function renderListPage(pageContent) {
        const { entries, title, emptyMessage, statusMessage } = pageContent;

        let entriesHtml = '';

        if (Array.isArray(entries) && entries.length > 0) {
            entriesHtml = entries.map((entry, entryIndex) => renderEntry(entry, entryIndex)).join('\n');
        } else {
            entriesHtml = `<section class="term-section"><h2 class="term-section-title">NO CONTENT</h2><div class="tabbed">${escapeHtml(emptyMessage)}</div></section>`;
        }

        const pageHtml = `<h1 class="term-title">${escapeHtml(title)}</h1>
<div class="terminal-list">
${entriesHtml}
</div>`;

        setTerminalContent(pageHtml, statusMessage || `${title} cargado.`);
    }

    function renderEntry(entry, entryIndex) {
        const stackHtml = renderStack(entry, entryIndex);
        const carouselHtml = renderCarousel(entry, entryIndex);

        return `<article class="terminal-entry">
<p class="entry-date"><time datetime="${escapeHtml(entry.dateIso)}">${escapeHtml(entry.dateDisplay)}</time></p>
<div class="tabbed">
<h2 class="entry-title">${escapeHtml(entry.title)}</h2><div class="entry-summary"> - ${entry.summaryHtml}</div>${stackHtml}
${carouselHtml}
</div>
</article>`;
    }

    function renderStack(entry, entryIndex) {
        if (!entry.stackHtml || entry.stackHtml.trim().length === 0) {
            return '';
        }

        const stackId = `stack-${entry.slug || entryIndex}`;
        const escapedTitle = escapeHtml(entry.title);

        return ` <button class="inline-toggle" type="button" data-toggle="stack" data-target="${stackId}" data-label="${escapedTitle}" aria-expanded="false" aria-controls="${stackId}" aria-label="Mostrar stack de ${escapedTitle}">[+]</button>
<div id="${stackId}" class="stack-details" hidden>${entry.stackHtml}</div>`;
    }

    function renderCarousel(entry, entryIndex) {
        if (!Array.isArray(entry.images) || entry.images.length === 0) {
            return '';
        }

        const carouselId = `carousel-${entry.slug || entryIndex}`;
        const totalSlides = entry.images.length;
        const slidesHtml = entry.images
            .map((image, slideIndex) => renderSlide(entry, entryIndex, image, slideIndex, carouselId, totalSlides))
            .join('\n');

        let controlsHtml = '';
        if (totalSlides > 1) {
            controlsHtml = `
<div class="carousel-controls">
<button class="carousel-btn" type="button" data-carousel-id="${carouselId}" data-carousel-step="-1" data-carousel-total="${totalSlides}" aria-label="Imagen anterior">&lt;</button>
<span class="carousel-indicator" id="${carouselId}-indicator" aria-live="polite">1/${totalSlides}</span>
<button class="carousel-btn" type="button" data-carousel-id="${carouselId}" data-carousel-step="1" data-carousel-total="${totalSlides}" aria-label="Imagen siguiente">&gt;</button>
</div>`;
        }

        return `
<section class="carousel-container" id="${carouselId}" data-current-index="0" aria-label="Galería de ${escapeHtml(entry.title)}">
${slidesHtml}
${controlsHtml}
</section>`;
    }

    function renderSlide(entry, entryIndex, image, slideIndex, carouselId, totalSlides) {
        const isInitiallyVisible = slideIndex === 0;
        const isPageHeroImage = entryIndex === 0 && slideIndex === 0;
        const hiddenAttribute = isInitiallyVisible ? '' : ' hidden';
        const activeClass = isInitiallyVisible ? ' active' : '';
        const ariaCurrent = isInitiallyVisible ? ' aria-current="true"' : '';
        const loading = isPageHeroImage ? 'eager' : 'lazy';
        const fetchPriority = isPageHeroImage ? 'high' : 'low';
        const imageAlt = escapeHtml(image.alt || `${entry.title} (${slideIndex + 1}/${totalSlides})`);
        const webpSource = image.webp ? `<source type="image/webp" srcset="${image.webp}">` : '';

        return `<div class="carousel-slide${activeClass}" id="${carouselId}-slide-${slideIndex}"${hiddenAttribute}${ariaCurrent}>
<picture>
${webpSource}
<img src="${image.src}" alt="${imageAlt}" loading="${loading}" decoding="async" fetchpriority="${fetchPriority}" width="${image.width}" height="${image.height}">
</picture>
</div>`;
    }

    function moveCarousel(carouselId, step, totalSlides) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;

        const activeIndex = Number(carousel.dataset.currentIndex || 0);
        let newIndex = activeIndex + step;

        if (newIndex < 0) newIndex = totalSlides - 1;
        if (newIndex >= totalSlides) newIndex = 0;
        if (newIndex === activeIndex) return;

        const activeSlide = document.getElementById(`${carouselId}-slide-${activeIndex}`);
        const nextSlide = document.getElementById(`${carouselId}-slide-${newIndex}`);

        if (!activeSlide || !nextSlide) return;

        activeSlide.hidden = true;
        activeSlide.classList.remove('active');
        activeSlide.removeAttribute('aria-current');

        nextSlide.hidden = false;
        nextSlide.classList.add('active');
        nextSlide.setAttribute('aria-current', 'true');
        carousel.dataset.currentIndex = String(newIndex);

        const indicator = document.getElementById(`${carouselId}-indicator`);
        if (indicator) {
            indicator.textContent = `${newIndex + 1}/${totalSlides}`;
        }

        const currentImage = nextSlide.querySelector('img');
        if (currentImage) {
            currentImage.loading = 'eager';
            currentImage.fetchPriority = 'high';
        }
    }

    function toggleStack(button) {
        const targetId = button.dataset.target;
        if (!targetId) return;

        const details = document.getElementById(targetId);
        if (!details) return;

        const shouldExpand = details.hidden;
        const label = button.dataset.label || 'este proyecto';

        details.hidden = !shouldExpand;
        button.textContent = shouldExpand ? '[-]' : '[+]';
        button.setAttribute('aria-expanded', String(shouldExpand));
        button.setAttribute('aria-label', `${shouldExpand ? 'Ocultar' : 'Mostrar'} stack de ${label}`);
    }

    function render404() {
        const quickLinks = [
            { href: 'index.html', label: 'Home', hint: 'cd ~/home' },
            { href: 'blog/blog.html', label: 'Carrileos', hint: 'ls carrileos/' },
            { href: 'conferences/conferences.html', label: 'Conferencias', hint: 'ls conferences/' },
            { href: 'competitions/competitions.html', label: 'Competiciones', hint: 'ls competitions/' },
            { href: 'excursions/excursions.html', label: 'Excursiones', hint: 'ls excursions/' },
            { href: 'about/about.html', label: 'About Me', hint: 'cat about-me.txt' }
        ];

        const linksHtml = quickLinks
            .map((link) => `<p><a class="term-link nav-link" href="${link.href}" data-dest="${link.href}">${escapeHtml(link.hint)}</a>  <span aria-hidden="true">→</span>  ${escapeHtml(link.label)}</p>`)
            .join('');

        const pageHtml = `<h1 class="term-title">404 Not Found</h1>
<section class="term-section">
<h2 class="term-section-title">SIGNAL LOST</h2>
<div class="tabbed">
<p class="error-line">ping: unknown_host: Name or service not known</p>
<p class="error-line">The requested route does not exist.</p>
<p class="term-paragraph">Use one of these entry points to get back into the site:</p>
${linksHtml}
</div>
</section>`;

        setTerminalContent(pageHtml, 'Página 404 cargada.');
    }

    function renderAboutVim() {
        state.stopVimAnimation = false;

        const vimTemplate = (cursor) => `<p class="term-title">About Me</p>
<div>
<b>CONSOLE</b>
<div class="tabbed"><div id="vim">Work in progress.${cursor}<br><span style="color: darkblue;">~<br>~<br>~<br>~<br>~<br>~<br>~<br></span>"about-me.txt" 25L, 1560C</div></div>
</div>`;

        let toggle = true;

        function animateVim() {
            if (state.stopVimAnimation) {
                return;
            }

            const cursorHtml = toggle
                ? '<span style="display:inline;color:inherit;height:10px;width:10px;background-color:currentColor;">l</span>'
                : '<span style="display:inline;height:10px;width:10px;">l</span>';

            if (terminal) {
                terminal.innerHTML = vimTemplate(cursorHtml);
            }

            toggle = !toggle;
            schedule(animateVim, 500);
        }

        animateVim();
        completeRender('About cargado.');
    }

    function renderContentError() {
        const pageHtml = `<h1 class="term-title">Content Error</h1>
<section class="term-section">
<h2 class="term-section-title">ERROR</h2>
<div class="tabbed">The page content could not be loaded. Review the page-specific data file before publishing to GitHub Pages.</div>
</section>`;

        setTerminalContent(pageHtml, 'Error de contenido cargado.');
    }

    function setTerminalContent(html, statusMessage) {
        if (terminal) {
            terminal.innerHTML = html;
        }

        completeRender(statusMessage);
    }

    function revealEmail() {
        const container = document.getElementById(config.emailId);
        if (!container) return;

        const email = 'diego.ayala2@um.es';
        const emailLink = document.createElement('a');
        emailLink.href = `mailto:${email}`;
        emailLink.textContent = email;
        emailLink.className = 'term-link';
        container.replaceChildren(emailLink);
    }

    function handlePageExit(url) {
        clearPendingTimers();
        state.stopVimAnimation = true;

        if (prefersReducedMotion) {
            window.location.assign(url);
            return;
        }

        if (getPageId() === 'page-about') {
            exitFromVim(url);
            return;
        }

        resetAndType('clear', url);
    }

    function exitFromVim(url) {
        const vimBase = `<p class="term-title">About Me</p>
<div>
<b>CONSOLE</b>
<div class="tabbed"><div id="vim">Work in progress.<br><span style="color: darkblue;">~<br>~<br>~<br>~<br>~<br>~<br>~<br></span>`;
        const vimTail = `</div></div>
</div>`;

        let command = '';
        const targetCommand = ':q';
        let index = 0;

        function typeCommand() {
            if (index < targetCommand.length) {
                command += targetCommand.charAt(index);
                index += 1;

                if (terminal) {
                    terminal.innerHTML = `${vimBase}<span style="color:white;">${command}</span>${vimTail}`;
                }

                schedule(typeCommand, config.typingSpeed + 50);
                return;
            }

            schedule(() => {
                window.location.assign(url);
            }, 500);
        }

        typeCommand();
    }

    function resetAndType(text, url) {
        if (terminal) {
            terminal.innerHTML = '<strong>visitor@diegaleesss.com</strong>:~$ man diegaleesss.com<br><strong>visitor@diegaleesss.com</strong>:~$ ';
        }

        let index = 0;

        function type() {
            if (index < text.length) {
                if (terminal) {
                    terminal.insertAdjacentText('beforeend', text.charAt(index));
                }
                index += 1;
                schedule(type, config.typingSpeed);
                return;
            }

            schedule(() => {
                window.location.assign(url);
            }, 500);
        }

        schedule(type, 200);
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
});
