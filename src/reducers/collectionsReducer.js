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
  COLLECTION_UPDATE_SUCCESS
} from '../constants/actionsTypes';

const initialState = {
  allCollection: [],
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
        allCollection: payload,
        isFetching: false,
        isUpdating: false,
        isAdding: false,
        error: null,
      };
    case COLLECTIONS_START_FETCHING:
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