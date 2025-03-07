import axios from 'axios'

export const AxiosIntance = axios.create({
    baseURL: 'http://localhost:5001/api',
    withCredentials: true,
})