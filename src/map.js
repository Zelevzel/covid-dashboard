
const mapOptions = {
   center: [17.385044, 78.486671],
   zoom: 40
}
let map = L.map('map', mapOptions).setView([0, 0], 1);

// let gl = L.mapboxGL({
//         attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
//         style: 'https://api.maptiler.com/maps/toner/style.json?key=zkHdZm8T8kHbUdtvCExB'
//       }).addTo(map);

L.tileLayer('https://api.maptiler.com/maps/toner/{z}/{x}/{y}@2x.png?key=zkHdZm8T8kHbUdtvCExB', {
   atttibution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

// async function getResponse(){
//     let information = await fetch('https://disease.sh/v3/covid-19/countries?yesterday=true');
//     let content = await information.json();
//     console.log(content);
//     for (let i = 0; i < content.length; i++){
//       lat = content[i]['countryInfo']['lat'];
//       long = content[i]['countryInfo']['long'];
//       cases = content[i]['cases'];
//       console.log(lat, long, cases);
//     }
// }

const infoCountries = []; 
const infoUSstates = [];

function getInfoAllCountries() {
  fetch('https://disease.sh/v3/covid-19/countries?yesterday=true')
      .then((res) => res.json())
      .then((content) => {
         console.log(content);
         for (let i = 0; i < content.length; i++) {
            const countries = {
               country: content[i].country,
               lat: content[i].countryInfo.lat,
               long: content[i].countryInfo.long,
               cases: content[i].cases,
               deaths: content[i].deaths
            };
            infoCountries.push(countries);
         }
         return infoCountries;
      })
   //  .then((resultArr) => {
   //    console.log(resultArr);
   //    // что то с эти массивом можно делать
   //  });
}

function getInfoUSA() {
  fetch('https://disease.sh/v3/covid-19/states?yesterday=true')
      .then((res) => res.json())
      .then((content) => {
         console.log(content);
         for (let i = 0; i < content.length; i++) {
            const states = {
               country: content[i].country,
               lat: content[i].countryInfo.lat,
               long: content[i].countryInfo.long,
               cases: content[i].cases,
               deaths: content[i].deaths
            };
            infoCountries.push(states);
         }
         return infoUSstates;
      })
   //  .then((resultArr) => {
   //    console.log(resultArr);
   //    // что то с эти массивом можно делать
   //  });
}

getInfoAllCountries();
getInfoUSA();
console.log(infoCountries);
// console.log(infoUSstates);

// setTimeout(function() {
// 			console.log(lat, long, cases);
// 		}, 2000);
// // console.log(lat, long, cases);

// let marker = L.marker([53.4, -0.02]).addTo(map);
// function drawInfection() {
setTimeout(function(){
   // console.log(resultArr[0].lat);
   for (let i = 0; i < infoCountries.length; i++){
      // console.log(lat);
         let circle = L.circle([infoCountries[i].lat, infoCountries[i].long], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: infoCountries[i].cases / 8
         }).addTo(map);
      circle.bindPopup(`<b>${infoCountries[i].country}</b></br><b>Cases: </b>${infoCountries[i].cases}</br><b>Deaths: </b>${infoCountries[i].deaths}`);
   }
}, 100);
   
// }

// circle.bindPopup('<b>Cases:</b> 2 000 324 </br> <b>Deaths:</b> 48 478');

// fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=366')
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });



// getResponse();
// setTimeout(drawInfection, 4000);

