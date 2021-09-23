import React from 'react';
import { Box, NativeBaseProvider } from 'native-base';
import Orientation from 'react-native-orientation-locker';
import Weather from './src/components/Weather';
import AppBar from './src/components/AppBar';

const App: React.FC = () => {
  Orientation.lockToPortrait();

  return (
    <NativeBaseProvider>
      <AppBar />
      <Box bg="darkBlue.900" width="100%" height="100%">
        <Weather />
      </Box>
    </NativeBaseProvider>
  );
};

export default App;
