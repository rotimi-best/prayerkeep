import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './configureStore';
import * as serviceWorker from './serviceWorker';
import './index.css';

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
const config = {
  // Src: https://github.com/facebook/create-react-app/issues/5316#issuecomment-591075209
  onUpdate: async registration => {
    console.log('App has been updated')
    // We want to run this code only if we detect a new service worker is
    // waiting to be activated.
    // Details about it: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
    if (registration && registration.waiting) {
      await registration.unregister();
      // Makes Workbox call skipWaiting()
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      // Once the service worker is unregistered, we can reload the page to let
      // the browser download a fresh copy of our app (invalidating the cache)
      console.log('Reloading page')
      window.location.reload();
    }
  }
}
serviceWorker.register(config);
