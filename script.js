// Add background color to the radio selected
const radioContainer = document.querySelector(".radio-container");
const radioCards = document.querySelectorAll(".radio-card");

radioContainer.addEventListener("click", function (event) {
  const clickedElement = event.target;

  radioCards.forEach((card) => card.classList.remove("selected"));
  clickedElement.parentElement.classList.add("selected");
});

const toaster = document.querySelector(".success-toast");

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
  let isValid = true;
  if (input.type === "radio") {
    return validateRadioGroup();
  }

  // Get the error span for the input
  const errorSpan = document.getElementById(`${input.id}Error`);

  if (input.type === "checkbox" && !input.checked) {
    errorSpan.textContent =
      "To submit this form, please consent to being contacted";
    addStylesToErrorSpan(errorSpan);
    isValid = false;
  } else if (input.type === "email" && !validateEmail(input.value)) {
    input.style.borderColor = "red";
    errorSpan.textContent = "Please enter a valid email address";
    addStylesToErrorSpan(errorSpan);
    isValid = false;
  } else if (!input.value.trim()) {
    errorSpan.textContent = "This field is required";
    input.style.borderColor = "red";
    addStylesToErrorSpan(errorSpan);
    isValid = false;
  } else {
    input.style.borderColor = "hsl(169, 82%, 27%)";
    hideErrorSpan(errorSpan);
  }

  return isValid;
};

// Validate radio button groups
const validateRadioGroup = () => {
  const radios = document.querySelectorAll("input[type=radio]");
  const errorSpan = document.getElementById("queryTypeError");

  let isChecked = false;
  for (let radio of radios) {
    if (radio.checked) {
      isChecked = true;
      break;
    }
  }

  if (!isChecked) {
    addStylesToErrorSpan(errorSpan);
    errorSpan.textContent = "Please select a query type";
  } else {
    hideErrorSpan(errorSpan);
  }

  return isChecked;
};

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  // Get all input fields
  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    // Add an error span after each input field, after focusing out
    input.addEventListener("blur", function () {
      validateField(input);
    });
  });

  // Prevent form submission if there are invalid fields
  form.addEventListener("submit", function (event) {
    let isValid = true;

    inputs.forEach((input) => {
      if (!validateField(input)) {
        console.log("Invalid field", input);
        isValid = false;
      }
    });

    if (!validateRadioGroup()) {
      formIsValid = false;
    }

    if (isValid) {
      event.preventDefault();
      toaster.style.display = "block";

      setTimeout(() => {
        form.reset();
        radioCards.forEach((card) => card.classList.remove("selected"));
        toaster.style.display = "none";
      }, 3000);
    } else {
      event.preventDefault();
    }
  });
});
