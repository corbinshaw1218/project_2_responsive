let phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?/

const stateAbbreviations = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
  'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
  'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
  'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];
let form = null;
let successMsg = null;

function initValidation(formId, successId) {
  form = document.getElementById(formId);
  successMsg = document.getElementById(successId);

  const inputs = document.querySelectorAll("input");
  for (const input of inputs) {
    input.addEventListener("change", inputChanged);
  }
  form.addEventListener("submit", submitForm);
}

function inputChanged(ev) {
  const el = ev.currentTarget;
  validateForm();
  el.classList.add('was-validated');
}

function submitForm(ev) {
  console.log("Submit event triggered"); // Log when the function is called
  let form = ev.currentTarget; // Grab the form element from the event
  console.log("Form element:", form); // Debug the form element

  ev.preventDefault();
  ev.stopPropagation();

  validateForm();

  if (!form.checkValidity()) {
    // Add was validate class to all invalid inputs to show errors on screen
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        input.classList.add('was-validated');
      }
    });
  } else {
    console.log("Form is valid, hiding it."); // Log if form is valid
    console.log("Success Message Element:", successMsg); // Check successMsg
    if (form) {
      form.classList.add('hidden'); // Log any issues here
    } else {
      console.error("Form element is null or undefined when trying to hide it.");
    }
    if (successMsg) {
      successMsg.classList.remove('hidden'); // Log any issues here
    } else {
      console.error("Success message element is null or undefined.");
    }
  }
}

function validateForm() {
  checkRequired("first-name", "First Name is Required");
  checkRequired("last-name", "Last Name is Required");
  checkRequired("address", "Address is Required");
  checkRequired("city", "City is Required");

  if (checkRequired("state", "State is Required")) {
    validateState("state", "Not a valid State, enter two-letter code e.g., UT");
  }

  if (checkRequired("email", "Email Address is required")) {
    checkFormat("email", "Invalid email format", emailRegex);
  }

  if (checkRequired("zip", "Zip Code is Required")) {
    checkFormat("zip", "Malformed ZIP code. Use ##### or #####-#### format.", zipCodeRegex);
  }

  if (checkRequired("phone", "Phone is Required")) {
    checkFormat("phone", "Invalid phone format", phoneRegex);
  }

  checkRequired("referrer", "You must select at least one!");
}

function validateState(id, msg) {
  const el = document.getElementById(id);
  const value = el.value.toUpperCase(); // Corrected typo
  const valid = stateAbbreviations.includes(value);
  setElementValidity(id, valid, msg);
}

function checkFormat(id, msg, regex) {
  const el = document.getElementById(id);
  const value = el.value.trim(); // Corrected typo
  const valid = regex.test(value);
  setElementValidity(id, valid, msg);
  return valid;
}

function checkRequired(id, message) {
  let el = document.getElementById(id);

  // If no single element with the `id`, handle radio group by `name`
  if (!el) {
    let group = document.getElementsByName(id); // Use `id` as the name
    if (group.length > 0) {
      let valid = Array.from(group).some(input => input.checked);
      if (!valid) {
        console.error(`Validation failed for radio group "${id}".`);
      }
      setRadioGroupValidity(id, valid, message);
      return valid;
    }

    console.error(`Element with ID or Name "${id}" not found.`);
    return false;
  }

  // For single elements
  let valid = el.value.trim() !== ''; // Valid if there's text
  setElementValidity(id, valid, message);
  return valid;
}

// New function to handle radio group validity
function setRadioGroupValidity(name, valid, message) {
  let group = document.getElementsByName(name);
  let errorDiv = document.getElementById(`${name}-error`);

  if (valid) {
    group.forEach(el => el.classList.remove('is-invalid'));
    if (errorDiv) errorDiv.textContent = ''; // Clear error message
  } else {
    group.forEach(el => el.classList.add('is-invalid'));
    if (errorDiv) errorDiv.textContent = message; // Show error message
  }
}

function setElementValidity(id, valid, message) {
  let el = document.getElementById(id);
  console.log("Setting validity for:", id, el); // Debugging line
  let errorDiv = document.getElementById(`${id}-error`);

  if (!el) {
    console.error(`Element with ID "${id}" not found in setElementValidity.`);
    return;
  }
  if (valid) {
    el.setCustomValidity('');
    el.classList.remove('is-invalid');
    el.classList.add('is-valid');
    if (errorDiv) errorDiv.textContent = ''; // Clear error message
  } else {
    el.setCustomValidity(message);
    el.classList.remove('is-valid');
    el.classList.add('is-invalid');
    if (errorDiv) errorDiv.textContent = message; // Show error message
  }
}