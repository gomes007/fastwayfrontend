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
    }
};

export default customerService;
