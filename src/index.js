import React from 'react';


import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-calendar/dist/Calendar.css";

import ReactDOM from 'react-dom';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import configureStore, {history} from './app/store/configureStore';
import ScrollToTop from "./app/layout/ScrollToTop";
import { ConnectedRouter } from 'connected-react-router';


const elRoot  =  document.getElementById('root');

const store = configureStore();

function render(){
  ReactDOM.render(
  <Provider store={store}>
  <ConnectedRouter history={history}>
     <ScrollToTop />
     <App />
  </ConnectedRouter>
  </Provider> , elRoot);
}

if(module.hot){
  module.hot.accept('./app/layout/App' , function(){
    setTimeout(render);
  })
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
