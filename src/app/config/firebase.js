



import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


var firebaseConfig = {
    apiKey: "",
    authDomain: "megavents-8ca86.firebaseapp.com",
    databaseURL: "https://megavents-8ca86.firebaseio.com",
    projectId: "megavents-8ca86",
    storageBucket: "megavents-8ca86.appspot.com",
    messagingSenderId: "156932330121",
    appId: "1:156932330121:web:a1d2b9cee98e434d666c58",
    measurementId: "G-92TXGP7J9D"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();


export default firebase;