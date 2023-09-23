import authModel from "../models/auth.js";

export default class InvoicesView extends HTMLElement {
    // connect component
    connectedCallback() {
        if (!authModel.token) {
            location.hash = "login";
        }

        this.render();
    }

    render() {
        this.innerHTML =    `<header class="header">
                                <lager-title title="Fakturor"></lager-title>
                             </header>
                             <main class="main slide-in" id="slider">
                                <invoices-table></invoices-table>
                             </main>
                             `;
    }
}
