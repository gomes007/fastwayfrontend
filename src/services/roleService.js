import axiosInstance from './axiosService';

const roleService = {
    async createRole(role) {
        try {
            const response = await axiosInstance.post("/roles", role);
            return response.data ?? role;
        } catch (error) {
            console.error("Role Creation Request failure: ", error.message);
            return role;
        }
    },

    async getAllRoles() {
        try {
            const response = await axiosInstance.get("/roles");
            return response.data;
        } catch (error) {
            console.error("Get All Roles Request failure: ", error.message);
            return [];
        }
    },
};

export default roleService;
