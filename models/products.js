import { apiKey, baseUrl } from "../utils.js";

const products = {
    getProducts: async function getProducts() {
        const response = await fetch(`${baseUrl}/products?api_key=${apiKey}`);
        const result = await response.json();

        return result.data;
    },

    updateProduct: async function updateProduct(productObject) {
        const updatedProduct = {
            ...productObject,
            api_key: apiKey
        };

        const result = await fetch(`${baseUrl}/products`, {
            body: JSON.stringify(updatedProduct),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });

        return result;
    }
};

export default products;
