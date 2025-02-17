"use strict";

window.onload = function () {
  window.scrollTo(0, 0);
};

// Navbar
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;
  })
  .catch((error) => console.error("Error loading navbar:", error));

// Nav + open quiz + urls

// Load Navbar and handle open-quiz
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    // Ensure the navbar is fully loaded before adding the event listener
    setTimeout(() => {
      let quizButton = document.getElementById("open-quiz");
      if (quizButton) {
        console.log("✅ Button #open-quiz found! Adding event listener...");
        quizButton.addEventListener("click", function () {
          console.log("🟢 Redirecting to: wineform.html");
          window.location.href = "wineform.html";
        });
      } else {
        console.error("❌ Button #open-quiz NOT found!");
      }
    }, 100);
  })
  .catch((error) => console.error("Error loading the navbar:", error));

// Function to add event listeners for navigation
function setupNavigation() {
  setTimeout(() => {
    // Pair Wine Variety
    let pairWineVariety = document.getElementById("pair-wine-variety");
    if (pairWineVariety) {
      pairWineVariety.addEventListener("click", function () {
        console.log("🍷 Redirecting to: search_wine.html");
        window.location.href = "search_wine.html";
      });
    }

    // Pair Wine Food
    let pairWineFood = document.getElementById("pair-wine-food");
    if (pairWineFood) {
      pairWineFood.addEventListener("click", function () {
        console.log("🥩 Redirecting to: search_wine.html");
        window.location.href = "search_wine.html";
      });
    }

    // Pair Beer Variety
    let pairBeerVariety = document.getElementById("pair-beer-variety");
    if (pairBeerVariety) {
      pairBeerVariety.addEventListener("click", function () {
        console.log("🍺 Redirecting to: search_beer.html");
        window.location.href = "search_beer.html";
      });
    }

    // Pair Beer Food
    let pairBeerFood = document.getElementById("pair-beer-food");
    if (pairBeerFood) {
      pairBeerFood.addEventListener("click", function () {
        console.log("🍔 Redirecting to: search_beer.html");
        window.location.href = "search_beer.html";
      });
    }
  }, 100);
}

// call function to add event listeners for navigation
document.addEventListener("DOMContentLoaded", setupNavigation);

//NAV hamburguesa
const toggleMenu = (element, className) => element.classList.toggle(className);
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenu = document.getElementById("close-menu");

  hamburgerBtn?.addEventListener("click", () =>
    toggleMenu(mobileMenu, "-translate-x-full")
  );
  closeMenu?.addEventListener("click", () =>
    mobileMenu.classList.add("-translate-x-full")
  );
});

// Footer
document.addEventListener("DOMContentLoaded", () => {
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    })
    .catch((error) => console.error("Error al cargar el footer:", error));
});

//Hearts
document.addEventListener("DOMContentLoaded", () => {
  const hearts = document.querySelectorAll(".heart");
  hearts.forEach((heart, index) => {
    setTimeout(() => {
      heart.classList.add("visible");
      heart.style.zIndex = 5;
    }, index * 500);
  });
});

//**Modal**//
// Modal handling
document.addEventListener("DOMContentLoaded", function () {
  const contactModal = document.getElementById("contactModal");
  const successModal = document.getElementById("successModal");

  // Open contact modal
  document.addEventListener("click", function (event) {
    if (event.target.id === "openModal") {
      document.getElementById("contactModal").classList.remove("hidden");
    }

    // Close contact modal
    if (event.target.id === "closeContactModal") {
      document.getElementById("contactModal").classList.add("hidden");
    }

    // Close success modal
    if (event.target.id === "closeSuccessModal") {
      document.getElementById("successModal").classList.add("hidden");
    }
    // Handle form submission
    document.addEventListener("submit", function (event) {
      if (event.target.id === "contactForm") {
        event.preventDefault();

        // Hide contact modal
        document.getElementById("contactModal").classList.add("hidden");

        // Show success modal
        document.getElementById("successModal").classList.remove("hidden");

        // Reset form
        event.target.reset();
      }
    });

    // Close modals when clicking outside
    const contactModal = document.getElementById("contactModal");
    const successModal = document.getElementById("successModal");

    if (event.target === contactModal) {
      contactModal.classList.add("hidden");
    }
    if (event.target === successModal) {
      successModal.classList.add("hidden");
    }
  });

  // Close modals with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      contactModal.classList.add("hidden");
      successModal.classList.add("hidden");
    }
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

//**API*//
import { getDishPairing, getWinePairing, getWineDescription } from "./api.js";

// Lista de vinos para mejorar la detección
const wineList = new Set([
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
]);

ddocument.addEventListener("DOMContentLoaded", () => {
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

  const isWine = wineList.has(searchInput);

  let data;
  let dishData;
  let wineDescription;

  if (isWine) {
    dishData = await getDishPairing(searchInput);
    wineDescription = await getWineDescription(searchInput); // Obtener descripción del vino
  } else {
    data = await getWinePairing(searchInput);
  }

  if (!data && !dishData && !wineDescription) {
    resultsContainer.innerHTML =
      "<p class='text-red-500'>No results found. Try another search!</p>";
    return;
  }

  let output = "";

  if (wineDescription && wineDescription.wineDescription) {
    output += `<p class="text-lg font-semibold text-blue-600">${wineDescription.wineDescription}</p>`;
  }

  if (data && data.pairingText) {
    output += `<p class="text-lg font-semibold">${data.pairingText}</p>`;
  }

  if (dishData?.pairings?.length > 0) {
    output += `<h3 class="text-xl font-semibold mt-4">Dishes that go well with this wine:</h3>`;
    output += `<ul class="list-disc pl-6">`;
    dishData.pairings.forEach((dish) => {
      output += `<li class="text-purple-600">${dish}</li>`;
    });
    output += `</ul>`;
  }

  if (data?.productMatches?.length > 0) {
    output += `<h3 class="text-xl font-semibold mt-4">Recommended Wine:</h3>`;
    data.productMatches.forEach((product) => {
      const priceEUR = parseFloat(product.price.replace("$", "")) * 0.92;
      output += `
                <div class="flex items-center gap-4 mt-4 p-4 border rounded-lg shadow">
                    <img src="${product.imageUrl}" alt="${
        product.title
      }" class="w-24 h-24 rounded">
                    <div>
                        <h4 class="text-lg font-semibold">${
                          product.title
                        } - <span class="text-green-600">€${priceEUR.toFixed(
        2
      )}</span></h4>
                        <p class="text-gray-700">${product.description}</p>
                        <a href="${
                          product.link
                        }" target="_blank" class="text-blue-500 underline">Buy Here</a>
                    </div>
                </div>
            `;
    });
  }

  resultsContainer.innerHTML = output;
}

// Permite que el botón llame a la función
window.searchPairings = searchPairings;
