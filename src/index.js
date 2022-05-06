import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore,applyMiddleware,compose,combineReducers } from "redux";
import { Provider } from 'react-redux';
import reducerBurger from './Store/Reducer/burgerBuilder';
import reducerOrder from './Store/Reducer/order';
import reducerAuth from "./Store/Reducer/auth"
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk'

const composeEnhancer=process.env.NODE_ENV==="development"? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null||compose
let rootReducer=combineReducers({
    bur:reducerBurger,
    ord:reducerOrder,
    auth:reducerAuth,
})

const store=createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
