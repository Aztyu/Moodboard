/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';

import './mood-element.js';

export class MoodPageElement extends LitElement {

    static properties = {
        items: {},
    }

    static get styles() {
        return css`
          .wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            margin: 0 10% 0 10%;
            justify-items: center;
          }
        `;
    }

    constructor() {
        super();
        this.items = []

        const request = new Request(
            "http://localhost:3000/mood"
        )
        fetch(request)
            .then((response) => response.json())
            .then((array) => {
                this.items = array.map(item => { return {mood: item} })
            })

        const requestUser = new Request(
            "http://localhost:3000/mood/user"
        )
        fetch(requestUser)
            .then((response) => response.json())
            .then((obj) => {
                console.log('request user', obj)
            })
    }

    select(mood) {
        this.items = this.items.map(obj => {
            return {mood: obj.mood, selected: obj.mood === mood }
        })
        console.log("Sélection", this.items);
    }

    render() {
        const itemTemplates = [];

        this.items.forEach(obj => itemTemplates.push(
            html`<mood-element .mood=${obj.mood} .selected=${!!obj.selected} @click=${() => this.select(obj.mood)}></mood-element>`
        ));

        console.log("Regénération");

        return html`
            <h1>MoodPageElement</h1>
            <div class="wrapper">
                ${itemTemplates}
            </div>
        `;
    }
}

window.customElements.define('mood-page-element', MoodPageElement);
