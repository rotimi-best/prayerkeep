import {
  OPEN_SNACK_BAR,
  CLOSE_SNACK_BAR
} from '../constants/actionsTypes';

export const openSnackBar = (payload) => (dispatch) => {
  dispatch({
    type: OPEN_SNACK_BAR,
    payload
  })

  setTimeout(() => {
    dispatch({
      type: CLOSE_SNACK_BAR,
    })
  }, 2000)
};
