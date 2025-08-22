import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://31.97.175.41:8001/api';

const api = axios.create({
    baseURL: API_URL,
})

export default api
