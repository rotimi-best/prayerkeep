import {
  FEED_ERROR,
  FEED_FETCHED,
  FEED_START_FETCHING,
  FEED_STOP_REQUEST,
  FEED_RESET_ERROR
} from '../constants/actionsTypes';
import { getFeedService } from '../services/feedService';
import alerts from '../constants/alert';
import { openAlert } from './alertAction';


export const getFeed = userId => async dispatch => {
  dispatch({ type: FEED_START_FETCHING });

  const {
    response = {},
    error = null
  } = await getFeedService(userId);

  if (error) {
    dispatch(openAlert(error, alerts.ERROR))
    return dispatch({
      type: FEED_ERROR,
      payload: error
    });
  }

  dispatch({
    type: FEED_FETCHED,
    payload: response,
  });
};

export const stopRequest = () => dispatch => dispatch({ type: FEED_STOP_REQUEST });

export const resetPrayerError = () => dispatch => dispatch({ type: FEED_RESET_ERROR });
