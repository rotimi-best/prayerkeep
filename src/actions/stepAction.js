import { SET_STEP } from "../actions/types";

export const setStep = (step) => {
  return {
    type: SET_STEP,
    payload: step,
  }
};
