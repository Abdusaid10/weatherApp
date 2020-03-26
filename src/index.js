import _ from 'lodash';
import './assets/style.css';

import { UI } from './fetch';

UI.currentLocWeather();
const eventListener = () => {
  const btn = document.querySelector('#searchBtn');
  const city = document.querySelector('#city-val');
  btn.addEventListener('click', () => {
    UI.search(city.value);
  });
};

eventListener();