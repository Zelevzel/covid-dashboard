const infoCountries = [];

function countryRefresh() {
  document.querySelector('#country1').value = countrySelected;
  // addInfCountry(country);
}

async function getInfoAllCountries() {
  await fetch('https://disease.sh/v3/covid-19/countries?yesterday=true')
    .then((res) => res.json())
    .then((content) => {
      for (let i = 0; i < content.length; i++) {
        const countries = {
          flag: content[i].countryInfo.flag,
          country: content[i].country,
          lat: content[i].countryInfo.lat,
          long: content[i].countryInfo.long,
          cases: content[i].cases,
          deaths: content[i].deaths,
          recovered: content[i].recovered,
          todayCases: content[i].todayCases,
          todayDeaths: content[i].todayDeaths,
          todayRecovered: content[i].todayRecovered,
          casesPerHundredThousand: Math.round(
            content[i].casesPerOneMillion / 10
          ),
          deathsPerHundredThousand: Math.round(
            content[i].deathsPerOneMillion / 10
          ),
          recoveredPerHundredThousand: Math.round(
            content[i].recoveredPerOneMillion / 10
          ),
          todayCasesPerHundredThousand: Math.round(
            (content[i].todayCases * 100000) / content[i].population
          ),
          todayDeathsPerHundredThousand: Math.round(
            (content[i].todayDeaths * 100000) / content[i].population
          ),
          todayRecoveredPerHundredThousand: Math.round(
            (content[i].todayRecovered * 100000) / content[i].population
          ),
        };
        infoCountries.push(countries);
      }
      return infoCountries;
    });
}

export default function statisticsAdd() {
  getInfoAllCountries().then(() => {
    addInfWorld(infoCountries).then(() => {
      const countryAll = document.querySelectorAll('.countrySelected');
      Object.entries(countryAll).forEach(([key, value]) => {
        value.addEventListener('click', () => {
          countrySelected = value.dataset.country;
          countryRefresh();
        });
      });
    });

    addInfCountry(infoCountries);

    document.querySelector('#Globalstatus').addEventListener('change', () => {
      addInfWorld(infoCountries);
    });
    document.querySelector('#amountCountry').addEventListener('change', () => {
      addInfCountry(infoCountries);
    });
    document.querySelector('#timeCountry').addEventListener('change', () => {
      addInfCountry(infoCountries);
    });
    document.querySelector('#country1').addEventListener('change', () => {
      addInfCountry(infoCountries);
    });
  });
}

async function addInfWorld(info) {
  console.log('addInfWorld');
  const divGlobalInf = document.querySelector('.globalInf');
  divGlobalInf.innerHTML = '';
  const newCountry = document.createElement('div');
  newCountry.innerHTML = '';
  const choice = document.querySelector('#Globalstatus').value;
  Object.entries(info).forEach(([key, value]) => {
    newCountry.innerHTML += `<p class="countrySelected" data-country='${value.country}'><img src='${value.flag}'></img>${value.country}</p> `;
    switch (choice) {
      case 'cases':
        newCountry.innerHTML += `<p style='color:yellow; border-bottom: solid 2px; border-color:black; margin-bottom: 3px;'>${value.cases} Cases</p>`;
        break;
      case 'deaths':
        newCountry.innerHTML += `<p style='color:red; border-bottom: solid 2px;border-color:black;'>${value.deaths} Deaths</p>`;
        break;
      case 'recovered':
        newCountry.innerHTML += `<p style='color:green; border-bottom: solid 2px;border-color:black;'>${value.recovered} Recovered</p>`;
        break;
      default:
        newCountry.innerHTML += `<p style='color:yellow; border-bottom: solid 2px;border-color:black;'>${value.cases} Cases</p>`;
        break;
    }
  });
  divGlobalInf.append(newCountry);
}

function addInfCountry(data) {
  console.log('addInfCountry');
  const divGlobalInf = document.querySelector('.countryInf');
  divGlobalInf.innerHTML = '';
  const newCountry = document.createElement('div');
  newCountry.innerHTML = '';
  const choice = document.querySelector('#country1').value;
  const country = data.filter((value) => {
    return (
      value.country.toLowerCase().toString() === choice.toLowerCase().toString()
    );
  });
  const amountPeople = document.querySelector('#amountCountry').value;
  const timeInfection = document.querySelector('#timeCountry').value;

  if (amountPeople === 'All' && timeInfection === 'All') {
    // newCountry.innerHTML += `<p style='color:yellow;'>Country: ${country[0].country}</p>`;
    newCountry.innerHTML += `<p style='color:yellow;'>Cases: ${country[0].cases}</p>`;
    newCountry.innerHTML += `<p style='color:yellow;'>Deaths: ${country[0].deaths}</p>`;
    newCountry.innerHTML += `<p style='color:yellow;'>Recovered: ${country[0].recovered}</p>`;
  } else if (amountPeople !== 'All' && timeInfection === 'All') {
    // newCountry.innerHTML += `<p style='color:yellow;'>${country[0].country}</p>`;
    newCountry.innerHTML += `<p style='color:yellow;'>Cases: ${country[0].casesPerHundredThousand}</p>`;
    newCountry.innerHTML += `<p style='color:yellow;'>Deaths: ${country[0].deathsPerHundredThousand}</p>`;
    newCountry.innerHTML += `<p style='color:yellow;'>Recovered: ${country[0].recoveredPerHundredThousand}</p>`;
  } else if (amountPeople === 'All' && timeInfection !== 'All') {
    // newCountry.innerHTML += `<p style='color:yellow;'>${country[0].country}</p>`;
    newCountry.innerHTML += `<p style='color:yellow;'>Cases: ${country[0].todayCases}</p>`;
    newCountry.innerHTML += `<p style='color:yellow;'>Deaths: ${country[0].todayDeaths}</p>`;
    newCountry.innerHTML += `<p style='color:yellow;'>Recovered: ${country[0].todayRecovered}</p>`;
  } else if (amountPeople !== 'All' && timeInfection !== 'All') {
    // newCountry.innerHTML += `<p style='color:yellow;'>${country[0].country}</p>`;
    newCountry.innerHTML += `<p style='color:yellow;'>Cases: ${country[0].todayCasesPerHundredThousand}</p>`;
    newCountry.innerHTML += `<p style='color:yellow;'>Deaths: ${country[0].todayDeathsPerHundredThousand}</p>`;
    newCountry.innerHTML += `<p style='color:yellow;'>Recovered: ${country[0].todayRecoveredPerHundredThousand}</p>`;
  }
  divGlobalInf.append(newCountry);
}
