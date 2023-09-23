import { apiKey, baseUrl } from "../utils.js";
import authModel from "../models/auth.js";

const invoices = {
    getInvoices: async function getInvoices() {
        const response = await fetch(`${baseUrl}/invoices?api_key=${apiKey}`, {
            headers: {
                'content-type': 'application/json',
                'x-access-token': authModel.token
            }
        });
        const result = await response.json();

        return result.data;
    },


    addInvoice: async function addInvoice(invoiceObject) {
        const invoice = {
            order_id: invoiceObject.order_id,
            total_price: invoiceObject.total_price,
            api_key: apiKey,
        };

        const result = await fetch(`${baseUrl}/invoices`, {
            body: JSON.stringify(invoice),
            headers: {
                'content-type': 'application/json',
                'x-access-token': authModel.token
            },
            method: 'POST'
        });

        return result;
    }
};

export default invoices;
