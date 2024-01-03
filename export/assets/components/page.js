import { MsElement } from './ms_element.js';

function genTemplate() {
    return `
    <div class="container">

        <header>
            <a href="/index.html">
                <img src="/assets/icon.png" class="logo">
                mayanksinghal.dev
            </a>
        </header>

        <!-- Slot for content of the page -->
        <h1 class="page_title"></h1>
        <slot name="content"></slot>

    </div>
    `;
};

class MsPage extends MsElement {

    #pageTitle;
    #startingTitle;

    static observedAttributes = [...super.observedAttributes, 'title'];

    constructor() {
        super(genTemplate, 'page.css');

        this.#startingTitle = document.title;
    }

    connectedCallback() {
        super.connectedCallback();

        this.#consumeAttributes();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);

        if (name === 'title') {
            this.#pageTitle = newValue;
            // this.getElementsByClassName('page_title')[0].innerText = newValue || '';
        }

        if (newValue !== oldValue && this.isMsElementConnected) {
            this.#consumeAttributes();
        }
    }

    #consumeAttributes() {
        const titleSpan = this.shadowRoot.querySelectorAll('.page_title')[0];
        if (this.#pageTitle) {
            document.title = `${this.#pageTitle} | ${this.#startingTitle}`;
            titleSpan.innerText = this.#pageTitle;
        } else {
            document.title = this.#startingTitle;
            titleSpan.innerText = '';
        }
    }
}

customElements.define('ms-page', MsPage);