import { toast } from "react-toastify";
import firebase from "../config/firebase";
import { setUserProfileData } from "./firestoreService";

export function firebaseObjectToArray(snapshot){
    if(snapshot){
        return Object.entries(snapshot).map((e)=>Object.assign({} , e[1] , {id:e[0]}));
    }
}

export function loginWithEmail(creds){
    return firebase.auth().signInWithEmailAndPassword(creds.email , creds.password);
}

export function signOutFirebaseUser(){
    return firebase.auth().signOut();
}

export async function registerUserInFirebase(creds){
    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(creds.email , creds.password);
        await result.user.updateProfile({
            displayName: creds.displayName
        });
        return await setUserProfileData(result.user);
    }
    catch(error){
        throw error
    }
}

export async function socialLogin(selectedProvider){
    let provider;
    if(selectedProvider === "facebook"){
        provider = new firebase.auth.FacebookAuthProvider();
    }
    else if(selectedProvider === "google"){
        provider = new firebase.auth.GoogleAuthProvider();
    }

    try {
        const result = await firebase.auth().signInWithPopup(provider);
        if(result.additionalUserInfo.isNewUser){
            await setUserProfileData(result.user);
        }
    }
    catch(error){
        toast.error(error.message);
    }
}

export async function updateUserPassword(creds){
    const user = firebase.auth().currentUser;
    return user.updatePassword(creds.newPassword1);
}


export function uploadToFirebaseStorage(file , fileName){
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  return storageRef.child(`${user.uid}/user_images/${fileName}`).put(file);   
}


export function deleteFromFirebaseStorage(fileName){
    const userUid = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref();
    const photoRef = storageRef.child(`${userUid}/user_images/${fileName}`);
    return photoRef.delete();
}

export function addEventChatComment(eventId , values){
    const user = firebase.auth().currentUser;
    const newComment = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        parentId: values.parentId,
        text: values.comment,
        date: Date.now()
    }
    return firebase.database().ref(`chat/${eventId}`).push(newComment);
}


export function getEventChatRef(eventId){
    return firebase.database().ref(`chat/${eventId}`).orderByKey();
}

export function getUserFeedRef(){
    const user = firebase.auth().currentUser;
    return firebase.database().ref(`posts/${user.uid}`).orderByKey().limitToLast(5);

}