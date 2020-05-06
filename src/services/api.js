import axios from 'axios';

const URL_API = process.env.REACT_APP_URL_API;

const api = axios.create({
  baseURL: `${URL_API}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
