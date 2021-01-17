

import {SIGN_IN_USER, SIGN_OUT_USER} from "./authConstants";
import firebase from "../../app/config/firebase";
import { APP_LOADED } from "../../app/async/asyncReducer";
import { dataFromSnapshot, getUserProfile } from "../../app/firestore/firestoreService";
import { listenToCurrentUserProfile } from "../profiles/store/profileActions";

export const signInUser = (user)=>{
    return {
        type: SIGN_IN_USER,
        payload: user
    }
}

export function verifyAuth(){
    return function(dispatch){
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                dispatch(signInUser(user));
                const profileRef = getUserProfile(user.uid);
                setTimeout(()=>{
                    profileRef.onSnapshot(snapshot=>{
                        dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
                        dispatch({type: APP_LOADED}); 
                    } , 0)
                })
                
            }
            else {
                dispatch(signOutUser());
                dispatch({type: APP_LOADED})   
            }
        });
    }
}



export const signOutUser = ()=>{
    return {
        type: SIGN_OUT_USER
    }
}