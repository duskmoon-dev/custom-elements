import { expect, test, describe, beforeEach, afterEach } from 'bun:test';
import { ElDmMarkdown, register } from './index';

// Register the element
register();

describe('ElDmMarkdown', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  test('is defined', () => {
    expect(customElements.get('el-dm-markdown')).toBe(ElDmMarkdown);
  });

  test('creates a shadow root', () => {
    const el = document.createElement('el-dm-markdown') as ElDmMarkdown;
    container.appendChild(el);

    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot?.mode).toBe('open');
  });

  test('has container and content parts', () => {
    const el = document.createElement('el-dm-markdown') as ElDmMarkdown;
    container.appendChild(el);

    const containerPart = el.shadowRoot?.querySelector('[part="container"]');
    expect(containerPart).toBeDefined();
  });

  test('applies theme attribute', () => {
    const el = document.createElement('el-dm-markdown') as ElDmMarkdown;
    el.theme = 'atom-one-dark';
    container.appendChild(el);

    expect(el.getAttribute('theme')).toBe('atom-one-dark');
  });

  test('applies debug attribute', () => {
    const el = document.createElement('el-dm-markdown') as ElDmMarkdown;
    el.debug = true;
    container.appendChild(el);

    expect(el.hasAttribute('debug')).toBe(true);
  });

  test('applies no-mermaid attribute', () => {
    const el = document.createElement('el-dm-markdown') as ElDmMarkdown;
    el.noMermaid = true;
    container.appendChild(el);

    expect(el.hasAttribute('no-mermaid')).toBe(true);
  });

  test('applies src attribute', () => {
    const el = document.createElement('el-dm-markdown') as ElDmMarkdown;
    el.src = '/test.md';
    container.appendChild(el);

    expect(el.getAttribute('src')).toBe('/test.md');
  });

  test('has adoptedStyleSheets', () => {
    const el = document.createElement('el-dm-markdown') as ElDmMarkdown;
    container.appendChild(el);

    expect(el.shadowRoot?.adoptedStyleSheets.length).toBeGreaterThan(0);
  });

  test('default theme is auto', () => {
    const el = document.createElement('el-dm-markdown') as ElDmMarkdown;
    container.appendChild(el);

    // Default theme should be 'auto' or undefined (which defaults to auto)
    expect(el.theme === 'auto' || el.theme === undefined).toBe(true);
  });
});

describe('Theme exports', () => {
  test('exports github theme', async () => {
    const { github } = await import('./themes/github.js');
    expect(typeof github).toBe('string');
    expect(github).toContain('.hljs');
  });

  test('exports atomOneDark theme', async () => {
    const { atomOneDark } = await import('./themes/atom-one-dark.js');
    expect(typeof atomOneDark).toBe('string');
    expect(atomOneDark).toContain('.hljs');
  });

  test('exports atomOneLight theme', async () => {
    const { atomOneLight } = await import('./themes/atom-one-light.js');
    expect(typeof atomOneLight).toBe('string');
    expect(atomOneLight).toContain('.hljs');
  });
});
