const navBar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const form = document.getElementById('contact-form');
const feedback = document.querySelector('.form-feedback');
const animatedElements = document.querySelectorAll('.fade-up, .fade-in');

const revealElements = elements => {
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

  animatedElements.forEach(element => {
    observer.observe(element);
  });
} else {
  revealElements(animatedElements);
}

if (navBar) {
  const toggleNavbarState = () => {
    if (window.scrollY > 10) {
      navBar.classList.add('scrolled');
    } else {
      navBar.classList.remove('scrolled');
    }
  };

  toggleNavbarState();
  window.addEventListener('scroll', toggleNavbarState);
}

if (menuToggle && navLinks) {
  menuToggle.setAttribute('aria-expanded', 'false');
  navLinks.setAttribute('aria-hidden', 'true');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open');
    const isOpen = menuToggle.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    navLinks.setAttribute('aria-hidden', String(!isOpen));
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      navLinks.setAttribute('aria-hidden', 'true');
    });
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
