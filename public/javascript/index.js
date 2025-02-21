"use strict";

//** Hearts */
document.addEventListener("DOMContentLoaded", () => {
  console.log("index.js cargado correctamente");

  const image = document.querySelector(".image-slide");
  const hearts = document.querySelectorAll(".heart");

  if (image) {
    image.classList.add("slide-in"); // La imagen se desliza primero
  } else {
    console.error("No image.");
  }

  // 1 by 1
  hearts.forEach((heart, index) => {
    setTimeout(() => {
      heart.classList.add("visible");
    }, index * 500 + 500); // Espaciado de 500ms entre cada uno
  });
});

//** Hamburgen BTN */
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenuBtn = document.getElementById("close-menu");

  // Open Menu
  const openMenu = () => {
    mobileMenu.classList.remove("-translate-x-full");
  };

  // Close menu
  const closeMenu = () => {
    mobileMenu.classList.add("-translate-x-full");
  };

  // events
  hamburgerBtn.addEventListener("click", openMenu);
  closeMenuBtn.addEventListener("click", closeMenu);
});

//** Modal */
document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript funcionando!");

  const contactModal = document.getElementById("contactModal");
  const successModal = document.getElementById("successModal");
  const contactForm = document.getElementById("contactForm");
  const closeContactModal = document.getElementById("closeContactModal");
  const closeSuccessModal = document.getElementById("closeSuccessModal");
  const openModalButton = document.getElementById("openModal"); // "Write to us" button

  // Open in "Write to us"
  if (openModalButton) {
    openModalButton.addEventListener("click", () => {
      contactModal.classList.remove("hidden");
    });
  }

  // Close
  if (closeContactModal) {
    closeContactModal.addEventListener("click", () => {
      contactModal.classList.add("hidden");
    });
  }

  // succes message
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Evita que la página se recargue

      contactModal.classList.add("hidden");

      successModal.classList.remove("hidden");

      contactForm.reset();
    });
  }

  // Close "OK"
  if (closeSuccessModal) {
    closeSuccessModal.addEventListener("click", () => {
      successModal.classList.add("hidden");
    });
  }

  // click outside
  window.addEventListener("click", (event) => {
    if (event.target === contactModal) {
      contactModal.classList.add("hidden");
    }
    if (event.target === successModal) {
      successModal.classList.add("hidden");
    }
  });
});

//** slider signup */
let currentIndex = 0;
const slider = document.getElementById("slider");

if (slider) {
  const slides = document.querySelectorAll("#slider img");

  function nextSlide() {
    if (slides.length > 0) {
      currentIndex = (currentIndex + 1) % slides.length;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    } else {
      console.warn("No images found");
    }
  }

  setInterval(nextSlide, 3000);
} else {
  console.warn("The slider did not find the DOM");
}

//** Shuffle image en wineform */
document.addEventListener("DOMContentLoaded", function () {
  function shuffleImages() {
    const container = document.querySelector(
      ".flex.flex-wrap.gap-4.justify-center.mb-10.mt-10"
    );
    if (!container) return; // Si no se encuentra el contenedor, salir

    const images = Array.from(
      container.querySelectorAll(".wine-img.random-offset")
    ); // Selecciona solo las imágenes correctas

    // Algoritmo de Fisher-Yates para mezclar aleatoriamente el array
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }

    // Vacía el contenedor y vuelve a insertar las imágenes en el nuevo orden
    images.forEach((img) => container.appendChild(img));
  }

  shuffleImages(); // Llamar a la función al cargar la página
});
