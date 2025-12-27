console.log('main.js chargé');

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initIotSlider();
  initBackToTop();
  initScrollReveal();
});

/* ========== MENU HAMBURGER ========== */
function initHamburgerMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!navToggle || !navMenu) return;

  const toggleMenu = () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    const nextState = !expanded;

    navToggle.setAttribute('aria-expanded', String(nextState));
    navMenu.classList.toggle('hidden', !nextState);
    document.body.classList.toggle('overflow-hidden', nextState);
  };

  navToggle.addEventListener('click', toggleMenu);

  // Fermeture sur Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      toggleMenu();
      navToggle.focus();
    }
  });

  // Fermeture en cliquant sur un lien du menu
  navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && navToggle.getAttribute('aria-expanded') === 'true') {
      toggleMenu();
    }
  });
}

/* ========== SLIDER IOT (INDEX SEULEMENT) ========== */
function initIotSlider() {
  const slider = document.getElementById('iot-slider');
  if (!slider) return; // rien à faire sur les autres pages

  const slides = Array.from(slider.querySelectorAll('img'));
  const dots = Array.from(document.querySelectorAll('[data-slide]'));
  if (slides.length === 0 || dots.length === 0) return;

  let current = 0;
  let intervalId;

  function showSlide(index) {
    slides.forEach((img, i) => {
      img.style.opacity = i === index ? '1' : '0';
      img.style.transition = 'opacity 500ms ease';
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-emerald-500', i === index);
      dot.classList.toggle('bg-slate-500', i !== index);
    });
    current = index;
  }

  function startAuto() {
    stopAuto(); // sécurité
    intervalId = setInterval(() => {
      const next = (current + 1) % slides.length;
      showSlide(next);
    }, 5000);
  }

  function stopAuto() {
    if (intervalId) clearInterval(intervalId);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = Number(dot.getAttribute('data-slide'));
      if (!Number.isNaN(index)) {
        showSlide(index);
      }
    });
  });

  // Pause au survol du slider
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  showSlide(0);
  startAuto();
}

/* ========== BOUTON RETOUR EN HAUT ========== */
function initBackToTop() {
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    if (scrolled > 200) {
      backToTop.classList.remove('hidden');
      backToTop.classList.add('opacity-100');
    } else {
      backToTop.classList.add('hidden');
      backToTop.classList.remove('opacity-100');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ========== RÉVÉLATION AU SCROLL (ANIMATIONS DOUCES) ========== */
/*
  À ajouter dans ton CSS global :

  .reveal-on-scroll{
    opacity:0;
    transform:translateY(20px);
    transition:opacity 0.5s ease, transform 0.5s ease;
  }
  .reveal-on-scroll.in-view{
    opacity:1;
    transform:translateY(0);
  }
*/
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}
