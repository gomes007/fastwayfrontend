import axios from 'axios';

const API_URL = 'http://localhost:8080/';

const AuthService = {
    axiosInstance: axios.create({
        headers: { 'Content-Type': 'application/json' }
    }),

    login: function(username, password) {
        console.log('Login attempt with:', { username, password });
        return this.axiosInstance
            .post(API_URL + 'authenticate', {
                username,
                password
            })
            .then(response => {
                console.log('Response:', response);
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            })
            .catch(error => {
                console.error('Error during authentication:', error);
                return Promise.reject(error);
            });
    },

    /*
    logout: function() {
        localStorage.removeItem('user');
    },

     */

    logout: function() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
        }
    },


    register: function(user) {
        return this.axiosInstance.post(API_URL + 'users', {
            username: user.username,
            email: user.email,
            password: user.password,
            employeeId: user.employeeId
        });
    },

    /*
    getCurrentUser: function() {
        return JSON.parse(localStorage.getItem('user'));
    }

     */

    getCurrentUser: function() {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('user'));
        }
        return null;
    }

}

AuthService.axiosInstance.interceptors.request.use(
    config => {
        const user = AuthService.getCurrentUser();
        console.log('Current user:', user);

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

export default AuthService;
