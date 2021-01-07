

import { createStore , applyMiddleware } from "redux";
import {devToolsEnhancer , composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";



export default function configureStore(){
    return createStore(rootReducer  , composeWithDevTools(applyMiddleware(thunk)))
}