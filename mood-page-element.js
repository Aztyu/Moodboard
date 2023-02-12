/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';

import './mood-element.js';

export class MoodPageElement extends LitElement {

  constructor() {
    super();
  }

  render() {
    const itemTemplates = [];
    const items = [
        {text: 'Angry'},
        {text: 'Girlboss'},
        {text: 'Hungry'},
        {text: 'Mad'},
        {text: 'Tired'},
    ]

    items.forEach(obj => itemTemplates.push(html`<mood-element .mood=${obj.text}></mood-element>`));

    return html`
        <h1>MoodPageElement</h1>
        ${itemTemplates}
    `;
  }
}

window.customElements.define('mood-page-element', MoodPageElement);
