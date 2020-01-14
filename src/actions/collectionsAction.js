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
  COLLECTION_ADD_ERROR
} from '../constants/actionsTypes';
import {
  getCollectionService,
  updateCollectionService,
  addCollectionService
} from '../services/collectionService';

export const getCollections = userId => async dispatch => {
  dispatch({ type: COLLECTIONS_START_FETCHING });

  const {
    response = {},
    error = null
  } = await getCollectionService(userId);

  if (error) {
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

// TODO: This is not finished
export const updateCollection = (collectionId, collectionParams) => async dispatch => {
  dispatch({ type: COLLECTION_UPDATE_REQUEST });

  const {
    response = {},
    error = null
  } = await updateCollectionService(collectionId, collectionParams);

  if (error) {
    return dispatch({
      type: COLLECTION_UPDATE_ERROR,
      payload: error
    });
  }

  const { collection } = response || {};

  dispatch({
    type: COLLECTION_UPDATE_SUCCESS,
    payload: collection,
  });
};

export const addCollection = (collectionId, collectionParams, prevCollections) => async dispatch => {
  dispatch({ type: COLLECTION_ADD_REQUEST });

  const {
    response = {},
    error = null
  } = await addCollectionService(collectionId, collectionParams);

  if (error) {
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
