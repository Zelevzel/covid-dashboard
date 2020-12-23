/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const mapOptions = {
  center: [17.385044, 78.486671],
  zoom: 10,
  attributionControl: false,
};
const map = L.map('map', mapOptions).setView([0, 0], 2);

L.tileLayer(
  'https://api.maptiler.com/maps/toner/{z}/{x}/{y}@2x.png?key=zkHdZm8T8kHbUdtvCExB',
  {
    atttibution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);

const circles = new L.LayerGroup();
const infoCountries = [];

let arr = [];
let indexMap = 'cases';
const index = document.querySelectorAll('.index_item');

export default function getInfoAllCountries() {
  circles.clearLayers();
  infoCountries.splice(0, infoCountries.length);
  arr = [];

  fetch('https://disease.sh/v3/covid-19/countries?yesterday=true')
    .then((res) => res.json())
    .then((content) => {
      // console.log(content);
      for (let i = 0; i < content.length; i++) {
        const countries = {
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
        if (content[i].population !== 0) {
          infoCountries.push(countries);
          if (indexMap === 'cases') {
            fillArray(content[i].cases);
          } else if (indexMap === 'deaths') {
            fillArray(content[i].deaths);
          } else if (indexMap === 'recover') {
            fillArray(content[i].recovered);
          } else if (indexMap === 'todayCases') {
            fillArray(content[i].todayCases);
          } else if (indexMap === 'todayDeaths') {
            fillArray(content[i].todayDeaths);
          } else if (indexMap === 'todayRecovered') {
            fillArray(content[i].todayRecovered);
          } else if (indexMap === 'casesPerHundredThousand') {
            fillArray(Math.round(content[i].casesPerOneMillion / 10));
          } else if (indexMap === 'deathsPerHundredThousand') {
            fillArray(Math.round(content[i].deathsPerOneMillion / 10));
          } else if (indexMap === 'recoveredPerHundredThousand') {
            fillArray(Math.round(content[i].recoveredPerOneMillion / 10));
          } else if (indexMap === 'todayCasesPerHundredThousand') {
            fillArray(
              Math.round(
                (content[i].todayCases * 100000) / content[i].population
              )
            );
          } else if (indexMap == 'todayDeathsPerHundredThousand') {
            fillArray(
              Math.round(
                (content[i].todayDeaths * 100000) / content[i].population
              )
            );
          } else if (indexMap == 'todayRecoveredPerHundredThousand') {
            fillArray(
              Math.round(
                (content[i].todayRecovered * 100000) / content[i].population
              )
            );
          }
        }
      }
      return infoCountries;
    })
    .then((infoCountries) => {
      for (let i = 0; i < infoCountries.length; i++) {
        // setRadius(infoCountries[i].cases);
        let radius = 0;
        let color = '';
        let messagePopup = '';

        const legend = document.querySelector('.legend');

        legend.innerHTML = `<div class="circle one"><span>${arr[210] + 1} - ${
          arr[217]
        }</span></div>
							<div class="circle two"><span>${arr[150] + 1} - ${arr[210]}</span></div>
							<div class="circle three"><span>${arr[80] + 1} - ${arr[150]}</span></div>
							<div class="circle four"><span>${arr[30] + 1} - ${arr[80]}</span></div>
							<div class="circle five"><span>1 - ${arr[30]}</span></div>
							<div class="circle six"><span>0</span></div>`;

        if (indexMap == 'cases') {
          radius = setRadius(infoCountries[i].cases);
          color = '#FF2300';
          messagePopup = `Cases: ${infoCountries[i].cases}`;
        } else if (indexMap == 'deaths') {
          radius = setRadius(infoCountries[i].deaths);
          // console.log (radius, infoCountries[i].country)
          color = '#D636C9';
          messagePopup = `Deaths: ${infoCountries[i].deaths}`;
        } else if (indexMap == 'recover') {
          radius = setRadius(infoCountries[i].recovered);
          color = '#409300';
          messagePopup = `Recovered: ${infoCountries[i].recovered}`;
        } else if (indexMap == 'todayCases') {
          radius = setRadius(infoCountries[i].todayCases);
          color = '#AC2B50';
          messagePopup = `Cases today: ${infoCountries[i].todayCases}`;
        } else if (indexMap == 'todayDeaths') {
          radius = setRadius(infoCountries[i].todayDeaths);
          color = '#7446D7';
          messagePopup = `Deaths today: ${infoCountries[i].todayDeaths}`;
        } else if (indexMap == 'todayRecovered') {
          radius = setRadius(infoCountries[i].todayRecovered);
          color = '#00C322';
          messagePopup = `Recovered today: ${infoCountries[i].todayRecovered}`;
        } else if (indexMap == 'casesPerHundredThousand') {
          radius = setRadius(infoCountries[i].casesPerHundredThousand);
          color = '#FF9200';
          messagePopup = `Cases per 100 000 population: ${infoCountries[i].casesPerHundredThousand}`;
        } else if (indexMap == 'deathsPerHundredThousand') {
          radius = setRadius(infoCountries[i].deathsPerHundredThousand);
          color = '#3F92D2';
          messagePopup = `Deaths per 100 000 population: ${infoCountries[i].deathsPerHundredThousand}`;
        } else if (indexMap == 'recoveredPerHundredThousand') {
          radius = setRadius(infoCountries[i].recoveredPerHundredThousand);
          color = '#FFD300';
          messagePopup = `Recovered per 100 000 population: ${infoCountries[i].recoveredPerHundredThousand}`;
        } else if (indexMap == 'todayCasesPerHundredThousand') {
          radius = setRadius(infoCountries[i].todayCasesPerHundredThousand);
          color = '#6A48D7';
          messagePopup = `Cases per 100 000 population today: ${infoCountries[i].todayCasesPerHundredThousand}`;
        } else if (indexMap == 'todayDeathsPerHundredThousand') {
          radius =
            setRadius(infoCountries[i].todayDeathsPerHundredThousand) / 10;
          color = '#61B4CF';
          // console.log (radius, infoCountries[i].country)
          messagePopup = `Deaths per 100 000 population today: ${infoCountries[i].todayDeathsPerHundredThousand}`;
        } else if (indexMap == 'todayRecoveredPerHundredThousand') {
          radius = setRadius(infoCountries[i].todayRecoveredPerHundredThousand);
          color = '#2F0571';
          messagePopup = `Recovered per 100 000 population today: ${infoCountries[i].todayRecoveredPerHundredThousand}`;
        }
        const circle = L.circle([infoCountries[i].lat, infoCountries[i].long], {
          color,
          fillColor: color,
          fillOpacity: 0.8,
          radius,
        });

        const legCircle = document.querySelectorAll('.circle');
        // eslint-disable-next-line no-return-assign
        legCircle.forEach((n) => (n.style.backgroundColor = `${color}`));
        circle.bindPopup(
          `<b>${infoCountries[i].country}</b></br>${messagePopup}`
        );
        circle.on('mouseover', () => {
          circle.openPopup();
        });
        circle.on('mouseout', () => {
          circle.closePopup();
        });
        circles.addLayer(circle).addTo(map);
      }
    });
}

function fillArray(el) {
  arr.push(el);
  // eslint-disable-next-line func-names
  arr.sort(function (a, b) {
    return a - b;
  });
}

function setRadius(el) {  
  for (let i = 0; i < arr.length; i++) {
    if (el == 0) {
      return 0;
    }
    if (el >= 1 && el < arr[30]) {
      return 10000;
    }
    if (arr[30] <= el && el < arr[80]) {
      return 50000;
    }
    if (arr[80] <= el && el < arr[150]) {
      return 80000;
    }
    if (arr[150] <= el && el < arr[210]) {
      return 120000;
    }
    if (arr[210] <= el && el <= arr[217]) {
      return 200000;
    }
    if (arr[217] < el) {
      return 300000;
    }
  }
}

function addActive(el) {
  index.forEach((n) => n.classList.remove('active'));
  el.classList.add('active');
}

const legendBtn = document.querySelector('.mapLegendBtn');
const legendMain = document.querySelector('.popup_legend');

legendBtn.addEventListener('click', () => {
  legendMain.classList.toggle('hidden');
});

const cases = document.getElementById('cases');
const deaths = document.getElementById('deaths');
const recovered = document.getElementById('recovered');
const todayCases = document.getElementById('cases_today');
const todayDeaths = document.getElementById('deaths_today');
const todayRecovered = document.getElementById('recovered_today');
const casesPerHundredThousand = document.getElementById('cases_per_hundred');
const deathsPerHundredThousand = document.getElementById('deaths_per_hundred');
const recoveredPerHundredThousand = document.getElementById(
  'recovered_per_hundred'
);
const todayCasesPerHundredThousand = document.getElementById(
  'cases_per_hundred_today'
);
const todayDeathsPerHundredThousand = document.getElementById(
  'deaths_per_hundred_today'
);
const todayRecoveredPerHundredThousand = document.getElementById(
  'recovered_per_hundred_today'
);

cases.addEventListener('click', () => {
  indexMap = 'cases';
  getInfoAllCountries();
  addActive(cases);
});
deaths.addEventListener('click', () => {
  indexMap = 'deaths';
  getInfoAllCountries();
  addActive(deaths);
});
recovered.addEventListener('click', () => {
  indexMap = 'recover';
  getInfoAllCountries();
  addActive(recovered);
});
todayCases.addEventListener('click', () => {
  indexMap = 'todayCases';
  getInfoAllCountries();
  addActive(todayCases);
});
todayDeaths.addEventListener('click', () => {
  indexMap = 'todayDeaths';
  getInfoAllCountries();
  addActive(todayDeaths);
});
todayRecovered.addEventListener('click', () => {
  indexMap = 'todayRecovered';
  getInfoAllCountries();
  addActive(todayRecovered);
});
casesPerHundredThousand.addEventListener('click', () => {
  indexMap = 'casesPerHundredThousand';
  getInfoAllCountries();
  addActive(casesPerHundredThousand);
});
deathsPerHundredThousand.addEventListener('click', () => {
  indexMap = 'deathsPerHundredThousand';
  getInfoAllCountries();
  addActive(deathsPerHundredThousand);
});
recoveredPerHundredThousand.addEventListener('click', () => {
  indexMap = 'recoveredPerHundredThousand';
  getInfoAllCountries();
  addActive(recoveredPerHundredThousand);
});
todayCasesPerHundredThousand.addEventListener('click', () => {
  indexMap = 'todayCasesPerHundredThousand';
  getInfoAllCountries();
  addActive(todayCasesPerHundredThousand);
});
todayDeathsPerHundredThousand.addEventListener('click', () => {
  indexMap = 'todayDeathsPerHundredThousand';
  getInfoAllCountries();
  addActive(todayDeathsPerHundredThousand);
});
todayRecoveredPerHundredThousand.addEventListener('click', () => {
  indexMap = 'todayRecoveredPerHundredThousand';
  getInfoAllCountries();
  addActive(todayRecoveredPerHundredThousand);
});

window.addEventListener('DOMcontentLoaded', getInfoAllCountries());
