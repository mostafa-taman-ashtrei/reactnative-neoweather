import axios from 'axios';
import { WEATHER_API_KEY } from './config/apikeys';

const isLatitude = (num: number) => isFinite(num) && Math.abs(num) <= 90;
const isLongitude = (num: number) => isFinite(num) && Math.abs(num) <= 180;

const BASE_API_URL = 'https://api.openweathermap.org/data/2.5/weather?';

const makeApiCall = async (url: string) => {
  try {
    const res = await axios.get(url);
    return { data: res.data, e: null };
  } catch (e) {
    console.log(e);
    return { data: null, e: 'Server Error ...' };
  }
};

export const getWeather = async (latitude: number, longitude: number) => {
  if (!isLatitude(latitude) || !isLongitude(longitude)) {
    return { data: null, e: 'Invalid coordicates ...' };
  }

  const url = `${BASE_API_URL}lat=${latitude}&units=metric&lon=${longitude}&appid=${WEATHER_API_KEY}`;
  const res = await makeApiCall(url);
  return res;
};

export const getWeatherByCity = async (city: string) => {
  const url = `${BASE_API_URL}q=${city}&units=metric&appid=${WEATHER_API_KEY}`;
  const res = await makeApiCall(url);
  return res;
};
