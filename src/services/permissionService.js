import axiosInstance from './axiosService';

const permissionService = {
    async createPermission(permission) {
        try {
            const response = await axiosInstance.post("/permissions", permission);
            return response.data ?? permission;
        } catch (error) {
            console.error("Permission Creation Request failure: ", error.message);
            return permission;
        }
    },

    async getAllPermissions() {
        try {
            const response = await axiosInstance.get("/permissions");
            return response.data;
        } catch (error) {
            console.error("Get All Permissions Request failure: ", error.message);
            return [];
        }
    },

};

export default permissionService;

