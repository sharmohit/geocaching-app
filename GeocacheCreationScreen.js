import { StatusBar } from 'expo-status-bar';
import React , {useState, useRef} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Dimensions } from 'react-native';
import { db } from "./FirebaseManager";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as Location from "expo-location"


const GeocacheCreationScreen = ({ navigation, route }) => {

  const [userInput, setUserInput] = useState("")
  const [location, setLocation] = useState({})
  const [cache, setcache] = React.useState('')
  const [desc, setdesc] = React.useState('')
//   const [myArray, setMyArray] = useState([]);


  const getCoordinates = () => {
    console.log('Getting the address...')
    Location.geocodeAsync(userInput)
    .then(
      (resultsArray) => {
        if (resultsArray.length === 0) {
          console.log(`No results found for the address`)
        }
        else {
      
          const matchingLocation = resultsArray[0]
          console.log('Found a matching coordinate')
          console.log(matchingLocation)
          setLocation({lat:matchingLocation.latitude, lng:matchingLocation.longitude})

        // const tempGeoPoint = new GeoPoint ({latitude :matchingLocation.latitude, longitude : matchingLocation.longitude} )
        // console.log("Geo point is : " + tempGeoPoint)
        // setLocation(tempGeoPoint)

        // use coordinates as an array : 
        //   setMyArray(oldArray => [...oldArray, matchingLocation.latitude]);
        //   setMyArray(oldArray => [...oldArray, matchingLocation.longitude]);
        //   console.log("Array is : " + setMyArray)

          setUserInput("")
        }
      }
    )
    .catch(
      (err) => {
        console.log(err)
      }
    )
  }

  const addCachePressed = () => {
   console.log("Adding Cache to the firestore")

        let usercache = cache
        let userdesc = desc
        let userLocation = location

        console.log("Value are " + usercache + " " + userdesc  + " " + userLocation)
        console.log(".......................")

        const geocache = {
            name: usercache,
            description: userdesc,
            coordinates : userLocation,
        }
        // 2. save it to Firestore
        db.collection("geocache").add(geocache).then().catch()
        // getDocID()

}
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     
      <Text>Create GEOCACHING</Text>
  

            <Text>Enter name of cache : </Text>

                        <TextInput
                            placeholder="cache"
                            returnKeyType="done"
                            textContentType="name"
                            autoCapitalize="none"
                            onChangeText={setcache}
                            value={cache} />

                        <Text>Description </Text>

                        <TextInput
                            placeholder="description"
                            returnKeyType="done"
                            textContentType="name"
                            autoCapitalize="none"
                            onChangeText={setdesc}
                            value={desc} />


                            <Text>Enter Your Address </Text>
      <TextInput
        placeholder="Enter your address"
        value={userInput}
        onChangeText={(data)=>{setUserInput(data)}}/>
      <Button onPress={getCoordinates} title="Get Coordinates!"/>
      <Text>{JSON.stringify(location)}</Text>

      <Button title="Add Cache" onPress={addCachePressed} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default GeocacheCreationScreen
