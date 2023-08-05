import axiosInstance from './axiosService';

const EmployeeService = {
    saveEmployee: function(employeeData, profilePic, files) {
        let formData = new FormData();
        formData.append('employee', new Blob([JSON.stringify(employeeData)], {
            type: 'application/json'
        }));

        if (profilePic) {
            formData.append('files', profilePic);
        }

        Array.from(files).forEach(file => {
            formData.append('files', file);
        });

        return axiosInstance
            .post('employees', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => response.data)
            .catch(error => Promise.reject(error));
    },

    async getAllEmployees() {
        try {
            const response = await axiosInstance.get('/employees');
            return response.data;
        } catch (error) {
            console.error('Get All Employees Request failure: ', error.message);
            return [];
        }
    },


    async getEmployeeById(id) {
        try {
            const response = await axiosInstance.get(`/employees/${id}`);
            return response.data;
        } catch (error) {
            console.error('Get Employee By Id Request failure: ', error.message);
            return {};
        }
    }
}

export default EmployeeService;


