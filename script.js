const header = document.querySelector('.site-header');
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const form = document.getElementById('contact-form');
const feedback = document.querySelector('.form-feedback');
const animatedElements = document.querySelectorAll('[data-animate]');

const revealImmediately = elements => {
  elements.forEach(element => {
    element.classList.add('visible');
  });
};

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  animatedElements.forEach(element => observer.observe(element));
} else {
  revealImmediately(animatedElements);
}

if (header) {
  const updateHeaderState = () => {
    if (window.scrollY > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
}

if (menuToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (window.innerWidth <= 900) {
      navLinks.setAttribute('aria-hidden', 'true');
    }
  };

  const syncMenuAccessibility = () => {
    if (window.innerWidth > 900) {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      navLinks.removeAttribute('aria-hidden');
    } else {
      navLinks.setAttribute('aria-hidden', String(!menuToggle.classList.contains('open')));
    }
  };

  menuToggle.setAttribute('aria-expanded', 'false');
  syncMenuAccessibility();

  menuToggle.addEventListener('click', () => {
    const willOpen = !menuToggle.classList.contains('open');

    if (willOpen) {
      menuToggle.classList.add('open');
      navLinks.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
      navLinks.setAttribute('aria-hidden', 'false');
    } else {
      closeMenu();
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', syncMenuAccessibility);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.classList.contains('open')) {
      closeMenu();
    }
  });
}

if (form && feedback) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      feedback.textContent = 'Por favor completa todos los campos.';
      feedback.style.color = '#ff3b30';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      feedback.textContent = 'Ingresa un email válido.';
      feedback.style.color = '#ff3b30';
      return;
    }

    feedback.textContent = '¡Mensaje enviado! Te contactaremos pronto.';
    feedback.style.color = '#1aa260';
    form.reset();
  });
}
