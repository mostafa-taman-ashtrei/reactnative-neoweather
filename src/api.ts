import axios from 'axios';
import { WEATHER_API_KEY } from './config/apikeys';

const isLatitude = (num: number) => isFinite(num) && Math.abs(num) <= 90;
const isLongitude = (num: number) => isFinite(num) && Math.abs(num) <= 180;

export const getWeather = async (latitude: number, longitude: number) => {
  if (!isLatitude(latitude) || !isLongitude(longitude)) {
    return { data: null, e: 'Invalid coordicates ...' };
  }

  try {
    const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
    const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&units=metric&lon=${longitude}&appid=${WEATHER_API_KEY}`;
    const res = await axios.get(weatherUrl);
    return { data: res.data, e: null };
  } catch (e) {
    console.log(e);
    return { data: null, e: 'Server Error ...' };
  }
};
