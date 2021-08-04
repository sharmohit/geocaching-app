import React, { useState, useEffect } from "react"
import { View, Text, ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet } from "react-native"
import { db } from "./FirebaseManager"
import { AppStyles } from "./AppStyles"
import * as Location from "expo-location"
import * as Utils from "./Utilities"

const FavoriteScreen = ({ navigation, route }) => {

    const userId = route.params.userId

    const [msg, setMsg] = useState("")
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setMsg("")
            setLoading(true)
            setData([])
            let location = null
            Location.requestForegroundPermissionsAsync()
                .then((result) => {
                    if (result.status === "granted") {
                        return Location.getCurrentPositionAsync({})
                    } else {
                        throw new Error("Location permission not granted")
                    }
                })
                .then((loc) => {
                    location = loc
                })
                .catch((error) => {
                    console.error(error)
                })
            db.collection("users").doc(userId).collection("favorite-geocache").get()
                .then(
                    (querySnapshot) => {
                        let temp = []
                        if (querySnapshot.empty) {
                            console.log("No Fav")
                            setMsg("No Favorites Yet")
                            setLoading(false)
                        }
                        querySnapshot.forEach((doc) => {
                            db.collection("geocache").doc(doc.id).get()
                                .then(
                                    (doc) => {
                                        const distance = Utils.getHaversineDistance(
                                            location.coords.latitude,
                                            location.coords.longitude,
                                            doc.data().coordinates.latitude,
                                            doc.data().coordinates.longitude
                                        ).toFixed(1)
                                        db.collection("users").doc(userId).collection("saved-geocache").doc(doc.id).get()
                                            .then(
                                                (savedDoc) => {
                                                    if (savedDoc.data() != undefined) {
                                                        temp.push({ id: doc.id, userID: userId, content: doc.data(), distance: distance, status: savedDoc.data().status })
                                                    } else {
                                                        temp.push({ id: doc.id, userID: userId, content: doc.data(), distance: distance, status: "New" })
                                                    }
                                                    setData(temp)
                                                    setLoading(false)
                                                }
                                            )
                                            .catch(
                                                (error) => {
                                                    console.error(error)
                                                }
                                            )
                                    }
                                )
                                .catch(
                                    (error) => {
                                        console.error(error)
                                    }
                                )
                        })
                    }

                ).catch(
                    (error) => {
                        console.log(error)
                    }
                )
            console.log("Fav " + JSON.stringify(data))
        })
        return unsubscribe
    }, [navigation])

    return (
        <SafeAreaView>
            <View style={AppStyles.container}>
                {isLoading ? (
                    <ActivityIndicator animating={true} size='small' />
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => {
                            return item["id"]
                        }}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("GeocacheDetailScreen", {
                                        data: JSON.stringify(item),
                                    })
                                }}>
                                <View style={AppStyles.geocacheSiteContainer}>
                                    <View>
                                        <Text style={AppStyles.titleText}>{item.content.name}</Text>
                                        <Text style={AppStyles.distanceText}>{item.distance} Km Away</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <Text style={AppStyles.distanceText}>Status</Text>
                                        <Text style={AppStyles.distanceText}>{item.status}</Text>
                                    </View>
                                </View>
                            </Pressable>
                        )} />
                )}
                <Text style={AppStyles.message}>{msg}</Text>
            </View>
        </SafeAreaView>
    )
}

export default FavoriteScreen