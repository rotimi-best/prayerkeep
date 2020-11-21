import {
  TOGGLE_SIDE_BAR,
  SET_IS_MOBILE
} from '../constants/actionsTypes';

const initialState = {
  open: false,
  isMobile: false,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_SIDE_BAR:
      return {
        ...state,
        open: !state.open
      };
    case SET_IS_MOBILE:
      return {
        ...state,
        isMobile: payload
      }
    default:
      return state;
  }
};
