import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer} from '@react-navigation/native'
import GeocacheListScreen from './GeocacheListScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="GeocacheListScreen">
        <Stack.Screen name="GeocacheListScreen" component={GeocacheListScreen} options={{title: "Geocaching Sites"}}/>
      </Stack.Navigator> */}
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Sites') {
            iconName = focused
              ? 'list' : 'list-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#1EA352',
        inactiveTintColor: 'gray',
      }}>
        <Tab.Screen name="Sites" component={GeocacheListScreen} />
      </Tab.Navigator>
    </NavigationContainer>


{/* <NavigationContainer>
<Stack.Navigator initialRouteName="signIn">
  <Stack.Screen name = "signIn" component = {signIn}/>
  <Stack.Screen name = "signUp" component = {signUp}/>
  <Stack.Screen name = "main" component = {main} initialParams={{userEmail: "test@gmail.com"}} 
    options = { ({route}) => ({userEmail: route.params.userEmail})}
/>
</Stack.Navigator>
</NavigationContainer> */}


  );
}