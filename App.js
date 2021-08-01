import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer} from '@react-navigation/native'
import GeocacheListScreen from './GeocacheListScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GeocacheListScreen">
        <Stack.Screen name="GeocacheListScreen" component={GeocacheListScreen} options={{title: "Geocaching Sites"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}