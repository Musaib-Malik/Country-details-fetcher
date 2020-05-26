// UI Variables
const form = document.querySelector(".form");
const countryName = document.getElementById("countryName");
const result = document.querySelector(".output");
const submitBtn = document.querySelector("#submitBtn");
const spinner = document.querySelector("#spinner");

// Event Listener
form.addEventListener("submit", fetchData);
form.addEventListener("submit", clearValue);

// Fetch Data
async function fetchData(e) {
  e.preventDefault();

  // Fetch / Reset Event
  if (submitBtn.value === "Reset") {
    window.location.reload();
  } else {
    // Form Validation
    if (countryName.value === "") {
      showAlert("Please Fill in the field!");
    } else {
      showSpinner();
      // Fetch from external API
      const response = await fetch(
        `https://restcountries.eu/rest/v2/name/${countryName.value}`
      ).catch((err) => {
        hideSpinner();
        showAlert("Please check your internet connection.");
      });

      // Convert to JSON
      if (response.ok) {
        submitBtn.value = "Reset";

        hideSpinner();
        const data = await response.json();

        let output = "";

        // Iterate over country details
        data.forEach((country) => {
          output += `
        <ul class="list-group ul mt-3">
          <li class="list-group-item">Name: ${country.name}</li>
          <li class="list-group-item">Capital: ${country.capital}</li>
          <li class="list-group-item">Population: ${country.population}</li>
          <li class="list-group-item">TimeZone: ${country.timezones}</li>
        </ul>
        `;

          let languages = ``;

          // Iterate over languages
          country.languages.forEach((language) => {
            if (
              country.languages.length - 1 ===
              country.languages.indexOf(language)
            ) {
              languages += `${language.name}.`;
            } else {
              languages += `${language.name}, `;
            }
          });

          // Append the languages
          output += `<li class="list-group-item">Language: ${languages}</li>`;
        });

        // Display the result
        result.innerHTML = output;
      } else {
        spinnerTimeout();
        showAlert("Please check the country name!");
        countryName.value = "";
      }
    }
  }
}

// Clear Value
function clearValue() {
  countryName.value = "";
}

// Alert Function
function showAlert(message) {
  const errorDiv = document.createElement("div");

  errorDiv.className = "alert alert-danger";

  errorDiv.appendChild(document.createTextNode(message));

  const container = document.querySelector(".content");

  const headerTitle = document.querySelector("#header-title");

  headerTitle.insertAdjacentElement("afterend", errorDiv);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 2500);
}

// Show Spinner
function showSpinner() {
  spinner.style.display = "block";
}

// Hide Spinner
function hideSpinner() {
  spinner.style.display = "none";
}

// Spinner Timeout (In case of error while fetching)
function spinnerTimeout() {
  setTimeout(() => {
    spinner.style.display = "none";
  }, 1000);

  setInterval(() => {
    document.querySelector(".alert-danger");
  }, 1000);
}
