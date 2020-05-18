// UI Variables
const fetchBtn = document.querySelector('.btn');
const countryName = document.getElementById('countryName');
const result = document.querySelector('.output');

// Event Listener
fetchBtn.addEventListener('click', fetchData);

// Fetch Data
async function fetchData() {

  // Fetch from external API
  const response = await fetch(`https://restcountries.eu/rest/v2/name/${countryName.value}`);

  // Convert to JSON
  const data = await response.json();

  let output = '';

  // Iterate over country details
  data.forEach(country => {
    output += `
    <ul class="list-group ul mt-3">
      <li class="list-group-item">Name: ${country.name}</li>
      <li class="list-group-item">Capital: ${country.capital}</li>
      <li class="list-group-item">Population: ${country.population}</li>
      <li class="list-group-item">TimeZone: ${country.timezones}</li>
    </ul>
    `;

    let languages = '';

    // Iterate over languages
    country.languages.forEach(language => {
      if (country.languages.length >= 1) {
        languages += `${language.name}. `
      } else {
        languages = language.name
      }
    })

    // Append the languages
    output += `<li class="list-group-item">Language: ${languages}</li>`
  })

  // Display the result
  result.innerHTML = output;
}