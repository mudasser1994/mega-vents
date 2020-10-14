import { ADD_EVENT, UPDATE_EVENT, DELETE_EVENT } from './eventConstants';
import {sampleData} from "../../app/api/sampleData";




const initialState = {
    events: sampleData
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


        default: 
           return state
    }

}

export default eventReducer;