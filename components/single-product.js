export default class SingleProduct extends HTMLElement {
    static get observedAttributes() {
        return ['product'];
    }

    get product() {
        return JSON.parse(this.getAttribute("product"));
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="product">
            <h4>${this.product.name}</h4>
            <div class="status">
                <p>Lagersaldo: ${this.product.stock}</p>
                <p>Plats: ${this.product.location}</p>
            </div>
        </div>
        `;
    }
}
