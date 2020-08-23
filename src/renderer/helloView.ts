import { html, customElement, css, LitElement } from 'lit-element';

@customElement('hello-view')
export class HelloView extends LitElement {
  static get styles() {
    return css`
      div {
        border: 1px solid gray;
        padding: 1rem;
      }
    `;
  }

  render() {
    return html`
      <div>
        <h3>hello-view</h3>
        <p><slot></slot></p>
        <p>
          Open a <a href="#" @click=${this.handleLink}>link</a> in your browser
        </p>
      </div>
    `;
  }

  private handleLink(e: Event) {
    e.preventDefault();
    window.electronShell.openExternal('https://github.com/mgenware/fx94');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hello-view': HelloView;
  }
}
