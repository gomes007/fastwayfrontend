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
    },

    async calculateSubtotal(serviceOrderProduct) {
        try {
            const response = await axiosInstance.post("/service-order/calculateSubTotal", serviceOrderProduct);
            return response.data;
        } catch (error) {
            console.error("Service Order Subtotal Calculation Request failure: ", error.message);
            return null;
        }
    },

    async calculateTotalFromProducts(serviceOrderProducts) {
        try {
            const response = await axiosInstance.post("/service-order/calculateTotalFromProducts", serviceOrderProducts);
            return response.data;
        } catch (error) {
            console.error("Service Order Total Calculation Request failure: ", error.message);
            return null;
        }
    }



}

export default serviceOrderService;
