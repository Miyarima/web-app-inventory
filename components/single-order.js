import productsModel from "../models/products.js";
import orderModel from "../models/orders.js";

export default class SingleOrder extends HTMLElement {
    constructor() {
        super();

        this.order_ready = 1;
    }

    static get observedAttributes() {
        return ['order'];
    }

    get order() {
        return JSON.parse(this.getAttribute("order"));
    }

    async packOrder(order) {
        console.log(`packar denna ordern: ${order.name}`);
        await Promise.all(order.order_items.map(async (item) => {
            let stockUpdate = {
                id: item.product_id,
                name: item.name,
                stock: item.stock - item.amount
            };

            productsModel.updateProduct(stockUpdate);
        }));
        let orderUpdate = {
            id: order.id,
            name: order.name,
            status_id: 200
        };

        orderModel.updateOrder(orderUpdate);
        this.remove();
    }

    connectedCallback() {
        let container = document.createElement("div");

        container.classList.add("order");
        const orderItems = this.order.order_items.map((item) => {
            if (item.stock < item.amount) {
                this.order_ready = 0;
                console.log(`Kan inte packa ${item.name}, då det inte finns tillräckligt i lagret`);
            }
            return `
            <div class="order-product">
                <span class="status">${item.name}:</span>
                <span class="status">${item.amount}st.</span>
                <span class="status">${item.location}</span>
            </div>
            `;
        }).join("");

        container.innerHTML = `<h4 class="status-name">${this.order.name}</h4>${orderItems}`;

        if (this.order_ready === 1) {
            let btn = document.createElement("button");

            btn.classList.add("button");
            btn.innerHTML = "Packa order";
            btn.addEventListener("click", () => {this.packOrder(this.order);});
            container.appendChild(btn);
        }

        this.appendChild(container);
    }
}
