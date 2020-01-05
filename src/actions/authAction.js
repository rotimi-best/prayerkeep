// import axios from 'axios';

import { LOG_IN, LOG_OUT } from "../actions/types";
import { ERRORS } from "../helpers/constants";
import { postData } from "../modules";

export const logIn = (formData) => async dispatch => {
  const response = await postData('/token', JSON.stringify(formData));

  if (response.success) {
    const accessToken = response.token.access_token;
    const now = new Date();
    const expiresIn = now.setSeconds(now.getSeconds() + response.token.expires_in);

    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('expires_in', expiresIn);
    dispatch({
      type: LOG_IN,
      payload: {
        access_token: accessToken,
        expires_in: expiresIn,
        error: '',
      }
    }) 
  } else {
    dispatch({
      type: LOG_IN,
      payload: {
        error: ERRORS.AUTH_FAILED,
      }
    });
  }
}

export const logOut = () => {
  localStorage.setItem('access_token', '');
  localStorage.setItem('expires_in', '');

  return {
    type: LOG_OUT,
    payload: {
      access_token: '',
      expires_in: '',
      error: '',
    }
  }
};
