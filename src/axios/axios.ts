import axios from "axios";
import Cookies from 'js-cookie'

export const BASE_URL = 'http://localhost:5001/';

const token = Cookies.get('token')

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const authRequest = axios.create({
    baseURL: BASE_URL,
    headers:{
        token: `Bearer ${token}`
    }
})