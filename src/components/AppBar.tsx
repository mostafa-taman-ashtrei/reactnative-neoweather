import React from 'react';
import { HStack, StatusBar, Text } from 'native-base';

const AppBar: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <HStack
        bg="white"
        px="1"
        py="3"
        display="flex"
        justifyContent="space-between"
        alignItems="center">
        <HStack space="md" alignItems="flex-start">
          <Text color="black" fontSize="20" fontWeight="bold">
            NeoWeather
          </Text>
        </HStack>
      </HStack>
    </>
  );
};

export default AppBar;
