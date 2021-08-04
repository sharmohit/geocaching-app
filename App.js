import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import TabContainer from './TabContainer'
import GeocacheDetailScreen from './GeocacheDetailScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="signIn">
        <Stack.Screen name = "signIn" component = {signIn}/>
        <Stack.Screen name = "signUp" component = {signUp}/>
        <Stack.Screen name = "main" component = {main} initialParams={{userEmail: "test@gmail.com"}} 
          options = { ({route}) => ({userEmail: route.params.userEmail})}/>   
        <Stack.Screen name="Home" component={TabContainer} />
        <Stack.Screen name="GeocacheDetailScreen" component={GeocacheDetailScreen} options={{ title: "Geocache Detail" }} />   
      </Stack.Navigator>
    </NavigationContainer>
  )
}