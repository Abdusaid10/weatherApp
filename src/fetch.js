const weather = {};
const getWeather = (location) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location.value}&APPID=d5760da932f26c14aa01b5addbc6ab5f`)
    .then((response) => response.json())
    // .then((response) => console.log(response.name))
    .then((response) => {
      weather.name = response.name;
      weather.tempMin = response['main']['temp_min'];
      weather.tempMax = response['main']['temp_max'];
      weather.description = response['weather'][0]['description'];
      weather.windSpeed = response.wind.speed;
      weather.clouds = response.clouds.all;
      weather.timezone = response.timezone;
      // console.log(name);
    })
    .then(() => {
      ui();
    });
};

const fahrenheitToCelsius = (temp) => {
  const c = Math.floor((5 / 9) * (temp - 32));
  return c;
};

const ui = () => {
  const name = document.querySelector('.name');
  name.innerText = weather.name;

  const tempMin = document.querySelector('.temp-min');
  tempMin.innerHTML = ''
  tempMin.innerText = Math.floor(weather.tempMin - 270);

  const tempMax = document.querySelector('.temp-max');
  tempMax.innerText = Math.floor(weather.tempMax - 270);

  const desc = document.querySelector('.desc');
  desc.innerText = weather.description;

  const windSpeed = document.querySelector('.wind-speed');
  windSpeed.innerText = weather.windSpeed;

  const clouds = document.querySelector('.clouds');
  clouds.innerText = weather.clouds;
};

export { getWeather as default };