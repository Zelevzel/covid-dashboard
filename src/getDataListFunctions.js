import { tabsContent } from './globalDOMElements';

function getCasesByCountry(indexTab = 0) {
  fetch('https://disease.sh/v3/covid-19/countries')
    .then((response) => response.json())
    .then((content) => {
      content.sort((prev, next) => next.cases - prev.cases);
      for (let i = 0; i < content.length; i++) {
        const rowCases = document.createElement('div');
        const nameCountry = document.createElement('div');
        const countCases = document.createElement('div');
        rowCases.classList.add('global-country-cases');
        nameCountry.classList.add('global-country');
        countCases.classList.add('count-cases');

        nameCountry.innerText = content[i].country;
        countCases.innerText = content[i].cases;

        rowCases.append(nameCountry);
        rowCases.append(countCases);
        tabsContent[indexTab].append(rowCases);
      }
    });
}

function getCasesByProvince(indexTab = 1) {
  fetch('https://disease.sh/v3/covid-19/jhucsse')
    .then((response) => response.json())
    .then((content) => {
      content.sort((prev, next) => next.stats.confirmed - prev.stats.confirmed);
      content.forEach((data) => {
        const rowCases = document.createElement('div');
        const confirmedCase = document.createElement('div');
        const locationName = document.createElement('div');
        const province = document.createElement('div');
        const country = document.createElement('div');
        rowCases.classList.add('global-province-cases');
        confirmedCase.classList.add('confirmed-cases');
        locationName.classList.add('location-name');
        province.classList.add('province');
        country.classList.add('country');

        if (data.province) {
          confirmedCase.innerText = `${data.stats.confirmed} cases`;
          province.innerText = data.province;
          country.innerText = data.country;
          locationName.append(province, country);
          rowCases.append(confirmedCase, locationName);
          tabsContent[indexTab].append(rowCases);
        }
      });
    });
}

function getCasesByUSACounty(indexTab = 2) {
  fetch('https://disease.sh/v3/covid-19/jhucsse/counties/')
    .then((response) => response.json())
    .then((content) => {
      content.sort((prev, next) => next.stats.confirmed - prev.stats.confirmed);
      content.forEach((data) => {
        const rowCases = document.createElement('div');
        const confirmedCase = document.createElement('div');
        const locationName = document.createElement('div');
        const county = document.createElement('div');
        const state = document.createElement('div');
        const country = document.createElement('div');
        rowCases.classList.add('usa-county-cases');
        confirmedCase.classList.add('confirmed-cases');
        locationName.classList.add('location-name');
        county.classList.add('county');
        state.classList.add('state');
        country.classList.add('country');

        confirmedCase.innerText = `${data.stats.confirmed} cases`;
        county.innerText = data.county;
        state.innerText = data.province;
        country.innerText = 'US';

        locationName.append(county, state, country);
        rowCases.append(confirmedCase, locationName);
        tabsContent[indexTab].append(rowCases);
      });
    });
}

getCasesByCountry();
getCasesByProvince();
getCasesByUSACounty();
