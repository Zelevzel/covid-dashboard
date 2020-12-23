/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
import fullScreen from './fullScreen.js';
import { loadgraph as graph } from './graph.js';
 import statistics from './statistics.js';
import map from './map.js';

const myWorker = new Worker('/.worker.js');
/*
глобальные переменные
*/
window.countrySelected = 'all'; // страна

window.onload = () => {
  myWorker.onmessage=Event;
  fullScreen();
  graph();
 statistics();
  map();
};
