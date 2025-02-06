"use strict";

//Hearts
document.addEventListener("DOMContentLoaded", () => {
  const hearts = document.querySelectorAll(".heart");
  hearts.forEach((heart, index) => {
    setTimeout(() => {
      heart.classList.add("visible");
    }, index * 500);
  });
});

//Modal
document.getElementById("openModal").addEventListener("click", function () {
  document.getElementById("modal").classList.remove("hidden");
});

document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("modal").classList.add("hidden");
});
