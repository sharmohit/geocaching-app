import React, { useState } from 'react'
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


    const goToHome = () => {

        let userEmail = email
        let userPassword = password


        db.collection('users')
            .where('email', '==', email)
            .onSnapshot((querySnapshot) => {

                if (querySnapshot.size == 0) {
                    console.log("No email found")
                    createAlert("Invalid Email")
                }

                querySnapshot.forEach((doc) => {
                    console.log("------------ Email Found ------------")

                    setdocID(doc.id)
                    console.log("The doc Id of user is : " + doc.id)
                    AsyncStorage.setItem("userID", doc.id)

                    const passFromData = doc.data()

                    if (passFromData.password == password) {
                        navigation.replace("Home", { userId: doc.id })
                        rememberMe()
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
        console.log("Navigation to SignUp Screen")
        navigation.navigate("Sign Up")
    }

    const rememberMe = () => {

        if (isEnabled == true) {

            console.log("Remember ME Switch is ON ... Storing the values...")

                .then(
                    () => {
                        console.groupCollapsed("Save was successful")
                        console.log("value stored is : Email : " + email)
                    }
                )
                .catch(
                    (error) => {
                        console.log("Error occured when saving a primitive")
                        console.log("error")
                    }
                )
        }
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