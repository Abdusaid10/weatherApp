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

  const cToF = (temp) => (Math.floor((9 / 5) * temp) + 32);

  const handler = () => {
    const tmp = Math.floor(weather.temp - 270);
    const temp = document.querySelector('.temp');
    temp.addEventListener('click', () => {
      if (weather.stat === 0) {
        temp.innerHTML = '';
        // const f = cToF(tmp);
        temp.innerHTML = `${cToF(tmp)}&#176 F`;
        weather.stat = 1;
      } else {
        temp.innerHTML = '';
        temp.innerHTML = `${tmp}&#176 C`;
        weather.stat = 0;
      }
    });
  };

  const ui = () => {
    const name = document.querySelector('.name');
    name.innerText = `${weather.name}, ${weather.cntr}`;

    const temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.floor(weather.temp - 270)}&#176 C`;
    handler();

    const time = document.querySelector('.time');
    const currentTimeDate = new Date();
    let minutes = currentTimeDate.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    time.innerText = `${currentTimeDate.getHours()}:${minutes}`;

    const days = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const today = document.querySelector('.date');
    const day = days[currentTimeDate.getDay()];
    const month = months[currentTimeDate.getMonth()];
    const date = currentTimeDate.getDate();
    const year = currentTimeDate.getFullYear();
    today.innerText = `${day}, ${month} ${date}, ${year}`;

    const desc = document.querySelector('.desc');
    desc.innerText = weather.description;

    const icon = document.querySelector('.icon');
    icon.src = `http://openweathermap.org/img/w/${weather.icon}.png`;

    const windSpeed = document.querySelector('.wind-speed');
    windSpeed.innerText = `${weather.windSpeed} m/h`;

    const visibility = document.querySelector('.visibility');
    visibility.innerText = `${((weather.visibility) / 1000).toFixed(2)} km`;

    const humidity = document.querySelector('.humidity');
    humidity.innerText = `${weather.humidity}%`;

    const clouds = document.querySelector('.clouds');
    clouds.innerText = `${weather.clouds}%`;
  };

  const getWeather = async (location) => {
    await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${appID}`, { mode: 'cors' })
      .then((response) => response.json())
      .then((response) => {
        weather.name = response.name;
        weather.cntr = response.sys.country;
        weather.temp = response.main.temp;
        weather.stat = 0;
        weather.description = response.weather[0].description;
        weather.icon = response.weather[0].icon;
        weather.windSpeed = response.wind.speed;
        weather.visibility = response.visibility;
        weather.humidity = response.main.humidity;
        weather.clouds = response.clouds.all;
        FetchImage.getImage(weather.description, weather.name);
      })
      .then(() => {
        ui();
      });
  };

  return { getWeather, cToF };
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