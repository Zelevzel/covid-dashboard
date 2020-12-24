import {
  refreshGraphs,
  graphsConfig,
  graphs,
  statusSelected,
} from './graph.js';

const infoCountries = [];

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

async function addInfWorld(info) {
  const timer = new Date();
  const divGlobalInf = document.querySelector('.globalInf');
  divGlobalInf.innerHTML = '';
  const newCountry = document.createElement('div');
  newCountry.innerHTML = '';
  const choice = document.querySelector('#Globalstatus').value;

  const myWorker = new Worker('./src/workerStat.js', {
    type: 'module',
  });

  myWorker.postMessage({ choice, data: info });
  myWorker.onmessage = (event) => {
    divGlobalInf.innerHTML = event.data;
    addlisenercountry();
  };
}

function addInfCountrydop(data, classInput, classDiv) {
  const divGlobalInf = document.querySelector(`.${classDiv}`);
  divGlobalInf.innerHTML = '';
  const input = document.querySelector(`.${classInput}`);
  const newCountry = document.createElement('div');
  newCountry.innerHTML = '';
  const choice = document.querySelector('#country1').value;
  const country = data.filter((value) => {
    return (
      value.country.toLowerCase().toString() === choice.toLowerCase().toString()
    );
  });
  newCountry.innerHTML += `<p style='color:#94a1b2;'>Cases: ${country[0].casesPerHundredThousand}</p>`;
  newCountry.innerHTML += `<p style='color:#94a1b2;'>Deaths: ${country[0].deathsPerHundredThousand}</p>`;
  newCountry.innerHTML += `<p style='color:#94a1b2;'>Recovered: ${country[0].recoveredPerHundredThousand}</p>`;
  divGlobalInf.append(newCountry);
}

function addInfCountry(data) {
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
  newCountry.innerHTML += `<p style='color:#94a1b2;'>Cases: ${country[0].cases}</p>`;
  newCountry.innerHTML += `<p style='color:#94a1b2;'>Deaths: ${country[0].deaths}</p>`;
  newCountry.innerHTML += `<p style='color:#94a1b2;'>Recovered: ${country[0].recovered}</p>`;
  divGlobalInf.append(newCountry);
  addInfCountrydop(data, 'arrowToDownInputT', 'timeCountry');
  addInfCountrydop(data, 'arrowToDownInputC', 'amountCountry');
}

function addCountrySelected() {
  infoCountries.forEach((value) => {
    const newOption = new Option(value.country);
    document.querySelector('#country1').append(newOption);
  });
  infoCountries.forEach((value) => {
    const newOption = new Option(value.country);
    document.querySelector('#country').append(newOption);
  });
}
function countryRefresh() {
  /* добавление страны в список */
  document.querySelector('#country1').value = window.countrySelected;
  /* добавление страны в список */
  addInfCountry(infoCountries);

  /* график */

  refreshGraphs(
    window.countrySelected,
    graphsConfig,
    graphs,
    document.querySelector('#country').value,
    statusSelected,
    '#country'
  );
  document.querySelector('#country').value = window.countrySelected;
}

function addlisenercountry() {
  const countryAll = document.querySelectorAll('.countrySelected');
  Object.entries(countryAll).forEach(([key, value]) => {
    value.addEventListener('click', () => {
      window.countrySelected = value.dataset.country;
      countryRefresh(
        event,
        graphsConfig,
        graphs,
        window.countrySelected,
        statusSelected,
        '#country'
      );
    });
  });
}

export default function statisticsAdd() {
  getInfoAllCountries().then(() => {
    addInfWorld(infoCountries);
    addlisenercountry();

    addInfCountry(infoCountries);

    document.querySelector('#Globalstatus').addEventListener('change', () => {
      addInfWorld(infoCountries);
      addlisenercountry();
    });
    document
      .querySelector('.arrowToDownInputT')
      .addEventListener('change', (event) => {
        document.querySelector('.timeCountry').style.display =
          document.querySelector('.timeCountry').style.display === 'none'
            ? 'block'
            : 'none';
      });
    document
      .querySelector('.arrowToDownInputC')
      .addEventListener('change', () => {
        document.querySelector('.amountCountry').style.display =
          document.querySelector('.amountCountry').style.display === 'none'
            ? 'block'
            : 'none';
      });
    document.querySelector('#country1').addEventListener('change', () => {
      addInfCountry(infoCountries);
    });
    addCountrySelected();
  });
}
