import '../styles/scss.scss';

import '../styles/map.css';
import '../styles/style.css';
import './getDataListFunctions';
import './DOMContentLoaded';
import './globalDOMElements';
import './filtersTableList';

import fullScreen from './fullScreen';
import { loadgraph as graph } from './graph';
import statistics from './statistics';
import map from './map';
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
