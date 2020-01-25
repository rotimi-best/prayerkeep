import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authenticationReducer from './authenticationReducer';
import sidebarReducer from './sidebarReducer';
import modalListenerReducer from './modalListenerReducer';
import prayersReducer from './prayersReducer';
import feedReducer from './feedReducer';
import alertReducer from './alertReducer';
import collectionsReducer from './collectionsReducer';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  feed: feedReducer,
  authentication: authenticationReducer,
  sidebar: sidebarReducer,
  modalListener: modalListenerReducer,
  prayers: prayersReducer,
  collections: collectionsReducer,
  alert: alertReducer
});

export default createRootReducer;