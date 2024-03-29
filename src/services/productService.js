import axiosInstance from "@/services/axiosService";


const ProductService = {
    async saveProduct(productData, files) {
        let formData = new FormData();

        formData.append('product', new Blob([JSON.stringify(productData)], {
            type: 'application/json'
        }));

        if (files) {
            Array.from(files).forEach(file => {
                formData.append('files', file);
            });
        }

        return axiosInstance
            .post('products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => response.data)
            .catch(error => Promise.reject(error));
    },

    async calculateProductPrice(price) {
        try {
            const response = await axiosInstance.post('products/calculate-price', price);
            return response.data;
        } catch (error) {
            console.log("Product Price Calculation failure: ", error.message);
            return price;
        }
    },

    async getProductById(id) {
        try {
            const response = await axiosInstance.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error("Product Get Request failure: ", error.message);
            return {};
        }
    },

    async updateProduct(id, productData, files) {
        let formData = new FormData();

        formData.append('product', new Blob([JSON.stringify(productData)], {
            type: 'application/json'
        }));

        if (files) {
            Array.from(files).forEach(file => {
                formData.append('files', file);
            });
        }

        try {
            const response = await axiosInstance.put(`/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data ?? productData;
        } catch (error) {
            console.error("Product Update Request failure: ", error.message);
            return productData;
        }
    },


    async deleteProduct(id) {
        try {
            const response = await axiosInstance.delete(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error("Product Delete Request failure: ", error.message);
            return {};
        }
    },

    async getAllProductsPages(page = 1, size = 10) {
        try {
            const response = await axiosInstance.get(`/products/findProducts?page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            console.error("Product Get Request failure: ", error.message);
            return [];
        }
    },

    async searchProductsByName(query, page = 1, size = 10) {
        try {
            const response = await axiosInstance.get(`/products/searchProductsByName`, {
                params: {
                    query: query,
                    page: page,
                    size: size
                }
            });
            return response.data;
        } catch (error) {
            console.error("Product Search Request failure: ", error.message);
            return [];
        }
    },

    async searchProductsByProviderName(query, page = 1, size = 10) {
        try {
            const response = await axiosInstance.get(`/products/searchProductsByProviderName?page=${page}&size=${size}`, {
                params: {
                    query: query,
                    page: page,
                    size: size
                }
            });
            return response.data;
        } catch (error) {
            console.error("Product Search Request failure: ", error.message);
            return [];
        }
    },


    async getAllProducts() {
        try {
            const response = await axiosInstance.get('/products/findProducts');
            return response.data;
        } catch (error) {
            console.error("Product Get All Request failure: ", error.message);
            return { items: [] };
        }
    },

    async getProductAttachmentsById(productId) {
        try {
            const response = await axiosInstance.get(`/products/${productId}/attachments`);
            return response.data;
        } catch (error) {
            console.error("Product Attachments Get Request failure:", error.message);
            return [];
        }
    },





}

export default ProductService;
