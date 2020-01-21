import axios from 'axios';
import configs from '../configs';
const { API_URL } = configs;

export const getPrayersService = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/prayer/${userId}`);
    return { response: response.data };
  } catch (error) {
    const { data = {} } = error.response || {};

    return { error: data.message || error.toString() };
  }
};

export const addPrayerService = async (prayerParams) => {
  try {
    const requestParams = {
      method: 'POST',
      data: JSON.stringify(prayerParams),
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/prayer`
    }
    const response = await axios(requestParams);
    return { response: response.data };
  } catch (error) {
    const { data = {} } = error.response || {};

    return { error: data.message || error.toString() };
  }
};

export const updatePrayerService = async (prayerId, prayerParams) => {
  try {
    const requestParams = {
      method: 'PUT',
      data: JSON.stringify(prayerParams),
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/prayer/${prayerId}`
    }

    const response = await axios(requestParams);
    return { response: response.data };
  } catch (error) {
    const { data = {} } = error.response || {};

    return { error: data.message || error.toString() };
  }
};
