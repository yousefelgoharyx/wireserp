import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://erp.digitwires.com/api/auth/register',
});

export default instance;
