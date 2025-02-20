"use strict";

window.onload = function () {
  window.scrollTo(0, 0);
};

// Nav + open quiz Images
const imageContainer = document.querySelector(
  ".flex.flex-wrap.gap-4.justify-center.mb-10.mt-10"
);
const images = Array.from(imageContainer.children);

// Unorganized images
function shuffleImages(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleImages(images); // Desordenar imágenes

imageContainer.innerHTML = "";
images.forEach((img) => imageContainer.appendChild(img));

//** Hearts
document.addEventListener("DOMContentLoaded", () => {
  const hearts = document.querySelectorAll(".heart");
  const heroSection = document.querySelector(".hero");

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        hearts.forEach((heart, index) => {
          setTimeout(() => {
            heart.classList.add("visible");
          }, index * 500);
        });
      } else {
        hearts.forEach((heart) => heart.classList.remove("visible")); // Se ocultan si sale de la vista
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(heroSection);
});

//** Modal */
document.addEventListener("DOMContentLoaded", function () {
  function initializeModal() {
    console.log("Initializing modal...");

    const contactModal = document.getElementById("contactModal");
    const successModal = document.getElementById("successModal");
    const contactForm = document.getElementById("contactForm");

    if (!contactModal || !successModal || !contactForm) {
      console.error("Some modal elements not found!");
      return;
    }

    document.addEventListener("click", function (event) {
      if (event.target.id === "openModal") {
        contactModal.classList.remove("hidden");
      }
      if (event.target.id === "closeContactModal") {
        contactModal.classList.add("hidden");
      }
      if (event.target.id === "closeSuccessModal") {
        successModal.classList.add("hidden");
      }
      if (event.target === contactModal) {
        contactModal.classList.add("hidden");
      }
      if (event.target === successModal) {
        successModal.classList.add("hidden");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        contactModal.classList.add("hidden");
        successModal.classList.add("hidden");
      }
    });

    // ✅ Handle form submission
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevents page reload
      console.log("Form submitted!");

      contactModal.classList.add("hidden"); // Hide contact modal
      successModal.classList.remove("hidden"); // Show success modal

      // Optional: Reset form
      contactForm.reset();
    });
  }

  // Wait for footer to be loaded
  const checkFooter = setInterval(() => {
    if (document.getElementById("contactModal")) {
      clearInterval(checkFooter);
      initializeModal();
    }
  }, 100);
});

//** Search with Enter key **//
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.querySelector("button");

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchPairings();
    }
  });

  searchButton.addEventListener("click", searchPairings);
});

//** landing signup form **//

let currentIndex = 0;
const slider = document.getElementById("slider");
const slides = document.querySelectorAll("#slider img");

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(nextSlide, 3000);

window.searchPairings = searchPairings;
export { searchPairings };

//** Landing page signup form (Slider) **//
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");

  if (slider) {
    let currentIndex = 0;

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slider.children.length;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(nextSlide, 3000);
  } else {
    console.log("🔹 No slider found, skipping slider script.");
  }
});

console.log("✅ index.js se está ejecutando!");
import * as api from "./api.js";
console.log(api);
