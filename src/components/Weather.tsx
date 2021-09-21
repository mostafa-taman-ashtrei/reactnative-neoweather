import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNLocation from 'react-native-location';
import { getWeather } from '../api';
import { weatherType } from '../types';
import WeatherDetails from './WeatherDetails';

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<weatherType>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      let permission = await RNLocation.checkPermission({
        ios: 'whenInUse', // or 'always'
        android: {
          detail: 'coarse', // or 'fine'
        },
      });

      console.log(permission);
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

    fetchWeather();
  }, []);

  const getWeatherByGeoLocation = async (lat: number, long: number) => {
    const apiRes = await getWeather(lat, long);

    if (apiRes.e == null) {
      const weatherData = apiRes.data;

      setWeather({
        name: weatherData.name,
        temp: weatherData.main.temp,
        tempMin: weatherData.main.temp_min,
        tempMax: weatherData.main.temp_max,
        humidity: weatherData.main.humidity,
        icon: weatherData.weather[0].icon,
        description: weatherData.weather[0].description,
        condition: weatherData.weather[0].main,
      });
    }

    return setError(apiRes.e);
  };

  console.log(weather);

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={{ color: 'white', backgroundColor: 'red' }}>{error}</Text>
      ) : null}
      {weather && error == null ? (
        <WeatherDetails weatherData={weather} />
      ) : (
        // <Button onPress={getLocation} title="Get Weather At my location" />
        <Text style={{ color: 'white', backgroundColor: 'teal' }}>
          Getting Weather data for your location
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000230', // '#272343',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
});

export default Weather;
