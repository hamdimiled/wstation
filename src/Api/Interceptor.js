import axios from 'axios'
import {SERVER_URL} from '../Config/config'

const AxiosInstance = axios.create({
    baseURL: SERVER_URL,
    timeout: 20000,
    authorization:"BBBBBBB",
    headers: {
        'Content-Type': 'application/json'
    }
})

AxiosInstance.interceptors.response.use((response) =>{
    return response;
}, (error) => {
    if (!error.response) {
       return Promise.reject('Network Error')
    } else {
        return error.response
    }

})

export default AxiosInstance