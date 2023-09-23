export default class loginView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<header class="header">
                                <lager-title title="Login"></lager-title>
                             </header>
                             <main class="main slide-in" id="slider">
                                <login-form></login-form>
                             </main>
                             `;
    }
}
