// Add Background Color to the Radio Card when the Radio Button is checked
document
  .querySelectorAll('.radio-card input[type="radio"]')
  .forEach((radio) => {
    radio.addEventListener("change", function () {
      // Remove 'selected' class from all radio cards
      document
        .querySelectorAll(".radio-card")
        .forEach((card) => card.classList.remove("selected"));

      // Add 'selected' class to the parent of the clicked radio button
      this.parentElement.classList.add("selected");
    });
  });

function showToaster() {
  const toaster = document.querySelector(".toaster");
  toaster.style.display = "block";
  setTimeout(() => {
    toaster.style.display = "none";
  }, 3000);
}

// Email validation regex
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Function to add styles to error messages
const addStylesToErrorSpan = (errorSpan) => {
  errorSpan.style.display = "inline";
  errorSpan.style.color = "red";
  errorSpan.style.fontSize = "0.8rem";
  errorSpan.style.paddingTop = "0.5rem";
};

const hideErrorSpan = (errorSpan) => {
  errorSpan.style.display = "none";
};

// Validate individual fields
const validateField = (input) => {
  if (input.type === "radio") {
    validateRadioGroup(input.name);
    return;
  }

  // Get the error span for the input
  const errorSpan = document.getElementById(`${input.id}Error`);

  if (input.type === "checkbox" && !input.checked) {
    errorSpan.textContent =
      "To submit this form, please consent to being contacted";
    addStylesToErrorSpan(errorSpan);
  } else if (input.type === "email" && !validateEmail(input.value)) {
    errorSpan.textContent = "Please enter a valid email address";
    addStylesToErrorSpan(errorSpan);
  } else if (!input.value.trim()) {
    errorSpan.textContent = "This field is required";
    console.log(input);
    input.style.borderColor = "red";
    addStylesToErrorSpan(errorSpan);
  } else {
    hideErrorSpan(errorSpan);
  }
};

// Validate radio button groups
const validateRadioGroup = (name) => {
  const radios = document.querySelectorAll(`input[name="${name}"]`);
  const errorSpan = document.getElementById(`${name}Error`);

  if (![...radios].some((radio) => radio.checked)) {
    errorSpan.textContent = "Please select a query type";
    addStylesToErrorSpan(errorSpan);
  } else {
    hideErrorSpan(errorSpan);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  // Get all input fields
  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(input);
    });
  });

  // Prevent form submission if there are invalid fields
  form.addEventListener("submit", function (event) {
    inputs.forEach((input) => validateField(input));

    // If there's an error message displayed, prevent submission
    const errorMessages = form.querySelectorAll(".error-message");
    for (let errorMessage of errorMessages) {
      if (errorMessage.style.display === "inline") {
        event.preventDefault();
        showToaster();
        break;
      }
    }
  });
});
