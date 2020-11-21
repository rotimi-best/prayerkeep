import {
  FEED_ERROR,
  FEED_FETCHED,
  QUOTE_UPDATED,
  FEED_START_FETCHING,
  QUOTE_START_UPDATING,
  FEED_STOP_REQUEST,
  FEED_RESET_ERROR,
  STORY_UPLOADING,
  STORY_UPLOADED
} from '../constants/actionsTypes';
import { getFeedService, updateQuoteService, uploadStoryService } from '../services/feedService';
import alerts from '../constants/alert';
import { openAlert } from './alertAction';
import configs from '../configs';
const { API_URL } = configs;

function formatStories(stories) {
  return Object.values(stories.reduce((acc, curr) => {
    if (acc[curr.creator._id]) {
      acc[curr.creator._id].urls.push({
        url: `${API_URL}/feed/story/view/${curr._id}`,
        type: 'video',
        header: {
          heading: curr.creator.googleAuthUser.name,
          subheading: `${curr.views} view${curr.views > 0 ? 's': ''}`,
          profileImage: curr.creator.googleAuthUser.picture,
        },
      })
    } else {
      acc[curr.creator._id] = {
        _id: curr.creator._id,
        creator: curr.creator,
        urls: [
          {
            url: `${API_URL}/feed/story/view/${curr._id}`,
            type: 'video',
            header: {
              heading: curr.creator.googleAuthUser.name,
              subheading: `${curr.views} view${curr.views > 0 ? 's': ''}`,
              profileImage: curr.creator.googleAuthUser.picture,
            },
          }
        ]
      }
    }

    return acc;
  }, {}))
}

export const uploadingStory = () => async dispatch => {
  dispatch({ type: STORY_UPLOADING });
}

export const uploadStory = (userId, url) => async dispatch => {
  const {
    response = {},
    error = null
  } = await uploadStoryService(userId, url);

  if (error) {
    dispatch(openAlert(error, alerts.ERROR))
    return dispatch({
      type: FEED_ERROR,
      payload: error
    });
  }
  response.stories = formatStories(response.stories)
  dispatch(openAlert('Uploaded', alerts.SUCCESS))
  dispatch({
    type: STORY_UPLOADED,
    payload: response.stories,
  });
}

export const getFeed = (userId, quoteId) => async dispatch => {
  dispatch({ type: FEED_START_FETCHING });

  const {
    response = {},
    error = null
  } = await getFeedService(userId, quoteId);

  if (error) {
    dispatch(openAlert(error, alerts.ERROR))
    return dispatch({
      type: FEED_ERROR,
      payload: error
    });
  }

  response.quote.comments = response.quote?.comments?.reverse();
  response.stories = formatStories(response.stories)

  dispatch({
    type: FEED_FETCHED,
    payload: response,
  });
};

export const updateQuote = (userId, quoteId, quoteParams) => async dispatch => {
  dispatch({ type: QUOTE_START_UPDATING });

  const {
    response = {},
    error = null
  } = await updateQuoteService(userId, quoteId, quoteParams);

  if (error) {
    dispatch(openAlert(error, alerts.ERROR))
    return dispatch({
      type: FEED_ERROR,
      payload: error
    });
  }

  const comments = response.quote?.comments?.reverse();

  dispatch({
    type: QUOTE_UPDATED,
    payload: {
      ...response.quote,
      comments
    }
  });
};

export const stopRequest = () => dispatch => dispatch({ type: FEED_STOP_REQUEST });

export const resetPrayerError = () => dispatch => dispatch({ type: FEED_RESET_ERROR });
