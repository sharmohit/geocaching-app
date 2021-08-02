import React, { useState, useEffect } from 'react'
import { View, Text, Button, ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet } from "react-native"
import { db } from "./FirebaseManager"
import * as Location from "expo-location"
import * as Utils from "./Utilities"
import { color } from 'react-native-reanimated'

const GeocacheListScreen = () => {

    const [msg, setMsg] = useState("")
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(
        ()=> {
            Location.requestForegroundPermissionsAsync()
            .then(
                (result) => {
                    if (result.status === "granted") {
                        return Location.getCurrentPositionAsync({})
                    }
                    else {
                        throw new Error("Location permission not granted")
                    }
                }
            )
            .then(
                (location) => {
                    db.collection("geocache").get().then((querySnapshot) => {
                        let temp = []
                        querySnapshot.forEach((documentFromFirestore) => {
                        const distance = Utils.getHaversineDistance(location.coords.latitude, location.coords.longitude,
                            documentFromFirestore.data().coordinates.x_, documentFromFirestore.data().coordinates.N_).toFixed(1)
                        if ( distance <= 5.0) {
                            temp.push({id: documentFromFirestore.id, content: documentFromFirestore.data(), distance: distance})
                        }
                    })
                    setLoading(false)
                    setData(temp)
                    })
                }
            )
            .catch((err)=>{
                console.error(err)
                setLoading(false)
                setMsg("Location Access is Required to Show Geocache Near You")
            })

        }, []
    )

    return(
        <SafeAreaView>
            <View style = {styles.container}>
                {isLoading ? (<ActivityIndicator animating={true} size="large"/>) : (
                    <FlatList
                    style = {{height: '100%'}}
                    data = {data}
                    keyExtractor = { (item, index) => {return item["id"]}}
                    renderItem = { ({item}) => (<Pressable onPress={
                        () => {
                            console.log(`${item.id} ${item.content.name} selected`)
                            // navigation.navigate("SCREEN_NAME", {id:item.id})
                            }}>
                        <View style = {styles.list_item}>
                            <Text style = {[{color: '#FFFFFF'}, {fontWeight: 'bold'}]}>{item.content.name}</Text>
                            <Text style = {{color: '#FFFFFF'}}>{item.distance} Km Away</Text>
                        </View>
                    </Pressable>)}
                    />
                )}
                <Text>{msg}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5
    },
    list_item: {
        backgroundColor: '#1EA352',
        borderRadius: 4,
        padding: 15,
        margin: 5
    }
  })

export default GeocacheListScreen