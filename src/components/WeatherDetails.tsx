import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { weatherType } from '../types';

interface props {
  weatherData: weatherType;
}

const WeatherDetails: React.FC<props> = ({ weatherData }) => {
  // eslint-disable-next-line prettier/prettier
  const { name, temp, description, tempMin, tempMax, humidity, icon } = weatherData;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <View>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text style={styles.textPrimary}>{name}</Text>
      <Text style={styles.textPrimary}>{temp}°</Text>
      <Text style={styles.textSecondary}>Temp Max {tempMax}°</Text>
      <Text style={styles.textSecondary}>Temp Min {tempMin}°</Text>
      <Text style={styles.textSecondary}>Humidity {humidity}°</Text>
      <Text style={styles.weatherDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: 'center',
  },
  weatherDescription: {
    textTransform: 'capitalize',
    color: 'aqua',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  textPrimary: {
    fontSize: 40,
    color: 'aqua',
  },
  textSecondary: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
    marginTop: 10,
  },
});

export default WeatherDetails;
