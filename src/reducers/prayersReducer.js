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
  PRAYER_RESET,
  PRAYER_START_FETCHING,
  PRAYER_FETCHED,
  SET_PRAYERS_TAB_VALUE,
} from '../constants/actionsTypes';

const initialState = {
  allPrayers: [],
  archivedPrayers: [],
  answeredPrayers: [],
  unAnsweredPrayers: [],
  prayersByCollection: [],
  prayer: null,
  interceedingPrayers: [],
  isPrayerFetching: false,
  isFetching: false,
  isUpdating: false,
  isAdding: false,
  error: null,
  prayersTabValue: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PRAYERS_FETCHED:
    case PRAYER_ADD_SUCCESS:
    case PRAYER_UPDATE_SUCCESS:
      return {
        ...state,
        allPrayers: payload.allPrayers ? payload.allPrayers : state.allPrayers,
        archivedPrayers: payload.archivedPrayers
          ? payload.archivedPrayers
          : state.archivedPrayers,
        answeredPrayers: payload.answeredPrayers
          ? payload.answeredPrayers
          : state.answeredPrayers,
        prayersByCollection: payload.prayersByCollection
          ? payload.prayersByCollection
          : state.prayersByCollection,
        unAnsweredPrayers: payload.unAnsweredPrayers
          ? payload.unAnsweredPrayers
          : state.unAnsweredPrayers,
        interceedingPrayers: payload.interceedingPrayers
          ? payload.interceedingPrayers
          : state.interceedingPrayers,
        prayer: payload.prayer || state.prayer,
        isFetching: false,
        isUpdating: false,
        isAdding: false,
        error: null,
      };
    case PRAYER_START_FETCHING:
      return {
        ...state,
        isPrayerFetching: true,
      };
    case PRAYER_FETCHED:
      return {
        ...state,
        prayer: payload,
        isPrayerFetching: false,
      };
    case PRAYERS_START_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: null,
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
      };
    case PRAYER_ADD_REQUEST:
      return {
        ...state,
        isAdding: true,
        error: null,
      };
    case PRAYER_UPDATE_REQUEST:
      return {
        ...state,
        isUpdating: true,
        error: null,
      };
    case PRAYER_RESET:
      return {
        ...state,
        prayer: null,
      };
    case SET_PRAYERS_TAB_VALUE:
      return {
        ...state,
        prayersTabValue: payload,
      };
    default:
      return state;
  }
}
