/**
 * DuskMoon Input Element
 *
 * A text input component with label and validation states.
 *
 * @element el-dm-input
 *
 * @attr {string} type - Input type: text, password, email, number, tel, url, search
 * @attr {string} value - Current input value
 * @attr {string} name - Form field name
 * @attr {string} label - Label text
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} disabled - Whether the input is disabled
 * @attr {boolean} readonly - Whether the input is readonly
 * @attr {boolean} required - Whether the input is required
 * @attr {string} size - Input size: sm, md, lg
 * @attr {string} validation-state - Validation state: valid, invalid, pending
 * @attr {string} error-message - Error message to display
 * @attr {string} helper-text - Helper text to display
 *
 * @slot prefix - Content before the input
 * @slot suffix - Content after the input
 *
 * @csspart container - The outer container
 * @csspart label - The label element
 * @csspart input-wrapper - The wrapper around the input
 * @csspart input - The native input element
 * @csspart prefix - The prefix slot wrapper
 * @csspart suffix - The suffix slot wrapper
 * @csspart helper - The helper text element
 * @csspart error - The error message element
 *
 * @fires dm-input - Fired when value changes during input
 * @fires dm-change - Fired when value changes and input loses focus
 * @fires dm-focus - Fired when input gains focus
 * @fires dm-blur - Fired when input loses focus
 *
 * @cssprop --dm-input-height - Input height
 * @cssprop --dm-input-padding-x - Horizontal padding
 * @cssprop --dm-input-font-size - Font size
 * @cssprop --dm-input-border-radius - Border radius
 * @cssprop --dm-input-border-color - Border color
 * @cssprop --dm-input-focus-border-color - Border color when focused
 */

import { BaseElement, css } from '@duskmoon-dev/el-core';
import type { Size, ValidationState } from '@duskmoon-dev/el-core';

/**
 * Supported input types
 */
export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';

const styles = css`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none !important;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: var(--dm-spacing-xs, 0.25rem);
  }

  /* Label */
  .label {
    display: block;
    font-size: var(--dm-font-size-sm, 0.875rem);
    font-weight: var(--dm-font-weight-medium, 500);
    color: var(--dm-gray-700, #374151);
  }

  .label.required::after {
    content: ' *';
    color: var(--dm-error, #ef4444);
  }

  /* Input wrapper */
  .input-wrapper {
    display: flex;
    align-items: center;
    gap: var(--dm-spacing-sm, 0.5rem);
    border: 1px solid var(--dm-input-border-color, var(--dm-gray-300, #d1d5db));
    border-radius: var(--dm-input-border-radius, var(--dm-radius-md, 0.5rem));
    background-color: white;
    transition:
      border-color var(--dm-transition-fast, 150ms ease),
      box-shadow var(--dm-transition-fast, 150ms ease);
  }

  .input-wrapper:hover:not(.disabled) {
    border-color: var(--dm-gray-400, #9ca3af);
  }

  .input-wrapper.focused {
    border-color: var(--dm-input-focus-border-color, var(--dm-primary, #3b82f6));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--dm-primary, #3b82f6) 20%, transparent);
  }

  .input-wrapper.disabled {
    background-color: var(--dm-gray-100, #f3f4f6);
    cursor: not-allowed;
  }

  /* Validation states */
  .input-wrapper.valid {
    border-color: var(--dm-success, #22c55e);
  }

  .input-wrapper.valid.focused {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--dm-success, #22c55e) 20%, transparent);
  }

  .input-wrapper.invalid {
    border-color: var(--dm-error, #ef4444);
  }

  .input-wrapper.invalid.focused {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--dm-error, #ef4444) 20%, transparent);
  }

  /* Size variants */
  :host(:not([size])) .input-wrapper,
  :host([size="md"]) .input-wrapper {
    min-height: var(--dm-input-height, 2.5rem);
    padding: 0 var(--dm-input-padding-x, 0.75rem);
  }

  :host([size="sm"]) .input-wrapper {
    min-height: var(--dm-input-height, 2rem);
    padding: 0 var(--dm-input-padding-x, 0.5rem);
  }

  :host([size="lg"]) .input-wrapper {
    min-height: var(--dm-input-height, 3rem);
    padding: 0 var(--dm-input-padding-x, 1rem);
  }

  /* Native input */
  input {
    flex: 1;
    min-width: 0;
    border: none;
    background: transparent;
    font-family: inherit;
    font-size: var(--dm-input-font-size, var(--dm-font-size-md, 1rem));
    color: var(--dm-gray-900, #111827);
    outline: none;
  }

  :host([size="sm"]) input {
    font-size: var(--dm-input-font-size, var(--dm-font-size-sm, 0.875rem));
  }

  :host([size="lg"]) input {
    font-size: var(--dm-input-font-size, var(--dm-font-size-lg, 1.125rem));
  }

  input::placeholder {
    color: var(--dm-gray-400, #9ca3af);
  }

  input:disabled {
    cursor: not-allowed;
    color: var(--dm-gray-500, #6b7280);
  }

  /* Prefix and suffix */
  .prefix,
  .suffix {
    display: none;
    flex-shrink: 0;
    color: var(--dm-gray-500, #6b7280);
  }

  .prefix.has-content,
  .suffix.has-content {
    display: flex;
    align-items: center;
  }

  /* Helper and error text */
  .helper,
  .error {
    font-size: var(--dm-font-size-sm, 0.875rem);
    margin-top: var(--dm-spacing-xs, 0.25rem);
  }

  .helper {
    color: var(--dm-gray-500, #6b7280);
  }

  .error {
    color: var(--dm-error, #ef4444);
  }

  /* Pending state spinner */
  .pending-indicator {
    display: none;
    width: 1em;
    height: 1em;
    border: 2px solid var(--dm-gray-300, #d1d5db);
    border-top-color: var(--dm-primary, #3b82f6);
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  :host([validation-state="pending"]) .pending-indicator {
    display: block;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export class ElDmInput extends BaseElement {
  static properties = {
    type: { type: String, reflect: true, default: 'text' },
    value: { type: String, reflect: true, default: '' },
    name: { type: String, reflect: true },
    label: { type: String, reflect: true },
    placeholder: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    readonly: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
    size: { type: String, reflect: true },
    validationState: { type: String, reflect: true, attribute: 'validation-state' },
    errorMessage: { type: String, reflect: true, attribute: 'error-message' },
    helperText: { type: String, reflect: true, attribute: 'helper-text' },
  };

  /** Input type */
  declare type: InputType;

  /** Current value */
  declare value: string;

  /** Form field name */
  declare name: string;

  /** Label text */
  declare label: string;

  /** Placeholder text */
  declare placeholder: string;

  /** Whether the input is disabled */
  declare disabled: boolean;

  /** Whether the input is readonly */
  declare readonly: boolean;

  /** Whether the input is required */
  declare required: boolean;

  /** Input size */
  declare size: Size;

  /** Validation state */
  declare validationState: ValidationState;

  /** Error message */
  declare errorMessage: string;

  /** Helper text */
  declare helperText: string;

  /** Whether the input is focused */
  private _focused = false;

  constructor() {
    super();
    this.attachStyles(styles);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.shadowRoot.addEventListener('slotchange', this._handleSlotChange.bind(this));
  }

  /**
   * Handle slot content changes
   */
  private _handleSlotChange(event: Event): void {
    const slot = event.target as HTMLSlotElement;
    const wrapper = slot.parentElement;
    if (wrapper) {
      const hasContent = slot.assignedNodes().length > 0;
      wrapper.classList.toggle('has-content', hasContent);
    }
  }

  /**
   * Handle input events
   */
  private _handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;

    this.emit('dm-input', { value: this.value });
  }

  /**
   * Handle change events
   */
  private _handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;

    this.emit('dm-change', { value: this.value });
  }

  /**
   * Handle focus events
   */
  private _handleFocus(): void {
    this._focused = true;
    this.update();
    this.emit('dm-focus');
  }

  /**
   * Handle blur events
   */
  private _handleBlur(): void {
    this._focused = false;
    this.update();
    this.emit('dm-blur');
  }

  /**
   * Focus the input element
   */
  focus(): void {
    const input = this.shadowRoot.querySelector('input');
    input?.focus();
  }

  /**
   * Blur the input element
   */
  blur(): void {
    const input = this.shadowRoot.querySelector('input');
    input?.blur();
  }

  /**
   * Select all text in the input
   */
  select(): void {
    const input = this.shadowRoot.querySelector('input');
    input?.select();
  }

  protected update(): void {
    super.update();

    // Re-attach event listeners after render
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.addEventListener('input', this._handleInput.bind(this));
      input.addEventListener('change', this._handleChange.bind(this));
      input.addEventListener('focus', this._handleFocus.bind(this));
      input.addEventListener('blur', this._handleBlur.bind(this));
    }
  }

  render(): string {
    const wrapperClasses = [
      'input-wrapper',
      this._focused ? 'focused' : '',
      this.disabled ? 'disabled' : '',
      this.validationState || '',
    ].filter(Boolean).join(' ');

    const labelClasses = [
      'label',
      this.required ? 'required' : '',
    ].filter(Boolean).join(' ');

    const inputId = `input-${Math.random().toString(36).slice(2, 9)}`;

    return `
      <div class="container" part="container">
        ${this.label ? `
          <label class="${labelClasses}" for="${inputId}" part="label">
            ${this.label}
          </label>
        ` : ''}

        <div class="${wrapperClasses}" part="input-wrapper">
          <span class="prefix" part="prefix">
            <slot name="prefix"></slot>
          </span>

          <input
            id="${inputId}"
            type="${this.type || 'text'}"
            name="${this.name || ''}"
            value="${this.value || ''}"
            placeholder="${this.placeholder || ''}"
            ${this.disabled ? 'disabled' : ''}
            ${this.readonly ? 'readonly' : ''}
            ${this.required ? 'required' : ''}
            aria-invalid="${this.validationState === 'invalid' ? 'true' : 'false'}"
            aria-describedby="${this.errorMessage ? 'error' : this.helperText ? 'helper' : ''}"
            part="input"
          />

          <span class="pending-indicator"></span>

          <span class="suffix" part="suffix">
            <slot name="suffix"></slot>
          </span>
        </div>

        ${this.validationState === 'invalid' && this.errorMessage ? `
          <span id="error" class="error" part="error" role="alert">
            ${this.errorMessage}
          </span>
        ` : ''}

        ${this.helperText && this.validationState !== 'invalid' ? `
          <span id="helper" class="helper" part="helper">
            ${this.helperText}
          </span>
        ` : ''}
      </div>
    `;
  }
}
