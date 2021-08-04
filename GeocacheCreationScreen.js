import React, { useState, useEffect } from 'react'
import { Text, View, Button, TextInput } from 'react-native'
import { db } from "./FirebaseManager"
import * as Location from "expo-location"
import { AppStyles } from './AppStyles'
import firebase from 'firebase/app'


const GeocacheCreationScreen = ({ navigation, route }) => {

  const [userInput, setUserInput] = useState("")
  const [location, setLocation] = useState({})
  const [cache, setcache] = React.useState('')
  const [desc, setdesc] = React.useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setcache("")
      setdesc("")
      setUserInput("")
      setLocation({})
    })
    return unsubscribe
  }, [navigation])


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
            setLocation({ lat: matchingLocation.latitude, lng: matchingLocation.longitude })
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

    console.log("Value are " + usercache + " " + userdesc + " " + JSON.stringify(userLocation))
    console.log(".......................")

    const geocache = {
      name: usercache,
      description: userdesc,
      coordinates: new firebase.firestore.GeoPoint(userLocation.lat, userLocation.lng)
    }
    db.collection("geocache").add(geocache).then().catch()
    // getDocID()
    setcache("")
    setdesc("")
    setUserInput("")
    setLocation({})
  }
  return (
    <View style={AppStyles.loginContainer}>

      <Text style={[AppStyles.bodyText, { fontSize: 17 }, { alignSelf: 'center' }, { margin: 20 }]}>Add Geocache Site</Text>

      <TextInput
        style={AppStyles.outlinedContainer}
        placeholder="Enter name of cache"
        returnKeyType="done"
        textContentType="name"
        autoCapitalize="none"
        onChangeText={setcache}
        value={cache} />

      <TextInput
        style={AppStyles.outlinedContainer}
        placeholder="Enter Description"
        returnKeyType="done"
        textContentType="name"
        autoCapitalize="none"
        onChangeText={setdesc}
        value={desc} />

      <TextInput
        style={AppStyles.outlinedContainer}
        placeholder="Enter Address"
        value={userInput}
        onChangeText={(data) => { setUserInput(data) }} />

      <View style={[AppStyles.button, AppStyles.greenButton, { marginBottom: 20 }]}>
        <Button onPress={getCoordinates} title="Get Coordinates!" />
      </View>

      <Text style={[AppStyles.bodyText, { marginBottom: 20 }]}>{JSON.stringify(location) === "{}" ? "" : "Latitude: " + JSON.stringify(location.lat)} {JSON.stringify(location) === "{}" ? "" : "Longitude: " + JSON.stringify(location.lng)}</Text>

      <View style={[AppStyles.button, AppStyles.blueButton, { marginBottom: 20 }]}>
        <Button title="Add Site" onPress={addCachePressed} />
      </View>
    </View>
  )
}

export default GeocacheCreationScreen
