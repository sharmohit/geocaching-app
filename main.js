import React, { useState } from 'react';

import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


function main({ navigation, route }) {
    const [searchQuery, setSearchQuery] = useState('')
    return (
        <View style={styles.container} >
            <Text>Welcome Home</Text>

            <Button title="Go Back" onPress={() => console.log("Go search Anime")} />
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