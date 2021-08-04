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
            .then((storedEmail) => {
                if (storedEmail != "" && storedEmail != null) {
                    setEmail(storedEmail)
                    AsyncStorage.getItem("pass")
                        .then((storedPass) => {
                            if (storedPass != "" && storedPass != null) {
                                setPassword(storedPass)
                                db.collection('users')
                                    .where('email', '==', storedEmail)
                                    .onSnapshot((querySnapshot) => {

                                        if (querySnapshot.size === 0) {
                                            console.log("No email found")
                                            createAlert("Invalid Email")
                                        }

                                        querySnapshot.forEach((doc) => {
                                            setdocID(doc.id)
                                            const passFromData = doc.data()

                                            if (passFromData.password === storedPass) {
                                                if (isEnabled) {
                                                    AsyncStorage.setItem("email", storedEmail)
                                                        .then(() => {
                                                            AsyncStorage.setItem("pass", storedPass)
                                                                .then(() => {
                                                                    navigation.replace("Home", { userId: doc.id })
                                                                })
                                                                .catch((error) => {
                                                                    console.error(error)
                                                                })
                                                        })
                                                        .catch((error) => {
                                                            console.error(error)
                                                        })
                                                } else {
                                                    navigation.replace("Home", { userId: doc.id })
                                                }
                                            }
                                            else {
                                                // createAlert("Invalid Password")
                                                console.log("Password NOT matched .... Access Denied")
                                            }
                                        })

                                    })
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
                        if (isEnabled) {
                            AsyncStorage.setItem("email", email)
                                .then(() => {
                                    AsyncStorage.setItem("pass", password)
                                        .then(() => {
                                            navigation.replace("Home", { userId: doc.id })
                                        })
                                        .catch((error) => {
                                            console.error(error)
                                        })
                                })
                                .catch((error) => {
                                    console.error(error)
                                })
                        } else {
                            navigation.replace("Home", { userId: doc.id })
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