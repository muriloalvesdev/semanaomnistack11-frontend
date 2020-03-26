import axios from 'axios';

const api = axios.create({
    baseURL: 'https://semanaomnistack11-backend.herokuapp.com'
});

export default api;