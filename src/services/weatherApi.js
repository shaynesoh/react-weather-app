const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const fetchWeatherData = (dataType, searchParams) => {
  const url = new URL(`${BASE_URL}/${dataType}`);
  const params = {
    ...searchParams,
    appid: API_KEY,
    units: "metric",
  };
  url.search = new URLSearchParams(params).toString();
  return fetch(url)
    .then((res) => res.json());
};

const currentWeatherFormat = (data) => {
  let {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    sys: { country, sunrise, sunset },
    wind: { speed },
    name,
    dt,
    weather
  } = data;

  const { main: details, icon, main, description } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    main,
    description,
    icon,
    speed,
  };
};

function forecastWeatherFormat(data) {
  const days = [];
  const hours = [];
  const currentDate = new Date().toISOString().slice(0, 10);

  for (let i = 0; i < data.list.length; i += 8) {
    const forecastDate = data.list[i].dt_txt.slice(0, 10);
    if (forecastDate !== currentDate && days.length < 5) {
      const temp = data.list[i].main.temp;
      const date = new Date(data.list[i].dt_txt).toLocaleDateString();
      const { main, icon, description } = data.list[i].weather[0];
      days.push({ date, temp, main, icon, description });
    }
  }

  for (let i = 0; i < data.list.length; i++) {
    const forecastDate = data.list[i].dt_txt.slice(0, 10);
    if (forecastDate === currentDate && hours.length < 5) {
      const hour = new Date(data.list[i].dt_txt).getHours();
      const temp = data.list[i].main.temp;
      const { main, icon, description } = data.list[i].weather[0];
      hours.push({ hour, temp, main, icon, description });
    }
    if (hours.length === 5) {
      break;
    }
  }
  return { days, hours };
}

const fetchFormattedData = async (searchParams) => {
  const fetchCurrentWeather = await fetchWeatherData("weather", searchParams)
    .then(
      currentWeatherFormat
    );
  const forecastSearchParams = {
    lat: fetchCurrentWeather.lat,
    lon: fetchCurrentWeather.lon,
    exclude: "minutely",
    appid: API_KEY,
    units: "metric"
  };
  const fetchForecastWeather = await fetchWeatherData("forecast", forecastSearchParams)
    .then(
      forecastWeatherFormat
    )
  return { ...fetchCurrentWeather, ...fetchForecastWeather };
};

export default fetchFormattedData;