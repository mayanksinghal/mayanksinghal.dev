import hljs from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/highlight.min.js';
import { Marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';
import { linkStyle } from './helpers.js';
import { markedHighlight } from 'https://cdn.jsdelivr.net/npm/marked-highlight@2.1.0/src/index.js';

const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

class MsMarkdown extends HTMLElement {
    connectedCallback() {
        const renderedContent = marked.parse(this.textContent);
        this.innerHTML = renderedContent;


        this.appendChild(linkStyle(
            'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/tokyo-night-dark.min.css'));
    }
}

customElements.define('ms-markdown', MsMarkdown);