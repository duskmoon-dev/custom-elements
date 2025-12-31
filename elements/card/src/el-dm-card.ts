/**
 * DuskMoon Card Element
 *
 * A container component with header, body, and footer sections.
 *
 * @element el-dm-card
 *
 * @attr {string} variant - Card variant: elevated, outlined, filled
 * @attr {boolean} interactive - Whether the card is clickable/hoverable
 * @attr {string} padding - Padding size: none, sm, md, lg
 *
 * @slot - Default slot for card body content
 * @slot header - Card header content
 * @slot footer - Card footer content
 * @slot media - Media content (image/video) at the top of card
 *
 * @csspart card - The main card container
 * @csspart header - The header section
 * @csspart body - The body section
 * @csspart footer - The footer section
 * @csspart media - The media section
 *
 * @fires click - Fired when interactive card is clicked
 *
 * @cssprop --dm-card-padding - Card padding
 * @cssprop --dm-card-border-radius - Border radius
 * @cssprop --dm-card-background - Background color
 * @cssprop --dm-card-border-color - Border color (for outlined variant)
 * @cssprop --dm-card-shadow - Box shadow (for elevated variant)
 */

import { BaseElement, css } from '@duskmoon-dev/el-core';

/**
 * Card variant options
 */
export type CardVariant = 'elevated' | 'outlined' | 'filled';

/**
 * Card padding options
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

const styles = css`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none !important;
  }

  .card {
    display: flex;
    flex-direction: column;
    border-radius: var(--dm-card-border-radius, var(--dm-radius-lg, 0.75rem));
    background-color: var(--dm-card-background, white);
    overflow: hidden;
    transition:
      box-shadow var(--dm-transition-normal, 200ms ease),
      transform var(--dm-transition-normal, 200ms ease);
  }

  /* Elevated variant (default) */
  :host(:not([variant])) .card,
  :host([variant="elevated"]) .card {
    box-shadow: var(--dm-card-shadow, var(--dm-shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1)));
  }

  /* Outlined variant */
  :host([variant="outlined"]) .card {
    border: 1px solid var(--dm-card-border-color, var(--dm-gray-200, #e5e7eb));
    box-shadow: none;
  }

  /* Filled variant */
  :host([variant="filled"]) .card {
    background-color: var(--dm-card-background, var(--dm-gray-50, #f9fafb));
    box-shadow: none;
  }

  /* Interactive styles */
  :host([interactive]) .card {
    cursor: pointer;
  }

  :host([interactive]) .card:hover {
    transform: translateY(-2px);
  }

  :host([interactive][variant="elevated"]) .card:hover,
  :host([interactive]:not([variant])) .card:hover {
    box-shadow: var(--dm-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
  }

  :host([interactive][variant="outlined"]) .card:hover {
    border-color: var(--dm-primary, #3b82f6);
  }

  :host([interactive][variant="filled"]) .card:hover {
    background-color: var(--dm-gray-100, #f3f4f6);
  }

  :host([interactive]) .card:focus-visible {
    outline: none;
    box-shadow: var(--dm-focus-ring-offset, 0 0 0 2px white, 0 0 0 4px var(--dm-primary, #3b82f6));
  }

  /* Media slot */
  .media {
    display: none;
  }

  .media.has-content {
    display: block;
  }

  .media ::slotted(*) {
    display: block;
    width: 100%;
    object-fit: cover;
  }

  /* Header */
  .header {
    display: none;
    padding: var(--dm-card-padding, var(--dm-spacing-md, 1rem));
    padding-bottom: 0;
  }

  .header.has-content {
    display: block;
  }

  /* Body */
  .body {
    flex: 1;
  }

  /* Padding variants */
  :host(:not([padding])) .body,
  :host([padding="md"]) .body {
    padding: var(--dm-card-padding, var(--dm-spacing-md, 1rem));
  }

  :host([padding="none"]) .body {
    padding: 0;
  }

  :host([padding="sm"]) .body {
    padding: var(--dm-card-padding, var(--dm-spacing-sm, 0.5rem));
  }

  :host([padding="lg"]) .body {
    padding: var(--dm-card-padding, var(--dm-spacing-lg, 1.5rem));
  }

  :host(:not([padding])) .header,
  :host([padding="md"]) .header {
    padding: var(--dm-card-padding, var(--dm-spacing-md, 1rem));
    padding-bottom: 0;
  }

  :host([padding="sm"]) .header {
    padding: var(--dm-card-padding, var(--dm-spacing-sm, 0.5rem));
    padding-bottom: 0;
  }

  :host([padding="lg"]) .header {
    padding: var(--dm-card-padding, var(--dm-spacing-lg, 1.5rem));
    padding-bottom: 0;
  }

  /* Footer */
  .footer {
    display: none;
    padding: var(--dm-card-padding, var(--dm-spacing-md, 1rem));
    padding-top: 0;
    border-top: 1px solid var(--dm-gray-100, #f3f4f6);
    margin-top: var(--dm-spacing-md, 1rem);
  }

  .footer.has-content {
    display: block;
  }

  :host([padding="sm"]) .footer {
    padding: var(--dm-card-padding, var(--dm-spacing-sm, 0.5rem));
    padding-top: 0;
    margin-top: var(--dm-spacing-sm, 0.5rem);
  }

  :host([padding="lg"]) .footer {
    padding: var(--dm-card-padding, var(--dm-spacing-lg, 1.5rem));
    padding-top: 0;
    margin-top: var(--dm-spacing-lg, 1.5rem);
  }

  :host([padding="none"]) .footer {
    padding: var(--dm-spacing-md, 1rem);
    margin-top: 0;
  }
`;

export class ElDmCard extends BaseElement {
  static properties = {
    variant: { type: String, reflect: true },
    interactive: { type: Boolean, reflect: true },
    padding: { type: String, reflect: true },
  };

  /** Card variant */
  declare variant: CardVariant;

  /** Whether the card is interactive */
  declare interactive: boolean;

  /** Card padding size */
  declare padding: CardPadding;

  constructor() {
    super();
    this.attachStyles(styles);
  }

  connectedCallback(): void {
    super.connectedCallback();

    // Set up slot change listeners for conditional display
    this.shadowRoot.addEventListener('slotchange', this._handleSlotChange.bind(this));

    // Set up click handler for interactive cards
    if (this.interactive) {
      this._setupInteractive();
    }
  }

  /**
   * Handle slot content changes
   */
  private _handleSlotChange(event: Event): void {
    const slot = event.target as HTMLSlotElement;
    const slotName = slot.name || 'body';
    const wrapper = this.shadowRoot.querySelector(`.${slotName}`);

    if (wrapper) {
      const hasContent = slot.assignedNodes().length > 0;
      wrapper.classList.toggle('has-content', hasContent);
    }
  }

  /**
   * Set up interactive card behavior
   */
  private _setupInteractive(): void {
    const card = this.shadowRoot.querySelector('.card') as HTMLElement;
    if (card) {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');

      card.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.emit('click');
        }
      });
    }
  }

  render(): string {
    return `
      <div class="card" part="card">
        <div class="media" part="media">
          <slot name="media"></slot>
        </div>
        <div class="header" part="header">
          <slot name="header"></slot>
        </div>
        <div class="body" part="body">
          <slot></slot>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}
