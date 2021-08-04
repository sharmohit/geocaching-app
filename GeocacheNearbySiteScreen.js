import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { db } from "./FirebaseManager"
import * as Location from "expo-location"
import MapView, { Marker } from 'react-native-maps'
import * as Utils from "./Utilities"

const GeocacheNearbySiteScreen = ({ navigation, route }) => {

  const MAX_DISTANCE_KM = 5.0
  const [currRegion, setCurrRegion] = useState({
    latitude: 45.5163539,
    longitude: -73.5775142,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05
  })

  const [currCoord, setCurrCoord] = useState({})
  const mapRef = useRef(null)
  const [dataArray, setDataArray] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Location.requestForegroundPermissionsAsync()
        .then((result) => {
          if (result.status === "granted") {
            return Location.getCurrentPositionAsync({})
          } else {
            throw new Error("Location permission not granted")
          }
        })
        .then((location) => {
          console.log("Loc:" + location.coords.latitude)
          const coordinates = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }

          mapRef.current.animateCamera(
            { center: coordinates }, 2000
          )
          setCurrCoord(coordinates)
          db.collection("geocache").get()
            .then((querySnapshot) => {
              let temp = []
              if (querySnapshot.empty) {
                setMsg("No Geocaching Sites Available")
                setLoading(false)
              }
              querySnapshot.forEach((doc) => {
                const distance = Utils.getHaversineDistance(
                  location.coords.latitude,
                  location.coords.longitude,
                  doc.data().coordinates.latitude,
                  doc.data().coordinates.longitude
                ).toFixed(1)
                if (distance <= MAX_DISTANCE_KM) {
                  temp.push(doc.data())
                }
              }
              )
              setDataArray(temp)
            })
            .catch((error) => {
              console.error(error)
            })
        })
        .catch((error) => {
          console.error(error)
        })
    })
    return unsubscribe

  }, [navigation])


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MapView
        style={{ width: Dimensions.get("window").width, height: 500 }}
        initialRegion={currRegion}
        ref={mapRef}
      >
        {
          dataArray.map((item, key) => {
            return <Marker coordinate={{ latitude: item.coordinates.latitude, longitude: item.coordinates.longitude }}
              title={item.name}
              description={item.description}></Marker>
          })
        }
      </MapView>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default GeocacheNearbySiteScreen;
