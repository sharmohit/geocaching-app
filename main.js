import React, { useState } from 'react';

import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function main({ navigation, route }) {
    const [searchQuery, setSearchQuery] = useState('')
    const {userEmail} = route.params
    return (
        <View style={styles.container} >
            <Text>Welcome Home</Text>

            <Text>Email : {JSON.stringify(userEmail)}</Text>

            <Button title="Go Back" onPress={() => console.log("Go Back Pressed")} />
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
