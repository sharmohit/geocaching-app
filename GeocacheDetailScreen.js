import React, { useState, useEffect } from "react"
import { View, Text, Button, SafeAreaView, StyleSheet, TextInput } from "react-native"
import { AppStyles } from "./AppStyles"

const GeocacheDetailScreen = ({ navigation, route }) => {

    const [favStatus, setFavStatus] = useState("Add to Favorite")
    const [isFav, setIsFav] = useState(false)

    console.log(route.params)
    const data = JSON.parse(route.params.data)

    const favoritePressed = () => {
        setIsFav(!isFav)
        if (!isFav) {
            setFavStatus("Remove from Favorite")
        } else {
            setFavStatus("Add to Favorite")
        }
    }

    return (
        <SafeAreaView>
            <View style={AppStyles.container}>
                <View style={AppStyles.filledContainer}>
                    <Text style={AppStyles.titleText}>{data.content.name}</Text>
                </View>
                <View style={AppStyles.outlinedContainer}>
                    <Text style={styles.text}>{data.content.description}</Text>
                </View>
                <View style={AppStyles.outlinedContainer}>
                    <Text style={styles.text}>Latitude: {data.content.coordinates.latitude}</Text>
                    <Text style={styles.text}>Longitude: {data.content.coordinates.longitude}</Text>
                </View>
                <Text style={styles.text}>Note</Text>
                <TextInput style={AppStyles.outlinedContainer}
                placeholder = "Add a note about this geocache site"
                returnKeyType = "done"
                onChangeText = {console.log("Note Updated")}
                >
                </TextInput>
                <View style={styles.favoriteBtn}>
                    <Button title={favStatus} onPress={favoritePressed}/>
                </View>
                <View style={styles.inProgressBtn}>
                    <Button title="Update to In Progress"/>
                </View>
                <View style={styles.completedBtn}>
                    <Button title="Update to Completed"/>
                </View>
                <View style={styles.resetBtn}>
                    <Button title="Reset Changes"/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "#1EA352",
        fontSize: 15,
        fontWeight: 'bold'
    },
    favoriteBtn: {
        backgroundColor: "#EDF3FE",
        borderColor: "#4A89F3",
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        margin: 5,
    },
    inProgressBtn: {
        backgroundColor: "#FFFCED",
        borderColor: "#8D8A7A",
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        margin: 5,
    },
    completedBtn: {
        backgroundColor: "#E9F6EF",
        borderColor: "#1EA362",
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        margin: 5,
    },
    resetBtn: {
        backgroundColor: "#FCEDEC",
        borderColor: "#DD4B3E",
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        margin: 5,
    }
})

export default GeocacheDetailScreen