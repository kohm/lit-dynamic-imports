import { LitElement, html } from "lit";
import {customElement, state} from 'lit/decorators.js';


@customElement("ui-hero")
class UIHero extends LitElement {
    render() {
        return html`<div>
            <img src="https://img.freepik.com/free-vector/retro-gradient-background-linear-style_1017-32952.jpg?w=2000&t=st=1704231534~exp=1704232134~hmac=d187a8a7b7e41f28d7aef686628f2343e2866c8b4cfa0bc6e24b1674a1158cc9">
            <h1>Cyber Punk</h1>
            <ui-button>Join</ui-button>
        </div>`
    }
}