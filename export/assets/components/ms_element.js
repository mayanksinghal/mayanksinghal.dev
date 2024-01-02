import { linkStyle } from "./helpers.js";

export class MsElement extends HTMLElement {
    #commonStyleEl;
    #commonStyleVal;
    #templateFn;
    #stylesheetRelPath;

    // This is different from isConnected (inherited from Node). Node.isConnected is already
    // true when the connectedCallback or attributeChangedCallbacks are triggered.
    isMsElementConnected;
    shadowRoot;

    static observedAttributes = ['commonstyle'];

    constructor(templateFn, stylesheetRelPath) {
        super();
        this.#templateFn = templateFn;
        this.#stylesheetRelPath = stylesheetRelPath;

        this.#commonStyleVal = null;
        this.#commonStyleEl = null;
    }

    connectedCallback() {
        this.shadowRoot = this.attachShadow({mode: 'closed'});
        const template = document.createElement('template');
        template.innerHTML = this.#templateFn.call(null, import.meta.url);
        const docFragment = template.content.cloneNode(true);

        if (this.#stylesheetRelPath) {
            const styleEl = linkStyle(new URL(this.#stylesheetRelPath, import.meta.url).href);
            docFragment.appendChild(styleEl);
        }

        this.#commonStyleEl = linkStyle('');
        this.#setCommonStyle();

        docFragment.appendChild(this.#commonStyleEl);

        this.shadowRoot.append(docFragment);

        this.isMsElementConnected = true;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'commonstyle') {
            // Attribute commonstyle is specified by the parent and hence the
            // path is not relative to the current module.
            this.#commonStyleVal = newValue;
            this.isMsElementConnected && this.#setCommonStyle();
        }
    }

    #setCommonStyle() {
        this.#commonStyleEl.href = this.#commonStyleVal;
    }
}