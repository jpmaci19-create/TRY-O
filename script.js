// ===============================
// NAVBAR - HAMBURGER MENU
// ===============================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // Cierra menú al dar clic en un enlace
  document.querySelectorAll("#nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
}

// ===============================
// CONTACT POPUP (MODAL)
// ===============================
const contactBtn = document.getElementById("contact-btn");
const contactModal = document.getElementById("contact-modal");
const closeModal = document.getElementById("close-modal");

if (contactBtn && contactModal && closeModal) {
  // Abrir modal
  contactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    contactModal.style.display = "block";
  });

  // Cerrar modal
  closeModal.addEventListener("click", () => {
    contactModal.style.display = "none";
  });

  // Cerrar modal clicando fuera del contenido
  window.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.style.display = "none";
    }
  });
}

// ===============================
// SCROLL ANIMATIONS
// ===============================
const fadeElements = document.querySelectorAll(".fade-up");

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => {
  appearOnScroll.observe(el);
});

// ===============================
// SMOOTH SCROLL (opcional)
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});
