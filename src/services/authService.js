import axiosInstance from './axiosService';

const AuthService = {
    login: function(username, password) {
        return axiosInstance
            .post('authenticate', {
                username,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            })
            .catch(error => Promise.reject(error));
    },

    logout: function() {
        localStorage.removeItem('user');
    },

    getCurrentUser: function() {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('user'));
        }
        return null;
    }
}

export default AuthService;
