import {
  FEED_ERROR,
  FEED_FETCHED,
  QUOTE_UPDATED,
  FEED_START_FETCHING,
  QUOTE_START_UPDATING,
  FEED_STOP_REQUEST,
  FEED_RESET_ERROR
} from '../constants/actionsTypes';
import { getFeedService, updateQuoteService } from '../services/feedService';
import alerts from '../constants/alert';
import { openAlert } from './alertAction';


export const getFeed = (userId, quoteId) => async dispatch => {
  dispatch({ type: FEED_START_FETCHING });

  const {
    response = {},
    error = null
  } = await getFeedService(userId, quoteId);

  if (error) {
    dispatch(openAlert(error, alerts.ERROR))
    return dispatch({
      type: FEED_ERROR,
      payload: error
    });
  }

  response.quote.comments = response.quote?.comments?.reverse();

  dispatch({
    type: FEED_FETCHED,
    payload: response,
  });
};

export const updateQuote = (userId, quoteId, quoteParams) => async dispatch => {
  dispatch({ type: QUOTE_START_UPDATING });

  const {
    response = {},
    error = null
  } = await updateQuoteService(userId, quoteId, quoteParams);

  if (error) {
    dispatch(openAlert(error, alerts.ERROR))
    return dispatch({
      type: FEED_ERROR,
      payload: error
    });
  }

  const comments = response.quote?.comments?.reverse();

  dispatch({
    type: QUOTE_UPDATED,
    payload: {
      ...response.quote,
      comments
    }
  });
};

export const stopRequest = () => dispatch => dispatch({ type: FEED_STOP_REQUEST });

export const resetPrayerError = () => dispatch => dispatch({ type: FEED_RESET_ERROR });
