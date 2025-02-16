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

// API Configuration - Users interaction
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button").addEventListener("click", searchPairings);
});

async function searchPairings() {
  const searchInput = document.getElementById("searchInput").value.trim();
  const resultsContainer = document.querySelector(".results-container");

  if (!searchInput) {
    resultsContainer.innerHTML =
      "<p class='text-red-500'>Please enter a food or wine!</p>";
    return;
  }

  resultsContainer.innerHTML = "<p class='text-gray-500'>Searching...</p>";

  let isFood =
    !searchInput.toLowerCase().includes("wine") &&
    !searchInput.toLowerCase().includes("chardonnay") &&
    !searchInput.toLowerCase().includes("merlot");

  let data, dishData, wineDescription;

  if (isFood) {
    data = await getWinePairing(searchInput);
  } else {
    dishData = await getDishPairing(searchInput);
    wineDescription = await getWineDescription(searchInput);
  }

  console.log("API Response:", { data, dishData, wineDescription }); // <-- Debugging log

  if (!data && !dishData && !wineDescription) {
    resultsContainer.innerHTML =
      "<p class='text-red-500'>No pairings found. Try another search!</p>";
    return;
  }

  let output = "";

  if (wineDescription) {
    output += `<p class="text-lg font-semibold">${wineDescription.wineDescription}</p>`;
  }

  if (data?.pairingText) {
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

  if (data?.productMatches && data.productMatches.length > 0) {
    output += `<h3 class="text-xl font-semibold mt-4">Recommended Wine:</h3>`;

    data.productMatches.forEach((product) => {
      const priceUSD = product.price
        ? parseFloat(product.price.replace("$", ""))
        : null;
      const priceEUR = priceUSD ? (priceUSD * 0.92).toFixed(2) : "N/A"; // Conversión de USD a EUR
      let wineImage =
        product.imageUrl || "https://via.placeholder.com/150?text=No+Image";

      output += `
        <div class="flex items-center gap-4 mt-4 p-4 border rounded-lg shadow">
          <img src="${wineImage}" alt="${
        product.title
      }" class="w-24 h-24 rounded">
          <div>
            <h4 class="text-lg font-semibold">${product.title} - 
              <span class="text-green-600">€${priceEUR}</span>
            </h4>
            ${
              product.description
                ? `<p class="text-gray-700">${product.description}</p>`
                : ""
            }
            <a href="${
              product.link
            }" target="_blank" class="text-blue-500 underline">Buy Here</a>
          </div>
        </div>
      `;
    });
  } else if (!wineDescription && !data?.pairingText) {
    // Solo mostramos el mensaje si no hay absolutamente NADA
    output +=
      "<p class='text-red-500'>No wine recommendations found. Try another search!</p>";
  }

  resultsContainer.innerHTML = output;
}
