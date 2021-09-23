import React from 'react';
import { ArrowDownIcon, ArrowUpIcon, Box, Image, Text } from 'native-base';
import { weatherType } from '../types';
import { colors } from '../utils/weatherConditionColors';

interface props {
  weatherData: weatherType;
}

const WeatherDetails: React.FC<props> = ({ weatherData }) => {
  const {
    name,
    temp,
    description,
    tempMin,
    tempMax,
    humidity,
    icon,
    condition,
  } = weatherData;

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <Box alignItems="center" w="100%">
      <Text fontSize={60} color="white">
        {name}
      </Text>
      <Text fontSize={24} color="white">
        {description}
      </Text>

      <Box bgColor={colors[condition]} m={2}>
        <Text fontSize={72} color="white">
          {Math.round(temp)}°
          <Image
            source={{
              uri: iconUrl,
            }}
            alt="Alternate Text"
            size="xl"
          />
        </Text>
      </Box>

      <Box alignContent="center">
        <Text fontSize={22} color="white">
          <ArrowUpIcon color="white" /> {tempMax}°
        </Text>

        <Text fontSize={22} color="white">
          <ArrowDownIcon color="white" /> {tempMin}°
        </Text>
        <Text fontSize={22} color="white">
          Humidity {humidity}°
        </Text>
      </Box>
    </Box>
  );
};

export default WeatherDetails;
