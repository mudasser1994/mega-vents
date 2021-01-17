import firebase from "../config/firebase";

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
    if (!snapshot.exists) return undefined;
    const data = snapshot.data();
    for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
            if (data[prop] instanceof firebase.firestore.Timestamp) {
                data[prop] = data[prop].toDate();
            }
        }
    }

    return {
        ...data,
        id: snapshot.id
    }
}

export function listenToEventsFromFirestore(predicate) {
    const user = firebase.auth().currentUser;
    const eventRef = db.collection('events').orderBy("date");
    switch (predicate.get("filter")) {
        case "isGoing":
            return eventRef
                .where("attendeeIds", "array-contains", user.uid)
                .where("date", ">=", predicate.get("startDate"))

        case "isHosting":
            return eventRef
                .where("hostUid", '==', user.uid)
                .where("date", ">=", predicate.get("startDate"))
        default:
            return eventRef
                .where("date", ">=", predicate.get("startDate"))
    }

}

export function listenToEventFromFirestore(eventId) {
    return db.collection('events').doc(eventId);
}

export function addEventToFirestore(event) {
    const user = firebase.auth().currentUser;
    return db.collection('events').add({
        ...event,
        hostUid: user.uid,
        hostedBy: user.displayName,
        hostPhotoURL: user.photoURL || null,
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL || null
        }),
        attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)

        // attendees: [{
        //     id: cuid(),
        //     displayName: "Diana",
        //     photoURL: "https://randomuser.me/api/portraits/men/30.jpg"
        // } , {
        //     id: cuid(),
        //     displayName: "Diana",
        //     photoURL: "https://randomuser.me/api/portraits/men/30.jpg"
        // }]
    })
}

export function updateEventInFirestore(event) {
    return db.collection("events").doc(event.id).update(event);
}

export function deleteEventInFirestore(eventId) {
    return db.collection('events').doc(eventId).delete();
}

export function cancelEventToggle(event) {
    return db.collection('events').doc(event.id).update({
        isCancelled: event.isCancelled == undefined ? true : !event.isCancelled
    })
}

export function setUserProfileData(user) {
    return db.collection("users").doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
}


export function getUserProfile(userId) {
    return db.collection("users").doc(userId);
}


export async function updateUserProfile(profile) {
    const user = firebase.auth().currentUser;
    try {
        if (user.displayName !== profile.displayName) {
            await user.updateProfile({
                displayName: profile.displayName
            });
        }
        return await db.collection("users").doc(user.uid).update(profile)
    }
    catch (error) {
        throw error
    }
}


export async function updateUserProfilePhoto(downloadURL, fileName) {
    const user = firebase.auth().currentUser;
    const userDocRef = db.collection("users").doc(user.uid);
    try {
        const userDoc = await userDocRef.get();
        if (!userDoc.data().photoURL) {
            await db.collection("users").doc(user.uid).update({
                photoURL: downloadURL
            })
            await user.updateProfile({
                photoURL: downloadURL
            })
        }
        return db.collection("users").doc(user.uid).collection("photos").add({
            name: fileName,
            url: downloadURL
        })
    }
    catch (error) {
        throw error
    }

}


export function getUserPhotos(userUid) {
    return db.collection("users").doc(userUid).collection("photos");
}

export async function setMainPhoto(photo) {
    try {
        const user = firebase.auth().currentUser;
        await db.collection("users").doc(user.uid).update({
            photoURL: photo.url
        })
        return user.updateProfile({
            photoURL: photo.url
        });
    }
    catch (error) {
        throw error;
    }

}

export function deletePhotoFromCollection(photoId) {
    const userUid = firebase.auth().currentUser.uid;
    return db.collection("users").doc(userUid).collection("photos").doc(photoId).delete();
}


export function addUserAttendance(event) {
    const user = firebase.auth().currentUser;
    return db.collection("events").doc(event.id).update({
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL || null
        }),
        attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
    })
}


export async function cancelUserAttendance(event) {
    const user = firebase.auth().currentUser;
    try {
        const eventDoc = await db.collection("events").doc(event.id).get();
        return db.collection("events").doc(event.id).update({
            attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
            attendees: eventDoc.data().attendees.filter(attendee => attendee.id !== user.uid)
        })
    }
    catch (error) {
        throw error;
    }
}


export function getUserEventsQuery(activeTab , userUid){
    let eventRef = db.collection('events');
    const today = new Date();

    switch(activeTab){ 
        //Past Events
        case 1: 
        return eventRef
        .where("attendeeIds" , "array-contains" , userUid)
        .where("date" , "<=" , today)
        .orderBy("date" ,  "desc");

        //Hosted Events
        case 2: return eventRef
        .where("hostUid" , "==" , userUid)
        .orderBy("date");

        //Future Events
        default: 
        return eventRef
        .where("attendeeIds" , "array-contains" , userUid)
        .where("date",">=",today)
        .orderBy("date")
    }
}