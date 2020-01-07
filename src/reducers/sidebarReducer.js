import {
  TOGGLE_SIDE_BAR
} from '../constants/actionsTypes';

const initialState = {
  open: false
};

export default function(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case TOGGLE_SIDE_BAR:
      return {
        open: !state.open
      };
    default:
      return state;
  }
};
