import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HomeAssistant, LovelaceCardConfig } from './types';
import './style.css'; // Importiert Tailwind CSS, damit es mitgebaut wird

// Wir definieren die Web Component Klasse
class Withings3DCard extends HTMLElement {
  private _root: ReactDOM.Root | null = null;
  private _hass: HomeAssistant | undefined;
  private _config: LovelaceCardConfig | undefined;

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this.render();
  }

  setConfig(config: LovelaceCardConfig) {
    this._config = config;
    this.render();
  }

  getCardSize() {
    return 6;
  }

  connectedCallback() {
    if (!this._root) {
      this._root = ReactDOM.createRoot(this);
    }
    this.render();
  }

  disconnectedCallback() {
    if (this._root) {
      this._root.unmount();
      this._root = null;
    }
  }

  render() {
    if (!this._root || !this._hass || !this._config) {
      return;
    }

    this._root.render(
      <React.StrictMode>
        <div className="withings-card-wrapper text-base">
           <App hass={this._hass} config={this._config} />
        </div>
      </React.StrictMode>
    );
  }
}

const customElementName = 'withings-3d-card';

try {
  if (!customElements.get(customElementName)) {
    customElements.define(customElementName, Withings3DCard);
    console.info(
      `%c WITHINGS-3D-CARD %c Custom Element registered `,
      'color: white; background: #3b82f6; font-weight: bold;',
      'color: #3b82f6; background: white; font-weight: bold;'
    );
  }
} catch (e) {
  console.error("FAILED TO LOAD WITHINGS-3D-CARD", e);
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: customElementName,
  name: "Withings 3D Health",
  description: "A 3D visualization of your health data",
});