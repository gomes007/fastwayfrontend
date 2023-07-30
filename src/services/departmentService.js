import axiosInstance from "@/services/axiosService";

const departmentService = {
    async getAllDepartments() {
        try {
            const response = await axiosInstance.get("/departments");
            console.log("Department Service: ", response.data);
            return response.data ?? [];
        } catch (error) {
            console.log("Error in departmentService.getAllDepartments: ", error);
            throw error;
        }
    }
};

export default departmentService;
