import {
  FEED_ERROR,
  FEED_FETCHED,
  QUOTE_UPDATED,
  FEED_START_FETCHING,
  FEED_STOP_REQUEST,
  FEED_RESET_ERROR
} from '../constants/actionsTypes';

const initialState = {
  streak: 0,
  prayersToday: [],
  publicPrayers: [],
  prayersPrayedToday: 0,
  quote: {},
  isFetching: false,
  error: null,
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case FEED_FETCHED:
      return {
        // streak: payload.streak,
        prayersToday: payload.prayersToday,
        publicPrayers: payload.publicPrayers,
        quote: payload.quote,
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
    case QUOTE_UPDATED:
      return {
        ...state,
        quote: payload
      }
    default:
      return state;
  }
}