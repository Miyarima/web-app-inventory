import Router from "./router.js";

export default class Navigation extends HTMLElement {
    constructor() {
        super();

        this.router = new Router();
    }

    // connect component
    connectedCallback() {
        const routes = this.router.routes;

        let navigationLinks = "";

        for (let path in routes) {
            if (routes[path].hidden) {
                continue;
            }

            navigationLinks += `
            <a href='#${path}'><img class="icon" src="img/${routes[path].name}.svg"></a>
            `;
        }

        this.innerHTML = `<nav class="bottom-nav">${navigationLinks}</nav>`;

        let links = document.querySelectorAll(".bottom-nav a");

        for (let i = 0; i < links.length; i++) {
            let link = links[i];

            link.addEventListener("click", (event) => {
                event.preventDefault();
                let slider = document.getElementById("slider");

                slider.classList.remove("slide-in");
                slider.classList.add("slide-out");

                setTimeout(() => {
                    slider.classList.remove("slide-out");

                    location.hash = link.hash.replace("#", "");
                }, 250);
            });
        }
    }
}
