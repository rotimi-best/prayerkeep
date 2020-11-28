import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import App from './App';
import configureStore from './configureStore';
import configs from './configs';
import * as serviceWorker from './serviceWorker';
import './index.css';

const store = configureStore({});

if (configs.isProduction) {
  ReactGA.initialize('G-4L57R90356');

  Sentry.init({
    dsn: configs.sentry.dns,
    release: "prayer-keep",
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

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
  onUpdate: async (registration) => {
    console.log('App has been updated')
    // We want to run this code only if we detect a new service worker is
    // waiting to be activated.
    // Details about it: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
    // if (registration && registration.waiting) {
      // await registration.unregister();
      // Makes Workbox call skipWaiting()
      // registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      // Once the service worker is unregistered, we can reload the page to let
      // the browser download a fresh copy of our app (invalidating the cache)
      // console.log('Reloading page')
      // localStorage.setItem('sendSubscription', 'true');
      // setTimeout(() => {
      //   window.location.reload();
      // }, 200)
    // }
  },
  onSuccess: async registration => {
    console.log('serice worker registered successfully', registration)
    /* eslint-disable-next-line no-restricted-globals */
    self.addEventListener('push', event => {
      const data = event.data.json();
      console.log('Push received and about to be sent', event);
      /* eslint-disable-next-line no-restricted-globals */
      registration.showNotification(data.title, {
        body: 'You deserve a greater life',
        icon: 'https://prayerkeep.com/images/icons/icon-128x128.png'
      })
    })
  }
}

serviceWorker.register(config);
