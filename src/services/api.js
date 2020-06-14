import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-bethehero-java.herokuapp.com/'
});

export default api;