"use strict";

// Navbar
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;
  })
  .catch((error) => console.error("Error loading navbar:", error));

//NAV hamburguesa
// Create a new file called navbar.js

document.addEventListener("DOMContentLoaded", function () {
  // Get the necessary elements
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenu = document.getElementById("close-menu");

  // Toggle menu when hamburger button is clicked
  hamburgerBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("-translate-x-full");
  });

  // Close menu when close button is clicked
  closeMenu.addEventListener("click", function () {
    mobileMenu.classList.add("-translate-x-full");
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInside =
      mobileMenu.contains(event.target) || hamburgerBtn.contains(event.target);

    if (!isClickInside && !mobileMenu.classList.contains("-translate-x-full")) {
      mobileMenu.classList.add("-translate-x-full");
    }
  });
});

// Footer
fetch("HTML/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-container").innerHTML = data;
  })
  .catch((error) => console.error("Error al cargar el footer:", error));

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
  const openModalBtn = document.getElementById("openModal");
  const contactModal = document.getElementById("contactModal");
  const successModal = document.getElementById("successModal");
  const contactForm = document.getElementById("contactForm");
  const closeContactBtn = document.getElementById("closeContactModal");
  const closeSuccessBtn = document.getElementById("closeSuccessModal");

  // Open contact modal
  openModalBtn.addEventListener("click", () => {
    contactModal.classList.remove("hidden");
  });

  // Close contact modal
  closeContactBtn.addEventListener("click", () => {
    contactModal.classList.add("hidden");
  });

  // Close success modal
  closeSuccessBtn.addEventListener("click", () => {
    successModal.classList.add("hidden");
  });

  // Handle form submission
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Hide contact modal
    contactModal.classList.add("hidden");

    // Show success modal
    successModal.classList.remove("hidden");

    // Reset form
    contactForm.reset();
  });

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.classList.add("hidden");
    }
    if (e.target === successModal) {
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

//* Form *//
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ JavaScript is running!");

  // Load Navbar
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
});
