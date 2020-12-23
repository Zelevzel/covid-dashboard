/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
import fullScreen from './fullScreen.js';
import { loadgraph as graph } from './graph.js';
import statistics from './statistics.js';
import map from './map.js';

/*
глобальные переменные
*/
window.countrySelected = 'all'; // страна

window.onload = () => {
  fullScreen();
  graph();
  statistics();
  map();
};
