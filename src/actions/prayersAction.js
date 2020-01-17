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
import alerts from '../constants/alert';
import {
  getPrayersService,
  updatePrayerService,
  addPrayerService
} from '../services/prayersService';
import { openAlert } from './alertAction';


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
  console.log('get prayer', prayers)

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
    dispatch(openAlert(error, alerts.ERROR))
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

  dispatch(openAlert("Successfully updated!!!", alerts.SUCCESS))
};

export const addPrayer = (prayerParams, prevPrayers) => async dispatch => {
  dispatch({ type: PRAYER_ADD_REQUEST });

  const {
    response = {},
    error = null
  } = await addPrayerService(prayerParams);

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

  dispatch(openAlert("Successfully added!!!", alerts.SUCCESS))
};

export const stopRequest = () => dispatch => dispatch({ type: PRAYERS_STOP_REQUEST });
