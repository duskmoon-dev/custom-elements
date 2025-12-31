import { expect, test, describe, beforeEach, afterEach } from 'bun:test';
import { ElDmCard, register } from './index';

// Register the element
register();

describe('ElDmCard', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  test('is defined', () => {
    expect(customElements.get('el-dm-card')).toBe(ElDmCard);
  });

  test('creates a shadow root with card container', () => {
    const el = document.createElement('el-dm-card') as ElDmCard;
    container.appendChild(el);

    const card = el.shadowRoot?.querySelector('.card');
    expect(card).toBeDefined();
  });

  test('has header, body, and footer sections', () => {
    const el = document.createElement('el-dm-card') as ElDmCard;
    container.appendChild(el);

    const header = el.shadowRoot?.querySelector('.header');
    const body = el.shadowRoot?.querySelector('.body');
    const footer = el.shadowRoot?.querySelector('.footer');

    expect(header).toBeDefined();
    expect(body).toBeDefined();
    expect(footer).toBeDefined();
  });

  test('has media section', () => {
    const el = document.createElement('el-dm-card') as ElDmCard;
    container.appendChild(el);

    const media = el.shadowRoot?.querySelector('.media');
    expect(media).toBeDefined();
  });

  test('applies variant attribute', () => {
    const el = document.createElement('el-dm-card') as ElDmCard;
    el.variant = 'outlined';
    container.appendChild(el);

    expect(el.getAttribute('variant')).toBe('outlined');
  });

  test('applies padding attribute', () => {
    const el = document.createElement('el-dm-card') as ElDmCard;
    el.padding = 'lg';
    container.appendChild(el);

    expect(el.getAttribute('padding')).toBe('lg');
  });

  test('applies interactive attribute', () => {
    const el = document.createElement('el-dm-card') as ElDmCard;
    el.interactive = true;
    container.appendChild(el);

    expect(el.hasAttribute('interactive')).toBe(true);
  });

  test('has named slots', () => {
    const el = document.createElement('el-dm-card') as ElDmCard;
    container.appendChild(el);

    const headerSlot = el.shadowRoot?.querySelector('slot[name="header"]');
    const footerSlot = el.shadowRoot?.querySelector('slot[name="footer"]');
    const mediaSlot = el.shadowRoot?.querySelector('slot[name="media"]');
    const defaultSlot = el.shadowRoot?.querySelector('slot:not([name])');

    expect(headerSlot).toBeDefined();
    expect(footerSlot).toBeDefined();
    expect(mediaSlot).toBeDefined();
    expect(defaultSlot).toBeDefined();
  });
});
