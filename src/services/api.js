import axios from 'axios';

const api = axios.create({
    baseURL: "http://18.230.150.45:8080"
});

export default api;