import { Box, Center, Heading, HStack, Spinner, Toast } from 'native-base';
import React, { useEffect, useState } from 'react';
import RNLocation from 'react-native-location';
import { getWeather } from '../api';
import { weatherType } from '../types';
import WeatherDetails from './WeatherDetails';
import Search from './Search';

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<weatherType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeather = async () => {
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

        location = await RNLocation.getLatestLocation({ timeout: 100 });

        getWeatherByGeoLocation(
          Number(location?.latitude),
          Number(location?.longitude),
        );
      } else {
        location = await RNLocation.getLatestLocation({ timeout: 100 });

        getWeatherByGeoLocation(
          Number(location?.latitude),
          Number(location?.longitude),
        );
      }
    };

    fetchWeather();
  }, []);

  const getWeatherByGeoLocation = async (lat: number, long: number) => {
    setLoading(true);
    setWeather(null);

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

      return setLoading(false);
    }

    Toast.show({
      title: apiRes.e,
      bgColor: 'red.500',
    });

    return setLoading(false);
  };

  console.log(weather);

  return (
    <>
      <Box>
        {loading ? (
          <Center>
            <HStack space={2} alignItems="center" m={8}>
              <Heading color="primary.500" fontSize="3xl">
                Loading
              </Heading>
              <Spinner />
            </HStack>
          </Center>
        ) : null}
        {weather != null ? (
          <>
            <Search setWeather={setWeather} setLoading={setLoading} />
            <WeatherDetails weatherData={weather} />
          </>
        ) : null}
      </Box>
    </>
  );
};

export default Weather;
