import axiosInstance from './axiosService';

const EmployeeService = {
    saveEmployee: function(employeeData, file) {
        let formData = new FormData();
        formData.append('employee', new Blob([JSON.stringify(employeeData)], {
            type: 'application/json'
        }));
        formData.append('file', file);

        return axiosInstance
            .post('employees', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => response.data)
            .catch(error => Promise.reject(error));
    }
}

export default EmployeeService;
