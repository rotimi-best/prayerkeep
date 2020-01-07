import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authenticationReducer from './authenticationReducer';
import sidebarReducer from './sidebarReducer';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  authentication: authenticationReducer,
  sidebar: sidebarReducer,
});

export default createRootReducer;