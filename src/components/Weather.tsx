import React, { useState } from 'react';
import { Button, View } from 'react-native';
import RNLocation from 'react-native-location';
import { getWeather } from '../api';
import { weatherType } from '../types';
import WeatherDetails from './WeatherDetails';

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<weatherType>();

  const getLocation = async () => {
    let permission = await RNLocation.checkPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse', // or 'fine'
      },
    });

    let location;

    if (!permission) {
      permission = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
          rationale: {
            title: 'We need to access your location',
            message: 'We use your location to show where you are on the map',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });
      console.log(permission);
      location = await RNLocation.getLatestLocation({ timeout: 100 });
      console.log(location);

      getWeatherByGeoLocation(
        Number(location?.latitude),
        Number(location?.longitude),
      );
    } else {
      location = await RNLocation.getLatestLocation({ timeout: 100 });
      console.log(location);

      getWeatherByGeoLocation(
        Number(location?.latitude),
        Number(location?.longitude),
      );
    }
  };

  const getWeatherByGeoLocation = async (lat: number, long: number) => {
    try {
      const weatherData = await getWeather(lat, long);
      setWeather({
        name: weatherData.name,
        temp: weatherData.main.temp,
        tempMin: weatherData.main.temp_min,
        tempMax: weatherData.main.temp_max,
        humidity: weatherData.main.humidity,
        icon: weatherData.weather[0].icon,
        description: weatherData.weather[0].description,
      });
    } catch (e) {
      console.log(e);
    }
  };

  console.log(weather);

  return (
    <View>
      <Button onPress={getLocation} title="Get Weather At my location" />
      {weather && <WeatherDetails weatherData={weather} />}
    </View>
  );
};

export default Weather;
