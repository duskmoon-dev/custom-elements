/**
 * Auto-register all DuskMoon custom elements
 *
 * @example
 * ```ts
 * // Just import to register all elements
 * import '@duskmoon-dev/elements/register';
 *
 * // Now you can use all elements in HTML:
 * // <el-dm-button>Click me</el-dm-button>
 * // <el-dm-card>Content</el-dm-card>
 * // <el-dm-input></el-dm-input>
 * // <el-dm-markdown>## Markdown</el-dm-markdown>
 * ```
 */
import { registerAll } from './index.js';

registerAll();
