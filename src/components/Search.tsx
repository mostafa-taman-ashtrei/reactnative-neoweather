import React, { useState } from 'react';
import { Box, Input, Toast } from 'native-base';
import { getWeatherByCity } from '../api';
import { weatherType } from '../types';

interface props {
  setWeather: React.Dispatch<React.SetStateAction<weatherType | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<props> = ({ setWeather, setLoading }) => {
  const [city, setCity] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (city != null) {
      setWeather(null);
      setLoading(true);
      const apiRes = await getWeatherByCity(city);

      if (apiRes.e == null) {
        const weatherData = apiRes.data;
        setLoading(false);

        return setWeather({
          name: weatherData.name,
          temp: weatherData.main.temp,
          tempMin: weatherData.main.temp_min,
          tempMax: weatherData.main.temp_max,
          humidity: weatherData.main.humidity,
          icon: weatherData.weather[0].icon,
          description: weatherData.weather[0].description,
          condition: weatherData.weather[0].main,
        });
      } else {
        setLoading(false);
        return Toast.show({
          title: apiRes.e,
          bgColor: 'red.500',
        });
      }
    }
  };

  return (
    <Box>
      <Input
        variant="rounded"
        fontSize={20}
        m={5}
        placeholder="City ..."
        color="white"
        onChangeText={text => setCity(text)}
        onSubmitEditing={handleSubmit}
      />
    </Box>
  );
};

export default Search;
