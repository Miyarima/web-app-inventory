export default class mapView extends HTMLElement {
    constructor() {
        super();

        this.order = "";
    }

    static get observedAttributes() {
        return ['order'];
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        this[property] = newValue;
    }
    // connect component
    connectedCallback() {
        this.innerHTML =    `<header class="header">
                                <lager-title title="MapView"></lager-title>
                             </header>
                             <main class="main slide-in" id="slider">
                                <map-location order="${this.order}"></map-location>
                                <camera-comp order="${this.order}"></camera-comp>
                             </main>
                             `;
    }
}
