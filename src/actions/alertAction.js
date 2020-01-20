import {
  OPEN_ALERT,
  CLOSE_ALERT
} from "../constants/actionsTypes";

export const openAlert = (message, type) => dispatch => {
  return dispatch({
    type: OPEN_ALERT,
    payload: {
      message,
      type
    },
  })
};

export const closeAlert = () => dispatch => dispatch({ type: CLOSE_ALERT });
