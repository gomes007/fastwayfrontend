import axiosInstance from "@/services/axiosService";

const costCenterService = {
    async createNewCostCenter(costCenter) {
        try {
            const response = await axiosInstance.post("/cost-center", costCenter);
            return response.data ?? costCenter;
        } catch (error) {
            console.error("Cost Center Creation Request failure: ", error.message);
            return costCenter;
        }
    },

    async searchCostCenterByName(filter, page, size) {
        try {
            const params = {
                filter: filter,
            };
            if (page) {
                params.page = page;
            }
            if (size) {
                params.size = size;
            }
            const response = await axiosInstance.get(`/cost-center/search`, { params });
            console.log("Search response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Cost Center Get Request failure: ", error.message);
            return [];
        }
    }

}

export default costCenterService;
