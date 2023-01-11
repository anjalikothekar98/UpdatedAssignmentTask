import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import reduxThunk from "redux-thunk";
import rootReducer from "./root-reducers";


const middlewares  = [reduxThunk]

if (process.env.NODE_ENV === "development") {
    // const { logger } = require(`redux-logger`);
   
    middlewares.push(logger);
  }
   
  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  export default store;