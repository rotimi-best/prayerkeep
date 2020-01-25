import {
  USER_LOGIN_TOGGLE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILED
} from "../constants/actionsTypes";
import { push } from "connected-react-router";
import { authenticateUser } from "../services/authService";
import routes from "../constants/routes"

export const logIn = fbData => async dispatch => {
  dispatch({ type: USER_LOGIN_REQUEST });

  const { response: { data } } = await authenticateUser({ userId: fbData.userId });

  if (data && data.success) {
    localStorage.setItem('user', JSON.stringify(fbData));

    dispatch({
      type: USER_LOGIN_TOGGLE,
      payload: fbData
    })

    dispatch(push(routes.HOME))
  } else {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: null
    });
  }
}

export const logOut = () => {
  localStorage.setItem('user', '');

  return {
    type: USER_LOGIN_TOGGLE,
    payload: null
  }
};
