import React from 'react';
import { View, StyleSheet } from 'react-native';

import Weather from './src/components/Weather';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Weather />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
  },
});

export default App;
