onmessage = function run(info) {
  let divGlobalInf = '';
  for (const key in info.data.data) {
    divGlobalInf += `<p class="countrySelected" data-country='${info.data.data[key].country}'><img src='${info.data.data[key].flag}'></img>${info.data.data[key].country}</p> `;
    switch (info.data.choice) {
      case 'cases':
        divGlobalInf += `<p style='color:yellow; border-bottom: solid 2px; border-color:black; margin-bottom: 3px;'>${info.data.data[key].cases} Cases</p>`;
        break;
      case 'deaths':
        divGlobalInf += `<p style='color:red; border-bottom: solid 2px;border-color:black;'>${info.data.data[key].deaths} Deaths</p>`;
        break;
      case 'recovered':
        divGlobalInf += `<p style='color:green; border-bottom: solid 2px;border-color:black;'>${info.data.data[key].recovered} Recovered</p>`;
        break;
      default:
        divGlobalInf += `<p style='color:yellow; border-bottom: solid 2px;border-color:black;'>${info.data.data[key].cases} Cases</p>`;
        break;
    }
  }

  postMessage(divGlobalInf);
};
