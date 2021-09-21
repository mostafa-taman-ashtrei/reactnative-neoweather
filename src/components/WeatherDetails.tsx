import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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
    <View>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>{description}</Text>

      <View>
        <Text style={[styles.tempText, { color: colors[condition] }]}>
          {Math.floor(temp)}°
          <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
        </Text>
      </View>

      <Text style={[styles.tempSecText, { color: colors[condition] }]}>
        Temp Min {tempMin}°
      </Text>
      <Text style={[styles.tempSecText, { color: colors[condition] }]}>
        Temp Max {tempMax}°
      </Text>
      <Text style={[styles.tempSecText, { color: colors[condition] }]}>
        Humidity {humidity}°
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tempText: {
    fontSize: 72,
    color: '#fff',
  },
  tempSecText: {
    fontSize: 22,
  },
  title: {
    fontSize: 60,
    color: '#fff',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
});

export default WeatherDetails;
