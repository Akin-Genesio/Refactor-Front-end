import axios from 'axios';

const api = axios.create({
    baseURL: 'http://monipaep.icmc.usp.br:80' 
})

export default api;