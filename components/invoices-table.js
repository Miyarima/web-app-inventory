import invoiceModel from "../models/invoice.js";
import authModel from "../models/auth.js";

export default class InvoicesTable extends HTMLElement {
    constructor() {
        super();

        this.invoices = [];
    }

    async connectedCallback() {
        if (!authModel.token) {
            location.hash = "login";
        }

        this.invoices = await invoiceModel.getInvoices();

        if (authModel.token) {
            this.render();
        }
    }

    render() {
        const list = this.invoices.map((invoice) => {
            return `<tr>
                        <td data-title="Namn">${invoice.name}</td>
                        <td data-title="Id" class="number-cell">${invoice.order_id}</td>
                        <td data-title="Förfallodatum">${invoice.due_date}</td>
                        <td data-title="Skapad">${invoice.creation_date}</td>
                    </tr>`;
        }).join("");

        this.innerHTML = `
        <h2>Fakturor!</h2>
        <table class="table table-stacked table-striped">
            <thead>
                <tr>
                    <th>Namn</th>
                    <th>Id</th>
                    <th>Förfallodatum</th>
                    <th>Skapad</th>
                </tr>
            </thead>
            <tbody>
                ${list}
            </tbody>
        </table>
        <a class="button green-button" href="#invoice-form">Ny faktura</a>
        `;
    }
}
