import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, TextInput, Button, Text, SafeAreaView, Switch, StyleSheet, Alert } from 'react-native'
import { db } from "./FirebaseManager"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppStyles } from './AppStyles'


const SignIn = ({ navigation, route }) => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [docID, setdocID] = React.useState('')

    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)

    useEffect(() => {
        AsyncStorage.getItem("email")
            .then((email) => {
                console.log("Stored Email:" + email)
                if (email != "" && email != null) {
                    setEmail(email)
                    AsyncStorage.getItem("pass")
                        .then((pass) => {
                            console.log("Stored Password:" + pass)
                            if (pass != "" && pass != null) {
                                setPassword(pass)
                                goToHome()
                            }
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])


    const goToHome = () => {

        db.collection('users')
            .where('email', '==', email)
            .onSnapshot((querySnapshot) => {

                if (querySnapshot.size === 0) {
                    console.log("No email found")
                    createAlert("Invalid Email")
                }

                querySnapshot.forEach((doc) => {
                    setdocID(doc.id)
                    const passFromData = doc.data()

                    if (passFromData.password === password) {
                        navigation.replace("Home", { userId: doc.id })
                        if (isEnabled) {
                            AsyncStorage.setItem("email", email)
                            AsyncStorage.setItem("pass", password)
                        }
                    }
                    else {
                        // createAlert("Invalid Password")
                        console.log("Password NOT matched .... Access Denied")
                    }
                })

            })

    }

    const createAlert = (message) =>
        Alert.alert(
            "Alert",
            message,
            [
                {
                    text: "OK",
                    onPress: () => console.log("OK Pressed"),
                    style: "cancel"
                },
                // { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        )

    const goToSignup = () => {
        navigation.navigate("Sign Up")
    }

    return (
        <View style={AppStyles.loginContainer}>
            <SafeAreaView>
                <View>
                    <Text style={AppStyles.appTitle}>Geocaching App</Text>
                    <TextInput
                        style={AppStyles.outlinedContainer}
                        placeholder="Enter Email"
                        returnKeyType="done"
                        textContentType="emailAddress"
                        autoCapitalize="none"
                        onChangeText={setEmail}
                        value={email} />

                    <TextInput
                        style={AppStyles.outlinedContainer}
                        placeholder="Enter Password"
                        returnKeyType="done"
                        textContentType="password"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        onChangeText={setPassword}
                        value={password} />

                    <View style={[styles.flexContainer, { marginBottom: 20 }]}>
                        <Switch
                            style={{ marginRight: 10 }}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                        <Text style={AppStyles.bodyText}>Remember Me</Text>
                    </View>

                    <View style={[AppStyles.button, AppStyles.greenButton, { marginBottom: 20 }]}>
                        <Button title="Sign In" onPress={goToHome} />
                    </View>

                    <Text style={[AppStyles.bodyText, { alignSelf: 'center' }]}>Don't have an account yet? Sign Up Now</Text>
                    <View style={[AppStyles.button, AppStyles.blueButton]}>
                        <Button title="Sign Up" onPress={goToSignup} />
                    </View>

                    <StatusBar style="auto" />
                </View>
            </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({
    flexContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default SignIn