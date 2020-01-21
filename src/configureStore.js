import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createRootReducer from './reducers';
import configs from './configs';

export const history = createBrowserHistory();

const middleware = [
  thunk,
  routerMiddleware(history)
];

if (!configs.isProduction) {
  middleware.push(createLogger())
}

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(...middleware)
    ),
  );

  return store;
}