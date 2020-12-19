import fullScreen from './fullScreen.js';
import graph from './graph.js';
import statistics from './statistics.js';
/*
глобальные переменные
*/
window.countrySelected = 'all'; // страна

window.onload = () => {
  fullScreen();
  graph();
  statistics();
};
