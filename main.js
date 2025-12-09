console.log('main.js chargé');

// MENU HAMBURGER
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('hidden');
    });
  }
});

// SLIDER IOT (uniquement sur index)
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('iot-slider');
  if (!slider) return; // ne rien faire sur les autres pages

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

  setInterval(() => {
    const next = (current + 1) % slides.length;
    showSlide(next);
  }, 5000);

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = Number(dot.getAttribute('data-slide'));
      showSlide(index);
    });
  });

  showSlide(0);
});

// BOUTON RETOUR EN HAUT
document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) {
    console.log('back-to-top introuvable');
    return;
  }
  console.log('back-to-top trouvé');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    if (scrolled > 200) {           // seuil un peu plus bas pour être sûr de voir le bouton
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
});
