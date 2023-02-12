/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';

export class MoodElement extends LitElement {
  mood = '';

  static get styles() {
    return css`
      div {
        display: flex;
        flex-direction: column;
        width: 228px;
        align-items: center;
      }

      p {
        font-family: ParksFont;
        margin: 0;
        font-size: 3vh;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div>
        <img src="./img/${this.mood.toLocaleLowerCase()}.png" />
        <p>${this.mood}</p>
      </div>
    `;
  }
}

window.customElements.define('mood-element', MoodElement);
