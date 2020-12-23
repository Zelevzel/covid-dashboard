export { graphsConfig, graphs, statusSelected };

let contentDate = []; // дата для графика
let contentInfect = []; // значения для графика
let statusSelected = 'cases'; // заражение умерло и тд
// let TargetValue;
let graphsConfig;
let graphs;

async function getResponse(country, serch) {
  try {
    if (country !== 'all') {
      const information = await fetch(
        `   https://disease.sh/v3/covid-19/historical/${country}?lastdays=366`
      );
      const content = await information.json();

      return content.timeline[serch];
    }

    const information = await fetch(
      'https://disease.sh/v3/covid-19/historical/all?lastdays=366'
    );
    const content = await information.json();
    return content[serch];
  } catch (e) {
    const newDiv = document.createElement('div');
    newDiv.className = 'graphsInformation';
    newDiv.style =
      'top: 0; position: absolute;text-align: center; width: 100%; background-color: gray;';
    newDiv.innerHTML =
      '<img style="margin-top:5px; " src="./assetes/img/icons-information.png" width="20px"><br>we did not find information on which to build graphs';
    document.querySelector('.tableCanvas').append(newDiv);
    const information = await fetch(
      'https://disease.sh/v3/covid-19/historical/all?lastdays=366'
    );
    const content = await information.json();
    window.countrySelected = 'all';
    document.querySelector('#country').value = window.countrySelected;
    setTimeout(() => {
      document.querySelector('.graphsInformation').remove();
    }, 3000);
    return content[serch];
  }
}

function updateGraphs(ContentInfect, GraphsConfig, Graphs, ContentDate) {
  const infected = {
    label: 'date',
    data: ContentInfect,
    borderWidth: 1,
    backgroundColor: 'red',
    borderColor: 'red',
    fill: true,
    categoryPercentage: 1,
    barPercentage: 1,
  };

  GraphsConfig.data.datasets = [infected];
  GraphsConfig.data.labels = ContentDate;
  Graphs.update();
}

export function loadgraph() {
  const ctx = document.getElementById('graphs').getContext('2d');

  getResponse('all', 'cases').then((content) => {
    contentDate = [];
    contentInfect = [];

    Object.entries(content).forEach(([key, value]) => {
      contentInfect.push(value);
      contentDate.push(key);
    });
    const datasets = {
      label: 'amount',
      data: contentInfect,
      borderWidth: 1,
      backgroundColor: 'red',
      borderColor: 'red',
      fill: true,
      categoryPercentage: 1,
      barPercentage: 1,
    };

    graphsConfig = {
      type: 'bar',
      data: {
        labels: contentDate,
        unitStepSize: 0,
        datasets: [datasets],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 3,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'COVID-19',
                unitStepSize: 300000000000,
              },
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 8,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                maxTicksLimit: 8,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          // enabled: false,
        },
      },
    };
    graphs = new Chart(ctx, graphsConfig);
    document.querySelector('#country').addEventListener('change', (event) => {
      /* contentDate = [];
      contentInfect = [];
      console.log(event.currentTarget.value);
      if (window.countrySelected !== event.currentTarget.value) {
        window.countrySelected = event.currentTarget.value;
        getResponse(window.countrySelected, statusSelected).then((content) => {
          Object.entries(content).forEach(([key, value]) => {
            contentInfect.push(value);
            contentDate.push(key);
          });
          updateGraphs(contentInfect, graphsConfig, graphs, contentDate);
        });
      } */
      // eventCountry = event;
      const TargetValue = event.currentTarget.value;
      refreshGraphs(
        TargetValue,
        graphsConfig,
        graphs,
        window.countrySelected,
        statusSelected,
        '#country'
      );
    });

    document.querySelector('#status').addEventListener('change', (event) => {
      const TargetValue = event.currentTarget.value;
      refreshGraphs(
        TargetValue,
        graphsConfig,
        graphs,
        statusSelected,
        window.countrySelected,
        '#status'
      );
    });
  });
}

export function refreshGraphs(
  TargetValue,
  graphsConfig,
  graphs,
  theseChanges,
  thatInformation,
  id
) {
  contentDate = [];
  contentInfect = [];

  if (theseChanges !== TargetValue) {
    theseChanges = TargetValue;
    if (id === '#status') {
      statusSelected = theseChanges;
      getResponse(window.countrySelected, theseChanges).then((Content) => {
        Object.entries(Content).forEach(([key, value]) => {
          contentInfect.push(value);
          contentDate.push(key);
        });
        updateGraphs(contentInfect, graphsConfig, graphs, contentDate);
      });
    } else {
      window.countrySelected = theseChanges;
      getResponse(window.countrySelected, thatInformation).then((Content) => {
        Object.entries(Content).forEach(([key, value]) => {
          contentInfect.push(value);
          contentDate.push(key);
        });
        updateGraphs(contentInfect, graphsConfig, graphs, contentDate);
      });
    }
  }
}
