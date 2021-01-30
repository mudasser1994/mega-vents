import { asyncActionStart, asyncActionFinish, asyncActionError } from './../../app/async/asyncReducer';
import { ADD_EVENT, UPDATE_EVENT, DELETE_EVENT , FETCH_EVENTS, LISTEN_TO_EVENT_CHAT, CLEAR_COMMENTS, LISTEN_TO_SELECTED_EVENT, CLEAR_EVENTS } from "./eventConstants";
import { fetchSampleData } from "../../app/api/mockApi";
import { dataFromSnapshot, fetchEventsFromFirestore } from '../../app/firestore/firestoreService';

export const fetchEvents = (predicate , limit , lastDocSnapshot)=>{
    return async dispatch=>{
        try {
            dispatch(asyncActionStart());
            const snapshot = await fetchEventsFromFirestore(predicate , limit , lastDocSnapshot).get();
            const lastVisible = snapshot.docs[snapshot.docs.length - 1];
            const moreEvents = snapshot.docs.length >= limit;
            const events = snapshot.docs.map(event=>dataFromSnapshot(event));
            dispatch({type: FETCH_EVENTS , payload: {events , moreEvents} });
            dispatch(asyncActionFinish());
            return lastVisible;
        }
        catch(error){
            dispatch(asyncActionError(error))
        }
    }
}


export const listenToSelectedEvent = (event)=>{
    return {type: LISTEN_TO_SELECTED_EVENT , payload: event};
}


export const addEvent = (event)=>{
    return {
        type: ADD_EVENT,
        payload: event
    }
}



export const updateEvent = (event)=>{
    return {
        type: UPDATE_EVENT,
        payload: event
    }
}


export const deleteEvent = (eventId)=>{
    return {
        type: DELETE_EVENT,
        payload: eventId
    }
}

export const clearEvents = ()=>{
    return {
        type: CLEAR_EVENTS
    }
}


export const listenToEventChats = (comments)=>{
    return {
        type: LISTEN_TO_EVENT_CHAT,
        payload: comments
    }
}

export const clearEventComments = ()=>{
    return {
        type: CLEAR_COMMENTS
    }
}