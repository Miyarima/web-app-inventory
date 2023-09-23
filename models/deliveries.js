import { apiKey, baseUrl } from "../utils.js";

const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${baseUrl}/deliveries?api_key=${apiKey}`);
        const result = await response.json();

        return result.data;
    },

    addDelivery: async function addDelivery(deliveryObject) {
        const delivery = {
            product_id: deliveryObject.product_id,
            amount: deliveryObject.amount,
            delivery_date: deliveryObject.delivery_date,
            api_key: apiKey,
            comment: deliveryObject.comment
        };

        const result = await fetch(`${baseUrl}/deliveries`, {
            body: JSON.stringify(delivery),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        return result;
    }
};

export default deliveries;
