import axiosInstance from "@/services/axiosService";

const positionSalaryService = {
    async createNewPositionSalary(positionSalary) {
        try {
            const response = await axiosInstance.post("/positions", positionSalary);
            return response.data ?? positionSalary;
        } catch (error) {
            console.log("Error in positionSalaryService.createPositionSalary: ", error);
            return positionSalary;
        }
    },

    async getAllPositionSalary() {
        try {
            const response = await axiosInstance.get("/positions");
            console.log("back end", response.data);
            return response.data ?? [];
        } catch (error) {
            console.log("Error in positionSalaryService.getAllPositionSalary: ", error);
            throw error;
        }
    }


};

export default positionSalaryService;
