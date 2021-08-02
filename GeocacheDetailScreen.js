import React, { useState, useEffect } from "react"
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native"
import { AppStyles } from "./AppStyles"

const GeocacheDetailScreen = ({ navigation, route }) => {
    const content = JSON.parse(route.params.content)

    return (
        <SafeAreaView>
            <View style={AppStyles.container}>
                <View style={AppStyles.filledContainer}>
                    <Text style={AppStyles.titleText}>{content.name}</Text>
                </View>
                <View style={AppStyles.outlinedContainer}>
                    <Text style={styles.text}>{content.description}</Text>
                </View>
                <View style={AppStyles.outlinedContainer}>
                    <Text style={styles.text}>Latitude: {content.coordinates.latitude}</Text>
                    <Text style={styles.text}>Longitude: {content.coordinates.longitude}</Text>
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
})

export default GeocacheDetailScreen