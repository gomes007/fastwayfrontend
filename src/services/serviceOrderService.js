import axiosInstance from "@/services/axiosService";

const serviceOrderService = {
    async createNewServiceOrder(serviceOrder) {
        try {
            const response = await axiosInstance.post("/service-order", serviceOrder);
            return response.data ?? serviceOrder;
        } catch (error) {
            console.error("Service Order Creation Request failure: ", error.message);
            return serviceOrder;
        }
    }
}
