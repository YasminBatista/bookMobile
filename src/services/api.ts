import axios from 'axios';

export const api = axios.create({
    baseURL: "https://ybadonis.onrender.com",
    headers: {
        Accept: 'application/json'
    }
})