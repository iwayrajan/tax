import api from './axios.config';

export const authService = {
  async login(data) {
    const response = await api.post('/login', data);
    return response.data;
  },

  async forgotPassword(data) {
    await api.post('/forgot-password', data);
  },

  async logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  }
}; 