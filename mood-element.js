/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';

export class MoodElement extends LitElement {
  static properties = {
    mood: {},
    selected: {},
  }

  static get styles() {
    return css`
      div {
        display: flex;
        flex-direction: column;
        width: 228px;
        align-items: stretch;
        margin: 24px 0 24px 0;
      }

      div.selected {
        border: orange solid 12px;
        margin: 12px 0 12px 0;
      }

      span {
        font-family: ParksFont;
        margin: 0;
        font-size: 3vh;
        text-align: center;
        background-color: #cf4f4f
      }
    `;
  }

  getClass(selected) {
    return selected ? 'selected' : '';
  }

  constructor() {
    super();
    this.mood = '';
    this.selected = false;
  }

  render() {
    console.log("Regénération enfant");
    return html`
      <div class=${this.getClass(this.selected)}>
        <img src="./img/${this.mood.toLocaleLowerCase()}.png" />
        <span>${this.mood}</span>
      </div>
    `;
  }
}

window.customElements.define('mood-element', MoodElement);
