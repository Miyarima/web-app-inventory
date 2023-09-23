import orderModel from "../models/orders.js";

export default class OrderList extends HTMLElement {
    constructor() {
        super();

        this.orders = [];
        this.status = "";
        this.status_id = 0;
    }

    static get observedAttributes() {
        return ['status'];
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        this[property] = newValue;
    }

    async connectedCallback() {
        if (this.status === "ny") {
            this.status_id = 100;
        } else if (this.status === "packad") {
            this.status_id = 200;
        }

        this.orders = await orderModel.getOrders();
        this.orders = this.orders.filter(order => order.status_id === this.status_id);

        this.render();
    }

    render() {
        if (this.status_id === 100) {
            const list = this.orders.map((order) => {
                return `<single-order order='${JSON.stringify(order)}'>
                            </single-order>`;
            }).join("");

            this.innerHTML = `<h2>Redo att packas!</h2>${list}`;
        } else if (this.status_id === 200) {
            const list = this.orders.map((order) => {
                return `
                <p class='order-packed'>
                    <a class='order-packed-link' href='#map/${order.id}'>${order.name}</a>
                </p>
                `;
            }).join("");

            this.innerHTML = `<h2>Orderlista</h2>${list}`;
        }
    }
}
