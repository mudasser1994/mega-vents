import { ADD_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS, LISTEN_TO_EVENT_CHAT, CLEAR_COMMENTS, LISTEN_TO_SELECTED_EVENT, CLEAR_EVENTS, SET_START_DATE, RETAIN_STATE, SET_FILTER } from './eventConstants';
import {sampleData} from "../../app/api/sampleData";

const initialState = {
    events: [],
    comments: [],
    moreEvents: true,
    selectedEvent: null,
    lastVisible: null,
    filter: 'all',
    startDate: new Date(new Date().setHours(0,0,0,0)),
    retainState: false
}

const eventReducer = (state = initialState , action)=>{
    switch(action.type){
        case ADD_EVENT :
        return {
            ...state,
            events: [...state.events , action.payload]
        }

        case UPDATE_EVENT:
        return {
            ...state,
            events: [...state.events.filter(ev=>ev.id!==action.payload.id) , action.payload]
        }


        case DELETE_EVENT:
        return {
            ...state,
            events: state.events.filter(ev=>ev.id!==action.payload)
        }

        case FETCH_EVENTS: 
         return {
             ...state,
             events: [...state.events, ...action.payload.events],
             moreEvents: action.payload.moreEvents,
             lastVisible: action.payload.lastVisible
         }

         case SET_FILTER: 
         return {
             ...state,
             retainState: false,
             filter: action.payload,
             moreEvents: true,

         }
         case SET_START_DATE: 
         return {
             ...state,
             retainState: false,
             startDate: action.payload,
             moreEvents: true
         }
         case RETAIN_STATE: 
         return {
             ...state,
             retainState: true
         }
         case LISTEN_TO_EVENT_CHAT:
             return {
                 ...state,
                 comments: action.payload
             }

        case LISTEN_TO_SELECTED_EVENT:
            return {
                ...state,
                selectedEvent: action.payload
            }

        case CLEAR_COMMENTS:
            return {
                ...state,
                comments: []
            }

        case CLEAR_EVENTS:
            return {
                ...state,
                events : [],
                moreEvents: true,
                lastVisible: null
            }
        default: 
           return state
    }

}

export default eventReducer;