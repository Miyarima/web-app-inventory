import deliveriesModel from "../models/deliveries.js";

export default class ReceivedList extends HTMLElement {
    constructor() {
        super();

        this.deliveries = [];
    }

    async connectedCallback() {
        this.deliveries = await deliveriesModel.getDeliveries();
        // console.log(this.deliveries);
        this.render();
    }

    render() {
        const list = this.deliveries.map((delivery) => {
            return `<single-delivery delivery='${JSON.stringify(delivery)}'>
                        </single-delivery>`;
        }).join("");

        this.innerHTML = `
        <h2>Inleveranser!</h2>
        <a class="button blue-button" href="#deliveries-form">Ny leverans</a>
        ${list}
        `;
    }
}
