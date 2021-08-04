import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import TabContainer from './TabContainer'
import GeocacheDetailScreen from './GeocacheDetailScreen'
import SignIn from './SignInScreen';
import SignUp from './SignUpScreen';
import GeocacheCreationScreen from "./GeocacheCreationScreen"

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign In">
        <Stack.Screen name = "Sign In" component = {SignIn}/>
        <Stack.Screen name = "Sign Up" component = {SignUp}/>
        <Stack.Screen name="Home" component={TabContainer} />
        <Stack.Screen name = "GeocacheCreationScreen" component = {GeocacheCreationScreen}/> 
        <Stack.Screen name="GeocacheDetailScreen" component={GeocacheDetailScreen} options={{ title: "Geocache Detail" }} />   
      </Stack.Navigator>
    </NavigationContainer>
  )
}