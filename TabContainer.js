import React from 'react'
import GeocacheListScreen from './GeocacheListScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FavoriteScreen from './FavoriteScreen'

const TabContainer = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Sites') {
            iconName = focused
              ? 'list' : 'list-outline'
          } else if (route.name === 'Favorites') {
            iconName = focused
              ? 'heart' : 'heart-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: '#1EA352',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Sites" component={GeocacheListScreen} />
      <Tab.Screen name="Favorites" component={FavoriteScreen} />
    </Tab.Navigator>
  )
}

export default TabContainer