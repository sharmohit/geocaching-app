import { StyleSheet } from "react-native"

const AppStyles = StyleSheet.create({
    container: {
        padding: 5,
    },
    loginContainer: {
        padding: 10,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    geocacheSiteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#1EA352",
        borderRadius: 4,
        padding: 15,
        margin: 5,
    },
    filledContainer: {
        backgroundColor: "#1EA352",
        borderRadius: 4,
        padding: 15,
        margin: 5,
    },
    outlinedContainer: {
        borderColor: "#1EA352",
        borderWidth: 1,
        borderRadius: 4,
        padding: 15,
        margin: 5,
    },
    appTitle: {
        color: "#1EA352",
        fontSize: 26,
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 20
    },
    titleText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "bold"
    },
    bodyText: {
        color: "#1EA352",
        fontSize: 15,
        fontWeight: "bold"
    },
    distanceText: {
        color: "#FFFFFF",
        fontSize: 15,
    },
    message: {
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        color: "#1EA352",
        fontSize: 18,
        fontWeight: "bold"
    },
    button: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        margin: 5,
    },
    blueButton: {
        backgroundColor: '#EDF3FE',
        borderColor: '#4A89F3'
    },
    greenButton: {
        backgroundColor: '#E9F6EF',
        borderColor: '#1EA362'
    },
    yellowButton: {
        backgroundColor: '#FDFAEE',
        borderColor: '#EDD157'
    },
    redButton: {
        backgroundColor: '#FCEDEC',
        borderColor: '#DD4B3E'
    }
})

export { AppStyles }