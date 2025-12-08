// Contenu du fichier main.js (à créer séparément)
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const isMobile = () => window.innerWidth < 768;

    // --- Fonction 1 : Gérer l'état Actif du Lien ---
    function setActiveLink() {
        // ... (collez toute la fonction setActiveLink ici)
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('#nav-menu a');

        links.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href').split('/').pop();
            
            if (linkPath === currentPath) {
                link.classList.add('active');
            }
        });
    }

    // --- Fonction 2 : Basculer la Navigation avec Animation ---
    function toggleNav() {
        // ... (collez toute la fonction toggleNav ici)
        if (!navMenu) return;

        const isHidden = navMenu.classList.contains('opacity-0');

        if (isHidden) {
            navMenu.classList.remove('hidden', 'opacity-0');
            navMenu.classList.add('opacity-100');
            navToggle.setAttribute('aria-expanded', 'true');
        } else {
            navMenu.classList.remove('opacity-100');
            navMenu.classList.add('opacity-0');
            navToggle.setAttribute('aria-expanded', 'false');

            setTimeout(() => {
                navMenu.classList.add('hidden');
            }, 200); 
        }
    }

    // --- Initialisation et Événements ---

    setActiveLink();
    
    if (navMenu && isMobile()) {
        navMenu.classList.add('hidden', 'opacity-0', 'transition-all', 'duration-200');
    }

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            if (isMobile()) {
                toggleNav();
            }
        });
    }

    const links = document.querySelectorAll('#nav-menu a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (isMobile()) {
                toggleNav(); 
            }
            setActiveLink();
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('hidden', 'opacity-0', 'transition-all', 'duration-200');
            navMenu.classList.add('opacity-100');
        } else {
            if (navToggle && navToggle.getAttribute('aria-expanded') === 'false') {
                navMenu.classList.add('hidden', 'opacity-0', 'transition-all', 'duration-200');
            }
        }
    });

});