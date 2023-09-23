import { createLabel, createButton, setTitle } from "../utils.js";
import orderModel from "../models/orders.js";
import invoiceModel from "../models/invoice.js";

export default class NewInvoice extends HTMLElement {
    constructor() {
        super();

        this.orders = [];
        this.invoice = [];
    }

    async createInvoice() {
        let result = await invoiceModel.addInvoice(this.invoice);

        if (result.status < 300) {
            console.log("Ser bra ut!");
            let orderUpdate = {
                id: this.invoice.order_id,
                name: this.invoice.name,
                status_id: 600
            };

            orderModel.updateOrder(orderUpdate);
        }

        location.hash = "invoices";
    }

    async connectedCallback() {
        this.orders = await orderModel.getOrders();
        this.orders = this.orders.filter(obj => obj.status_id < 600);
        console.log(this.orders);
        this.render();
    }

    render() {
        let head = setTitle("Skapa ny Faktura");
        let main = document.createElement("main");

        main.classList.add("main", "slide-in");
        main.setAttribute("id", "slider");

        let form = document.createElement("form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (this.invoice.order_id > 0) {
                this.createInvoice();
            }
        });

        let select = document.createElement("select");
        let option = document.createElement("option");

        select.setAttribute("required", "required");
        select.classList.add("input");

        option.setAttribute("value", -99);
        option.textContent = "Välj en order";
        select.appendChild(option);

        this.orders.forEach((item) => {
            let option = document.createElement("option");

            let totalCost = item.order_items.map((item) => {
                return item.amount * item.price;
            });

            option.setAttribute("value", item.id);
            option.dataset.price = totalCost.reduce((a, b) => a + b, 0);
            option.dataset.name = item.name;
            option.textContent = `${item.name} (${item.id})`;

            select.appendChild(option);
        });

        select.addEventListener("change", (event) => {
            this.invoice = {
                ...this.invoice,
                order_id: parseInt(event.target.value),
                total_price: parseInt(event.target.selectedOptions[0].dataset.price),
                name:  event.target.selectedOptions[0].dataset.name
            };
            console.log(this.invoice);
        });

        let selectLabel = createLabel('Ordrar');
        let loginButton = createButton('Skapa Faktura', 'green-button');

        form.appendChild(selectLabel);
        form.appendChild(select);
        form.appendChild(loginButton);

        main.appendChild(form);
        this.appendChild(head);
        this.appendChild(main);
    }
}
