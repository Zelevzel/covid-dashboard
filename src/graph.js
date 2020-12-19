let contentDate = []; // дата для графика
let contentInfect = []; // значения для графика
let statusSelected = 'cases'; // заражение умерло и тд

async function getResponse(country, serch) {
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
}

export default function loadgraph() {
  const ctx = document.getElementById('graphs').getContext('2d');

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

  getResponse('all', 'cases').then((content) => {
    contentDate = [];
    contentInfect = [];

    Object.entries(content).forEach(([key, value]) => {
      contentInfect.push(value);
      contentDate.push(key);
    });
    const datasets = {
      label: 'date',
      data: contentInfect,
      borderWidth: 1,
      backgroundColor: 'red',
      borderColor: 'red',
      fill: true,
      categoryPercentage: 1,
      barPercentage: 1,
    };

    const graphsConfig = {
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
    const graphs = new Chart(ctx, graphsConfig);
    document.querySelector('#country').addEventListener('click', (event) => {
      contentDate = [];
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
      }
    });

    document.querySelector('#status').addEventListener('click', (event) => {
      contentDate = [];
      contentInfect = [];
      console.log(event.currentTarget.value);
      if (statusSelected !== event.currentTarget.value) {
        statusSelected = event.currentTarget.value;
        getResponse(window.countrySelected, statusSelected).then((Content) => {
          Object.entries(Content).forEach(([key, value]) => {
            contentInfect.push(value);
            contentDate.push(key);
          });
          updateGraphs(contentInfect, graphsConfig, graphs, contentDate);
        });
      }
    });
  });
}
