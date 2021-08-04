import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, TextInput, Button, Text, SafeAreaView, Switch, StyleSheet } from 'react-native'
import { db } from "./FirebaseManager";
import AsyncStorage from '@react-native-async-storage/async-storage';

function signUp({ navigation, route }) {

    const [Uname, setName] = React.useState('')
    const [Uemail, setEmail] = React.useState('')
    const [Upassword, setPassword] = React.useState('')
    const [docID, setdocID] = React.useState('')
    


    const goToHome = () => {

        let userName = Uname
        let userEmail = Uemail
        let userPassword = Upassword

        console.log("Value are " + userName + " " + userEmail  + " " + userPassword)
        console.log(".......................")

        const user = {
            name: userName,
            email: userEmail,
            pass : userPassword,
        }
        // 2. save it to Firestore
        db.collection("users").add(user).then().catch()
        getDocID()
 
    
        console.log("Navigation to main")
        navigation.navigate("main", {userEmail: Uemail})
    }

    const goToSignIn = () => {
        console.log("Moving Back to SignIn Screen")
        navigation.navigate("signIn")
    }

    const getDocID = () => {

        db.collection('Users')
        .where('email','==',Uemail)
        .onSnapshot((querySnapshot) => {


            querySnapshot.forEach((doc) => {
                console.log("------------ Getting Doc ID ------------")       

                // console.log(doc.id, " => " , doc.data())
                setdocID(doc.id)
                console.log("The doc Id of user is : " + docID)
                AsyncStorage.setItem("userID",docID)
                
            })
    })

}

    return (
        <View style={styles.container}>
            <Text>Sign Up Screen</Text>


            <Text>Enter Name </Text>

            <TextInput
                placeholder="Name"
                returnKeyType="done"
                textContentType="emailAddress"
                autoCapitalize="none"
                onChangeText={setName}
                value={Uname} />


            <Text>Enter email : </Text>

            <TextInput
                placeholder="email"
                returnKeyType="done"
                textContentType="emailAddress"
                autoCapitalize="none"
                onChangeText={setEmail}
                value={Uemail} />

            <Text>Enter password : </Text>



            <TextInput
                placeholder="password"
                returnKeyType="done" asdf
                textContentType="password"
                autoCapitalize="none"
                onChangeText={setPassword}
                value={Upassword} />


            <Button title="Sign Up" onPress={goToHome} />


            <Text> Already have an account ? </Text>
            <Button title="Sign In" onPress={goToSignIn} />
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

export default signUp;