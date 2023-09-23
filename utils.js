const apiKey = "314fc6e4026d14fbc201291f6dfc0032";
const baseUrl = "https://lager.emilfolino.se/v2";

const createLabel = (label) => {
    let labelElement = document.createElement("label");

    labelElement.classList.add("input-label");
    labelElement.textContent = label;

    return labelElement;
};

const createInput = (type) => {
    let inputElement = document.createElement("input");

    inputElement.setAttribute("type", type);
    inputElement.setAttribute("required", "required");
    inputElement.classList.add("input");

    return inputElement;
};

const createButton = (text, color) => {
    let buttonElement = document.createElement("input");

    buttonElement.setAttribute("type", "submit");
    buttonElement.setAttribute("value", text);
    buttonElement.classList.add("button", color);

    return buttonElement;
};

const toast = (message) => {
    const toast = document.getElementsByClassName("toast")[0];

    toast.querySelector(".toast-body").innerHTML = message;
    toast.classList.add("visible");

    setTimeout(() => {
        toast.classList.remove("visible");
    }, 3000);
};

const setTitle = (title) => {
    let head = document.createElement("header");
    let h1 = document.createElement("h1");

    head.classList.add("header");

    h1.innerHTML = title;

    head.appendChild(h1);

    return head;
};

export {
    apiKey,
    baseUrl,
    createLabel,
    createInput,
    createButton,
    toast,
    setTitle
};
