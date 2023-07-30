import axiosInstance from './axiosService';

const EmployeeService = {
    saveEmployee: function(employeeData, profilePic, files) {
        let formData = new FormData();
        formData.append('employee', new Blob([JSON.stringify(employeeData)], {
            type: 'application/json'
        }));
        formData.append('profilePic', profilePic);
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
    }
}

export default EmployeeService;

