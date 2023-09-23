export default class singleDelivery extends HTMLElement {
    static get observedAttributes() {
        return ['delivery'];
    }

    get delivery() {
        return JSON.parse(this.getAttribute("delivery"));
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="product">
            <h4>${this.delivery.product_name}</h4>
            <div class="status">
                <p>Antal: ${this.delivery.amount}</p>
                <p>Datum: ${this.delivery.delivery_date}</p>
            </div>
            <div class="status">
                <p>Kommentar: ${this.delivery.comment}</p>
            </div>
        </div>
        `;
    }
}
