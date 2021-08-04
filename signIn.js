import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, TextInput, Button, Text, SafeAreaView, Switch, StyleSheet, Alert } from 'react-native'
import { db } from "./FirebaseManager"
import AsyncStorage from '@react-native-async-storage/async-storage';


function signIn({ navigation, route }) {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [docID, setdocID] = React.useState('')

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    const goToHome = () => {

        let userEmail = email
        let userPassword = password


        db.collection('users')
        .where('email','==',email)
        .onSnapshot((querySnapshot) => {

            if (querySnapshot.size == 0) {
                console.log("No email found")
                createAlert("Invalid Email")
            }

            querySnapshot.forEach((doc) => {
                console.log("------------ Email Found ------------")       

                // console.log(doc.id, " => " , doc.data())
                setdocID(doc.id)
                console.log("The doc Id of user is : " + docID)
                AsyncStorage.setItem("userID",docID)

                const passFromData = doc.data()

                if ( passFromData.pass == password ) {
                    console.log(" ********* Password Matched ***************")
                    console.log("Navigation to main")
                    navigation.navigate("main",{userEmail: email})
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
    );
    
    const goToSignup = () => {
        console.log("Navigation to SignUp Screen")
        navigation.navigate("signUp")
    }

    const rememberMe = () => {

        if(isEnabled == true){

            console.log("Remember ME Switch is ON ... Storing the values...")

            AsyncStorage.setItem("Email",email)
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
            <View style={styles.container}>


                <SafeAreaView>

                    <View>

                        <Text>Enter email : </Text>

                        <TextInput
                            placeholder="email"
                            returnKeyType="done"
                            textContentType="emailAddress"
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email} />

                        <Text>Enter password : </Text>

                        <TextInput
                            placeholder="password"
                            returnKeyType="done"
                            textContentType="password"
                            autoCapitalize="none"
                            onChangeText={setPassword}
                            value={password} />

                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />

                        <Button title="Sign In" onPress={goToHome} />


                        <Text> Don't have an account ....</Text>
                        <Button title="Sign Up" onPress={goToSignup} />


                        <StatusBar style="auto" />
                    </View>
                </SafeAreaView>
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


    export default signIn