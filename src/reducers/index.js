import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authenticationReducer from './authenticationReducer';
import sidebarReducer from './sidebarReducer';
import modalListenerReducer from './modalListenerReducer';
import prayersReducer from './prayersReducer';
import alertReducer from './alertReducer';
import collectionsReducer from './collectionsReducer';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  authentication: authenticationReducer,
  sidebar: sidebarReducer,
  modalListener: modalListenerReducer,
  prayers: prayersReducer,
  collections: collectionsReducer,
  alert: alertReducer
});

export default createRootReducer;