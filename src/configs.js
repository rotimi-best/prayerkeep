const {
  REACT_APP_STAGE = 'production',
  REACT_APP_FB_APP_ID = '',
  REACT_APP_SUPPORT_EMAIL = '',
  REACT_APP_API_URL = '',
} = process.env;

export default {
  FB_APP_ID: REACT_APP_FB_APP_ID,
  SUPPORT_EMAIL: REACT_APP_SUPPORT_EMAIL,
  API_URL: REACT_APP_API_URL,
  isProduction: REACT_APP_STAGE === 'production',
}