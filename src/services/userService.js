import axiosInstance from './axiosService';

const UserService = {
    register: function(user) {
        return axiosInstance.post('users', {
            username: user.username,
            email: user.email,
            password: user.password,
            employeeId: user.employeeId
        });
    }
}

export default UserService;
