import React, { useState, useEffect } from "react"
import { View, Text, ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet } from "react-native"
import { db } from "./FirebaseManager"
import { AppStyles } from "./AppStyles"
import * as Location from "expo-location"
import * as Utils from "./Utilities"

const GeocacheListScreen = ({ navigation, route }) => {
    const MAX_DISTANCE_KM = 5.0
    const [msg, setMsg] = useState("")
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("focus event")
            Location.requestForegroundPermissionsAsync()
                .then((result) => {
                    if (result.status === "granted") {
                        return Location.getCurrentPositionAsync({})
                    } else {
                        throw new Error("Location permission not granted")
                    }
                })
                .then((location) => {
                    db.collection("geocache").get()
                        .then((querySnapshot) => {
                            let temp = []
                            querySnapshot.forEach((documentFromFirestore) => {
                                const distance = Utils.getHaversineDistance(
                                    location.coords.latitude,
                                    location.coords.longitude,
                                    documentFromFirestore.data().coordinates.latitude,
                                    documentFromFirestore.data().coordinates.longitude
                                ).toFixed(1)
                                if (distance <= MAX_DISTANCE_KM) {
                                    temp.push({ id: documentFromFirestore.id, content: documentFromFirestore.data(), distance: distance })
                                }
                            })
                            setLoading(false)
                            setData(temp)
                        })
                })
                .catch((err) => {
                    console.error(err)
                    setLoading(false)
                    setMsg("Location Access is Required to Show Geocache Near You")
                })
        })
        return unsubscribe
    }, [navigation])

    return (
        <SafeAreaView>
            <View style={AppStyles.container}>
                {isLoading ? (
                    <ActivityIndicator animating={true} size="large" />
                ) : (
                    <FlatList
                        style={{ height: "100%" }}
                        data={data}
                        keyExtractor={(item, index) => {
                            return item["id"]
                        }}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => {
                                    console.log(`${item.id} ${item.content.name} selected`)
                                    navigation.navigate("GeocacheDetailScreen", {
                                        content: JSON.stringify(item.content),
                                    })
                                }}>
                                <View style={AppStyles.filledContainer}>
                                    <Text style={AppStyles.titleText}>{item.content.name}</Text>
                                    <Text style={styles.distanceText}>{item.distance} Km Away</Text>
                                </View>
                            </Pressable>
                        )} />
                )}
                <Text>{msg}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    distanceText: {
        color: "#FFFFFF",
        fontSize: 15,
    }
})

export default GeocacheListScreen