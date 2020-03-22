import _ from 'lodash';
import './assets/style.css';

import { FetchWeather, Geolocation } from './fetch';


// FetchWeather.currentLocationWeather();
Geolocation.getLoc();
const eventListener = () => {
  const btn = document.querySelector('#submitBtn');

  const city = document.querySelector('#city-val');
  btn.addEventListener('click', () => {
    FetchWeather.getWeather(city.value);
    // FeatchImage.getImage();
    // ui();
  });
};

eventListener();
