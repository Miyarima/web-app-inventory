import { apiKey, baseUrl } from "../utils.js";

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${baseUrl}/orders?api_key=${apiKey}`);
        const result = await response.json();

        return result.data;
    },

    updateOrder: async function updateOrder(order) {
        const updatedOrder = {
            ...order,
            api_key: apiKey
        };

        const result = await fetch(`${baseUrl}/orders`, {
            body: JSON.stringify(updatedOrder),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });

        return result;
    }
};

export default orders;
