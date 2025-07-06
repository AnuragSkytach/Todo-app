import axios from 'axios';
import API_ENDPOINTS from '../constants/apiConfig';


export const registerUser = async (userData) => {
  const response = await axios.post(API_ENDPOINTS.signup, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(API_ENDPOINTS.login, credentials);
  return response.data;
};

// export const checkAuthStatus = async () => {
//   const response = await axios.get(`${API_URL}/status`, {
//     withCredentials: true,
//   });
//   return response.data;
// };