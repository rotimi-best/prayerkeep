import axios from 'axios';
import configs from '../configs';
const { API_URL } = configs;

export const uploadStoryService = async (userId, url = '') => {
  try {
    const requestParams = {
      method: 'POST',
      data: JSON.stringify({ url }),
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/feed/story/${userId}`
    }

    const response = await axios(requestParams);
    return { response: response.data };
  } catch (error) {
    const { data = {} } = error.response || {};

    return { error: data.message || error.toString() };
  }
};

export const getFeedService = async (userId, quoteId = '') => {
  try {
    const response = await axios.get(`${API_URL}/feed/${userId}?quoteId=${quoteId}`, {
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    });
    return { response: response.data };
  } catch (error) {
    const { data = {} } = error.response || {};

    return { error: data.message || error.toString() };
  }
};

export const updateQuoteService = async (userId, quoteId, quoteParams) => {
  try {
    const requestParams = {
      method: 'PUT',
      data: JSON.stringify(quoteParams),
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/feed/${userId}/${quoteId}`
    }

    const response = await axios(requestParams);
    return { response: response.data };
  } catch (error) {
    const { data = {} } = error.response || {};

    return { error: data.message || error.toString() };
  }
};
