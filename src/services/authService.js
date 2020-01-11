import axios from 'axios';
import configs from '../configs';
const { API_URL } = configs;

export const authenticateUser = async (userParams) => {
  try {
    const requestParams = {
      method: 'POST',
      data: JSON.stringify(userParams),
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/user/auth`
    }
    const response = await axios(requestParams);
    return { response };
  } catch (error) {
    return { error: error.toString() };
  }
};