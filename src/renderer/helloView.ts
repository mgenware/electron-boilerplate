import { html, customElement, css, LitElement } from 'lit-element';

@customElement('hello-view')
export class HelloView extends LitElement {
  static get styles() {
    return css`
      div {
        border: 1px solid gray;
      }
    `;
  }

  render() {
    return html`
      <div>
        <h3>hello-view</h3>
        <p><slot></slot></p>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hello-view': HelloView;
  }
}
