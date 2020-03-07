import _ from 'lodash';
import './assets/style.css';

import getWeather from './fetch';

const eventListener = () => {
  const btn = document.querySelector('#submitBtn');

  const city = document.querySelector('#city-val');
  btn.addEventListener('click', () => {
    getWeather(city);
    // ui();
  });
};


// forecast(city);
eventListener();
