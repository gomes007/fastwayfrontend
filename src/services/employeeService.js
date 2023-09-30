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
            const response = await axiosInstance.get('/employees/findEmployees');
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
    },

    updateEmployee: function(id, employeeData, profilePic, files) {
        let formData = new FormData();
        console.log(`Atualizando funcionário com ID: ${id}`);
        console.log('Dados do Funcionário:', employeeData);
        console.log('Foto do Perfil:', profilePic);
        console.log('Arquivos:', files);
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
            .put(`employees/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => response.data)
            .catch(error => {
                console.error("Erro do Axios:", error.response.data);
                return Promise.reject(error);
            });
    },


    async searchEmployeeByName(filter, page, size) {
        try {
            const params = {
                filter: filter,
            };
            if (page) {
                params.page = page;
            }
            if (size) {
                params.size = size;
            }
            const response = await axiosInstance.get(`/employees/search`, { params });
            console.log("Search response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Employee Get Request failure: ", error.message);
            return [];
        }
    }
}

export default EmployeeService;


