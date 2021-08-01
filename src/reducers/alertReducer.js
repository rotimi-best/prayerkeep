import { OPEN_ALERT, CLOSE_ALERT } from '../constants/actionsTypes';
import alerts from '../constants/alert';

const initialState = {
  open: false,
  message: '',
  type: alerts.SUCCESS,
};

export default function alertReducer(state = initialState, action) {
  const { type, payload = null } = action;

  switch (type) {
    case OPEN_ALERT:
      return {
        open: true,
        message: payload.message,
        type: payload.type,
      };
    case CLOSE_ALERT:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
}
