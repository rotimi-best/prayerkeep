import {
  USER_LOGIN_TOGGLE
} from '../constants/actionsTypes';

const initialState = {
  isFetching: false,
  error: null,
  loggedIn: false,
  user: null
};

export default function (state = initialState, action) {
  const newState = JSON.parse( JSON.stringify( state ) );
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN_TOGGLE:
      return {
        ...newState,
        loggedIn: !newState.loggedIn
      };
    default:
      return newState;
  }
};
