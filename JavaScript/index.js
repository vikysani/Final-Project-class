"use strict";

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
document.getElementById("openModal").addEventListener("click", function () {
  document.getElementById("modal").classList.remove("hidden");
});

document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("modal").classList.add("hidden");
});

//**Forms Wine pair**//
document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 1;
  const totalSteps = 3;

  const stepContent = document.getElementById("step-content");
  const stepIndicator = document.getElementById("step-indicator");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  function updateStepContent() {
    stepContent.innerHTML = renderStepContent(currentStep);
    updateStepIndicator();
  }

  function updateStepIndicator() {
    stepIndicator.innerHTML = `Step ${currentStep} of ${totalSteps}`;
  }

  function renderStepContent(step) {
    switch (step) {
      case 1:
        return `
          <h2>Wine Preferences</h2>
          <p>What kind of wine do you prefer?</p>
          <div class="options">
            <button><img src="/images/red_wine.jpg" alt="Red Wine"><p>Red Wine</p></button>
            <button><img src="/images/white_wine.jpg" alt="White Wine"><p>White Wine</p></button>
            <button><img src="/images/rose_wine.jpg" alt="Rosé Wine"><p>Rosé Wine</p></button>
            <button><img src="/images/sparkling-wine.jpg" alt="Sparkling Wine"><p>Sparkling Wine</p></button>
          </div>
        `;
      case 2:
        return `
          <h2>Taste Profile</h2>
          <p>Do you like your drink to be sweet or dry?</p>
          <div class="options">
            <button>Sweet</button>
            <button>Semi-Sweet</button>
            <button>Balanced</button>
            <button>Dry</button>
          </div>
          <p>What flavors do you enjoy the most?</p>
          <div class="options">
            <button>Fruity</button>
            <button>Floral</button>
            <button>Earthy</button>
            <button>Nutty</button>
          </div>
        `;
      case 3:
        return `
          <h2>Food Pairing</h2>
          <p>What type of food are you planning to pair it with?</p>
          <div class="options">
            <button><img src="/images/steak.jpg" alt="Steak"><p>Steaks, roasts, or grilled meats</p></button>
            <button><img src="/images/seafood.jpg" alt="Fish"><p>Fish, shellfish, and light seafood dishe/p></button>
            <button><img src="/images/pasta.jpg" alt="Pasta"><p>Saucy, creamy, or cheese-based pasta dishes.</p></button>
            <button><img src="/images/cheesse.jpg" alt="Cheese"><p>Soft cheeses, hard cheeses, or cheese platters</p></button>
            <button><img src="/images/desserts.jpg" alt="Cheese"><p>Dessert – Chocolate, fruit, or rich pastries.</p></button>
             <button><img src="/images/red_bottlle.jpg" alt="Cheese"><p>None (Just the drink!)</p></button>
              
          </div>
        `;
      default:
        return "";
    }
  }

  prevButton.addEventListener("click", function () {
    if (currentStep > 1) {
      currentStep--;
      updateStepContent();
    }
  });

  nextButton.addEventListener("click", function () {
    if (currentStep < totalSteps) {
      currentStep++;
      updateStepContent();
    } else {
      alert("Form submitted!");
    }
  });

  updateStepContent();
});

//** connect the form **//
document.addEventListener("DOMContentLoaded", function () {
  const quizLink = document.querySelector(
    'a[href="#"][class*="hover:text-yellow-500"]'
  );
  const formContainer = document.getElementById("form-container"); // Contenedor del formulario
  const closeButton = document.getElementById("close-form"); // Botón para cerrar el formulario

  quizLink.addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el enlace navegue a otro lugar
    formContainer.style.display = "block"; // Muestra el formulario
  });

  closeButton.addEventListener("click", function () {
    formContainer.style.display = "none"; // Oculta el formulario
  });
});
