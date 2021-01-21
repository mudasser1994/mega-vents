
import { asyncActionStart, asyncActionFinish, asyncActionError } from './../../app/async/asyncReducer';
import { ADD_EVENT, UPDATE_EVENT, DELETE_EVENT , FETCH_EVENTS, LISTEN_TO_EVENT_CHAT, CLEAR_COMMENTS } from "./eventConstants";
import { fetchSampleData } from "../../app/api/mockApi";

export const loadEvents = ()=>{
    return async dispatch=>{
        try {
            dispatch(asyncActionStart());
            const events = await fetchSampleData();
            dispatch({type: FETCH_EVENTS , payload: events});
            dispatch(asyncActionFinish())
        }
        catch(error){
            dispatch(asyncActionError(error))
        }
    }
}


export const listenToEvents = (events)=>{
    return {type: FETCH_EVENTS , payload: events};
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