import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, TextInput, Button, Text, SafeAreaView, Switch, StyleSheet } from 'react-native'
import { db } from "./fireManager"

function signIn({ navigation, route }) {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const goToHome = () => {

        let userEmail = email
        let userPassword = password 

        console.log("The user email  is " + userEmail + " and  password is " + userPassword)



        console.log("Navigation to main")
        navigation.navigate("main")
    }
    const goToSignup = () => {
        console.log("Navigation to SignUp Screen")
        navigation.navigate("signUp")
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
                            returnKeyType="done" asdf
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