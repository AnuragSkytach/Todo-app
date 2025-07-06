const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// console.log(import.meta.env);
// console.log("API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/log_in/`,
  signup: `${API_BASE_URL}/sign_up/`,
};  

export default API_ENDPOINTS;
