import {
  PRAYERS_FETCHED,
  PRAYERS_ERROR,
  PRAYERS_START_FETCHING,
  PRAYERS_STOP_REQUEST,
  PRAYER_ADD_ERROR,
  PRAYER_ADD_REQUEST,
  PRAYER_ADD_SUCCESS,
  PRAYER_UPDATE_ERROR,
  PRAYER_UPDATE_REQUEST,
  PRAYER_UPDATE_SUCCESS,
  PRAYER_RESET_ERROR,
} from '../constants/actionsTypes';

const initialState = {
  allPrayers: [],
  isFetching: false,
  isUpdating: false,
  isAdding: false,
  error: null,
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case PRAYERS_FETCHED:
    case PRAYER_ADD_SUCCESS:
    case PRAYER_UPDATE_SUCCESS:
      return {
        allPrayers: payload,
        isFetching: false,
        isUpdating: false,
        isAdding: false,
        error: null,
      };
    case PRAYERS_START_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case PRAYERS_STOP_REQUEST:
      return {
        ...state,
        isFetching: false,
        isUpdating: false,
        isAdding: false,
      };
    case PRAYERS_ERROR:
    case PRAYER_UPDATE_ERROR:
    case PRAYER_ADD_ERROR:
      return {
        ...state,
        isFetching: false,
        isUpdating: false,
        isAdding: false,
        error: payload,
      }
    case PRAYER_ADD_REQUEST:
      return {
        ...state,
        isAdding: true,
        error: null
      };
    case PRAYER_UPDATE_REQUEST:
      return {
        ...state,
        isUpdating: true,
        error: null
      };
    case PRAYER_RESET_ERROR:
      return {
        ...state,
        error: null,
      }
    default:
      return state;
  }
}