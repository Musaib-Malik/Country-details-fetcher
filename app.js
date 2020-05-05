const btn = document.querySelector('.btn').addEventListener('click', getData);

async function getData() {

  const name = document.querySelector('input').value;
  try {
    var response = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
    const data = await response.json();

    let output = '';

    data.forEach(info => {

      output += `<ul class="list-group ul mt-3">
  
        <li class="list-group-item">Country: ${info.name}</li>
        <li class="list-group-item">Capital: ${info.capital}</li>
        <li class="list-group-item">Population: ${info.population}</li>
        <li class="list-group-item">TimeZone: ${info.timezones}</li>
      </ul>`
    })

    document.querySelector('.output').innerHTML = output;

  } catch (e) {
    console.log('Error: Failed to fetch the data');
  }



}