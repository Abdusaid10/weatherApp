import _ from 'lodash';
import './assets/style.css';

import { FetchWeather, Geolocation } from './fetch';

Geolocation.getLoc();
const eventListener = () => {
  const btn = document.querySelector('#searchBtn');

  const city = document.querySelector('#city-val');
  btn.addEventListener('click', () => {
    FetchWeather.getWeather(city.value);
  });

  // const temp = document.querySelector('.temp');
  // temp.addEventListener('click', () => {

  // });
};

eventListener();
