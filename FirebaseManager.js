import firebase from 'firebase/app'
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDm2oo9MXQkoVj4x2piB-2Pyf2KUkF27oU",
    authDomain: "geocaching-app-7cf9e.firebaseapp.com",
    databaseURL: "https://geocaching-app-7cf9e.firebaseio.com",
    projectId: "geocaching-app-7cf9e",
    storageBucket: "geocaching-app-7cf9e.appspot.com",
    messagingSenderId: "509295659956",
    appId: "1:509295659956:web:add1bcc25133724f6800e1"
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()