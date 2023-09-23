export default class PacklistView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<header class="header">
                                <lager-title title="Plock Lista"></lager-title>
                             </header>
                             <main class="main slide-in" id="slider">
                                <order-list status="ny"></order-list>
                             </main>
                             `;
    }
}
