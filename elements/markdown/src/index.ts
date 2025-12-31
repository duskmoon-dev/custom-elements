/**
 * @duskmoon-dev/el-markdown
 *
 * DuskMoon Markdown custom element
 */

import { ElDmMarkdown } from './el-dm-markdown.js';

export { ElDmMarkdown };
export type { MarkdownTheme } from './el-dm-markdown.js';

// Re-export themes for custom use
export { github, atomOneDark, atomOneLight } from './themes/index.js';

/**
 * Register the el-dm-markdown custom element
 *
 * @example
 * ```ts
 * import { register } from '@duskmoon-dev/el-markdown';
 * register();
 * ```
 */
export function register(): void {
  if (!customElements.get('el-dm-markdown')) {
    customElements.define('el-dm-markdown', ElDmMarkdown);
  }
}
