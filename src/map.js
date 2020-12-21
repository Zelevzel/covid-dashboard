const mapOptions = {
   center: [17.385044, 78.486671],   
   zoom: 10,
   attributionControl: false
}
let map = L.map('map', mapOptions).setView([0, 0], 2);

L.tileLayer('https://api.maptiler.com/maps/toner/{z}/{x}/{y}@2x.png?key=zkHdZm8T8kHbUdtvCExB', {
   atttibution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

let circles = new L.LayerGroup();
const infoCountries = []; 
let arr = [];
let indexMap = 'cases';
const index = document.querySelectorAll('.index_item');

function getInfoAllCountries() {
   circles.clearLayers();
   infoCountries.splice(0, infoCountries.length);
   
   

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
               recoveredPerHundredThousand: Math.round(content[i].recoveredPerOneMillion / 10),
               todayCasesPerHundredThousand: Math.round((content[i].todayCases * 100000) / content[i].population),
               todayDeathsPerHundredThousand: Math.round((content[i].todayDeaths * 100000) / content[i].population),
               todayRecoveredPerHundredThousand: Math.round((content[i].todayRecovered * 100000) / content[i].population)
            };
               if (content[i].population !== 0){
                  infoCountries.push(countries);                  
               }
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
                  if (infoCountries[i].cases > 5000000){
                     radius = 400000;
                  }else radius = infoCountries[i].cases / 15;
               color = '#FF2300';
               messagePopup = `Cases: ${infoCountries[i].cases}`;
            } else if (indexMap == 'deaths'){               
               radius = infoCountries[i].deaths;
               color = '#D636C9';
               messagePopup = `Deaths: ${infoCountries[i].deaths}`;               
            } else if (indexMap == 'recover'){    
               if (infoCountries[i].recovered > 1500000){
                  radius = 300000;
               }else radius = infoCountries[i].recovered / 10;               
               color = '#409300';
               messagePopup = `Recovered: ${infoCountries[i].recovered}`;
            } else if (indexMap == 'todayCases'){               
               radius = infoCountries[i].todayCases * 2;
               color = '#AC2B50';
               messagePopup = `Cases today: ${infoCountries[i].todayCases}`;
            } else if (indexMap == 'todayDeaths'){               
               radius = infoCountries[i].todayDeaths * 100;
               color = '#7446D7';
               messagePopup = `Deaths today: ${infoCountries[i].todayDeaths}`;
            } else if (indexMap == 'todayRecovered'){               
               radius = infoCountries[i].todayRecovered * 5;
               color = '#00C322';
               messagePopup = `Recovered today: ${infoCountries[i].todayRecovered}`;
            } else if (indexMap == 'casesPerHundredThousand'){               
               radius = infoCountries[i].casesPerHundredThousand * 12;
               color = '#FF9200';
               messagePopup = `Cases per 100 000 population: ${infoCountries[i].casesPerHundredThousand}`;
            } else if (indexMap == 'deathsPerHundredThousand'){               
               radius = infoCountries[i].deathsPerHundredThousand * 600;
               color = '#3F92D2';
               messagePopup = `Deaths per 100 000 population: ${infoCountries[i].deathsPerHundredThousand}`;
            } else if (indexMap == 'recoveredPerHundredThousand'){               
               radius = infoCountries[i].recoveredPerHundredThousand * 15;
               color = '#FFD300';
               messagePopup = `Recovered per 100 000 population: ${infoCountries[i].recoveredPerHundredThousand}`;
            } else if (indexMap == 'todayCasesPerHundredThousand'){               
               radius = infoCountries[i].todayCasesPerHundredThousand * 1200;
               color = '#6A48D7';
               messagePopup = `Cases per 100 000 population today: ${infoCountries[i].todayCasesPerHundredThousand}`;
            }else if (indexMap == 'todayDeathsPerHundredThousand'){               
               radius = infoCountries[i].todayDeathsPerHundredThousand * 15000;
               color = '#61B4CF';
               messagePopup = `Deaths per 100 000 population today: ${infoCountries[i].todayDeathsPerHundredThousand}`;
            }else if (indexMap == 'todayRecoveredPerHundredThousand'){               
               radius = infoCountries[i].todayRecoveredPerHundredThousand * 1000;
               color = '#2F0571';
               messagePopup = `Recovered per 100 000 population today: ${infoCountries[i].todayRecoveredPerHundredThousand}`;
            }            
            let circle = L.circle([infoCountries[i].lat, infoCountries[i].long], {
               color: color,
               fillColor: color,
               fillOpacity: 0.6,
               radius: radius
            })  
            circle.bindPopup(`<b>${infoCountries[i].country}</b></br>${messagePopup}`);          
            circle.on('mouseover', (e) => {
               circle.openPopup();
            })
            circle.on('mouseout', (e) => {
               circle.closePopup();
            })
            circles.addLayer(circle).addTo(map);
      }
            
   });
}

function setRadius(el){
   arr.push(el);
   console.log(arr.sort(function (a ,b){ return a - b}));
}

function addActive(el){
    index.forEach(n => n.classList.remove('active'));  
    el.classList.add('active') 
};

// const legend = document.querySelector('.mapLegend');
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

cases.addEventListener('click', () => { indexMap = 'cases'; getInfoAllCountries(); addActive(cases);});
deaths.addEventListener('click', () => { indexMap = 'deaths'; getInfoAllCountries(); addActive(deaths);});
recovered.addEventListener('click', () => { indexMap = 'recover'; getInfoAllCountries(); addActive(recovered);});
todayCases.addEventListener('click', () => { indexMap = 'todayCases'; getInfoAllCountries(); addActive(todayCases);});
todayDeaths.addEventListener('click', () => { indexMap = 'todayDeaths'; getInfoAllCountries(); addActive(todayDeaths);});
todayRecovered.addEventListener('click', () => { indexMap = 'todayRecovered'; getInfoAllCountries(); addActive(todayRecovered);});
casesPerHundredThousand.addEventListener('click', () => { indexMap = 'casesPerHundredThousand'; getInfoAllCountries(); addActive(casesPerHundredThousand);});
deathsPerHundredThousand.addEventListener('click', () => { indexMap = 'deathsPerHundredThousand'; getInfoAllCountries(); addActive(deathsPerHundredThousand);});
recoveredPerHundredThousand.addEventListener('click', () => { indexMap = 'recoveredPerHundredThousand'; getInfoAllCountries(); addActive(recoveredPerHundredThousand);});
todayCasesPerHundredThousand.addEventListener('click', () => { indexMap = 'todayCasesPerHundredThousand'; getInfoAllCountries(); addActive(todayCasesPerHundredThousand);});
todayDeathsPerHundredThousand.addEventListener('click', () => { indexMap = 'todayDeathsPerHundredThousand'; getInfoAllCountries(); addActive(todayDeathsPerHundredThousand);});
todayRecoveredPerHundredThousand.addEventListener('click', () => { indexMap = 'todayRecoveredPerHundredThousand'; getInfoAllCountries(); addActive(todayRecoveredPerHundredThousand);});

// function getRadius(r) {
// //r = Math.sqrt(y / Math.PI)
// //return r;
// return r > 100 ? 15 :
//        r > 50 ? 10 :
//        r > 20 ? 6 :
//        r > 10 ? 3 :
//        0;
//  }

// let legend = L.control({position: 'bottomleft'});
//             legend.onAdd = function (map) {
//                let div = L.DomUtil.create('div', 'info legend');
//                let grades = [0, 3000];
//                let labels = ['1 - 1,000', '1000 - 3000'];               

//                for (let i = 0; i < grades.length; i++) {
//                    div.innerHTML += grades[i] + ':' + labels[i] + '</br>';
//                }
//                return div;
//             };
//             legend.addTo(map);


window.addEventListener('DOMcontentLoaded', getInfoAllCountries());
