import {
  COLLECTIONS_FETCHED,
  COLLECTIONS_ERROR,
  COLLECTIONS_START_FETCHING,
  COLLECTIONS_STOP_REQUEST,
  COLLECTION_UPDATE_ERROR,
  COLLECTION_UPDATE_REQUEST,
  COLLECTION_UPDATE_SUCCESS,
  COLLECTION_ADD_REQUEST,
  COLLECTION_ADD_SUCCESS,
  COLLECTION_ADD_ERROR,
  COLLECTION_FETCHING,
  COLLECTION_FETCHED
} from '../constants/actionsTypes';
import {
  getCollectionsService,
  updateCollectionService,
  addCollectionService,
  getCollectionService
} from '../services/collectionService';
import alerts from '../constants/alert';
import { openAlert } from './alertAction';

export const getCollections = userId => async dispatch => {
  dispatch({ type: COLLECTIONS_START_FETCHING });

  const {
    response = {},
    error = null
  } = await getCollectionsService(userId);

  if (error) {
    dispatch(openAlert(`Sorry can't get your collections!! ${error}`, alerts.ERROR));

    return dispatch({
      type: COLLECTIONS_ERROR,
      payload: error
    });
  }

  const { collections } = response || {};

  dispatch({
    type: COLLECTIONS_FETCHED,
    payload: collections,
  });
};

export const getCollection = (collectionId, userId) => async dispatch => {
  dispatch({ type: COLLECTION_FETCHING });

  const {
    response = {},
    error = null
  } = await getCollectionService(collectionId, userId);

  if (error) {
    dispatch(openAlert(`Sorry can't get this collection!! ${error}`, alerts.ERROR));

    return dispatch({
      type: COLLECTIONS_ERROR,
      payload: error
    });
  }

  const { collection } = response || {};

  dispatch({
    type: COLLECTION_FETCHED,
    payload: collection,
  });
};

export const updateCollection = (collectionId, collectionParams, prevCollections) => async dispatch => {
  dispatch({ type: COLLECTION_UPDATE_REQUEST });

  const {
    response = {},
    error = null
  } = await updateCollectionService(collectionId, collectionParams);

  if (error) {
    dispatch(openAlert(`Sorry can't update this collection!! ${error}`, alerts.ERROR));

    return dispatch({
      type: COLLECTION_UPDATE_ERROR,
      payload: error
    });
  }

  const { collection } = response || {};

  dispatch({
    type: COLLECTION_UPDATE_SUCCESS,
    payload: prevCollections.map(p => p._id === collection._id ? collection : p),
  });
};

export const addCollection = (collectionParams, prevCollections) => async dispatch => {
  dispatch({ type: COLLECTION_ADD_REQUEST });

  const {
    response = {},
    error = null
  } = await addCollectionService(collectionParams);

  if (error) {
    dispatch(openAlert(`Sorry can't add this collection!! ${error}`, alerts.ERROR));

    return dispatch({
      type: COLLECTION_ADD_ERROR,
      payload: error
    });
  }

  const { collection } = response || {};

  dispatch({
    type: COLLECTION_ADD_SUCCESS,
    payload: [collection, ...prevCollections],
  });
};

export const stopRequest = () => dispatch => dispatch({ type: COLLECTIONS_STOP_REQUEST });
