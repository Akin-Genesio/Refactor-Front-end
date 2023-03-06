import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.20.18.208:3333'
})

export default api;