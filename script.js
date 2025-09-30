// ========== NAVBAR TOGGLE (para móvil) ==========
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ========== SCROLL ANIMATIONS ==========
const faders = document.querySelectorAll(".fade-in, .fade-up");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  observer
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    observer.unobserve(entry.target);
  });
},
appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

// ========== FORM VALIDATION ==========
const form = document.getElementById("contact-form");
const feedback = document.querySelector(".form-feedback");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name === "" || email === "" || message === "") {
      feedback.textContent = "Por favor completa todos los campos.";
      feedback.style.color = "red";
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      feedback.textContent = "Ingresa un correo válido.";
      feedback.style.color = "red";
      return;
    }

    // Aquí podrías enviar los datos a un backend o servicio de correo
    feedback.textContent = "¡Gracias! Tu mensaje ha sido enviado.";
    feedback.style.color = "green";
    form.reset();
  });
}
// Tabs de colores con imagen dinámica
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");
  const previewImg = document.getElementById("color-preview");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return; // No hacer nada si está deshabilitado

      // Quitar active de todos
      buttons.forEach(b => b.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      // Activar el seleccionado
      btn.classList.add("active");
      const target = document.getElementById(btn.dataset.color);
      if (target) target.classList.add("active");

      // Cambiar la imagen según el color
      if (btn.dataset.color === "azul") {
        previewImg.src = "images/powerbank-azul.jpg";
        previewImg.alt = "TRY-O Solar Power Bank Azul";
      } else if (btn.dataset.color === "naranja") {
        previewImg.src = "images/powerbank-naranja.jpg";
        previewImg.alt = "TRY-O Solar Power Bank Naranja";
      } else if (btn.dataset.color === "negro") {
        previewImg.src = "images/powerbank-negro.jpg";
        previewImg.alt = "TRY-O Solar Power Bank Negro";
      }
    });
  });
});
