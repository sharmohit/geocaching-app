import { StatusBar } from 'expo-status-bar';
import React , {useState, useRef} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Dimensions } from 'react-native';
import { db } from "./FirebaseManager"

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import * as Location from "expo-location"

import MapView, { Marker } from 'react-native-maps';


function GeocacheNearbySiteScreen(navigation, route) {

  const [currRegion, setCurrRegion] = useState({
    latitude:45.5163539,
    longitude: -73.5775142,
    latitudeDelta: 0.005,
    longitudeDelta:0.005
  })


//   const [testArray, setTestArray] = useState(
//     {
//     coordinates:{"latitude":45.5163539,"longitude":-73.5775142},
//     name:"Tims",
//     description:"This is test Cache"
//     },
//     {
//         coordinates:{"latitude":45.515940,"longitude":-73.577550},
//         name:"Tims",
//         description:"This is test Cache"
//         },
//     {
//             coordinates:{"latitude":45.51600,"longitude":-73.577650},
//             name:"Tims",
//             description:"This is test Cache"
//     }
//   )

  const [dataArray, setDataArray] = useState([])

  const [currCoord, setCurrCoord] = useState({})


  const mapRef = useRef(null)


  const getCoordinatesFromFireStore = () => {

    db.collection("geocache").get().then((querySnapshot) => {
        let temp = []
        querySnapshot.forEach((documentFromFirestore) => {
            temp.push(JSON.stringify(documentFromFirestore.data()))
            console.log("--------------1st--------------")
            console.log("Data is : " + temp)
            setDataArray(temp)
            console.log("--------------2nd--------------")
            console.log(dataArray)
            console.log("---------------3rd------------")
            setDataArray(Object.values(temp))
            console.log(dataArray)

            console.log("---------------4th------------")

            console.log("first value is : " + dataArray[0])
        //   console.log(`${documentFromFirestore.id}, ${JSON.stringify(documentFromFirestore.data())}`)

        });
      }); 
  
  }
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Map Screen</Text>
      

      <MapView
        style={{width:Dimensions.get("window").width, height:500}}
        initialRegion={currRegion}
        ref={mapRef}
      >
        <Marker coordinate={{latitude:45.5163539, longitude:-73.5775142}}
          title="Schwartz's Deli"
          description="We make a really good sandwich"></Marker>
        <Marker coordinate={{latitude:45.515940, longitude:-73.577550}}
          title="Main Street Deli"
          description="We also make a really good sandwich"></Marker>
        <Marker coordinate={{latitude:45.51600, longitude:-73.577650}}
          title="Main Street Deli"
          description="We also make a really good sandwich"></Marker>

     {
       dataArray.map( (item, key) => {
        // return <Marker coordinate= {item.coordinates}
        //   title= {item.name}
        //   description={item.description}>
        //   </Marker>
          return <Text>{item}</Text>
       })
     }

      </MapView>
    


{/* 
{
       ["Apple", "Banana", "Orange", "Donut", "Eggplant"].map( (item) => {
         return <Text>{item}</Text>
       })
     } */}
      
      <Button onPress={getCoordinatesFromFireStore} title="Fetch Items"/>
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


export default GeocacheNearbySiteScreen;
