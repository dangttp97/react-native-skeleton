import React from 'react';
import { useFlipper } from '@react-navigation/devtools';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import { AppNavigationType } from './type';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, UserProfile } from '@screens';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const appNavigationRef = useNavigationContainerRef<AppNavigationType>();

  useFlipper(appNavigationRef);

  return (
    <NavigationContainer ref={appNavigationRef}>
      <StatusBar translucent />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
