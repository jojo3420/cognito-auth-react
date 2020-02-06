import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import penderMiddleware from 'redux-pender';
// import { createLogger } from 'redux-logger';
import * as modules from './modules';

const reducers = combineReducers(modules);
const middlewares = [penderMiddleware(), ];

const isDev = process.env.NODE_ENV === 'development';
// console.log('isDev: ', isDev, 'NODE_ENV:',  process.env.NODE_ENV);
const devTools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEhnacers = devTools || compose;

const store = (preloadedState) => {
  if (isDev) {
    // ...
  }

  return createStore(reducers, preloadedState, composeEhnacers(
    applyMiddleware(...middlewares)
  ));
};


export default store;
