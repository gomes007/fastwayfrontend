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
    }


}

export default providerService;
