import { StyleSheet } from "react-native"

const AppStyles = StyleSheet.create({
    container: {
        padding: 5,
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
    }
})

export { AppStyles }