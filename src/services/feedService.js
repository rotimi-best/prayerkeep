import axios from 'axios';
import configs from '../configs';
const { API_URL } = configs;

export const getFeedService = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/feed/${userId}`);
    return { response: response.data };
  } catch (error) {
    const { data = {} } = error.response || {};

    return { error: data.message || error.toString() };
  }
};