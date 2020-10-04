import axios from 'axios';
import configs from '../configs';
const { API_URL } = configs;

export const getFeedService = async (userId, quoteId) => {
  try {
    const response = await axios.get(`${API_URL}/feed/${userId}?quoteId=${quoteId}`);
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
