"use strict";

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

// API Configuration
const apiKey = "9ee61f63c0f94253beca5a263c72b1dc";
const pageType = window.location.pathname.includes("wine") ? "wine" : "beer";
console.log(`✅ Page type: ${pageType}`);

async function searchPairings() {
  const query = document.getElementById("searchInput")?.value.trim();
  if (!query) return alert("Please enter a wine, beer, or food type");

  const resultsContainer = document.querySelector(".results-container");
  resultsContainer.innerHTML = '<div class="spinner">Loading...</div>';

  // Separate endpoints for wine and beer pairings
  const endpoint =
    pageType === "wine" ? "food/wine/pairing" : "food/beer/recommendation";
  const apiUrl = `https://api.spoonacular.com/${endpoint}?apiKey=${apiKey}&query=${query}`;

  console.log(`ℹ️ Fetching: ${apiUrl}`);

  try {
    const response = await fetch(apiUrl, {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok)
      throw new Error(`API request failed with status ${response.status}`);

    const data = await response.json();
    displayResults(data, query);
  } catch (error) {
    console.error("❌ Fetch error:", error);
    resultsContainer.innerHTML =
      '<p class="error">Failed to retrieve results. Please check the endpoint or CORS policy.</p>';
  }
}

function displayResults(data, query) {
  const resultsContainer = document.querySelector(".results-container");
  resultsContainer.innerHTML = data.pairings?.length
    ? `<h2>Recommended Pairings for "${query}"</h2><ul>${data.pairings
        .map((pair) => `<li>${pair}</li>`)
        .join("")}</ul>`
    : "<p>No pairings found.</p>";
}
