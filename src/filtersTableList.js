import { filterInput } from './globalDOMElements';

filterInput.addEventListener('keyup', function createFilters() {
  const value = this.value;
  const namesCountry = document.querySelectorAll('.global-country');
  const row = document.querySelectorAll('.global-country-cases');
  if (value !== '') {
    namesCountry.forEach((name, index) => {
      if (name.textContent.toLowerCase().search(value.toLowerCase()) === -1) {
        row[index].classList.add('hide');
      } else {
        row[index].classList.remove('hide');
      }
    });
  } else {
    row.forEach((item) => {
      item.classList.remove('hide');
    });
  }
});

filterInput.addEventListener('keyup', function createFilters() {
  const value = this.value;
  const namesProvince = document.querySelectorAll('.province');
  const row = document.querySelectorAll('.global-province-cases');
  if (value !== '') {
    namesProvince.forEach((name, index) => {
      if (name.textContent.toLowerCase().search(value.toLowerCase()) === -1) {
        row[index].classList.add('hide');
      } else {
        row[index].classList.remove('hide');
      }
    });
  } else {
    row.forEach((item) => {
      item.classList.remove('hide');
    });
  }
});

filterInput.addEventListener('keyup', function createFilters() {
  const value = this.value;
  const namesCounty = document.querySelectorAll('.county');
  const row = document.querySelectorAll('.usa-county-cases');
  if (value !== '') {
    namesCounty.forEach((name, index) => {
      if (name.textContent.toLowerCase().search(value.toLowerCase()) === -1) {
        row[index].classList.add('hide');
      } else {
        row[index].classList.remove('hide');
      }
    });
  } else {
    row.forEach((item) => {
      item.classList.remove('hide');
    });
  }
});
