import { StyleSheet } from "react-native"

const AppStyles = StyleSheet.create({
    container: {
        padding: 5,
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
    }
})

export { AppStyles }