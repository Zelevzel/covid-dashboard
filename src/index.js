import fullScreen from './fullScreen.js';
import graph from './graph.js';
/*
глобальные переменные
*/
window.countrySelected = 'all'; // страна

window.onload = () => {
  fullScreen();
  graph();
};
