import {
  PRAYERS_FETCHED,
  PRAYERS_ERROR,
  PRAYERS_START_FETCHING,
  PRAYERS_STOP_REQUEST,
  PRAYER_UPDATE_ERROR,
  PRAYER_UPDATE_REQUEST,
  PRAYER_UPDATE_SUCCESS,
  PRAYER_ADD_REQUEST,
  PRAYER_ADD_SUCCESS,
  PRAYER_ADD_ERROR
} from '../constants/actionsTypes';
import {
  getPrayersService,
  updatePrayerService,
  addPrayerService
} from '../services/prayersService';

export const getPrayers = userId => async dispatch => {
  dispatch({ type: PRAYERS_START_FETCHING });

  const {
    response = {},
    error = null
  } = await getPrayersService(userId);

  if (error) {
    return dispatch({
      type: PRAYERS_ERROR,
      payload: error
    });
  }

  const { prayers } = response || {};

  dispatch({
    type: PRAYERS_FETCHED,
    payload: prayers,
  });
};

// TODO: This is not finished
export const updatePrayer = (prayerId, prayerParams) => async dispatch => {
  dispatch({ type: PRAYER_UPDATE_REQUEST });

  const {
    response = {},
    error = null
  } = await updatePrayerService(prayerId, prayerParams);

  if (error) {
    return dispatch({
      type: PRAYER_UPDATE_ERROR,
      payload: error
    });
  }

  const { prayer } = response || {};

  dispatch({
    type: PRAYER_UPDATE_SUCCESS,
    payload: prayer,
  });
};

export const addPrayer = (prayerId, prayerParams, prevPrayers) => async dispatch => {
  dispatch({ type: PRAYER_ADD_REQUEST });

  const {
    response = {},
    error = null
  } = await addPrayerService(prayerId, prayerParams);

  if (error) {
    return dispatch({
      type: PRAYER_ADD_ERROR,
      payload: error
    });
  }

  const { prayer } = response || {};

  dispatch({
    type: PRAYER_ADD_SUCCESS,
    payload: [prayer, ...prevPrayers],
  });
};

export const stopRequest = () => dispatch => dispatch({ type: PRAYERS_STOP_REQUEST });
