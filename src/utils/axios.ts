import axios from 'axios';
export const baseURL = 'https://erp.digitwires.com';
const instance = axios.create({
  baseURL: 'https://erp.digitwires.com/api',
  headers: {
    Authorization: JSON.parse(localStorage.getItem('token')),
  },
});

export default instance;
