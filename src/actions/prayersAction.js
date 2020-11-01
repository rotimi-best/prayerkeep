import {
  PRAYERS_FETCHED,
  PRAYER_FETCHED,
  PRAYERS_ERROR,
  PRAYERS_START_FETCHING,
  PRAYER_START_FETCHING,
  PRAYERS_STOP_REQUEST,
  PRAYER_UPDATE_ERROR,
  PRAYER_UPDATE_REQUEST,
  PRAYER_UPDATE_SUCCESS,
  PRAYER_ADD_REQUEST,
  PRAYER_ADD_SUCCESS,
  PRAYER_ADD_ERROR,
  PRAYER_RESET,
  SET_PRAYERS_TAB_VALUE
} from '../constants/actionsTypes';
import {
  getPrayersService,
  getPrayerService,
  updatePrayerService,
  addPrayerService,
  deletePrayerService
} from '../services/prayersService';
import alerts from '../constants/alert';
import { openAlert } from './alertAction';

export const setPrayersTabValue = payload => dispatch => dispatch({
  type: SET_PRAYERS_TAB_VALUE,
  payload
})

export const getPrayers = userId => async dispatch => {
  dispatch({ type: PRAYERS_START_FETCHING });

  const {
    response = {},
    error = null
  } = await getPrayersService(userId);

  if (error) {
    dispatch(openAlert(error, alerts.ERROR))
    return dispatch({
      type: PRAYERS_ERROR,
      payload: error
    });
  }

  const { prayers, interceedingPrayers } = response || {};
  const allPrayers = prayers;
  const answeredPrayers = allPrayers.filter(prayer => prayer.answered);
  const unAnsweredPrayers = allPrayers.filter(prayer => !prayer.answered);

  dispatch({
    type: PRAYERS_FETCHED,
    payload: {
      allPrayers,
      answeredPrayers,
      unAnsweredPrayers,
      interceedingPrayers
    },
  });
};

export const getPrayer = (userId, prayerId) => async dispatch => {
  dispatch({ type: PRAYER_START_FETCHING });

  const {
    response = {},
    error = null
  } = await getPrayerService(userId, prayerId);

  if (error) {
    dispatch(openAlert(error, alerts.ERROR))
    return dispatch({
      type: PRAYERS_ERROR,
      payload: error
    });
  }

  const { prayer } = response || {};
  prayer.comments = prayer?.comments?.reverse();

  dispatch({
    type: PRAYER_FETCHED,
    payload: prayer,
  });
};
export const updatePrayer = (userId, prayerId, prayerParams, prevPrayers, callback) =>
  async (dispatch, getState) => {
  dispatch({ type: PRAYER_UPDATE_REQUEST });

  const {
    response = {},
    error = null
  } = await updatePrayerService(userId, prayerId, prayerParams);

  if (error) {
    dispatch(openAlert(`Failed!! ${error}`, alerts.ERROR))

    return dispatch({
      type: PRAYER_UPDATE_ERROR,
      payload: error
    });
  }

  const { prayer } = response || {};
  prayer.comments = prayer?.comments?.reverse();
  const payload = {
    prayer
  }
  const {prayers} = getState();

  payload.allPrayers = prayers.allPrayers.map(p => p._id === prayer._id ? prayer : p);

  dispatch({
    type: PRAYER_UPDATE_SUCCESS,
    payload
  });

  if (callback) {
    callback();
  }
};

export const deletePrayer = (prayerId) => async (dispatch, getState) => {
  dispatch({ type: PRAYER_UPDATE_REQUEST });

  const { error = null } = await deletePrayerService(prayerId);

  if (error) {
    dispatch(openAlert(`Opps. Couldn't delete!! ${error}`, alerts.ERROR))

    return dispatch({
      type: PRAYER_UPDATE_ERROR,
      payload: error
    });
  }
  const {prayers} = getState();

  dispatch({
    type: PRAYER_UPDATE_SUCCESS,
    payload: {
      allPrayers: prayers.allPrayers.filter(p => p._id !== prayerId)
    }
  });

  dispatch(openAlert("Successfully deleted!!!", alerts.SUCCESS));
};

export const addPrayer = (prayerParams, prevPrayers, callback) => async dispatch => {
  dispatch({ type: PRAYER_ADD_REQUEST });

  const {
    response = {},
    error = null
  } = await addPrayerService(prayerParams);

  if (error) {
  dispatch(openAlert(`Failed!! ${error}`, alerts.ERROR))

  return dispatch({
      type: PRAYER_ADD_ERROR,
      payload: error
    });
  }

  const { prayer } = response || {};
  const allPrayers = [prayer, ...prevPrayers];
  const answeredPrayers = allPrayers.filter(prayer => prayer.answered);
  const unAnsweredPrayers = allPrayers.filter(prayer => !prayer.answered);

  dispatch({
    type: PRAYER_ADD_SUCCESS,
    payload: {
      allPrayers,
      answeredPrayers,
      unAnsweredPrayers,
    },
  });
  if (callback && typeof(callback) === "function") {
    callback();
  }

  dispatch(openAlert("Successfully added!!!", alerts.SUCCESS))
};

export const stopRequest = () => dispatch => dispatch({ type: PRAYERS_STOP_REQUEST });

export const resetPrayer= () => dispatch => dispatch({ type: PRAYER_RESET });
