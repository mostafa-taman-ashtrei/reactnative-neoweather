import React from 'react';
import { Box, NativeBaseProvider } from 'native-base';
import Weather from './src/components/Weather';

const App: React.FC = () => {
  return (
    <NativeBaseProvider>
      <Box bg="darkBlue.900" width="100%" height="100%">
        <Weather />
      </Box>
    </NativeBaseProvider>
  );
};

export default App;
