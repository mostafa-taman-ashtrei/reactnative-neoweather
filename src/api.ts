import { WEATHER_API_KEY } from './config/apikeys';

export const getWeather = async (latitude: number, longitude: number) => {
  const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
  const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;
  const data = await fetch(weatherUrl);
  const res = data.json();
  return res;
};
