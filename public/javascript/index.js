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
  // Selecciona todos los inputs de tipo radio en todos los formularios
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

function formatWineName(name) {
  return name.toLowerCase().replace(/\s+/g, "_");
}

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

// ------------------ Endpoints de la API ------------------
// Dish Pairing for Win
async function getDishPairing(wine) {
  const formattedWine = formatWineName(wine);
  const url = `${BASE_URL}/dishes?wine=${formattedWine}&apiKey=${API_KEY}`;
  return await fetchData(url);
}

// Wine Pairing
async function getWinePairing(food) {
  const formattedFood = formatWineName(food);
  const url = `${BASE_URL}/pairing?food=${formattedFood}&apiKey=${API_KEY}`;
  return await fetchData(url);
}

// Wine Description
async function getWineDescription(wine) {
  const formattedWine = formatWineName(wine);
  const url = `${BASE_URL}/description?wine=${formattedWine}&apiKey=${API_KEY}`;
  return await fetchData(url);
}

// Wine Recommendation
async function getWineRecommendation(wine) {
  const formattedWine = formatWineName(wine);
  const url = `${BASE_URL}/recommendation?wine=${formattedWine}&number=5&apiKey=${API_KEY}`;
  return await fetchData(url);
}

// --- Wine Guide ---

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

// ------------------ handleSearch ------------------
async function handleSearch() {
  const searchInput = document.getElementById("clearInput").value.trim();
  if (!searchInput) {
    alert("Please enter a wine or food.");
    return;
  }

  const formattedInput = formatWineName(searchInput);
  const isWine = validWines
    .map((v) => formatWineName(v))
    .includes(formattedInput);

  if (isWine) {
    // API calls
    const descriptionData = await getWineDescription(searchInput);
    const dishPairingData = await getDishPairing(searchInput);
    const recommendationData = await getWineRecommendation(searchInput);

    // --- Wine Description ---
    const capitalizedWine = searchInput.replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
    const wineDescriptionTitle = `<h3 class="text-lg font-bold mb-2">Wine Description</h3>`;
    const wineDescriptionContent = descriptionData?.wineDescription
      ? `<p><strong>${capitalizedWine}</strong> – ${descriptionData.wineDescription}</p>`
      : "<p>No wine description found.</p>";
    document.getElementById("wineDescription").innerHTML =
      wineDescriptionTitle + wineDescriptionContent;

    // --- Dish Pairing ---
    let pairingHTML = `<h3 class="text-lg font-bold mb-2">Dish Pairing</h3>`;
    if (dishPairingData?.pairings?.length) {
      const dishList = dishPairingData.pairings
        .map((dish) => `<li>${dish}</li>`)
        .join("");
      pairingHTML += `<ul class="list-disc list-inside">${dishList}</ul>`;
    } else {
      pairingHTML += "<p>No dish pairing available for this wine.</p>";
    }
    document.getElementById("foodPairing").innerHTML = pairingHTML;

    // --- Recommendations ---
    const recommendationTitle = `<h3 class="text-lg font-bold mb-2">Recommendation</h3>`;
    if (recommendationData?.recommendedWines?.length) {
      const recommendedWines = recommendationData.recommendedWines.slice(0, 3);
      const winesHTML = recommendedWines
        .map((wine) => {
          let price = wine.price
            ? `€${(
                parseFloat(wine.price.replace(/[$€]/g, "").trim()) * 0.92
              ).toFixed(2)}`
            : "No price available";
          const link = wine.link
            ? `<p><a href="${wine.link}" target="_blank" class="text-purple-600 underline">Buy here</a></p>`
            : "";
          return `<div class="mb-4"><p>${wine.title} – ${price}</p>${link}</div>`;
        })
        .join("");
      document.getElementById("wineRecommendations").innerHTML =
        recommendationTitle + `<div class="text-left">${winesHTML}</div>`;
    } else {
      document.getElementById("wineRecommendations").innerHTML =
        recommendationTitle +
        "<p>No recommendations available for this wine.</p>";
    }
  } else {
    // ---------------- Food Pairing Section ----------------
    const pairingData = await getWinePairing(searchInput);
    const maxWines = 3;

    if (pairingData?.productMatches?.length) {
      const firstWine = pairingData.productMatches[0];
      const wineType = firstWine.title.split(" ").slice(-1)[0];

      document.getElementById(
        "wineDescription"
      ).innerHTML = `<h3 class="text-lg font-bold mb-2">${wineType}</h3>`;
    } else {
      document.getElementById("wineDescription").innerHTML =
        "<h3 class='text-lg font-bold mb-2'>Wine Type</h3><p>No valid wine type available.</p>";
    }

    // --- Wine Pairing ---
    document.getElementById("foodPairing").innerHTML =
      `<h3 class="text-lg font-bold mb-2">Wine Pairing</h3>` +
      (pairingData?.pairingText
        ? `<p>${pairingData.pairingText}</p>`
        : "<p>No pairing available for the food mentioned.</p>");

    // --- Wine Description ---
    document.getElementById("wineDescription").innerHTML +=
      `<h3 class="text-lg font-bold mb-2">Wine Description</h3>` +
      (pairingData?.productMatches?.length
        ? pairingData.productMatches
            .map(
              (match) =>
                `<p><strong>${match.title}</strong>: ${
                  match.description || "No description available"
                }</p>`
            )
            .join("")
        : "<p>No valid description available for the recommended wine.</p>");

    // --- Recommendations ---
    document.getElementById("wineRecommendations").innerHTML =
      `<h3 class="text-lg font-bold mb-2">Recommendation</h3>` +
      (pairingData?.productMatches?.length
        ? pairingData.productMatches
            .slice(0, maxWines)
            .map((match) => {
              let price = match.price
                ? `€${(
                    parseFloat(match.price.replace(/[$€]/g, "").trim()) * 0.92
                  ).toFixed(2)}`
                : "No price available";
              return `<p>${match.title} - ${price}</p>`;
            })
            .join("")
        : "<p>No recommendations available for the food mentioned.</p>");
  }
}

document.getElementById("searchButton").addEventListener("click", handleSearch);
