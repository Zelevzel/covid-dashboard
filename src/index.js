import fullScreen from './fullScreen.js';
import { loadgraph as graph } from './graph.js';
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
