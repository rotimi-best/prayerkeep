import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authenticationReducer from './authenticationReducer';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  authentication: authenticationReducer
});

export default createRootReducer;