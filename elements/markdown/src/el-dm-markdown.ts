/**
 * DuskMoon Markdown Element
 *
 * A markdown renderer component using remark/rehype with syntax highlighting
 * and optional mermaid diagram support.
 *
 * @element el-dm-markdown
 *
 * @attr {string} src - URL to fetch markdown content from
 * @attr {string} theme - Code theme: github, atom-one-dark, atom-one-light (default: auto)
 * @attr {boolean} debug - Enable debug logging
 * @attr {boolean} no-mermaid - Disable mermaid diagram rendering
 *
 * @slot - Default slot for inline markdown content
 *
 * @csspart container - The main container
 * @csspart content - The rendered markdown content
 *
 * @fires dm-rendered - Fired when markdown is rendered
 * @fires dm-error - Fired when an error occurs
 *
 * @cssprop --dm-markdown-font-family - Font family for content
 * @cssprop --dm-markdown-code-font-family - Font family for code blocks
 * @cssprop --dm-markdown-line-height - Line height
 */

import { BaseElement, css } from '@duskmoon-dev/el-core';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

import { github } from './themes/github.js';
import { atomOneDark } from './themes/atom-one-dark.js';
import { atomOneLight } from './themes/atom-one-light.js';

/**
 * Theme options for code syntax highlighting
 */
export type MarkdownTheme = 'github' | 'atom-one-dark' | 'atom-one-light' | 'auto';

const baseStyles = css`
  :host {
    display: block;
    font-family: var(
      --dm-markdown-font-family,
      var(--dm-font-family, system-ui, -apple-system, sans-serif)
    );
    line-height: var(--dm-markdown-line-height, 1.6);
    color: var(--dm-gray-900, #111827);
  }

  :host([hidden]) {
    display: none !important;
  }

  .container {
    width: 100%;
  }

  .content {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  /* Typography */
  .content h1,
  .content h2,
  .content h3,
  .content h4,
  .content h5,
  .content h6 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: var(--dm-font-weight-semibold, 600);
    line-height: 1.25;
  }

  .content h1 {
    font-size: 2em;
  }
  .content h2 {
    font-size: 1.5em;
    border-bottom: 1px solid var(--dm-gray-200, #e5e7eb);
    padding-bottom: 0.3em;
  }
  .content h3 {
    font-size: 1.25em;
  }
  .content h4 {
    font-size: 1em;
  }
  .content h5 {
    font-size: 0.875em;
  }
  .content h6 {
    font-size: 0.85em;
    color: var(--dm-gray-500, #6b7280);
  }

  .content p {
    margin-top: 0;
    margin-bottom: 1em;
  }

  .content a {
    color: var(--dm-primary, #3b82f6);
    text-decoration: none;
  }

  .content a:hover {
    text-decoration: underline;
  }

  /* Lists */
  .content ul,
  .content ol {
    margin-top: 0;
    margin-bottom: 1em;
    padding-left: 2em;
  }

  .content li {
    margin-bottom: 0.25em;
  }

  .content li > * {
    display: inline;
  }

  .content li > ul,
  .content li > ol {
    display: block;
    margin-top: 0.25em;
    margin-bottom: 0;
  }

  /* Task lists (GFM) */
  .content ul.contains-task-list {
    list-style: none;
    padding-left: 1em;
  }

  .content .task-list-item {
    display: flex;
    align-items: baseline;
    gap: 0.5em;
  }

  .content .task-list-item input[type='checkbox'] {
    margin: 0;
  }

  /* Code */
  .content code {
    font-family: var(
      --dm-markdown-code-font-family,
      ui-monospace,
      SFMono-Regular,
      Menlo,
      Monaco,
      Consolas,
      monospace
    );
    font-size: 0.875em;
    padding: 0.2em 0.4em;
    background-color: var(--dm-gray-100, #f3f4f6);
    border-radius: var(--dm-radius-sm, 0.25rem);
  }

  .content pre {
    margin-top: 0;
    margin-bottom: 1em;
    padding: 1em;
    overflow-x: auto;
    border-radius: var(--dm-radius-md, 0.5rem);
    background-color: var(--dm-gray-100, #f3f4f6);
  }

  .content pre code {
    padding: 0;
    background-color: transparent;
    font-size: 0.875em;
    line-height: 1.5;
  }

  /* Blockquote */
  .content blockquote {
    margin: 0 0 1em;
    padding: 0.5em 1em;
    border-left: 4px solid var(--dm-gray-300, #d1d5db);
    color: var(--dm-gray-600, #4b5563);
    background-color: var(--dm-gray-50, #f9fafb);
  }

  .content blockquote > :first-child {
    margin-top: 0;
  }

  .content blockquote > :last-child {
    margin-bottom: 0;
  }

  /* Tables */
  .content table {
    width: 100%;
    margin-bottom: 1em;
    border-collapse: collapse;
    border-spacing: 0;
  }

  .content th,
  .content td {
    padding: 0.5em 1em;
    border: 1px solid var(--dm-gray-300, #d1d5db);
    text-align: left;
  }

  .content th {
    font-weight: var(--dm-font-weight-semibold, 600);
    background-color: var(--dm-gray-50, #f9fafb);
  }

  .content tr:nth-child(even) {
    background-color: var(--dm-gray-50, #f9fafb);
  }

  /* Horizontal rule */
  .content hr {
    height: 0.25em;
    margin: 1.5em 0;
    padding: 0;
    background-color: var(--dm-gray-200, #e5e7eb);
    border: 0;
  }

  /* Images */
  .content img {
    max-width: 100%;
    height: auto;
    border-radius: var(--dm-radius-md, 0.5rem);
  }

  /* Mermaid diagrams */
  .content .language-mermaid {
    display: flex;
    justify-content: center;
    background: transparent !important;
    padding: 1em 0;
  }

  .content .language-mermaid svg {
    max-width: 100%;
    height: auto;
  }

  /* Loading state */
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2em;
    color: var(--dm-gray-500, #6b7280);
  }

  .loading::after {
    content: '';
    width: 1.5em;
    height: 1.5em;
    margin-left: 0.5em;
    border: 2px solid var(--dm-gray-300, #d1d5db);
    border-top-color: var(--dm-primary, #3b82f6);
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Error state */
  .error {
    padding: 1em;
    color: var(--dm-error, #ef4444);
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: var(--dm-radius-md, 0.5rem);
  }
`;

// Create theme stylesheets
const githubSheet = new CSSStyleSheet();
githubSheet.replaceSync(github);

const darkSheet = new CSSStyleSheet();
darkSheet.replaceSync(atomOneDark);

const lightSheet = new CSSStyleSheet();
lightSheet.replaceSync(atomOneLight);

// Auto theme stylesheet (uses prefers-color-scheme)
const autoThemeSheet = new CSSStyleSheet();
autoThemeSheet.replaceSync(`
  @media (prefers-color-scheme: dark) {
    ${atomOneDark}
  }
  @media (prefers-color-scheme: light) {
    ${atomOneLight}
  }
`);

export class ElDmMarkdown extends BaseElement {
  static properties = {
    src: { type: String, reflect: true },
    theme: { type: String, reflect: true, default: 'auto' },
    debug: { type: Boolean, reflect: true },
    noMermaid: { type: Boolean, reflect: true, attribute: 'no-mermaid' },
  };

  /** URL to fetch markdown content from */
  declare src: string;

  /** Code theme */
  declare theme: MarkdownTheme;

  /** Enable debug logging */
  declare debug: boolean;

  /** Disable mermaid rendering */
  declare noMermaid: boolean;

  /** Unique ID for mermaid diagrams */
  private _mid: string = '';

  /** Raw HTML fragment after conversion */
  private _fragment: string = '';

  /** Current content being rendered */
  private _content: string = '';

  /** Loading state */
  private _loading: boolean = false;

  /** Error message */
  private _error: string = '';

  /** Mutation observer for slot changes */
  private _observer?: MutationObserver;

  /** Mermaid module (loaded dynamically) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _mermaid?: any;

  constructor() {
    super();
    this.attachStyles(baseStyles);
    this._updateTheme();
  }

  /**
   * Update the theme stylesheet
   */
  private _updateTheme(): void {
    // Remove existing theme sheets
    const sheets = this.shadowRoot.adoptedStyleSheets.filter(
      (s) => s !== githubSheet && s !== darkSheet && s !== lightSheet && s !== autoThemeSheet,
    );

    // Add the appropriate theme sheet
    switch (this.theme) {
      case 'github':
        this.shadowRoot.adoptedStyleSheets = [...sheets, githubSheet];
        break;
      case 'atom-one-dark':
        this.shadowRoot.adoptedStyleSheets = [...sheets, darkSheet];
        break;
      case 'atom-one-light':
        this.shadowRoot.adoptedStyleSheets = [...sheets, lightSheet];
        break;
      case 'auto':
      default:
        this.shadowRoot.adoptedStyleSheets = [...sheets, autoThemeSheet];
        break;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();

    this._mid = this.id || `md-${Date.now()}`;

    // Load mermaid if not disabled
    if (!this.noMermaid) {
      this._loadMermaid();
    }

    // Observe content changes
    this._observer = new MutationObserver(() => {
      this._processContent();
    });
    this._observer.observe(this, {
      subtree: true,
      childList: true,
      characterData: true,
    });

    // Initial render
    this._processContent();
  }

  disconnectedCallback(): void {
    this._observer?.disconnect();
    super.disconnectedCallback();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'theme' && oldValue !== newValue) {
      this._updateTheme();
    }

    if (name === 'src' && oldValue !== newValue) {
      this._fetchContent();
    }
  }

  /**
   * Load mermaid library dynamically
   */
  private async _loadMermaid(): Promise<void> {
    try {
      // Dynamic import for optional peer dependency
      // @ts-expect-error mermaid is an optional peer dependency
      const mermaidModule = await import('mermaid');
      const mermaid = mermaidModule.default || mermaidModule;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
      });
      this._mermaid = mermaid;

      if (this.debug) {
        console.log('[el-dm-markdown] Mermaid loaded');
      }
    } catch (error) {
      if (this.debug) {
        console.warn('[el-dm-markdown] Mermaid not available:', error);
      }
    }
  }

  /**
   * Fetch content from src URL
   */
  private async _fetchContent(): Promise<void> {
    if (!this.src) return;

    this._loading = true;
    this._error = '';
    this.update();

    try {
      const response = await fetch(this.src);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      this._content = await response.text();
      await this._renderMarkdown();
    } catch (error) {
      this._error = error instanceof Error ? error.message : 'Unknown error';
      this.emit('dm-error', { error: this._error });
    } finally {
      this._loading = false;
      this.update();
    }
  }

  /**
   * Process content from slot or src
   */
  private async _processContent(): Promise<void> {
    // If src is set, let _fetchContent handle it
    if (this.src) return;

    const content = this._removeIndent(this.textContent ?? '');
    if (content !== this._content) {
      this._content = content;
      await this._renderMarkdown();
    }
  }

  /**
   * Render markdown to HTML
   */
  private async _renderMarkdown(): Promise<void> {
    if (!this._content) {
      this._fragment = '';
      this.update();
      return;
    }

    try {
      const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeHighlight, { detect: true, ignoreMissing: true })
        .use(rehypeStringify)
        .process(this._content);

      this._fragment = String(result);
      this.update();

      // Process mermaid diagrams after render
      requestAnimationFrame(() => {
        this._processMermaidDiagrams();
      });

      this.emit('dm-rendered', { html: this._fragment });
    } catch (error) {
      this._error = error instanceof Error ? error.message : 'Render error';
      this.emit('dm-error', { error: this._error });
      this.update();
    }
  }

  /**
   * Process mermaid code blocks into diagrams
   */
  private async _processMermaidDiagrams(): Promise<void> {
    if (this.noMermaid || !this._mermaid) return;

    const codeBlocks = this.shadowRoot.querySelectorAll<HTMLElement>('code.language-mermaid');

    // Get the original mermaid content from the fragment
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this._fragment;
    const sourceBlocks = tempDiv.querySelectorAll<HTMLElement>('code.language-mermaid');

    for (let i = 0; i < codeBlocks.length; i++) {
      const el = codeBlocks[i];
      const sourceEl = sourceBlocks[i];

      if (!sourceEl) continue;

      const txt = this._removeIndent(sourceEl.textContent ?? '');
      const decodedTxt = this._decodeEntities(txt);

      if (this.debug) {
        console.log('[el-dm-markdown] Mermaid source:', decodedTxt);
      }

      try {
        const id = `${this._mid}-mermaid-${i}`;
        const { svg } = await this._mermaid.render(id, decodedTxt);
        el.innerHTML = svg;
      } catch (error) {
        if (this.debug) {
          console.error('[el-dm-markdown] Mermaid render error:', error);
        }
        el.textContent = `Mermaid Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      }
    }
  }

  /**
   * Decode HTML entities
   */
  private _decodeEntities(txt: string): string {
    return txt.replace(/&gt;/gi, '>').replace(/&lt;/gi, '<').replace(/&amp;/gi, '&');
  }

  /**
   * Remove common indentation from text
   */
  private _removeIndent(txt: string): string {
    const lines = txt.split('\n');

    // Only remove indent when first line is empty
    if (lines.length > 1 && /^\s*$/.test(lines[0])) {
      lines.splice(0, 1);

      const indentSize = /^\s+/.exec(lines[0])?.[0].length ?? 0;
      if (indentSize > 0) {
        const regex = new RegExp(`^\\s{0,${indentSize}}`);
        return lines.map((line) => line.replace(regex, '')).join('\n');
      }
    }

    return lines.join('\n');
  }

  render(): string {
    if (this._loading) {
      return `
        <div class="container" part="container">
          <div class="loading">Loading markdown</div>
        </div>
      `;
    }

    if (this._error) {
      return `
        <div class="container" part="container">
          <div class="error" role="alert">${this._error}</div>
        </div>
      `;
    }

    return `
      <div class="container" part="container">
        <div class="content" part="content">${this._fragment}</div>
      </div>
    `;
  }
}
