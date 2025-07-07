const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// console.log(import.meta.env);
// console.log("API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/log_in/`,
  signup: `${API_BASE_URL}/sign_up/`,
  todoList: `${API_BASE_URL}/to_do_list/`,
  updateTodo: `${API_BASE_URL}/update_to_do/`,
  deleteTodo: `${API_BASE_URL}/delete_to_do/`,
};  

export default API_ENDPOINTS;
