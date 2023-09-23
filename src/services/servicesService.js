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

    async searchServicesByName(filter, page, size) {
        try {
            const params = {
                filter: filter
            };

            if (page) {
                params.page = page;
            }

            if (size) {
                params.size = size;
            }

            const response = await axiosInstance.get(`/services/search`, {
                params: params
            });
            console.log("Search response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Service Get Request failure: ", error.message);
            return [];
        }
    }


}

export default servicesService;
