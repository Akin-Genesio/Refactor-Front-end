import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.20.15.166:3333'
})

export default api;