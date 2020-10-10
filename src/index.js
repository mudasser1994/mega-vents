import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';

const elRoot  =  document.getElementById('root');

function render(){
  ReactDOM.render(<BrowserRouter>
     <App />
  </BrowserRouter> , elRoot);
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
serviceWorker.unregister();
