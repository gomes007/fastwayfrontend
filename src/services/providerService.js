import axiosInstance from "@/services/axiosService";

const providerService = {
    async createNewProvider(provider) {
        try {
            const response = await axiosInstance.post("/providers", provider);
            return response.data ?? provider;
        } catch (error) {
            console.error("Provider Creation Request failure: ", error.message);
            return provider;
        }
    },

    async getProviderById(id) {
        try {
            const response = await axiosInstance.get(`/providers/${id}`);
            return response.data;
        } catch (error) {
            console.error("Provider Get Request failure: ", error.message);
            return {};
        }
    },

    async updateProvider(id, provider) {
        try {
            const response = await axiosInstance.put(`/providers/${id}`, provider);
            return response.data ?? provider;
        } catch (error) {
            console.error("Provider Update Request failure: ", error.message);
            return provider;
        }
    },

    async deleteProvider(id) {
        try {
            const response = await axiosInstance.delete(`/providers/${id}`);
            return response.data;
        } catch (error) {
            console.error("Provider Delete Request failure: ", error.message);
            return {};
        }
    },

    async getAllProviders(page = 1, size = 10) {
        try {
            const response = await axiosInstance.get(`/providers?page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            console.error("Provider Get Request failure: ", error.message);
            return [];
        }
    }



}

export default providerService;
