export default class ProductsView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<header class="header">
                                <lager-title title="Produktlista"></lager-title>
                             </header>
                             <main class="main slide-in" id="slider">
                                <product-list></product-list>
                             </main>
                             `;
    }
}
