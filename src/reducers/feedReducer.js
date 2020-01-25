import {
  FEED_ERROR,
  FEED_FETCHED,
  FEED_START_FETCHING,
  FEED_STOP_REQUEST,
  FEED_RESET_ERROR
} from '../constants/actionsTypes';

const initialState = {
  streak: 0,
  prayersToday: [],
  prayersPrayedToday: 0,
  isFetching: false,
  error: null,
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case FEED_FETCHED:
      return {
        streak: payload.streak,
        prayersToday: payload.prayersToday,
        prayersPrayedToday: payload.prayersPrayedToday,
        isFetching: false,
        error: null,
      };
    case FEED_START_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case FEED_STOP_REQUEST:
      return {
        ...state,
        isFetching: false,
      };
    case FEED_ERROR:
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    case FEED_RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}