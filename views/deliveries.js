export default class DeliveriesView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<header class="header">
                                <lager-title title="Inleveranser"></lager-title>
                             </header>
                             <main class="main slide-in" id="slider">
                                <received-list></received-list>
                             </main>
                             `;
    }
}
