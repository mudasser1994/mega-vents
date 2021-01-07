import  cuid  from 'cuid';
import firebase from "../config/firebase";

const db = firebase.firestore();

export function dataFromSnapshot(snapshot){
    console.log(snapshot);
  
    if(!snapshot.exists) return undefined;
    const data = snapshot.data();
    for(const prop in data){
        if(data.hasOwnProperty(prop)){
            if(data[prop] instanceof firebase.firestore.Timestamp){
                data[prop] = data[prop].toDate();
            }
        }
    }
    
    return {
        ...data , 
        id: snapshot.id
    }
}



export function listenToEventsFromFirestore() {
    return db.collection('events').orderBy("date");
}

export function listenToEventFromFirestore(eventId) {
    return db.collection('events').doc(eventId);
}

export function addEventToFirestore(event){
    console.log("add event ", event);
    return db.collection('events').add({
        ...event,
        hostedBy: "mudasser",
        hostPhotoURL : "https://randomuser.me/api/portraits/men/20.jpg",
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: cuid(),
            displayName: "Diana",
            photoURL: "https://randomuser.me/api/portraits/men/30.jpg"
        })
    })
}

export  function updateEventInFirestore(event){
    return db.collection("events").doc(event.id).update(event);
}

export function deleteEventInFirestore(eventId){
    return db.collection('events').doc(eventId).delete();
}

export function cancelEventToggle(event){
    return db.collection('events').doc(event.id).update({
        isCancelled: event.isCancelled==undefined ? true : !event.isCancelled  
    })
}