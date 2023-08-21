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
        apiUrl: {}
    }

    static get styles() {
        return css`
            h1, span {
                font-family: ParksFont;
                font-size: 300%;
            }

            input {
                font-size: 80%;
            }

            .wrapper {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                justify-items: center;
            }
        `;
    }

    constructor() {
        super();
        this.items = []

        fetch('./variable.json')
            .then(response => response.json())
            .then(data => {
                this.apiUrl = data.API_URL;

                const request = new Request(
                    this.apiUrl + '/mood'
                )
                fetch(request)
                    .then((response) => response.json())
                    .then((array) => {
                        this.items = array.map(item => { return {mood: item} })
                    })
                    .then(() => {
                        const requestUser = new Request(
                            this.apiUrl + '/mood/user'
                        )
                        fetch(requestUser)
                            .then((response) => response.json())
                            .then((obj) => {
                                for (const [key, value] of Object.entries(obj)) {
                                    this.select(value, key);
                                }
                            })
                    })
            })
    }

    sendMoodUpdate(mood, user) {
        fetch(this.apiUrl + '/mood/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mood: mood, user: user})
        });
    }

    updateSelection(itemMood, itemSelection, newMood, user) {
        const userLower = user.toLocaleLowerCase()

        if (itemMood === newMood) {
            this.sendMoodUpdate(newMood, user)
            return userLower
        }
        if (!!itemSelection && itemSelection != userLower) {
            return itemSelection
        }
        return null
    }

    select(mood, user) {
        if (!user) {
            user = sessionStorage.getItem('user')
            if (!user) {
                user = 'Sharon'
                sessionStorage.setItem('user', user)
            }
        }

        this.items = this.items.map(obj => {
            return { mood: obj.mood, selection: this.updateSelection(obj.mood, obj.selection, mood, user) }
        })
    }

    changeName(event) {
        const input = event.target;
        sessionStorage.setItem('user', input.value)
    }

    render() {
        const itemTemplates = [];

        this.items.forEach(obj => itemTemplates.push(
            html`<mood-element .mood=${obj.mood} .selection=${obj.selection} @click=${() => this.select(obj.mood)}></mood-element>`
        ));

        return html`
            <h1>Moodboard Leslie</h1>
            <span>User : <input @input=${this.changeName} .value=${sessionStorage.getItem('user')}/></span>

            <div class="wrapper">
                ${itemTemplates}
            </div>
        `;
    }
}

window.customElements.define('mood-page-element', MoodPageElement);
