import rootReducer from './reducers';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from "redux-thunk";

const enhancers = [
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
];


const store = createStore(
    rootReducer,
    compose(...enhancers)
  )

export default store;

