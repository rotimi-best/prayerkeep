import {
  FEED_ERROR,
  FEED_FETCHED,
  QUOTE_UPDATED,
  FEED_START_FETCHING,
  FEED_STOP_REQUEST,
  FEED_RESET_ERROR,
  STORY_UPLOADED,
  STORY_UPLOADING
} from '../constants/actionsTypes';

const initialState = {
  streak: 0,
  prayersToday: [],
  publicPrayers: [],
  stories: [],
  prayersPrayedToday: 0,
  quote: {},
  isFetching: false,
  isStoryUploading: false,
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
        stories: payload.stories,
        quote: payload.quote,
        isFetching: false,
        error: null,
        isStoryUploading: false,
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
      };
    case STORY_UPLOADING:
      return {
        ...state,
        isStoryUploading: true
      }
    case STORY_UPLOADED:
      return {
        ...state,
        stories: payload,
        isStoryUploading: false,
      }
    default:
      return state;
  }
}