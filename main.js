// Optimized navigation menu with debounce and event delegation
(function() {
    'use strict';
    
    const DESKTOP_BREAKPOINT = 768;
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Initialize navigation
    function initNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (!navToggle || !navMenu) return;
        
        // Toggle menu function
        const toggleMenu = () => {
            const isHidden = navMenu.classList.contains('hidden');
            
            if (isHidden) {
                navMenu.classList.remove('hidden');
                void navMenu.offsetWidth; // Force reflow
                requestAnimationFrame(() => {
                    navMenu.classList.remove('opacity-0');
                    navMenu.classList.add('opacity-100');
                    navToggle.setAttribute('aria-expanded', 'true');
                });
            } else {
                navMenu.classList.remove('opacity-100');
                navMenu.classList.add('opacity-0');
                navToggle.setAttribute('aria-expanded', 'false');
                setTimeout(() => {
                    navMenu.classList.add('hidden');
                }, 300);
            }
        };
        
        // Event delegation for nav links
        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && window.innerWidth < DESKTOP_BREAKPOINT) {
                toggleMenu();
            }
        });
        
        // Toggle button click
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth < DESKTOP_BREAKPOINT && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target) &&
                !navMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
        
        // Handle resize with debounce
        const handleResize = debounce(() => {
            if (window.innerWidth >= DESKTOP_BREAKPOINT) {
                navMenu.classList.remove('hidden', 'opacity-0');
                navMenu.classList.add('opacity-100');
                navToggle.setAttribute('aria-expanded', 'false');
            } else {
                if (navToggle.getAttribute('aria-expanded') === 'false') {
                    navMenu.classList.add('hidden', 'opacity-0');
                    navMenu.classList.remove('opacity-100');
                }
            }
        }, 150);
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
    }
    
    // Set active nav link based on current page
    function setActiveNavLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initNavigation();
            setActiveNavLink();
        });
    } else {
        initNavigation();
        setActiveNavLink();
    }
})();

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('iot-slider');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('img'));
  const dots = Array.from(document.querySelectorAll('[data-slide]'));
  let current = 0;

  function showSlide(index) {
    slides.forEach((img, i) => {
      img.style.opacity = i === index ? '1' : '0';
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-emerald-500', i === index);
      dot.classList.toggle('bg-slate-500', i !== index);
    });
    current = index;
  }

  // Auto-play
  setInterval(() => {
    const next = (current + 1) % slides.length;
    showSlide(next);
  }, 5000);

  // Clic sur les indicateurs
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = Number(dot.getAttribute('data-slide'));
      showSlide(index);
    });
  });

  showSlide(0);
});
//Bouton pour remonter
document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    if (scrolled > 300) {
      backToTop.classList.remove('hidden');
      backToTop.classList.add('opacity-100');
    } else {
      backToTop.classList.add('hidden');
      backToTop.classList.remove('opacity-100');
    }
  });

  // Clic → remonter en haut
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // supporté nativement par les navigateurs modernes[web:92]
    });
  });
});

