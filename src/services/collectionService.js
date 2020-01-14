import axios from 'axios';
import configs from '../configs';
const { API_URL } = configs;

export const getCollectionService = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/collection/${userId}`);
    return { response: response.data };
  } catch (error) {
    return { error: error.toString() };
  }
};

export const addCollectionService = async (collectionParams) => {
  try {
    const requestParams = {
      method: 'POST',
      data: JSON.stringify(collectionParams),
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/collection`
    }
    const response = await axios(requestParams);
    return { response: response.data };
  } catch (error) {
    return { error: error.toString() };
  }
};

export const updateCollectionService = async (collectionId, collectionParams) => {
  try {
    const requestParams = {
      method: 'PUT',
      data: JSON.stringify(collectionParams),
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/collection/${collectionId}`
    }

    const response = await axios(requestParams);
    return { response: response.data };
  } catch (error) {
    return { error: error.toString() };
  }
};
