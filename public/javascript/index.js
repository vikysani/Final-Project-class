"use strict";

//** Hearts */
document.addEventListener("DOMContentLoaded", () => {
  console.log("index.js  Hearts cargado correctamente");

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
  console.log("JavaScript Modal- Contacto funcionando!");

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

  setInterval(nextSlide, 2700);
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
    );

    // Algoritmo de Fisher-Yates
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }

    //
    images.forEach((img) => container.appendChild(img));
  }

  shuffleImages(); // Llamar a la función al cargar la página
});

//**Clean forms radio option */
window.addEventListener("load", function () {
  const radios = document.querySelectorAll('form input[type="radio"]');
  radios.forEach((radio) => {
    radio.checked = false; // Desmarca cada radio button
  });
});

//**enter search*//
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.querySelector("button");

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita que el formulario se envíe si está dentro de un <form>
      searchPairings();
    }
  });

  searchButton.addEventListener("click", searchPairings);
});

//** API  */
const API_KEY = "d34a1508516d4dea8096536a3dff0399";
const BASE_URL = "https://api.spoonacular.com/food/wine";

console.log("index.js API loaded");

const validWines = [
  "assyrtiko",
  "pinot blanc",
  "cortese",
  "roussanne",
  "moschofilero",
  "muscadet",
  "viognier",
  "verdicchio",
  "greco",
  "marsanne",
  "white burgundy",
  "chardonnay",
  "gruener veltliner",
  "white rioja",
  "frascati",
  "gavi",
  "trebbiano",
  "sauvignon blanc",
  "catarratto",
  "albarino",
  "arneis",
  "verdejo",
  "vermentino",
  "soave",
  "pinot grigio",
  "dry riesling",
  "torrontes",
  "gewurztraminer",
  "chenin blanc",
  "white bordeaux",
  "semillon",
  "riesling",
  "sauternes",
  "petite sirah",
  "zweigelt",
  "baco noir",
  "bonarda",
  "cabernet franc",
  "barbera wine",
  "primitivo",
  "pinot noir",
  "nebbiolo",
  "dolcetto",
  "tannat",
  "negroamaro",
  "red burgundy",
  "rioja",
  "cotes du rhone",
  "grenache",
  "malbec",
  "zinfandel",
  "sangiovese",
  "carignan",
  "carmenere",
  "cesanese",
  "cabernet sauvignon",
  "aglianico",
  "tempranillo",
  "shiraz",
  "mourvedre",
  "merlot",
  "nero d avola",
  "bordeaux",
  "port",
  "gamay",
  "dornfelder",
  "concord wine",
  "sparkling red wine",
  "pinotage",
  "agiorgitiko",
  "moscato",
  "late harvest",
  "ice wine",
  "white port",
  "madeira",
  "vin santo",
  "champagne",
  "prosecco",
  "spumante",
  "sparkling rose",
  "sherry",
  "dry vermouth",
  "fruit wine",
  "mead",
];

// Función para formatear el nombre de búsqueda
function formatWineName(name) {
  return name.toLowerCase().replace(/\s+/g, "_");
}

// Función genérica para hacer fetch a la API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("API Error: " + response.statusText);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Endpoints de la API
async function getDishPairing(wine) {
  const url = `${BASE_URL}/dishes?wine=${formatWineName(
    wine
  )}&apiKey=${API_KEY}`;
  return await fetchData(url);
}

async function getWinePairing(food) {
  const url = `${BASE_URL}/pairing?food=${formatWineName(
    food
  )}&apiKey=${API_KEY}`;
  return await fetchData(url);
}

async function getWineDescription(wine) {
  const url = `${BASE_URL}/description?wine=${formatWineName(
    wine
  )}&apiKey=${API_KEY}`;
  return await fetchData(url);
}

async function getWineRecommendation(wine) {
  const url = `${BASE_URL}/recommendation?wine=${formatWineName(
    wine
  )}&number=5&apiKey=${API_KEY}`;
  return await fetchData(url);
}

// **HANDLE SEARCH**
async function handleSearch() {
  const searchInput = document.getElementById("clearInput").value.trim();
  const resultContainer = document.getElementById("result-container");

  console.log("Search input:", searchInput);

  if (!searchInput) {
    alert("Please enter a wine or food.");
    return;
  }

  if (!resultContainer) {
    console.error("Error: Result container not found");
    return;
  }

  resultContainer.innerHTML = `<p class="text-gray-600">Loading results...</p>`;

  const formattedInput = formatWineName(searchInput.toLowerCase());
  const isWine = validWines.some(
    (wine) => formatWineName(wine.toLowerCase()) === formattedInput
  );

  console.log("Is wine:", isWine);

  if (isWine) {
    // --- Buscar información sobre el vino ---
    const [descriptionData, dishPairingData, recommendationData] =
      await Promise.all([
        getWineDescription(searchInput),
        getDishPairing(searchInput),
        getWineRecommendation(searchInput),
      ]);

    console.log({ descriptionData, dishPairingData, recommendationData });

    let resultHTML = `<div class="p-4 bg-white shadow-lg rounded-lg mt-1 mb-2">
      <h2 class="text-xl font-bold text-gray-800">Wine Description</h2>
      <p class="text-gray-600 mt-2">${
        descriptionData?.wineDescription || "No description available."
      }</p>
    </div>`;

    if (dishPairingData?.pairings?.length) {
      resultHTML += `<div class="p-4 bg-gray-100 shadow-md rounded-lg mt-2">
        <h3 class="text-lg font-semibold text-gray-900">Dish Pairing</h3>
        <ul class="list-disc list-inside">${dishPairingData.pairings
          .map((dish) => `<li>${dish}</li>`)
          .join("")}</ul>
      </div>`;
    }

    if (recommendationData?.recommendedWines?.length) {
      resultHTML += `<div class="p-4 bg-white shadow-md rounded-lg mt-2 mb-4>
        <h3 class="text-lg font-semibold text-gray-900">Recommendations</h3>`;
      recommendationData.recommendedWines.slice(0, 3).forEach((wine) => {
        let price = wine.price
          ? `€${(
              parseFloat(wine.price.replace(/[$€]/g, "").trim()) * 0.92
            ).toFixed(2)}`
          : "No price available";
        let link = wine.link
          ? `<p><a href="${wine.link}" target="_blank" class="text-purple-600 underline">Buy here</a></p>`
          : "";
        resultHTML += `<div class="mb-4"><p>${wine.title} – ${price}</p>${link}</div>`;
      });
      resultHTML += `</div>`;
    }

    resultContainer.innerHTML = resultHTML;
  } else {
    // --- Buscar maridaje para comida ---
    const pairingData = await getWinePairing(searchInput);

    console.log({ pairingData });

    let pairingHTML = `<div class="p-4 bg-white shadow-lg rounded-lg mt-2 mb-2">
      <h2 class="text-xl font-bold text-gray-800">Wine Pairing</h2>
      <p class="text-gray-600 mt-2">${
        pairingData?.pairingText || "No pairing available."
      }</p>
    </div>`;

    if (pairingData?.productMatches?.length) {
      pairingData.productMatches.slice(0, 3).forEach((match) => {
        let price = match.price
          ? `€${(
              parseFloat(match.price.replace(/[$€]/g, "").trim()) * 0.92
            ).toFixed(2)}`
          : "No price available";
        pairingHTML += `<div class="p-4 bg-gray-100 shadow-md rounded-lg mt-2">
          <h3 class="text-lg font-semibold text-gray-900">${match.title}</h3>
          <p class="text-gray-700">${
            match.description || "No description available"
          }</p>
          <p class="font-bold text-indigo-600">Price: ${price}</p>
        </div>`;
      });
    }

    resultContainer.innerHTML = pairingHTML;
  }
}

document.getElementById("searchButton").addEventListener("click", handleSearch);

//* Form beer */
document.addEventListener("DOMContentLoaded", function () {
  const beerSelect = document.getElementById("beer-type");
  beerSelect.selectedIndex = 0; // Siempre vuelve a "Select your beer"
});
