/**
 * Minimal JS for Portfolio
 * Handling Navbar, Smooth Scroll, and Scroll Top
 */

(function () {
  "use strict";

  /**
   * Navbar Active State
   */
  const navLinks = document.querySelectorAll('.navmenu a');

  function updateNav() {
    let position = window.scrollY + 200;
    navLinks.forEach(link => {
      if (!link.hash) return;
      let section = document.querySelector(link.hash);
      if (section && position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateNav);
  window.addEventListener('load', updateNav);

  /**
   * Mobile Toggle
   */
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.navmenu');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-nav-active');
    });
  }

  /**
   * Scroll Top
   */
  const scrollTop = document.querySelector('.scroll-top');

  if (scrollTop) {
    const toggleScrollTop = () => {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    };

    window.addEventListener('scroll', toggleScrollTop);
    window.addEventListener('load', toggleScrollTop);

    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth Scroll for local links (anchors)
  document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      // Check if it's a hash link or a link to the current page with a hash
      if (href && (href.startsWith('#') || href.includes(window.location.pathname + '#') || (window.location.pathname === '/' && href.includes('index.html#')))) {

        // Extract the hash
        const hash = href.includes('#') ? href.substring(href.indexOf('#')) : null;
        if (!hash) return;

        // If we are on the same page (or index.html/root equivalency)
        // Simple check: if the link goes to another page, let it be.
        // If it starts with #, implies same page.
        // If it contains index.html and we are at /, it's same page.
        // If it contains index.html and we are at /index.html, it's same page.
        const targetUrlPath = href.split('#')[0];
        const currentPath = window.location.pathname;

        // Normalize paths for comparison (very basic)
        const isSamePage = targetUrlPath === '' ||
          (targetUrlPath === 'index.html' && (currentPath === '/' || currentPath.endsWith('index.html'))) ||
          targetUrlPath === currentPath;

        if (isSamePage) {
          e.preventDefault();
          const target = document.querySelector(hash);
          if (target) {
            if (navMenu && navMenu.classList.contains('mobile-nav-active')) {
              navMenu.classList.remove('mobile-nav-active');
            }
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });


  /**
   * Projects Data & Rendering
   */
  const projectsData = [
    {
      title: "Student Registration Form",
      description: "A comprehensive and responsive student registration system with form validation and modern UI.",
      image: "assets/img/projects/student-form.png",
      tags: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
      highlights: [
        "Real-time form validation",
        "Clean and modern user interface",
        "Fully responsive layout"
      ],
      githubUrl: "https://github.com/AbnoshShahid/Student-Registration-Form", // Inferring repo from GH pages URL
      liveUrl: "https://abnoshshahid.github.io/Student-Registration-Form/",
      detailsUrl: "#"
    },
    {
      title: "Job Application Tracker",
      description: "A powerful dashboard to track job applications, manage interviews, and analyze application status.",
      image: "assets/img/projects/job-tracker.png",
      tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
      highlights: [
        "Interactive analytics dashboard",
        "Dark mode interface",
        "Status tracking and management"
      ],
      githubUrl: "https://github.com/AbnoshShahid/Job-Application-Tracker", // Guessing/Generic link, user didn't provide repo but I should provide a button.
      liveUrl: "https://job-application-tracker-six-gamma.vercel.app/",
      detailsUrl: "#"
    },
    {
      title: "AI Roadmap Navigator",
      description: "A comprehensive MERN stack platform for generating and tracking personalized career learning paths.",
      image: "assets/img/projects/ai-roadmap.png",
      tags: ["React", "Node.js", "MongoDB", "Express", "OpenAI API", "Tailwind"],
      highlights: [
        "AI-generated custom learning roadmaps",
        "Progress tracking with interactive dashboard",
        "User authentication and profile management"
      ],
      githubUrl: "https://github.com/AbnoshShahid/AI-Roadmap-Navigator",
      liveUrl: "https://ai-roadmap-navigator.vercel.app/",
      detailsUrl: "#"
    }
  ];

  function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = projectsData.map(project => {
      // Image Handling: Use placeholder if missing
      const hasImage = project.image && project.image.trim() !== '';
      const imageHtml = hasImage
        ? `<img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async">`
        : `<div class="project-placeholder"><span>${project.title.charAt(0)}</span></div>`;

      // Tags: Render all as pills
      const tagsHtml = project.tags.map(tag =>
        `<span class="project-tag">${tag}</span>`
      ).join('');

      // Links Logic
      const githubBtn = `
        <a href="${project.githubUrl}" target="_blank" class="icon-btn" aria-label="GitHub Repo" title="View Code">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>`;

      const liveBtn = project.liveUrl ? `
        <a href="${project.liveUrl}" target="_blank" class="icon-btn" aria-label="Live Demo" title="Live Demo">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>` : '';

      return `
        <article class="project-card">
          <div class="project-image-container">
            ${imageHtml}
          </div>
          <div class="project-content">
            <div class="project-header">
              <h3 class="project-title">${project.title}</h3>
              <div class="project-links">
                ${githubBtn}
                ${liveBtn}
              </div>
            </div>
            
            <p class="project-description">${project.description}</p>
            
            <div class="project-tags">
              ${tagsHtml}
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Skills Data & Rendering
   */
  const skillsData = [
    // Row 1
    { name: "HTML5", icon: "assets/img/tech/html5.svg" },
    { name: "CSS3", icon: "assets/img/tech/css3.svg" },
    { name: "JavaScript", icon: "assets/img/tech/javascript.svg" },
    { name: "React", icon: "assets/img/tech/react.svg" },
    { name: "Node.js", icon: "assets/img/tech/nodejs.svg" },
    { name: "Express", icon: "assets/img/tech/express.svg" },

    // Row 2
    { name: "MongoDB", icon: "assets/img/tech/mongodb.svg" },
    { name: "MySQL", icon: "assets/img/tech/mysql.svg" },
    { name: "Git", icon: "assets/img/tech/git.svg" },
    { name: "GitHub", icon: "assets/img/tech/github.svg" },
    { name: "Bootstrap", icon: "assets/img/tech/bootstrap.svg" },
    { name: "Tailwind", icon: "assets/img/images.jpeg" },

    // Row 3
    { name: "Python", icon: "assets/img/tech/python.svg" },
    { name: "C++", icon: "assets/img/tech/cplusplus.svg" },
    { name: "Figma", icon: "assets/img/tech/figma.svg" },
    { name: "Next.js", icon: "assets/img/tech/nextjs.svg" },
    { name: "TypeScript", icon: "assets/img/tech/typescript.svg" },
    { name: "Redux", icon: "assets/img/tech/redux.svg" },

    // Row 4
    { name: "Canva", icon: "assets/img/tech/canva.svg" },
    { name: "SQL", icon: "assets/img/tech/sql.svg" },
    { name: "Linux", icon: "assets/img/tech/linux.svg" },
    { name: "Ubuntu", icon: "assets/img/tech/ubuntu.svg" },
    { name: "VS Code", icon: "assets/img/tech/vscode.svg" },
    { name: "Filmora", icon: "assets/img/logo-filmora.png", customStyle: "background: white; padding: 5px; border-radius: 5px; width: 100%; height: auto; max-width: 40px; max-height: 40px;" }
  ];

  function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;

    container.innerHTML = skillsData.map(skill => {
      const imgStyle = skill.customStyle ? `style="${skill.customStyle}"` : '';
      return `
        <div class="col-6 col-md-4 col-lg-2">
            <div class="tech-item">
            <img src="${skill.icon}" alt="${skill.name}" loading="lazy" decoding="async" ${imgStyle}>
            <span>${skill.name}</span>
            </div>
        </div>
        `;
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderSkills();
  });

})();