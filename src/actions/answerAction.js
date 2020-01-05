import { SUBMIT_ANSWER, SUBMIT_ANSWERS, RESET_QUESTION, RESET_ANSWERS } from "../actions/types";
import { postData } from "../modules";

export const submitAnswer = (formData) => async dispatch => {
  const response = await postData('/question/submit', JSON.stringify(formData));

  if (response.success) {
    const answers = response.answer;
    const moreThanOneOption = answers.length > 1 ? true : false;
    const lastSelecOption = answers[answers.length - 1];

    const payload = response.answer
      .reduce((prev, curr) => {
        if (moreThanOneOption) {
          if (curr.option === lastSelecOption.option) {
            return prev.concat(' ', `& ${curr.option}`).replace(/^,\s/, '');
          } else {
            return prev.concat(', ', curr.option).replace(/^,\s/, '');
          }
        } else {
          return prev.concat(curr.option, '');
        }
      }, '')
      .trim();

    dispatch({
      type: SUBMIT_ANSWER,
      payload,
    });
  }
};

export const submitAnswers = (formData) => async dispatch => {
  dispatch({
    type: RESET_QUESTION,
    payload: '',
  });

  const response = await postData('http://leadgen.ossystem.ua/api/ossystem/email', JSON.stringify(formData));

  if (response.success) {
    dispatch({
      type: SUBMIT_ANSWERS,
      payload: true,
    });
  }
};

export const resetAnswers = () => async dispatch => {
  dispatch({
    type: RESET_ANSWERS,
    payload: '',
  });
};
