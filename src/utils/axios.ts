import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://erp.digitwires.com/api',
    headers: {
        Authorization: JSON.parse(localStorage.getItem('token')),
    },
});

export default instance;
