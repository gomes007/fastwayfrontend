import axios from 'axios';

const API_URL = 'http://localhost:8080/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(
    config => {
        const user = JSON.parse(localStorage.getItem('user'));

        if(user && user.token){
            config.headers["Authorization"] = "Bearer " + user.token;
        }

        console.log('Config for request:', config);
        return config;
    },

    error => {
        console.error('Error with request:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
