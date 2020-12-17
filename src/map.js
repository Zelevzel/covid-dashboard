let map = L.map('map').setView([0, 0], 1);

let lat = [];
let long = [];
let cases = [];

L.tileLayer('https://api.maptiler.com/maps/toner/{z}/{x}/{y}@2x.png?key=zkHdZm8T8kHbUdtvCExB', {
   atttibution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

async function getResponse(){
    let information = await fetch('https://disease.sh/v3/covid-19/countries?yesterday=true');
    let content = await information.json();
   //  console.log(content);
    for (let i = 0; i < content.length; i++){
      lat = content[i]['countryInfo']['lat'];
      long = content[i]['countryInfo']['long'];
      cases = content[i]['cases'];
      // console.log(lat, long, cases);
    }
}

// let marker = L.marker([53.4, -0.02]).addTo(map);
function drawInfection() {
   for (let i = 0; i < cases.length; i++){
      console.log(lat[i]);
      let circle = L.circle([lat[i], long[i]], {
         color: 'red',
         fillColor: '#f03',
         fillOpacity: 1,
         radius: cases
      }).addTo(map);
   }
}

// circle.bindPopup('<b>Cases:</b> 2 000 324 </br> <b>Deaths:</b> 48 478');

// fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=366')
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });



getResponse();
drawInfection();