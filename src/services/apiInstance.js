import axios from 'axios';

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiInstance;
