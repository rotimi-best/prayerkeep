import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authenticationReducer from './authenticationReducer';
import globalReducer from './globalReducer';
import modalListenerReducer from './modalListenerReducer';
import prayersReducer from './prayersReducer';
import feedReducer from './feedReducer';
import alertReducer from './alertReducer';
import collectionsReducer from './collectionsReducer';
import snackBarReducer from './snackBarReducer';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  feed: feedReducer,
  authentication: authenticationReducer,
  global: globalReducer,
  modalListener: modalListenerReducer,
  prayers: prayersReducer,
  collections: collectionsReducer,
  alert: alertReducer,
  snackBar: snackBarReducer
});

export default createRootReducer;