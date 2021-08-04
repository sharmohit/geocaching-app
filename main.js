import React, { useState } from 'react';

import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'react-native-reanimated';
import GeocacheCreationScreen from './GeocacheCreationScreen';


function main({ navigation, route }) {
    const [userID, setUserID] = useState('')
    const {userEmail} = route.params
    


    const getPrimitive = () => {
        AsyncStorage.getItem("userID")
          .then(
            (dataFromStorage) => {
              if (dataFromStorage === null) {
                console.log("Could not find data for key = name")           
              }
              else {
                console.log("We found a value under key = name")
                console.log(dataFromStorage)
                setUserID(dataFromStorage)
              }
            }
          )
          .catch(
            (error) => {
              console.log("Error when fetching primitive from key-value storage")
              console.log(error)
            }
          )
      }

      const goToGeocacheCreationScreen = () => {
        console.log("Navigation to GeocacheScreen....")
        navigation.navigate("GeocacheCreationScreen")
    }

    
    return (
        <View style={styles.container} >
            <Text>Welcome Home</Text>

            <Text>Email : {JSON.stringify(userEmail)}</Text>

            <Button title="Get ID" onPress={getPrimitive} />

            <Text>ID : {JSON.stringify(userID)}</Text>

            <Button title="Geocaching Creation Screen" onPress={goToGeocacheCreationScreen} />
            <Button title="Map Screen" onPress={() => console.log("Go Back Pressed")} />

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


export default main;
