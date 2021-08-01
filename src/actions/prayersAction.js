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
  SET_PRAYERS_TAB_VALUE,
  COLLECTION_UPDATE_SUCCESS,
} from '../constants/actionsTypes';
import {
  archivePrayerService,
  getPrayersService,
  getPrayerService,
  updatePrayerService,
  addPrayerService,
  deletePrayerService,
} from '../services/prayersService';
import alerts from '../constants/alert';
import { openAlert } from './alertAction';

function getprayersByCollection(allPrayers) {
  const groupedCollections = {};
  const noCollection = {
    _id: null,
    title: 'Without Collection',
    prayers: [],
  };

  for (const prayer of allPrayers) {
    const { collections } = prayer;
    if (collections?.length <= 1) {
      noCollection.prayers.push(prayer);
    }

    for (const collection of collections) {
      const { _id, title, edittableByUser } = collection;
      if (!edittableByUser) {
        continue;
      }
      if (groupedCollections[collection._id]) {
        groupedCollections[collection._id].prayers.push(prayer);
      } else {
        groupedCollections[collection._id] = { _id, title, prayers: [prayer] };
      }
    }
  }

  const result = Object.values(groupedCollections);

  if (noCollection.prayers.length) {
    return [...result, noCollection];
  }

  return result;
}

export const setPrayersTabValue = (payload) => (dispatch) =>
  dispatch({
    type: SET_PRAYERS_TAB_VALUE,
    payload,
  });

export const getPrayers = (userId) => async (dispatch) => {
  dispatch({ type: PRAYERS_START_FETCHING });

  const { response = {}, error = null } = await getPrayersService(userId);

  if (error) {
    dispatch(openAlert(error, alerts.ERROR));
    return dispatch({
      type: PRAYERS_ERROR,
      payload: error,
    });
  }

  const { prayers, interceedingPrayers } = response || {};
  const allPrayers = [];
  const archivedPrayers = [];
  const answeredPrayers = [];
  const unAnsweredPrayers = [];

  for (const prayer of prayers) {
    if (prayer.answered) {
      answeredPrayers.push(prayer);
    } else if (!prayer.answered) {
      unAnsweredPrayers.push(prayer);
    }

    if (prayer.isArchived) {
      archivedPrayers.push(prayer);
    } else if (!prayer.isArchived) {
      allPrayers.push(prayer);
    }
  }
  // const prayersByCollection = getprayersByCollection(allPrayers);
  dispatch({
    type: PRAYERS_FETCHED,
    payload: {
      allPrayers,
      answeredPrayers,
      archivedPrayers,
      unAnsweredPrayers,
      interceedingPrayers,
      prayersByCollection: [],
    },
  });
};

export const getPrayer = (userId, prayerId) => async (dispatch) => {
  dispatch({ type: PRAYER_START_FETCHING });

  const { response = {}, error = null } = await getPrayerService(
    userId,
    prayerId
  );

  if (error) {
    dispatch(openAlert(error, alerts.ERROR));
    return dispatch({
      type: PRAYERS_ERROR,
      payload: error,
    });
  }

  const { prayer } = response || {};
  prayer.comments = prayer?.comments?.reverse();

  dispatch({
    type: PRAYER_FETCHED,
    payload: prayer,
  });
};

export const updatePrayer =
  (userId, prayerId, prayerParams, prevPrayers, callback) =>
  async (dispatch, getState) => {
    dispatch({ type: PRAYER_UPDATE_REQUEST });

    const { response = {}, error = null } = await updatePrayerService(
      userId,
      prayerId,
      prayerParams
    );

    if (error) {
      dispatch(openAlert(`Failed!! ${error}`, alerts.ERROR));

      return dispatch({
        type: PRAYER_UPDATE_ERROR,
        payload: error,
      });
    }

    const { prayer } = response || {};
    prayer.comments = prayer?.comments?.reverse();
    const payload = {
      prayer,
      allPrayers: [],
      answeredPrayers: [],
      unAnsweredPrayers: [],
      archivedPrayers: [],
    };
    const { prayers, router, collections } = getState();

    const allPrayers = prayers.allPrayers.map((p) =>
      p._id === prayer._id ? prayer : p
    );

    for (const prayer of allPrayers) {
      if (prayer.answered) {
        payload.answeredPrayers.push(prayer);
      } else if (!prayer.answered) {
        payload.unAnsweredPrayers.push(prayer);
      }

      if (prayer.isArchived) {
        payload.archivedPrayers.push(prayer);
      } else if (!prayer.isArchived) {
        payload.allPrayers.push(prayer);
      }
    }

    // payload.prayersByCollection = getprayersByCollection(allPrayers);

    // This is a collection page
    if (router?.location?.pathname?.match(/\/collection\/.*/g)) {
      const collectionInView = collections.collectionInView;
      collectionInView.prayers = collectionInView.prayers.map((p) =>
        p._id === prayer._id ? prayer : p
      );

      dispatch({
        type: COLLECTION_UPDATE_SUCCESS,
        payload: {
          allCollection: collections.allCollection,
          collectionInView,
        },
      });
    }
    dispatch({
      type: PRAYER_UPDATE_SUCCESS,
      payload,
    });

    if (callback) {
      callback();
    }
  };

// prayerParams => { _id: 'some-id-here', isArchived: true | false }
export const archivePrayer =
  (userId, prayerId, prayerParams) => async (dispatch, getState) => {
    dispatch({ type: PRAYER_UPDATE_REQUEST });
    console.log(`prayerParams`, prayerParams);
    // no 'await' - Don't wait for it to finish, just update on the client
    archivePrayerService(userId, prayerId, prayerParams);

    const prayers = getState().prayers.allPrayers.map((p) =>
      p._id == prayerId ? { ...p, ...prayerParams } : p
    );

    const payload = {
      allPrayers: [],
      archivedPrayers: [],
    };

    for (const prayer of prayers) {
      if (prayer.isArchived) {
        payload.archivedPrayers.push(prayer);
      } else if (!prayer.isArchived) {
        payload.allPrayers.push(prayer);
      }
    }

    dispatch({
      type: PRAYER_UPDATE_SUCCESS,
      payload,
    });

    dispatch(openAlert('Successfully Archived!!!', alerts.SUCCESS));
  };

export const deletePrayer = (prayerId) => async (dispatch, getState) => {
  dispatch({ type: PRAYER_UPDATE_REQUEST });

  const { error = null } = await deletePrayerService(prayerId);

  if (error) {
    dispatch(openAlert(`Opps. Couldn't delete!! ${error}`, alerts.ERROR));

    return dispatch({
      type: PRAYER_UPDATE_ERROR,
      payload: error,
    });
  }
  const prayers = getState().prayers.allPrayers.filter(
    (p) => p._id !== prayerId
  );
  const allPrayers = [];
  // const prayersByCollection = getprayersByCollection(allPrayers);
  const archivedPrayers = [];
  const answeredPrayers = [];
  const unAnsweredPrayers = [];

  for (const prayer of prayers) {
    if (prayer.answered) {
      answeredPrayers.push(prayer);
    } else if (!prayer.answered) {
      unAnsweredPrayers.push(prayer);
    }

    if (prayer.isArchived) {
      archivedPrayers.push(prayer);
    } else if (!prayer.isArchived) {
      allPrayers.push(prayer);
    }
  }

  dispatch({
    type: PRAYER_UPDATE_SUCCESS,
    payload: {
      allPrayers,
      archivedPrayers,
      // prayersByCollection,
      answeredPrayers,
      unAnsweredPrayers,
    },
  });

  dispatch(openAlert('Successfully deleted!!!', alerts.SUCCESS));
};

export const addPrayer =
  (prayerParams, prevPrayers, callback) => async (dispatch) => {
    dispatch({ type: PRAYER_ADD_REQUEST });

    const { response = {}, error = null } = await addPrayerService(
      prayerParams
    );

    if (error) {
      dispatch(openAlert(`Failed!! ${error}`, alerts.ERROR));

      return dispatch({
        type: PRAYER_ADD_ERROR,
        payload: error,
      });
    }

    const { prayer } = response || {};
    const allPrayers = [prayer, ...prevPrayers];
    const answeredPrayers = allPrayers.filter((prayer) => prayer.answered);
    const archivedPrayers = allPrayers.filter((prayer) => prayer.isArchived);
    const unAnsweredPrayers = allPrayers.filter((prayer) => !prayer.answered);
    const prayersByCollection = getprayersByCollection(allPrayers);
    dispatch({
      type: PRAYER_ADD_SUCCESS,
      payload: {
        allPrayers,
        archivedPrayers,
        answeredPrayers,
        unAnsweredPrayers,
        prayersByCollection,
      },
    });
    if (callback && typeof callback === 'function') {
      callback();
    }

    dispatch(openAlert('Successfully added!!!', alerts.SUCCESS));
  };

export const stopRequest = () => (dispatch) =>
  dispatch({ type: PRAYERS_STOP_REQUEST });

export const resetPrayer = () => (dispatch) => dispatch({ type: PRAYER_RESET });
