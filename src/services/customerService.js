import axiosInstance from './axiosService';

const customerService = {
    async createNewCustomer(customer) {
        try {
            const response = await axiosInstance.post("/customers", customer);
            return response.data ?? customer;
        } catch (error) {
            console.error("Customer Creation Request failure: ", error.message);
            return customer;
        }
    },

    async searchAllCustomers() {
        try {
            const response = await axiosInstance.get(`/customers`);
            console.log("Search response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Customer Get Request failure: ", error.message);
            return [];
        }
    },

    async searchCustomerByName(filter, page, size) {
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
            const response = await axiosInstance.get(`/customers/search`, { params });
            console.log("Search response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Customer Get Request failure: ", error.message);
            return [];
        }
    }



};

export default customerService;
