import { View, TextInput, Button, Text, SafeAreaView } from 'react-native'
import { db } from "./FirebaseManager"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppStyles } from './AppStyles'

const SignUp = ({ navigation, route }) => {

    const [Uname, setName] = React.useState('')
    const [Uemail, setEmail] = React.useState('')
    const [Upassword, setPassword] = React.useState('')
    const [docID, setdocID] = React.useState('')

    const goToHome = () => {

        let userName = Uname
        let userEmail = Uemail
        let userPassword = Upassword

        console.log("Value are " + userName + " " + userEmail + " " + userPassword)
        console.log(".......................")

        const user = {
            name: userName,
            email: userEmail,
            password: userPassword,
        }
        db.collection("users").add(user).then().catch()
        let docID = getDocID()
        navigation.replace("Home", { userId: docID })
    }

    const goToSignIn = () => {
        navigation.navigate("Sign In")
    }

    const getDocID = () => {

        db.collection('Users')
            .where('email', '==', Uemail)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setdocID(doc.id)
                    console.log("The doc Id of user is : " + docID)
                    AsyncStorage.setItem("userID", docID)
                    return docID
                })
            })

    }

    return (
        <SafeAreaView>
            <View style={AppStyles.loginContainer}>
                <Text style={AppStyles.appTitle}>Geocaching App</Text>
                <TextInput
                    style={AppStyles.outlinedContainer}
                    placeholder="Enter Name"
                    returnKeyType="done"
                    textContentType='name'
                    autoCapitalize="none"
                    onChangeText={setName}
                    value={Uname} />
                <TextInput
                    style={AppStyles.outlinedContainer}
                    placeholder="Enter Email"
                    returnKeyType="done"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    value={Uemail} />
                <TextInput
                    style={AppStyles.outlinedContainer}
                    placeholder="Enter Password"
                    returnKeyType="done"
                    textContentType="password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={setPassword}
                    value={Upassword} />

                <View style={[AppStyles.button, AppStyles.blueButton, { marginBottom: 20 }]}>
                    <Button title="Sign Up" onPress={goToHome} />
                </View>

                <Text style={[AppStyles.bodyText, { alignSelf: 'center' }]}> Already have an account ? </Text>
                <View style={[AppStyles.button, AppStyles.greenButton]}>
                    <Button title="Sign In" onPress={goToSignIn} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignUp