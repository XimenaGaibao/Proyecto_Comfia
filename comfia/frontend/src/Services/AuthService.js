import axios from 'axios';


const API_URL = 'http://localhost:3000/api/auth';

export const AuthService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },
  
  verifyToken: async (token) => {
    const response = await axios.get(`${API_URL}/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.user;
  }
};