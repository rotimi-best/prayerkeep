import {
  TOGGLE_SIDE_BAR
} from '../constants/actionsTypes';

const initialState = {
  openSideBar: false
};

export default function(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case TOGGLE_SIDE_BAR:
      return {
        openSideBar: !state.openSideBar
      };
    default:
      return state;
  }
};
