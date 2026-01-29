/**
 * Shared Components (Navbar, Footer)
 * Renders common elements across pages to avoid duplication
 */

const Components = {
    navbar: `
    <nav class="glass-navbar">
        <!-- Brand -->
        <a href="index.html" class="nav-brand">
            Abnosh Shahid
        </a>

        <!-- Hamburger (Mobile Only) -->
        <button class="mobile-menu-btn" aria-label="Toggle Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </button>

        <!-- Center Links (Desktop: Horizontal, Mobile: Dropdown) -->
        <div class="nav-links-wrapper">
             <div class="nav-links" id="navLinks">
                <a href="index.html" class="custom-nav-link" data-page="home">Home</a>
                <a href="skills.html" class="custom-nav-link" data-page="skills">Skills</a>
                <a href="index.html#education" class="custom-nav-link">Education</a>
                <a href="index.html#projects" class="custom-nav-link">Projects</a>
            </div>
        </div>

        <!-- Theme Toggle -->
        <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle Theme">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
        </button>
    </nav>
    `,

    footer: `
    <div class="container">
        <div class="copyright text-center ">
            <p>© <span>Copyright</span> <strong class="px-1 sitename">Abnosh</strong> <span>All Rights Reserved</span></p>
        </div>
    </div>
    `
};

function renderComponents() {
    // Render Navbar
    const navbarContainer = document.querySelector('.glass-navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = Components.navbar;
        setActiveLink();
        initMobileMenu();
    }

    // Render Footer
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
        footerContainer.innerHTML = Components.footer;
    }
}

function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinksWrapper = document.querySelector('.nav-links-wrapper');
    const links = document.querySelectorAll('.custom-nav-link');

    if (!mobileBtn || !navLinksWrapper) return;

    // Toggle Menu
    mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinksWrapper.classList.toggle('active');
        mobileBtn.classList.toggle('active');
    });

    // Close when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinksWrapper.classList.remove('active');
            mobileBtn.classList.remove('active');
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinksWrapper.contains(e.target) && !mobileBtn.contains(e.target)) {
            navLinksWrapper.classList.remove('active');
            mobileBtn.classList.remove('active');
        }
    });
}

function setActiveLink() {
    const path = window.location.pathname;
    const page = path.includes('skills.html') ? 'skills' : 'home';

    const links = document.querySelectorAll('.custom-nav-link');
    links.forEach(link => {
        if (link.dataset.page === page) {
            link.classList.add('active');
        } else {
            // Remove active class from others
            // Note: Hash links (Experience, etc) won't get active class by default logic here,
            // but main.js scroll listener might toggle them.
            if (!link.hash) link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', renderComponents);
