import Unsplash from 'unsplash-js';

global.fetch = fetch;

const weather = {};
let bckgImg = '';
let city = '';

const FetchImage = (() => {
  const showImage = () => {
    const container = document.querySelector('.container');
    const img = document.createElement('img');
    img.src = bckgImg;
    img.classList.add('bckg-img');
    container.appendChild(img);
  };
  const getImage = (desc, name) => {
    const apiID = 'NLl2CVUZVGeBng2hZtpIOTO1nuGKTaPTvFORb6sEyOw';
    const url = `https://api.unsplash.com/search/photos/?client_id=${apiID}&query=${desc}-${name}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        const imgs = response.results;
        const random = Math.floor((Math.random() * (imgs.length - 1)) + 0);
        bckgImg = `${response.results[`${random}`].urls.regular}`;
      })
      .then(() => showImage());
  };
  return { getImage };
})();

const FetchWeather = (() => {
  const appID = 'd5760da932f26c14aa01b5addbc6ab5f';

  const ui = () => {
    const name = document.querySelector('.name');
    name.innerText = weather.name;

    const temp = document.querySelector('.temp');
    temp.innerText = Math.floor(weather.temp - 270);

    const tempMin = document.querySelector('.temp-min');
    tempMin.innerHTML = '';
    tempMin.innerText = Math.floor(weather.tempMin - 270);

    const tempMax = document.querySelector('.temp-max');
    tempMax.innerText = Math.floor(weather.tempMax - 270);

    const desc = document.querySelector('.desc');
    desc.innerText = weather.description;

    const icon = document.querySelector('.icon');
    icon.src = `http://openweathermap.org/img/w/${weather.icon}.png`;

    const windSpeed = document.querySelector('.wind-speed');
    windSpeed.innerText = weather.windSpeed;

    const clouds = document.querySelector('.clouds');
    clouds.innerText = weather.clouds;
  };

  const getWeather = (location) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${appID}`, { mode: 'cors' })
      .then((response) => response.json())
      .then((response) => {
        weather.name = response.name;
        weather.temp = response['main']['temp'];
        weather.tempMin = response['main']['temp_min'];
        weather.tempMax = response['main']['temp_max'];
        weather.description = response['weather'][0]['description'];
        weather.icon = response.weather['0']['icon'];
        weather.windSpeed = response.wind.speed;
        weather.clouds = response.clouds.all;
        weather.timezone = response.timezone;
        console.log(response);
        FetchImage.getImage(weather.description, weather.name);
      })
      .then(() => {
        ui();
      });
  };

  const fahrenheitToCelsius = (temp) => {
    const c = Math.floor((5 / 9) * (temp - 32));
    return c;
  };

  return { getWeather };
})();

const Geolocation = (() => {
  const getLoc = () => {
    fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((response) => {
        city = `${response.city}`;
        FetchWeather.getWeather(city);
      });
  };
  return { getLoc };
})();

export { Geolocation, FetchWeather };