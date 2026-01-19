/**
 * theme.js
 * Handles:
 * 1. Dark/Light Theme Toggling with localStorage persistence.
 * 2. Active Link state updating on scroll (ScrollSpy).
 */

document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       THEME TOGGLE LOGIC
       ========================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggleBtn.querySelector('i'); // Assuming we use Bootstrap Icons <i>

    // Check localStorage or System Preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light') {
        enableLightTheme();
    } else if (savedTheme === 'dark') {
        enableDarkTheme();
    } else if (systemPrefersLight) {
        enableLightTheme(); // Default to system if no save
    } else {
        enableDarkTheme(); // Default fallback
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('theme-light')) {
            enableDarkTheme();
            localStorage.setItem('theme', 'dark');
        } else {
            enableLightTheme();
            localStorage.setItem('theme', 'light');
        }
    });

    function enableLightTheme() {
        body.classList.add('theme-light');
        body.classList.remove('theme-dark');
        // Change icon to Moon (indicating click to go dark) or Sun (indicating current is light)?
        // Usually: Show 'Moon' to switch to dark.
        themeToggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }

    function enableDarkTheme() {
        body.classList.add('theme-dark');
        body.classList.remove('theme-light');
        // Show 'Sun' to switch to light.
        themeToggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    }


    /* =========================================
       ACTIVE LINK (SCROLL SPY) LOGIC
       ========================================= */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.custom-nav-link');

    function updateActiveLink() {
        // If we are NOT on index.html (or root), disable scroll spy for "active" class mostly
        // However, the user wants "active" state to be correct.
        // For skills.html, it's hardcoded in the HTML.
        // For index.html, we need the scroll spy.

        const path = window.location.pathname;
        const page = path.split("/").pop();

        // Run ScrollSpy ONLY if we are on index.html or empty path (root)
        if (page === "" || page === "index.html") {
            let current = '';
            const offset = 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                // const sectionHeight = section.clientHeight; // unused
                if (window.scrollY >= (sectionTop - offset)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                const href = link.getAttribute('href');

                // If link points to another page (e.g. "skills.html"), ignore it in scrollspy
                if (!href.startsWith("#") && href !== "index.html" && href !== "index.html#hero") {
                    return;
                }

                // Logic for home page anchors
                link.classList.remove('active');

                // Special case for top of page -> 'active' on Home
                if (window.scrollY < 100 && (href === "#hero" || href === "index.html")) {
                    document.querySelector('a[href="#hero"], a[href="index.html"]').classList.add('active');
                    return;
                }

                if (href.includes(current) && current !== "") {
                    link.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', updateActiveLink);
    // Initial check
    updateActiveLink();
});
