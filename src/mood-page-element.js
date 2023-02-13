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
            h1 {
                font-family: ParksFont;
            }

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
                for (const [key, value] of Object.entries(obj)) {
                    this.select(value, key);
                }
            })
    }

    sendMoodUpdate(mood, user) {
        fetch('http://localhost:3000/mood/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mood: mood, user: user})
        }).then(_ => console.log('Update OK'));
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

    render() {
        const itemTemplates = [];

        this.items.forEach(obj => itemTemplates.push(
            html`<mood-element .mood=${obj.mood} .selection=${obj.selection} @click=${() => this.select(obj.mood)}></mood-element>`
        ));

        return html`
            <h1>Moodboard Leslie</h1>
            <div class="wrapper">
                ${itemTemplates}
            </div>
        `;
    }
}

window.customElements.define('mood-page-element', MoodPageElement);
