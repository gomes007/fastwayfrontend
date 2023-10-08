import axiosInstance from "@/services/axiosService";

const servicesService = {
    async createNewService(service) {
        try {
            const response = await axiosInstance.post("/services", service);
            return response.data ?? service;
        } catch (error) {
            console.error("Service Creation Request failure: ", error.message);
            return service;
        }
    },

    async searchServicesByName(query, page, size) {
        try {
            const response = await axiosInstance.get(`/services/searchServicesByName`, {
                params: {
                    query: query,
                    page: page,
                    size: size
                }
            });
            return response.data;
        } catch (error) {
            console.error("Service Search Request failure: ", error.message);
            return [];
        }
    },


    async calculateSubtotal(serviceOrderService) {
        try {
            const response = await axiosInstance.post("/service-order/calculateSubTotalService", serviceOrderService);
            return response.data;
        } catch (error) {
            console.error("Service Order Subtotal Calculation Request failure: ", error.message);
            return null;
        }
    },
    async calculateProductPrice(price) {
        try {
            const response = await axiosInstance.post('services/calculate-price', price);
            return response.data;
        } catch (error) {
            console.log("Product Price Calculation failure: ", error.message);
            return price;
        }
    }
}

export default servicesService;
