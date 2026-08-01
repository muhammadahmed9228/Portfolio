import api from '../../api/axios.js';

const login = async (credentials) => {
  const response = await api.post('/admin/login', credentials);
  return response.data;
};

const logout = async () => {
  const response = await api.post('/admin/logout');
  return response.data;
};

const checkAuth = async () => {
  const response = await api.post('/admin/refresh-token');
  return response.data;
};

const authService = {
  login,
  logout,
  checkAuth,
};

export default authService;