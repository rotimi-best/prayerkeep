import { OPEN_SNACK_BAR, CLOSE_SNACK_BAR } from '../constants/actionsTypes';

const initialState = {
  open: false,
  message: '',
};

export default function snackBarReducer(state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;

  switch (type) {
    case OPEN_SNACK_BAR:
      return {
        open: true,
        message: payload,
      };
    case CLOSE_SNACK_BAR:
      return {
        open: false,
        message: '',
      };
    default:
      return newState;
  }
}
