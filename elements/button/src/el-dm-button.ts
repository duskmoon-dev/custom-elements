/**
 * DuskMoon Button Element
 *
 * A customizable button component with multiple variants and sizes.
 *
 * @element el-dm-button
 *
 * @attr {string} variant - Button variant: primary, secondary, tertiary, ghost, outline
 * @attr {string} size - Button size: xs, sm, md, lg, xl
 * @attr {boolean} disabled - Whether the button is disabled
 * @attr {string} type - Button type: button, submit, reset
 * @attr {boolean} loading - Whether the button is in loading state
 *
 * @slot - Default slot for button content
 * @slot prefix - Content before the main text
 * @slot suffix - Content after the main text
 *
 * @csspart button - The native button element
 * @csspart content - The content wrapper
 * @csspart prefix - The prefix slot wrapper
 * @csspart suffix - The suffix slot wrapper
 * @csspart spinner - The loading spinner
 *
 * @fires click - Fired when button is clicked (native event)
 *
 * @cssprop --dm-button-padding-x - Horizontal padding
 * @cssprop --dm-button-padding-y - Vertical padding
 * @cssprop --dm-button-font-size - Font size
 * @cssprop --dm-button-border-radius - Border radius
 */

import { BaseElement, css } from '@duskmoon-dev/el-core';
import type { Size, Variant } from '@duskmoon-dev/el-core';

const styles = css`
  :host {
    display: inline-flex;
    vertical-align: middle;
  }

  :host([hidden]) {
    display: none !important;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--dm-spacing-sm, 0.5rem);
    border: 1px solid transparent;
    border-radius: var(--dm-button-border-radius, var(--dm-radius-md, 0.5rem));
    font-family: inherit;
    font-weight: var(--dm-font-weight-semibold, 600);
    cursor: pointer;
    transition:
      background-color var(--dm-transition-fast, 150ms ease),
      border-color var(--dm-transition-fast, 150ms ease),
      color var(--dm-transition-fast, 150ms ease),
      box-shadow var(--dm-transition-fast, 150ms ease);
    -webkit-appearance: none;
    appearance: none;
    user-select: none;
    white-space: nowrap;
  }

  button:focus-visible {
    outline: none;
    box-shadow: var(--dm-focus-ring-offset, 0 0 0 2px white, 0 0 0 4px var(--dm-primary, #3b82f6));
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Size variants */
  :host([size="xs"]) button {
    padding: var(--dm-button-padding-y, 0.25rem) var(--dm-button-padding-x, 0.5rem);
    font-size: var(--dm-button-font-size, var(--dm-font-size-xs, 0.75rem));
    gap: var(--dm-spacing-xs, 0.25rem);
  }

  :host([size="sm"]) button {
    padding: var(--dm-button-padding-y, 0.375rem) var(--dm-button-padding-x, 0.75rem);
    font-size: var(--dm-button-font-size, var(--dm-font-size-sm, 0.875rem));
  }

  :host(:not([size])) button,
  :host([size="md"]) button {
    padding: var(--dm-button-padding-y, 0.5rem) var(--dm-button-padding-x, 1rem);
    font-size: var(--dm-button-font-size, var(--dm-font-size-md, 1rem));
  }

  :host([size="lg"]) button {
    padding: var(--dm-button-padding-y, 0.625rem) var(--dm-button-padding-x, 1.25rem);
    font-size: var(--dm-button-font-size, var(--dm-font-size-lg, 1.125rem));
  }

  :host([size="xl"]) button {
    padding: var(--dm-button-padding-y, 0.75rem) var(--dm-button-padding-x, 1.5rem);
    font-size: var(--dm-button-font-size, var(--dm-font-size-xl, 1.25rem));
  }

  /* Primary variant (default) */
  :host(:not([variant])) button,
  :host([variant="primary"]) button {
    background-color: var(--dm-primary, #3b82f6);
    color: white;
    border-color: var(--dm-primary, #3b82f6);
  }

  :host(:not([variant])) button:hover:not(:disabled),
  :host([variant="primary"]) button:hover:not(:disabled) {
    background-color: var(--dm-primary-hover, #2563eb);
    border-color: var(--dm-primary-hover, #2563eb);
  }

  :host(:not([variant])) button:active:not(:disabled),
  :host([variant="primary"]) button:active:not(:disabled) {
    background-color: var(--dm-primary-active, #1d4ed8);
    border-color: var(--dm-primary-active, #1d4ed8);
  }

  /* Secondary variant */
  :host([variant="secondary"]) button {
    background-color: var(--dm-secondary, #6b7280);
    color: white;
    border-color: var(--dm-secondary, #6b7280);
  }

  :host([variant="secondary"]) button:hover:not(:disabled) {
    background-color: var(--dm-secondary-hover, #4b5563);
    border-color: var(--dm-secondary-hover, #4b5563);
  }

  :host([variant="secondary"]) button:active:not(:disabled) {
    background-color: var(--dm-secondary-active, #374151);
    border-color: var(--dm-secondary-active, #374151);
  }

  /* Tertiary variant */
  :host([variant="tertiary"]) button {
    background-color: var(--dm-gray-100, #f3f4f6);
    color: var(--dm-gray-800, #1f2937);
    border-color: var(--dm-gray-100, #f3f4f6);
  }

  :host([variant="tertiary"]) button:hover:not(:disabled) {
    background-color: var(--dm-gray-200, #e5e7eb);
    border-color: var(--dm-gray-200, #e5e7eb);
  }

  :host([variant="tertiary"]) button:active:not(:disabled) {
    background-color: var(--dm-gray-300, #d1d5db);
    border-color: var(--dm-gray-300, #d1d5db);
  }

  /* Ghost variant */
  :host([variant="ghost"]) button {
    background-color: transparent;
    color: var(--dm-primary, #3b82f6);
    border-color: transparent;
  }

  :host([variant="ghost"]) button:hover:not(:disabled) {
    background-color: var(--dm-gray-100, #f3f4f6);
  }

  :host([variant="ghost"]) button:active:not(:disabled) {
    background-color: var(--dm-gray-200, #e5e7eb);
  }

  /* Outline variant */
  :host([variant="outline"]) button {
    background-color: transparent;
    color: var(--dm-primary, #3b82f6);
    border-color: var(--dm-primary, #3b82f6);
  }

  :host([variant="outline"]) button:hover:not(:disabled) {
    background-color: var(--dm-primary, #3b82f6);
    color: white;
  }

  :host([variant="outline"]) button:active:not(:disabled) {
    background-color: var(--dm-primary-hover, #2563eb);
    border-color: var(--dm-primary-hover, #2563eb);
    color: white;
  }

  /* Loading state */
  :host([loading]) button {
    position: relative;
    pointer-events: none;
  }

  :host([loading]) .content {
    visibility: hidden;
  }

  .spinner {
    display: none;
    position: absolute;
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  :host([loading]) .spinner {
    display: block;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .content {
    display: inline-flex;
    align-items: center;
    gap: inherit;
  }

  ::slotted(*) {
    display: inline-flex;
    align-items: center;
  }
`;

export class ElDmButton extends BaseElement {
  static properties = {
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    type: { type: String, reflect: true, default: 'button' },
    loading: { type: Boolean, reflect: true },
  };

  /** Button variant */
  declare variant: Variant;

  /** Button size */
  declare size: Size;

  /** Whether the button is disabled */
  declare disabled: boolean;

  /** Button type (button, submit, reset) */
  declare type: 'button' | 'submit' | 'reset';

  /** Whether the button is in loading state */
  declare loading: boolean;

  constructor() {
    super();
    this.attachStyles(styles);
  }

  /**
   * Handle click events
   */
  private _handleClick(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Handle form submission
    if (this.type === 'submit') {
      const form = this.closest('form');
      if (form) {
        form.requestSubmit();
      }
    } else if (this.type === 'reset') {
      const form = this.closest('form');
      if (form) {
        form.reset();
      }
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this._handleClick.bind(this));
  }

  render(): string {
    const isDisabled = this.disabled || this.loading;

    return `
      <button
        part="button"
        type="${this.type || 'button'}"
        ${isDisabled ? 'disabled' : ''}
        aria-busy="${this.loading ? 'true' : 'false'}"
      >
        <span class="spinner" part="spinner"></span>
        <span class="content" part="content">
          <slot name="prefix" part="prefix"></slot>
          <slot></slot>
          <slot name="suffix" part="suffix"></slot>
        </span>
      </button>
    `;
  }
}
