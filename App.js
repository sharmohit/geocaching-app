import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import TabContainer from './TabContainer'
import GeocacheDetailScreen from './GeocacheDetailScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabContainer} />
        <Stack.Screen name="GeocacheDetailScreen" component={GeocacheDetailScreen} options={{ title: "Geocache Detail" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}