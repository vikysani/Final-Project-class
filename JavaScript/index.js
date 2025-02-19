"use strict";

window.onload = function () {
  window.scrollTo(0, 0);
};

// Función para determinar la ruta correcta
function getRelativePath(file) {
  const depth = window.location.pathname.split("/").length - 1;
  return depth > 1 ? `../html/${file}` : `html/${file}`;
}

// NAVBAR & FOOTER
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar", "navbar.html", setupNavigation);
  loadComponent("footer-container", "footer.html");
});

// components (Navbar & Footer)
function loadComponent(containerId, filePath, callback) {
  fetch(getRelativePath(filePath))
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(containerId).innerHTML = data;
      if (callback) callback(); //
    })
    .catch((error) => console.error(`Error al cargar ${filePath}:`, error));
}

// After upload navbar
function setupNavigation() {
  // hamburguesa
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenu = document.getElementById("close-menu");

  if (hamburgerBtn && mobileMenu && closeMenu) {
    hamburgerBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("-translate-x-full");
    });

    closeMenu.addEventListener("click", () => {
      mobileMenu.classList.add("-translate-x-full");
    });
  }

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
}

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

//* API *//
import { getDishPairing, getWinePairing, getWineDescription } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button").addEventListener("click", searchPairings);
});

async function searchPairings() {
  const searchInput = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const resultsContainer = document.querySelector(".results-container");

  if (!searchInput) {
    resultsContainer.innerHTML =
      "<p class='text-red-500'>Please enter a food or wine!</p>";
    return;
  }

  resultsContainer.innerHTML = "<p class='text-gray-500'>Searching...</p>";

  const formattedQuery = searchInput.replace(/ /g, "_");
  const isWine = wineList.has(formattedQuery);

  console.log("🔍 Buscando:", formattedQuery);
  console.log("🍷 Es un vino?:", isWine);

  try {
    let data = null;
    let dishData = null;
    let wineDescription = null;

    if (isWine) {
      dishData = await getDishPairing(formattedQuery);
      wineDescription = await getWineDescription(formattedQuery);
    } else {
      data = await getWinePairing(formattedQuery);
    }

    if (!data && !dishData && !wineDescription) {
      resultsContainer.innerHTML =
        "<p class='text-red-500'>No results found. Try another search!</p>";
      return;
    }

    let output = "";

    if (wineDescription?.wineDescription) {
      output += `<div class="bg-gray-100 p-6 rounded-lg mb-6">
        <p class="text-[16px] font-medium text-gray-800 whitespace-pre-line">${data.pairingText}</p>
      </div>`;
    }

    resultsContainer.innerHTML = output;
  } catch (error) {
    console.error("❌ Error fetching wine pairing:", error);
    resultsContainer.innerHTML =
      "<p class='text-red-500'>Error fetching results. Please try again.</p>";
  }
}

window.searchPairings = searchPairings;
export { searchPairings };

//** Landing page signup form (Slider) **//
document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  const slider = document.getElementById("slider");

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slider.children.length;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  setInterval(nextSlide, 3000);
});
