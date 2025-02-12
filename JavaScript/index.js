"use strict";

// Navbar
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;
  })
  .catch((error) => console.error("Error al cargar el navbar:", error));

//NAV hanburguesa

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
document.getElementById("openModal").addEventListener("click", function () {
  document.getElementById("modal").classList.remove("hidden");
});

document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("modal").classList.add("hidden");
});

//Form
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ JavaScript is running!");

  // Load Navbar
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;

      // Wait a bit to make sure navbar is inserted
      setTimeout(() => {
        let quizButton = document.getElementById("open-quiz");
        if (quizButton) {
          console.log("✅ Button #open-quiz found! Adding event listener...");
          quizButton.addEventListener("click", function () {
            console.log("🟢 Redirecting to: HTML/wineform.html");
            window.location.href = "wineform.html";
          });
        } else {
          console.error("❌ Button #open-quiz NOT found!");
        }
      }, 100);
    })
    .catch((error) => console.error("Error loading the navbar:", error));

  // ❗ Hide all questions except the first one initially
  document.querySelectorAll(".question").forEach((q, index) => {
    if (index !== 0) q.classList.add("hidden");
  });

  // ✅ Wine selection logic (max 2)
  document.querySelectorAll(".wine-option").forEach((option) => {
    option.addEventListener("click", function () {
      console.log("✅ Click detected on a wine option!");

      if (this.classList.contains("selected")) {
        // Unselect if already selected
        this.classList.remove("selected");
      } else {
        let selected = document.querySelectorAll(".wine-option.selected");
        if (selected.length < 2) {
          this.classList.add("selected");
        } else {
          console.warn("⚠️ Maximum of 2 selections allowed.");
        }
      }

      // Move to next question if at least 1 wine is selected
      let selected = document.querySelectorAll(".wine-option.selected");
      if (selected.length > 0) {
        setTimeout(() => {
          document.getElementById("question1").classList.add("hidden");
          document.getElementById("question2").classList.remove("hidden");
        }, 500);
      }

      console.log("Classes after click:", this.classList);
    });
  });

  // ✅ Next button logic with validation
  document.querySelectorAll(".next-btn").forEach((button) => {
    button.addEventListener("click", function () {
      let parentQuestion = this.closest(".question");
      let next = document.getElementById(this.dataset.next);

      let selected = parentQuestion.querySelectorAll(".selected");

      if (selected.length === 0) {
        if (!parentQuestion.querySelector(".warning-message")) {
          let warning = document.createElement("p");
          warning.textContent = "Please select at least one option!";
          warning.classList.add("warning-message", "text-red-500", "mt-2");
          parentQuestion.appendChild(warning);
        }
        return;
      }

      // Hide current question & show next
      parentQuestion.classList.add("hidden");
      next.classList.remove("hidden");
    });
  });

  // ✅ Single selection for drink, flavor, and food options
  document
    .querySelectorAll(".drink-option, .flavor-option, .food-option")
    .forEach((button) => {
      button.addEventListener("click", function () {
        let siblings = this.parentElement.children;
        Array.from(siblings).forEach((sibling) =>
          sibling.classList.remove("selected")
        );
        this.classList.add("selected");
      });
    });

  // ✅ Show final recommendation
  function showRecommendation() {
    let selectedWine = document.querySelector(".wine-option.selected");
    let selectedDrink = document.querySelector(".drink-option.selected");
    let selectedFlavor = document.querySelector(".flavor-option.selected");
    let selectedFood = document.querySelector(".food-option.selected");

    if (selectedWine && selectedDrink && selectedFlavor && selectedFood) {
      document.getElementById("question3").classList.add("hidden");
      document.getElementById("recommendation").classList.remove("hidden");
      document.getElementById(
        "result-text"
      ).textContent = `We recommend a ${selectedWine.textContent} that is ${selectedDrink.textContent}, with ${selectedFlavor.textContent} notes, paired with ${selectedFood.textContent}.`;
    }
  }

  // ✅ Restart quiz
  function restartQuiz() {
    document
      .querySelectorAll(".selected")
      .forEach((el) => el.classList.remove("selected"));
    document
      .querySelectorAll(".question")
      .forEach((q) => q.classList.add("hidden"));
    document.getElementById("question1").classList.remove("hidden");
  }
});
