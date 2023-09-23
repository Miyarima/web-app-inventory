export default class ordersView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<header class="header">
                                <lager-title title="Ordrar"></lager-title>
                             </header>
                             <main class="main slide-in" id="slider">
                                <order-list status="packad"></order-list>
                             </main>
                             `;
    }
}
