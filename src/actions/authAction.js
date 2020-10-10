import {
  USER_LOGIN_TOGGLE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILED,
  SET_IS_SUBSCRIBED_TO_PUSH_NOTIFICATION
} from "../constants/actionsTypes";
import { push } from "connected-react-router";
import { authenticateUser } from "../services/authService";
import routes from "../constants/routes"

export const logIn = user => async (dispatch, getState) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  const { response: { data } } = await authenticateUser({ userId: user.userId, googleAuthUser: user });

  if (data && data.success) {
    localStorage.setItem('user', JSON.stringify(user));

    dispatch({
      type: USER_LOGIN_TOGGLE,
      payload: user
    })

    const sw = await navigator.serviceWorker.ready;
    const subscription = await sw.pushManager.getSubscription();

    const {
      authentication: {
        isSubscribedToPushNotification
      },
      router: {
        location
      }
    } = getState();

    if (!subscription && isSubscribedToPushNotification) {
      dispatch(setIsSubscribedToPushNotification(false));
    }

    const goTo = location.query.goTo || routes.HOME;
    dispatch(push(goTo))

  } else {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: null
    });
  }
}

export const setIsSubscribedToPushNotification = (payload) => dispatch => {
  dispatch({
    type: SET_IS_SUBSCRIBED_TO_PUSH_NOTIFICATION,
    payload
  });
}

export const logOut = () => {
  localStorage.setItem('user', '');

  return {
    type: USER_LOGIN_TOGGLE,
    payload: null
  }
};
