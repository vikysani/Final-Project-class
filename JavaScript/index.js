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

// Nav + open quiz  Images
document.addEventListener("DOMContentLoaded", function () {
  const imageContainer = document.querySelector(
    ".flex.flex-wrap.gap-4.justify-center.mb-10.mt-10"
  );
  const images = Array.from(imageContainer.children);

  // unorganized images
  function shuffleImages(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleImages(images); // Desordenar imágenes

  // Vaciar el contenedor y volver a insertar las imágenes en el nuevo orden
  imageContainer.innerHTML = "";
  images.forEach((img) => imageContainer.appendChild(img));
});

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

//* API *//

import { getDishPairing, getWinePairing, getWineDescription } from "./api.js";

// Lista de vinos en formato consistente (todo en lowercase con "_")
const wineList = new Set([
  "assyrtiko",
  "pinot_blanc",
  "cortese",
  "roussanne",
  "moschofilero",
  "muscadet",
  "viognier",
  "verdicchio",
  "greco",
  "marsanne",
  "white_burgundy",
  "chardonnay",
  "gruener_veltliner",
  "white_rioja",
  "frascati",
  "gavi",
  "trebbiano",
  "sauvignon_blanc",
  "catarratto",
  "albarino",
  "arneis",
  "verdejo",
  "vermentino",
  "soave",
  "pinot_grigio",
  "dry_riesling",
  "torrontes",
  "gewurztraminer",
  "chenin_blanc",
  "white_bordeaux",
  "semillon",
  "riesling",
  "sauternes",
  "petite_sirah",
  "zweigelt",
  "baco_noir",
  "bonarda",
  "cabernet_franc",
  "barbera_wine",
  "primitivo",
  "pinot_noir",
  "nebbiolo",
  "dolcetto",
  "tannat",
  "negroamaro",
  "red_burgundy",
  "rioja",
  "cotes_du_rhone",
  "grenache",
  "malbec",
  "zinfandel",
  "sangiovese",
  "carignan",
  "carmenere",
  "cesanese",
  "cabernet_sauvignon",
  "aglianico",
  "tempranillo",
  "shiraz",
  "mourvedre",
  "merlot",
  "nero_d_avola",
  "bordeaux",
  "port",
  "gamay",
  "dornfelder",
  "concord_wine",
  "sparkling_red_wine",
  "pinotage",
  "agiorgitiko",
  "moscato",
  "late_harvest",
  "ice_wine",
  "white_port",
  "madeira",
  "vin_santo",
  "champagne",
  "prosecco",
  "spumante",
  "sparkling_rose",
  "sherry",
  "dry_vermouth",
  "fruit_wine",
  "mead",
]);

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

      console.log("🍽️ Dish Pairing (Platos sugeridos):", dishData);
      console.log("📖 Wine Description:", wineDescription);
    } else {
      data = await getWinePairing(formattedQuery);
      console.log("🍷 Wine Pairing (Maridaje con vino):", data);
    }

    if (!data && !dishData && !wineDescription) {
      resultsContainer.innerHTML =
        "<p class='text-red-500'>No results found. Try another search!</p>";
      return;
    }

    let output = "";

    if (wineDescription?.wineDescription) {
      output += `
  <div class="bg-gray-100  p-6 rounded-lg shadow-[#E4F1F9] mb-6">
      <p class="text-[16px] font-weight: 500 text-[#333333] ">${wineDescription.wineDescription}</p>
    </div>`;
    }

    if (data?.pairingText) {
      output += `
    <div class="bg-gray-100 p-6 rounded-lg  box-shadow ] mb-6">
      <p class="text-[16px] font-weight: 500 text-gray-800">${data.pairingText}</p>
    </div>`;
    }

    if (dishData?.pairings?.length > 0) {
      output += `
    <div class="bg-gray-100 p-6 rounded-l box-shadow  mb-6">
      <h3 class="text-[16px] font-weight:500 text-[#333333]">Dishes that pair well with this wine:</h3>
      <ul class="list-disc pl-6 mt-2">`;
      dishData.pairings.forEach((dish) => {
        output += `<li class="text-gray-700">${dish}</li>`;
      });
      output += `</ul></div>`;
    }

    if (data?.productMatches?.length > 0) {
      output += `<div class="mt-6 flex flex-col space-y-6">`;
      data.productMatches.forEach((product) => {
        const priceEUR = parseFloat(product.price.replace("$", "")) * 0.92;
        output += `
      <div class="bg-gray-100  p-6  box-shadow  flex items-center space-x-6">
        <img src="${product.imageUrl}" alt="${
          product.title
        }" class="w-40 h-40 object-cover rounded-lg">

       <div class="flex flex-col">
          <h4 class="text-[16px] font-semibold text-gray-900">${
            product.title
          }</h4>
          <p class="text-green-600 text-[14px] font-semibold text-xl">€${priceEUR.toFixed(
            2
          )}</p>
          <p class="text-gray-600 text-[14px] mt-2 max-w-lg">${
            product.description
          }</p>
          <a href="${
            product.link
          }" target="_blank" class="mt-4 text-purple-600 font-medium underline">Buy Here</a>
        </div>
      </div>`;
      });
      output += `</div>`;
    }

    resultsContainer.innerHTML = output;
  } catch (error) {
    console.error("❌ Error fetching wine pairing:", error);
    resultsContainer.innerHTML =
      "<p class='text-red-500'>Error fetching results. Please try again.</p>";
  }
}

// Permite que el botón llame a la función
window.searchPairings = searchPairings;
export { searchPairings };
