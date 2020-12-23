import '../styles/scss.scss';
import './getDataListFunctions.js';
import './DOMContentLoaded.js';
import './globalDOMElements.js';
import './filtersTableList.js';

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
