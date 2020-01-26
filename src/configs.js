const {
  REACT_APP_STAGE = 'production',
  REACT_APP_FB_APP_ID = '',
  REACT_APP_SUPPORT_EMAIL = '',
  REACT_APP_API_URL = '',
  REACT_APP_FIREBASE_AUTH_DOMAIN = '',
  REACT_APP_FIREBASE_API_KEY = ''
} = process.env;

export default {
  FB_APP_ID: REACT_APP_FB_APP_ID,
  SUPPORT_EMAIL: REACT_APP_SUPPORT_EMAIL,
  API_URL: REACT_APP_API_URL,
  isProduction: REACT_APP_STAGE === 'production',
  firebase: {
  	apiKey: REACT_APP_FIREBASE_API_KEY,
  	authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN
  }
}