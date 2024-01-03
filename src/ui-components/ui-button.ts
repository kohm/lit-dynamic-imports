import { LitElement, html } from "lit";
import {customElement, state} from 'lit/decorators.js';

@customElement("ui-button")
class uiButton extends LitElement {
    render() {
        return html`<div>
            button!
            <slot />
        </div>`
    }
}