import { GET_QUESTION, RESET_QUESTION } from './types';
import { getData } from "../modules";

export const getQuestion = (questionId, access_token) => async dispatch => {
  const response = await getData(`/question/${questionId}`, access_token);

  if (response.success) {
    dispatch({
      type: GET_QUESTION,
      payload: response.questions,
    });
  }
};

export const resetQuestion = () => dispatch => {
  dispatch({
    type: RESET_QUESTION,
    payload: '',
  });
};
