import {
  COLLECTIONS_FETCHED,
  COLLECTIONS_ERROR,
  COLLECTIONS_START_FETCHING,
  COLLECTIONS_STOP_REQUEST,
  COLLECTION_ADD_ERROR,
  COLLECTION_ADD_REQUEST,
  COLLECTION_ADD_SUCCESS,
  COLLECTION_UPDATE_ERROR,
  COLLECTION_UPDATE_REQUEST,
  COLLECTION_UPDATE_SUCCESS,
  COLLECTION_FETCHING,
  COLLECTION_FETCHED
} from '../constants/actionsTypes';

const initialState = {
  allCollection: [],
  sharedWithMe: [],
  collectionInView: null,
  isFetching: false,
  isUpdating: false,
  isAdding: false,
  error: null,
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case COLLECTIONS_FETCHED:
    case COLLECTION_ADD_SUCCESS:
    case COLLECTION_UPDATE_SUCCESS:
      return {
        ...state,
        allCollection: payload.allCollection || payload,
        sharedWithMe: payload.sharedWithMe || state.sharedWithMe,
        collectionInView: payload.collectionInView || state.collectionInView,
        isFetching: false,
        isUpdating: false,
        isAdding: false,
        error: null,
      };
    case COLLECTION_FETCHED:
      return {
        ...state,
        isFetching: false,
        isUpdating: false,
        isAdding: false,
        error: null,
        collectionInView: payload,
      };
    case COLLECTIONS_START_FETCHING:
    case COLLECTION_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case COLLECTIONS_STOP_REQUEST:
      return {
        ...state,
        isFetching: false,
        isUpdating: false,
        isAdding: false,
      };
    case COLLECTIONS_ERROR:
    case COLLECTION_UPDATE_ERROR:
    case COLLECTION_ADD_ERROR:
      return {
        ...state,
        isFetching: false,
        isUpdating: false,
        isAdding: false,
        error: payload,
      }
    case COLLECTION_ADD_REQUEST:
      return {
        ...state,
        isAdding: true,
        error: null
      };
    case COLLECTION_UPDATE_REQUEST:
      return {
        ...state,
        isUpdating: true,
        error: null
      };
    default:
      return state;
  }
}