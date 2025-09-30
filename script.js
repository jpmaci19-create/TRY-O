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
