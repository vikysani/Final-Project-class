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

  // Aparecer corazones uno a uno
  hearts.forEach((heart, index) => {
    setTimeout(() => {
      heart.classList.add("visible");
    }, index * 500 + 500); // Espaciado de 500ms entre cada uno
  });
});
