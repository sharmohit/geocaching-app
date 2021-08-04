import React, { useEffect } from 'react'
import GeocacheListScreen from './GeocacheListScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FavoriteScreen from './FavoriteScreen'
import GeocacheCreationScreen from './GeocacheCreationScreen'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const TabContainer = ({ navigation, route }) => {
  console.log("TabBar:: " + route.params.userId)
  const Tab = createBottomTabNavigator()

  const signOutPressed = () => {
    navigation.replace("Sign In")
    AsyncStorage.setItem("userID", "")
  }

  const nav = useNavigation()
  useEffect(() => {
    nav.setOptions({
      headerRight: () => <Button title="Sign Out" onPress={signOutPressed} />,
    })
  })

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
          } else if (route.name === 'Add Site') {
            iconName = focused
              ? 'add' : 'add-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: '#1EA352',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Sites" component={GeocacheListScreen} initialParams={route.params} />
      <Tab.Screen name="Add Site" component={GeocacheCreationScreen} initialParams={route.params} />
      <Tab.Screen name="Favorites" component={FavoriteScreen} initialParams={route.params} />
    </Tab.Navigator>
  )
}

export default TabContainer