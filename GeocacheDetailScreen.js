import React, { useState, useEffect } from "react"
import { View, Text, Button, SafeAreaView, StyleSheet, TextInput, Keyboard } from "react-native"
import { AppStyles } from "./AppStyles"
import { db } from "./FirebaseManager"

const GeocacheDetailScreen = ({ navigation, route }) => {

    const userId = route.params.data.userId

    const COLOR_NEW_STATUS = '#6A6A6A'
    const COLOR_IN_PROGRESS_STATUS = '#4A89F3'
    const COLOR_COMPLETED_STATUS = '#33774D'

    const STATUS_TYPE_NEW = "New"
    const STATUS_TYPE_IN_PROGRESS = "In Progress"
    const STATUS_TYPE_COMPLETED = "Completed"

    const [statusColor, setStatusColor] = useState(COLOR_NEW_STATUS)
    const [statusType, setStatusType] = useState(STATUS_TYPE_NEW)

    const [favStatus, setFavStatus] = useState("Add to Favorite")
    const [isFav, setFav] = useState(false)

    const [progressStatus, setProgressStatus] = useState("Update to In Progress")
    const [isCompleted, setCompleted] = useState(false)

    const [note, setNote] = useState("")

    const geocacheData = JSON.parse(route.params.data)

    useEffect(() => {
        console.log("Use Effect")
        db.collection("users").doc(userId).collection("saved-geocache").doc(geocacheData.id).get()
            .then(
                (doc) => {
                    if (doc.data() != undefined) {
                        setNote(doc.data().note)
                        if (doc.data().status === "Completed") {
                            updateProgress(true)
                        } else if (doc.data().status === "In Progress") {
                            updateProgress(false)
                        }
                    }
                }
            ).catch(
                (error) => {
                    console.error(error)
                }
            )
        db.collection("users").doc(userId).collection("favorite-geocache").doc(geocacheData.id).get()
            .then(
                (doc) => {
                    if (doc.data() != undefined) {
                        setFav(true)
                        updateFavorite(true)
                    }
                }
            ).catch(
                (error) => {
                    console.error(error)
                }
            )
    }, [])

    const saveChanges = (content) => {
        db.collection("users").doc(userId).collection("saved-geocache").doc(geocacheData.id).set(content, { merge: true })
            .then(
                () => {
                    console.log("Document Saved Successfully")
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )
    }

    const updateNotePressed = () => {
        Keyboard.dismiss()
        console.log("Note updated to, " + note)
        saveChanges({ note: note })
    }

    const updateFavorite = (value) => {
        if (value) {
            setFavStatus("Remove from Favorite")
        } else {
            setFavStatus("Add to Favorite")
        }
    }

    const favoritePressed = () => {
        if (!isFav) {
            db.collection("users").doc(userId).collection("favorite-geocache").doc(geocacheData.id).set({ id: geocacheData.id })
                .then(
                    () => {
                        console.log("Document Saved Successfully")
                    }
                ).catch(
                    (error) => {
                        console.error(error)
                    }
                )
        } else {
            db.collection("users").doc(userId).collection("favorite-geocache").doc(geocacheData.id).delete()
                .then(() => {
                    console.log("Removed Data")
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        updateFavorite(!isFav)
        setFav(!isFav)
    }

    const updateProgress = (value) => {
        let status = ""
        if (value) {
            setProgressStatus("Update to In Progress")
            setStatusColor(COLOR_COMPLETED_STATUS)
            setStatusType(STATUS_TYPE_COMPLETED)
            status = STATUS_TYPE_COMPLETED
        } else {
            setProgressStatus("Update to Completed")
            setStatusColor(COLOR_IN_PROGRESS_STATUS)
            setStatusType(STATUS_TYPE_IN_PROGRESS)
            status = STATUS_TYPE_IN_PROGRESS
        }
        setCompleted(!value)
        return status
    }

    const progressPressed = () => {

        let status = updateProgress(isCompleted)
        saveChanges({ status: status })
    }

    const resetPressed = () => {
        setFav(false)
        setCompleted(false)
        setFavStatus("Add to Favorite")
        setProgressStatus("Update to In Progress")
        setStatusColor(COLOR_NEW_STATUS)
        setStatusType(STATUS_TYPE_NEW)
        setNote("")
        db.collection("users").doc(userId).collection("saved-geocache").doc(geocacheData.id).delete()
            .then(() => {
                console.log("Changes Reverted")
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const styles = StyleSheet.create({
        flexBox: {
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        titleContainer: {
            backgroundColor: '#1EA352',
            alignItems: 'center',
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            padding: 15,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5
        },
        statusContainer: {
            backgroundColor: statusColor,
            alignItems: 'center',
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 1,
            padding: 5,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4
        },
        statusText: {
            color: '#FFFFFF',
            fontSize: 13,
            fontWeight: 'bold'
        },
        noteContainer: {
            margin: 5
        }
    })

    return (
        <SafeAreaView>
            <View style={[AppStyles.container, styles.flexBox]}>
                <View>
                    <View style={styles.statusContainer}>
                        <Text style={styles.statusText}>{statusType}</Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={AppStyles.titleText}>{geocacheData.content.name}</Text>
                    </View>
                    <View style={AppStyles.outlinedContainer}>
                        <Text style={AppStyles.bodyText}>{geocacheData.content.description}</Text>
                    </View>
                    <View style={AppStyles.outlinedContainer}>
                        <Text style={AppStyles.bodyText}>Latitude: {geocacheData.content.coordinates.latitude}</Text>
                        <Text style={AppStyles.bodyText}>Longitude: {geocacheData.content.coordinates.longitude}</Text>
                    </View>
                    <View style={styles.noteContainer}>
                        <Text style={AppStyles.bodyText}>Note</Text>
                        <TextInput style={[AppStyles.outlinedContainer, AppStyles.bodyText]}
                            placeholder="Add a note about this geocache site"
                            autoCorrect={false}
                            onChangeText={setNote}
                            value={note}
                        >
                        </TextInput>
                        <View style={[AppStyles.button, AppStyles.yellowButton]}>
                            <Button title="Update Note" onPress={updateNotePressed} />
                        </View>
                    </View>
                </View>
                <View>
                    <View style={[AppStyles.button, AppStyles.blueButton]}>
                        <Button title={favStatus} onPress={favoritePressed} />
                    </View>
                    <View style={[AppStyles.button, AppStyles.greenButton]}>
                        <Button title={progressStatus} onPress={progressPressed} />
                    </View>
                    <View style={[AppStyles.button, AppStyles.redButton]}>
                        <Button title="Revert Changes" onPress={resetPressed} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default GeocacheDetailScreen