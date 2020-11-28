const {
  REACT_APP_STAGE = 'production',
  REACT_APP_FB_APP_ID = '',
  REACT_APP_SUPPORT_EMAIL = '',
  REACT_APP_API_URL = '',
  REACT_APP_FIREBASE_AUTH_DOMAIN = '',
  REACT_APP_FIREBASE_API_KEY = '',
  REACT_APP_FIREBASE_STORAGE_BUCKET = '',
  REACT_APP_PUBLIC_PUSH_KEY,
  REACT_APP_SENTRY_DNS
} = process.env;

export default {
  FB_APP_ID: REACT_APP_FB_APP_ID,
  SUPPORT_EMAIL: REACT_APP_SUPPORT_EMAIL,
  API_URL: REACT_APP_API_URL,
  // API_URL: 'http://localhost:4000',
  isProduction: REACT_APP_STAGE === "production",
  firebase: {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  },
  sentry: {
    dns: REACT_APP_SENTRY_DNS
  },
  publicPushKey: REACT_APP_PUBLIC_PUSH_KEY
};