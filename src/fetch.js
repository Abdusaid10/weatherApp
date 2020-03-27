const FetchImage = (() => {
  const getImage = async (desc, name) => {
    try {
      const apiID = 'NLl2CVUZVGeBng2hZtpIOTO1nuGKTaPTvFORb6sEyOw';
      const url = `https://api.unsplash.com/search/photos/?client_id=${apiID}&query=${desc}-${name}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      return err;
    }
  };
  return { getImage };
})();

const FetchWeather = (() => {
  const appID = 'd5760da932f26c14aa01b5addbc6ab5f';
  const init = (data) => ({
    name: data.name,
    cntr: data.sys.country,
    temp: data.main.temp,
    stat: 0,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    windSpeed: data.wind.speed,
    visibility: data.visibility,
    humidity: data.main.humidity,
    clouds: data.clouds.all,
  });

  const getWeather = async (location) => {
    try {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${appID}`;
      const response = await fetch(url, { mode: 'cors' });
      const data = await response.json();
      return init(data);
    } catch (err) {
      return err;
    }
  };

  return { getWeather };
})();

const Geolocation = (() => {
  const getLoc = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return `${data.city}`;
    } catch (err) {
      return err;
    }
  };
  return { getLoc };
})();

const UI = (() => {
  const container = document.querySelector('.container');
  const img = document.createElement('img');
  const name = document.querySelector('.name');
  const temp = document.querySelector('.temp');

  const time = document.querySelector('.time');
  const currentTimeDate = new Date();
  let minutes = currentTimeDate.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
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
  const desc = document.querySelector('.desc');
  const icon = document.querySelector('.icon');
  const windSpeed = document.querySelector('.wind-speed');
  const visibility = document.querySelector('.visibility');
  const humidity = document.querySelector('.humidity');
  const clouds = document.querySelector('.clouds');

  const cToF = (temp) => (Math.floor((9 / 5) * temp) + 32);

  const render = (data) => {
    name.innerText = `${data.name}, ${data.cntr}`;
    temp.innerHTML = `${Math.floor(data.temp - 270)}&#176 C`;
    temp.addEventListener('click', () => {
      const tmp = Math.floor(data.temp - 270);
      if (data.stat === 0) {
        temp.innerHTML = '';
        temp.innerHTML = `${cToF(tmp)}&#176 F`;
        data.stat = 1;
      } else {
        temp.innerHTML = '';
        temp.innerHTML = `${tmp}&#176 C`;
        data.stat = 0;
      }
    });

    time.innerText = `${currentTimeDate.getHours()}:${minutes}`;
    today.innerText = `${day}, ${month} ${date}, ${year}`;

    desc.innerText = `${data.description}`;
    icon.src = `http://openweathermap.org/img/w/${data.icon}.png`;
    windSpeed.innerText = `${data.windSpeed} m/h`;
    visibility.innerText = `${((data.visibility) / 1000).toFixed(2)} km`;
    humidity.innerText = `${data.humidity}%`;
    clouds.innerText = `${data.clouds}%`;
  };
  const currentLocWeather = async () => {
    const currentLoc = await Geolocation.getLoc();
    const response = await FetchWeather.getWeather(`${currentLoc}`);
    const bckgImg = await FetchImage.getImage(response.description, response.name);
    const imgs = await bckgImg.results;
    const random = Math.floor((Math.random() * (imgs.length - 1)) + 0);
    const ran = `${bckgImg.results[`${random}`].urls.regular}`;
    img.src = ran;
    img.classList.add('bckg-img');
    container.appendChild(img);
    render(response);
  };
  const search = async (city) => {
    const weatherData = await FetchWeather.getWeather(city);
    const bckgImg = await FetchImage.getImage(weatherData.description, weatherData.name);
    const imgs = await bckgImg.results;
    const random = Math.floor((Math.random() * (imgs.length - 1)) + 0);
    const ran = `${bckgImg.results[`${random}`].urls.regular}`;
    img.src = ran;
    img.classList.add('bckg-img');
    container.appendChild(img);
    render(weatherData);
  };
  return { currentLocWeather, search };
})();

export { Geolocation, FetchWeather, UI };