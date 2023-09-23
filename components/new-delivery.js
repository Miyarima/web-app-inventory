import productsModel from "../models/products.js";
import deliveriesModel from "../models/deliveries.js";

export default class NewDelivery extends HTMLElement {
    constructor() {
        super();

        this.delivery = [];
        this.products = [];
    }

    async createDelivery() {
        let result = await deliveriesModel.addDelivery(this.delivery);

        if (result.status < 300) {
            let productUpdate = {
                id: this.delivery.product_id,
                name: this.delivery.product_name,
                stock: (this.delivery.amount + this.delivery.current_stock)
            };

            productsModel.updateProduct(productUpdate);
        }

        location.hash = "deliveries";
    }

    async connectedCallback() {
        this.products = await productsModel.getProducts();
        this.render();
    }

    render() {
        let head = document.createElement("header");
        let main = document.createElement("main");
        let h1 = document.createElement("h1");

        head.classList.add("header");
        main.classList.add("main", "slide-in");
        main.setAttribute("id", "slider");

        h1.innerHTML = "Skapa ny inleverans";
        head.appendChild(h1);

        let form = document.createElement("form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (this.delivery.product_id > 0) {
                this.createDelivery();
            }
        });

        let submitButton = document.createElement("input");
        let select = document.createElement("select");
        let option = document.createElement("option");
        let amountInput = document.createElement("input");
        let dateInput = document.createElement("input");
        let textareaInput = document.createElement("textarea");

        let selectLabel = document.createElement("label");
        let amountLabel = document.createElement("label");
        let dateLabel = document.createElement("label");
        let textareaLabel = document.createElement("label");

        select.setAttribute("required", "required");
        select.classList.add("input");

        option.setAttribute("value", -99);
        option.textContent = "Välj en produkt";
        select.appendChild(option);

        this.products.forEach((item) => {
            let option = document.createElement("option");

            option.setAttribute("value", item.id);
            option.dataset.stock = item.stock;
            option.dataset.name = item.name;
            option.textContent = item.name;

            select.appendChild(option);
        });

        select.addEventListener("change", (event) => {
            this.delivery = {
                ...this.delivery,
                product_id: parseInt(event.target.value),
                current_stock: parseInt(event.target.selectedOptions[0].dataset.stock),
                product_name: event.target.selectedOptions[0].dataset.name
            };
        });

        selectLabel.classList.add("input-label");
        selectLabel.innerText = "Produkt";

        amountInput.setAttribute("type", "number");
        amountInput.setAttribute("required", "required");
        amountInput.classList.add("input");

        amountInput.addEventListener("input", (event) => {
            this.delivery = {
                ...this.delivery,
                amount: parseInt(event.target.value)
            };
        });

        amountLabel.classList.add("input-label");
        amountLabel.innerText = "Antal";

        dateInput.setAttribute("type", "date");
        dateInput.setAttribute("required", "required");
        dateInput.classList.add("input");

        dateInput.addEventListener("input", (event) => {
            this.delivery = {
                ...this.delivery,
                delivery_date: event.target.value
            };
        });

        dateLabel.classList.add("input-label");
        dateLabel.innerText = "Datum";

        textareaInput.setAttribute("required", "required");
        textareaInput.setAttribute("rows", "3");
        textareaInput.classList.add("textarea");

        textareaInput.addEventListener("input", (event) => {
            this.delivery = {
                ...this.delivery,
                comment: event.target.value
            };
        });

        textareaLabel.classList.add("input-label");
        textareaLabel.innerText = "Kommentar";

        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", "Skapa inleverans");
        submitButton.classList.add("button", "green-button");

        form.appendChild(selectLabel);
        form.appendChild(select);
        form.appendChild(amountLabel);
        form.appendChild(amountInput);
        form.appendChild(dateLabel);
        form.appendChild(dateInput);
        form.appendChild(textareaLabel);
        form.appendChild(textareaInput);
        form.appendChild(submitButton);

        main.appendChild(form);
        this.appendChild(head);
        this.appendChild(main);
    }
}
