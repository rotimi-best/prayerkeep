import {
  USER_LOGIN_TOGGLE,
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  SET_IS_SUBSCRIBED_TO_PUSH_NOTIFICATION
} from '../constants/actionsTypes';

const user = JSON.parse(localStorage.getItem('user')) || null;
const initialState = {
  isFetching: false,
  error: null,
  isLoggedIn: user !== null,
  user,
  isSubscribedToPushNotification: true
};

export default function (state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state) );
  const { type, payload = null } = action;

  switch (type) {
    case USER_LOGIN_TOGGLE:
      return {
        ...newState,
        isFetching: false,
        isLoggedIn: !newState.isLoggedIn,
        user: payload
      };
    case USER_LOGIN_REQUEST:
      return {
        ...newState,
        isFetching: true,
      };
    case USER_LOGIN_FAILED:
      return {
        ...newState,
        isFetching: false,
        error: payload
      }
    case SET_IS_SUBSCRIBED_TO_PUSH_NOTIFICATION:
      return {
        ...newState,
        isSubscribedToPushNotification: payload
      }
    default:
      return newState;
  }
};
