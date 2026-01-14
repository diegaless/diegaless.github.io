/**
 * ImproveOps.me Main Script
 * Modernized for performance, maintainability, and centralized logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const config = {
        typingSpeed: 50,
        initialDelay: 1000,
        pageTransitionDelay: 500,
        terminalId: 'term',
        navbarId: 'topnav',
        emailId: 'em',
        emailLinkId: 'email-link',
        loadingCookieName: 'loaded'
    };

    // --- State ---
    const state = {
        isAnimating: false,
        stopVimAnimation: false // Flag to stop the Vim cursor blink
    };

    // --- Elements ---
    const terminal = document.getElementById(config.terminalId);
    const navbar = document.getElementById(config.navbarId);

    // --- Initialization ---
    init();

    function init() {
        disableContextMenu();
        setupStickyNavbar();
        setupNavigation();
        setupEmailReveal();
        setupCopyright();

        // Determine current page and start appropriate animation
        const pageId = document.body.id;

        // Initial delay before typing starts
        setTimeout(() => {
            switch (pageId) {
                case 'page-blog':
                    runTypeSequence("./carrileos-interface.sh", () => renderList(typeof blogData !== 'undefined' ? blogData : [], 'Carrileos', 'No posts found.', 'carrileos'));
                    break;
                case 'page-conferences':
                    runTypeSequence("./conferences.sh", () => renderList(typeof conferencesData !== 'undefined' ? conferencesData : [], 'Conferencias', 'No conferences found.', 'conf'));
                    break;
                case 'page-excursions':
                    runTypeSequence("./excursions.sh", () => renderList(typeof excursionsData !== 'undefined' ? excursionsData : [], 'Excursiones', 'No excursions found.', 'exc'));
                    break;
                case 'page-about':
                    runTypeSequence("vim about-me.txt", renderAboutVim);
                    break;
                case 'page-404':
                    runTypeSequence("ping -c 1 unknown_host", render404);
                    break;
                default: // Home
                    runTypeSequence("man improveops.me", renderManPage);
            }
        }, config.initialDelay);

        // Set loaded cookie
        document.cookie = `${config.loadingCookieName}=yes`;
    }

    // --- Core Features ---

    function disableContextMenu() {
        document.oncontextmenu = () => false;
    }

    function setupStickyNavbar() {
        if (!navbar) return;
        const stickyOffset = navbar.offsetTop;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset >= stickyOffset) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }
        });
    }

    function setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const dest = link.getAttribute('data-dest');
                if (dest) {
                    handlePageExit(dest);
                }
            });
        });
    }

    function setupEmailReveal() {
        // Delegate event to document for dynamic content
        document.addEventListener('click', (e) => {
            if (e.target && e.target.id === config.emailLinkId) {
                e.preventDefault();
                revealEmail();
            }
        });
    }

    function setupCopyright() {
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    // --- Animation Logic ---

    function runTypeSequence(text, onComplete) {
        let i = 0;
        if (!terminal) return;

        function type() {
            if (i < text.length) {
                terminal.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, config.typingSpeed);
            } else {
                setTimeout(onComplete, 500);
            }
        }
        type();
    }

    // --- Renderers ---

    function renderManPage() {
        const termContent = `<p class="term-title">improveops.me</p>
<div>
<b>NAME</b>
<div class="tabbed">improveops.me -- A website about diegaless.</div>

<b>SYNOPSIS</b>
<div class="tabbed"><b>improveops.me</b></div>

<b>DESCRIPTION</b>
<div class="tabbed">The <b>improveops.me</b> utility provides information on diegaless, including his current and past projects. It also contains what he's gained from them and how they <b>could</b> be made so much better, in addition to why they won't be.</div>

<b>BUGS</b>
<div class="tabbed">Hopefully none, but if there are any report them <a href="https://github.com/diegaless/diegaless.github.io/issues" style="text-decoration:underline;color:inherit">here</a>.</div>

<b>AUTHOR</b>
<div class="tabbed">diegaless &lt;<span id="em"><a href="#" id="email-link" style="text-decoration:underline;color:inherit;cursor:pointer;">click for email</a></span>&gt;</div>

<b>SEE ALSO</b>
<div class="tabbed">blog(1), about(2), cowsay(1), github(3)</div>
</div>`;
        if (terminal) terminal.innerHTML = termContent;
    }

    function renderList(data, title, emptyMsg, idPrefix) {
        let postsHtml = '';
        if (typeof data !== 'undefined' && Array.isArray(data) && data.length > 0) {
            data.forEach((post, index) => {
                let stackHtml = '';
                if (post.stack && post.stack.trim().length > 0) {
                    const stackId = `stack-${idPrefix}-${index}`;
                    stackHtml = ` <a href="#" onclick="document.getElementById('${stackId}').style.display = document.getElementById('${stackId}').style.display === 'none' ? 'block' : 'none'; return false;" style="text-decoration:none; color:inherit; font-size:0.8em;">[+]</a>
                    <div id="${stackId}" style="display:none; margin-top:5px; margin-left:10px; opacity:0.8; font-size:0.9em;">${post.stack}</div>`;
                }

                // Carousel Logic
                let carouselHtml = '';
                if (post.images && Array.isArray(post.images) && post.images.length > 0) {
                    const carouselId = `carousel-${idPrefix}-${index}`;

                    let slidesHtml = '';
                    post.images.forEach((imgSrc, i) => {
                        const displayStyle = i === 0 ? 'block' : 'none';
                        const activeClass = i === 0 ? 'active' : '';
                        const loadingAttr = i === 0 ? 'eager' : 'lazy'; // Load first image immediately, others lazily
                        slidesHtml += `<div class="carousel-slide ${activeClass}" id="${carouselId}-slide-${i}" style="display:${displayStyle}">
                            <img src="${imgSrc}" alt="Image ${i + 1}" loading="${loadingAttr}">
                        </div>`;
                    });

                    // Only show controls if more than 1 image
                    let controlsHtml = '';
                    if (post.images.length > 1) {
                        controlsHtml = `
                        <div class="carousel-controls">
                            <button class="carousel-btn" onclick="window.moveCarousel('${carouselId}', -1, ${post.images.length})">&lt;</button>
                            <span class="carousel-indicator" id="${carouselId}-indicator">1/${post.images.length}</span>
                            <button class="carousel-btn" onclick="window.moveCarousel('${carouselId}', 1, ${post.images.length})">&gt;</button>
                        </div>`;
                    }

                    carouselHtml = `
                    <div class="carousel-container" id="${carouselId}">
                        ${slidesHtml}
                        ${controlsHtml}
                    </div>`;
                }

                postsHtml += `<b>${post.date}</b>
<div class="tabbed">${post.content}${stackHtml}
${carouselHtml}
</div>
`;
            });
        } else {
            postsHtml = `<b>NO CONTENT</b><div class="tabbed">${emptyMsg}</div>`;
        }

        const termContent = `<p class="term-title">${title}</p>
<div>
${postsHtml}</div>`;
        if (terminal) terminal.innerHTML = termContent;
    }

    // Expose carousel logic globally
    window.moveCarousel = function (carouselId, step, totalSlides) {
        // Find current active index
        let activeIndex = -1;
        for (let i = 0; i < totalSlides; i++) {
            const slide = document.getElementById(`${carouselId}-slide-${i}`);
            if (slide && slide.style.display === 'block') {
                activeIndex = i;
                break;
            }
        }

        if (activeIndex === -1) return; // Should not happen

        // Calculate new index
        let newIndex = activeIndex + step;
        if (newIndex < 0) newIndex = totalSlides - 1;
        if (newIndex >= totalSlides) newIndex = 0;

        // Update DOM
        document.getElementById(`${carouselId}-slide-${activeIndex}`).style.display = 'none';
        document.getElementById(`${carouselId}-slide-${activeIndex}`).classList.remove('active');

        document.getElementById(`${carouselId}-slide-${newIndex}`).style.display = 'block';
        document.getElementById(`${carouselId}-slide-${newIndex}`).classList.add('active');

        // Update indicator
        const indicator = document.getElementById(`${carouselId}-indicator`);
        if (indicator) {
            indicator.textContent = `${newIndex + 1}/${totalSlides}`;
        }

        // Prefetch next image
        let nextPrefetchIndex = newIndex + 1;
        if (nextPrefetchIndex >= totalSlides) nextPrefetchIndex = 0;

        const nextSlide = document.getElementById(`${carouselId}-slide-${nextPrefetchIndex}`);
        if (nextSlide) {
            const nextImg = nextSlide.querySelector('img');
            if (nextImg && nextImg.loading === 'lazy') {
                nextImg.loading = 'eager'; // Trigger load
            }
        }
    };

    function renderAboutVim() {
        state.stopVimAnimation = false;

        const vimTemplate = (cursor) => `<p class="term-title">About Me</p>
<div>
<b>CONSOLE</b>
<div class="tabbed"><div id="vim">Work in progress.${cursor}<br><span style="color: darkblue;">~<br>~<br>~<br>~<br>~<br>~<br>~<br></span>"about-me.txt" 25L, 1560C</div></div>
</div>`;

        let toggle = true;

        function animateVim() {
            if (state.stopVimAnimation) return;

            const cursorHtml = toggle
                ? `<span style="display:inline;color:inherit;height:10px;width:10px;background-color:currentColor;">l</span>`
                : `<span style="display:inline;height:10px;width:10px;">l</span>`;

            if (terminal) terminal.innerHTML = vimTemplate(cursorHtml);
            toggle = !toggle;
            setTimeout(animateVim, 500);
        }

        animateVim();
    }

    function render404() {
        if (terminal) {
            terminal.innerHTML += `
            <br>
            <span style="color:#ff3333;">ping: unknown_host: Name or service not known</span><br>
            <span style="color:#ff3333;">Error 404: Signal Lost.</span><br>
            <b>visitor@improveops.me</b>:~$ 
            `;
        }
    }

    function revealEmail() {
        const container = document.getElementById(config.emailId);
        if (container) {
            const unm = "diego.ayala2";
            const prvdr = "um.es";
            const lnktxt = "@";
            container.innerHTML = `${unm}${lnktxt}${prvdr}`;
        }
    }

    // --- Navigation / Exit Logic ---

    function handlePageExit(url) {
        state.stopVimAnimation = true; // Stop any ongoing loops

        const pageId = document.body.id;

        if (pageId === 'page-about') {
            exitFromVim(url);
        } else {
            // Default exit (clear)
            resetAndType("clear", url);
        }
    }

    function exitFromVim(url) {
        const vimBase = `<p class="term-title">About Me</p>
<div>
<b>CONSOLE</b>
<div class="tabbed"><div id="vim">Work in progress.<br><span style="color: darkblue;">~<br>~<br>~<br>~<br>~<br>~<br>~<br></span>`;
        const vimTail = `</div></div>
</div>`;

        let cmd = "";
        const targetCmd = ":q";
        let i = 0;

        function typeCmd() {
            if (i < targetCmd.length) {
                cmd += targetCmd.charAt(i);
                if (terminal) terminal.innerHTML = `${vimBase}${cmd}${vimTail}`;
                i++;
                setTimeout(typeCmd, config.typingSpeed);
            } else {
                // After :q, clear screen
                setTimeout(() => resetAndType("clear", url), 500);
            }
        }

        typeCmd();
    }

    function resetAndType(text, url) {
        // Reset terminal to showing the prompt with the text typing
        if (terminal) {
            terminal.innerHTML = `<b>visitor@improveops.me</b>:~$ man improveops.me<br><b>visitor@improveops.me</b>:~$ `;
        }

        let i = 0;
        function type() {
            if (i < text.length) {
                if (terminal) terminal.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, config.typingSpeed);
            } else {
                setTimeout(() => {
                    window.location = url;
                }, 500);
            }
        }

        // Small delay before starting to type 'clear'
        setTimeout(type, 200);
    }
});
