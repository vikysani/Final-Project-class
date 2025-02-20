"use strict";

//** Hearts */
document.addEventListener("DOMContentLoaded", () => {
  console.log("index.js cargado correctamente");

  const image = document.querySelector(".image-slide");
  const hearts = document.querySelectorAll(".heart");

  if (image) {
    image.classList.add("slide-in"); // La imagen se desliza primero
  } else {
    console.error("No se encontró la imagen.");
  }

  // 1 by 1
  hearts.forEach((heart, index) => {
    setTimeout(() => {
      heart.classList.add("visible");
    }, index * 500 + 500); // Espaciado de 500ms entre cada uno
  });
});

//** Modal */
document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript funcionando!");

  // ANIMACIÓN DE CORAZONES (lo que ya tienes)
  const hearts = document.querySelectorAll(".heart");
  let delay = 500;
  hearts.forEach((heart) => {
    setTimeout(() => heart.classList.add("visible"), delay);
    delay += 500;
  });

  // MODALES DE CONTACTO (lo nuevo)
  const contactModal = document.getElementById("contactModal");
  const successModal = document.getElementById("successModal");
  const contactForm = document.getElementById("contactForm");
  const closeContactModal = document.getElementById("closeContactModal");
  const closeSuccessModal = document.getElementById("closeSuccessModal");

  const openContactModal = document.querySelector("[data-open-modal]");
  if (openContactModal) {
    openContactModal.addEventListener("click", () => {
      contactModal.classList.remove("hidden");
    });
  }

  if (closeContactModal) {
    closeContactModal.addEventListener("click", () => {
      contactModal.classList.add("hidden");
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      contactModal.classList.add("hidden");
      successModal.classList.remove("hidden");
      contactForm.reset();
    });
  }

  if (closeSuccessModal) {
    closeSuccessModal.addEventListener("click", () => {
      successModal.classList.add("hidden");
    });
  }

  window.addEventListener("click", (event) => {
    if (event.target === contactModal) {
      contactModal.classList.add("hidden");
    }
    if (event.target === successModal) {
      successModal.classList.add("hidden");
    }
  });
});
