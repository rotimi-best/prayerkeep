import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authenticationReducer from './authenticationReducer';
import sidebarReducer from './sidebarReducer';
import modalListenerReducer from './modalListenerReducer';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  authentication: authenticationReducer,
  sidebar: sidebarReducer,
  modalListener: modalListenerReducer
});

export default createRootReducer;