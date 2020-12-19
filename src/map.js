const mapOptions = {
   center: [17.385044, 78.486671],   
   zoom: 10,
   attributionControl: false
}
let map = L.map('map', mapOptions).setView([0, 0], 1);

L.tileLayer('https://api.maptiler.com/maps/toner/{z}/{x}/{y}@2x.png?key=zkHdZm8T8kHbUdtvCExB', {
   atttibution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

let circles = new L.LayerGroup();
const infoCountries = []; 
let indexMap = 'cases';

function getInfoAllCountries() {
   circles.clearLayers();

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
               casesPerHundredThousand: Math.round(content[i].casesPerOneMillion / 10),
               deathsPerHundredThousand: Math.round(content[i].deathsPerOneMillion / 10),
               recoveredPerHundredThousand: Math.round(content[i].recoveredPerOneMillion /10),
               todayCasesPerHundredThousand: Math.round((content[i].todayCases * 100000) / content[i].population),
               todayDeathsPerHundredThousand: Math.round((content[i].todayDeaths* 100000) / content[i].population),
               todayRecoveredPerHundredThousand: Math.round((content[i].todayRecovered* 100000) / content[i].population)
            };
            infoCountries.push(countries);
         }
         return infoCountries;
      })
    .then((infoCountries) => {

      for (let i = 0; i < infoCountries.length; i++){  

            let radius = 0;
            let color = '';
            let messagePopup = '';
               // console.log(indexMap);
            if (indexMap == 'cases'){
               radius = infoCountries[i].cases / 11;
               color = '#f03';
               messagePopup = `Cases: ${infoCountries[i].cases}`;
            } else if (indexMap == 'deaths'){               
               radius = infoCountries[i].deaths;
               color = '#d2a';
               messagePopup = `Deaths: ${infoCountries[i].deaths}`;               
            } else if (indexMap == 'recover'){               
               radius = infoCountries[i].recovered /11;
               color = '#090';
               messagePopup = `Recovered: ${infoCountries[i].recovered}`;
            } else if (indexMap == 'todayCases'){               
               radius = infoCountries[i].todayCases;
               color = '#FF033E';
               messagePopup = `Cases today: ${infoCountries[i].todayCases}`;
            } else if (indexMap == 'todayDeaths'){               
               radius = infoCountries[i].todayDeaths * 100;
               color = '#120A8F';
               messagePopup = `Deaths today: ${infoCountries[i].todayDeaths}`;
            } else if (indexMap == 'todayRecovered'){               
               radius = infoCountries[i].todayRecovered * 5;
               color = '#34C924';
               messagePopup = `Recovered today: ${infoCountries[i].todayRecovered}`;
            } else if (indexMap == 'casesPerHundredThousand'){               
               radius = infoCountries[i].casesPerHundredThousand * 10;
               color = '#FF9218';
               messagePopup = `Cases per 100 000 population: ${infoCountries[i].casesPerHundredThousand}`;
            } else if (indexMap == 'deathsPerHundredThousand'){               
               radius = infoCountries[i].deathsPerHundredThousand * 300;
               color = '#8B008B';
               messagePopup = `Deaths per 100 000 population: ${infoCountries[i].deathsPerHundredThousand}`;
            } else if (indexMap == 'recoveredPerHundredThousand'){               
               radius = infoCountries[i].recoveredPerHundredThousand * 15;
               color = '#C0FE0B';
               messagePopup = `Recovered per 100 000 population: ${infoCountries[i].recoveredPerHundredThousand}`;
            } else if (indexMap == 'todayCasesPerHundredThousand'){               
               radius = infoCountries[i].todayCasesPerHundredThousand * 1200;
               color = '#FE0B0B';
               messagePopup = `Cases per 100 000 population today: ${infoCountries[i].todayCasesPerHundredThousand}`;
            }else if (indexMap == 'todayDeathsPerHundredThousand'){               
               radius = infoCountries[i].todayDeathsPerHundredThousand * 10000;
               color = '#56FBAF';
               messagePopup = `Deaths per 100 000 population today: ${infoCountries[i].todayDeathsPerHundredThousand}`;
            }else if (indexMap == 'todayRecoveredPerHundredThousand'){               
               radius = infoCountries[i].todayRecoveredPerHundredThousand * 1000;
               color = '#0AFF30';
               messagePopup = `Recovered per 100 000 population today: ${infoCountries[i].todayRecoveredPerHundredThousand}`;
            }            
            let circle = L.circle([infoCountries[i].lat, infoCountries[i].long], {
               color: color,
               fillColor: color,
               fillOpacity: 0.5,
               radius: radius
            })            
            circle.bindPopup(`<b>${infoCountries[i].country}</b></br>${messagePopup}`);
            circles.addLayer(circle).addTo(map);

      }
   });
}
const legend = document.querySelector('.mapLegend');
// legend.addEventListener('click', () => { });

const cases = document.getElementById('cases');
const deaths = document.getElementById('deaths');
const recovered = document.getElementById('recovered');
const todayCases = document.getElementById('cases_today');
const todayDeaths = document.getElementById('deaths_today');
const todayRecovered = document.getElementById('recovered_today');
const casesPerHundredThousand = document.getElementById('cases_per_hundred');
const deathsPerHundredThousand = document.getElementById('deaths_per_hundred');
const recoveredPerHundredThousand = document.getElementById('recovered_per_hundred');
const todayCasesPerHundredThousand = document.getElementById('cases_per_hundred_today');
const todayDeathsPerHundredThousand = document.getElementById('deaths_per_hundred_today');
const todayRecoveredPerHundredThousand = document.getElementById('recovered_per_hundred_today');

cases.addEventListener('click', () => { indexMap = 'cases'; getInfoAllCountries();});
deaths.addEventListener('click', () => { indexMap = 'deaths'; getInfoAllCountries();});
recovered.addEventListener('click', () => { indexMap = 'recover'; getInfoAllCountries();});
todayCases.addEventListener('click', () => { indexMap = 'todayCases'; getInfoAllCountries();});
todayDeaths.addEventListener('click', () => { indexMap = 'todayDeaths'; getInfoAllCountries();});
todayRecovered.addEventListener('click', () => { indexMap = 'todayRecovered'; getInfoAllCountries();});
casesPerHundredThousand.addEventListener('click', () => { indexMap = 'casesPerHundredThousand'; getInfoAllCountries();});
deathsPerHundredThousand.addEventListener('click', () => { indexMap = 'deathsPerHundredThousand'; getInfoAllCountries();});
recoveredPerHundredThousand.addEventListener('click', () => { indexMap = 'recoveredPerHundredThousand'; getInfoAllCountries();});
todayCasesPerHundredThousand.addEventListener('click', () => { indexMap = 'todayCasesPerHundredThousand'; getInfoAllCountries();});
todayDeathsPerHundredThousand.addEventListener('click', () => { indexMap = 'todayDeathsPerHundredThousand'; getInfoAllCountries();});
todayRecoveredPerHundredThousand.addEventListener('click', () => { indexMap = 'todayRecoveredPerHundredThousand'; getInfoAllCountries();});

window.addEventListener('DOMcontentLoaded', getInfoAllCountries());
