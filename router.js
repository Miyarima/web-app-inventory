export default class Router extends HTMLElement {
    constructor() {
        super();

        this.currentRoute = "";
        this.wildCard = "";

        this.allRoutes = {
            "": {
                view: "<products-view></products-view>",
                name: "warehouse",
            },
            "packlist": {
                view: "<packlist-view></packlist-view>",
                name: "clipboard",
            },
            "deliveries": {
                view: "<deliveries-view></deliveries-view>",
                name: "truck",
            },
            "deliveries-form": {
                view: "<new-delivery></new-delivery>",
                name: "Ny inleverans",
                hidden: true,
            },
            "login": {
                view: "<login-view></login-view>",
                name: "Logga in",
                hidden: true,
            },
            "invoices": {
                view: "<invoices-view></invoices-view>",
                name: "receipt",
            },
            "invoice-form": {
                view: "<new-invoice></new-invoice>",
                name: "Ny faktura",
                hidden: true,
            },
            "orders": {
                view: "<orders-view></orders-view>",
                name: "box",
            },
            "map":  {
                view: "<map-view order=$wildvard></map-view>",
                name: "Karta",
                hidden: true,
            },
        };
    }

    get routes() {
        return this.allRoutes;
    }

    // connect component
    connectedCallback() {
        window.addEventListener('hashchange', () => {
            this.resolveRoute();
        });

        this.resolveRoute();
    }

    resolveRoute() {
        // this.currentRoute = location.hash.replace("#", "");
        let cleanHash = location.hash.replace("#", "");

        this.wildCard = "";

        if (cleanHash.indexOf("/") > -1) {
            let splittedHash = cleanHash.split("/");

            cleanHash = splittedHash[0];
            this.wildCard = splittedHash[1];
        }

        this.currentRoute = cleanHash;

        this.render();
        // let main = document.querySelector("main.main");

        // if (main !== null) {
        //     main.classList.add("slide-in");
        //     main.setAttribute("id", "slider");
        // }
    }

    render() {
        let html = "<not-found></not-found>";

        if (this.routes[this.currentRoute]) {
            html = this.routes[this.currentRoute].view;
            if (this.wildCard) {
                html = html.replace("$wildvard", this.wildCard);
            }
            // console.log(html);
        }

        this.innerHTML = html;
    }
}
