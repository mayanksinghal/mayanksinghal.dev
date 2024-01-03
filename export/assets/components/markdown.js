import hljs from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/highlight.min.js';
import { Marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';
import { linkStyle } from './helpers.js';

await import('https://cdn.jsdelivr.net/npm/marked-highlight/lib/index.umd.js');

const marked = new Marked(
    globalThis.markedHighlight.markedHighlight({
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
        console.log(this.textContent);
        console.log(renderedContent);
        this.innerHTML = renderedContent;


        this.appendChild(linkStyle(
            'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/tokyo-night-dark.min.css'));
    }
}

customElements.define('ms-markdown', MsMarkdown);