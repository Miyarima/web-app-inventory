import { apiKey, baseUrl } from "../utils.js";

// "x-access-token": auth.token i invoices headers
const auth = {
    token: "",

    login: async function login(username, password) {
        const user = {
            email: username,
            password: password,
            api_key: apiKey
        };

        const response = await fetch(`${baseUrl}/auth/login`, {
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        const result = await response.json();

        if ("errors" in result) {
            return result.errors.detail;
        }

        auth.token = result.data.token;
        return "ok";
    },

    register: async function register(username, password) {
        const user = {
            email: username,
            password: password,
            api_key: apiKey
        };

        const response = await fetch(`${baseUrl}/auth/register`, {
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        const result = await response.json();

        if ("errors" in result) {
            return "not ok";
        }

        return "ok";
    },
};

export default auth;
