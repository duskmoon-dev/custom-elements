/**
 * @duskmoon-dev/el-input
 *
 * DuskMoon Input custom element
 */

import { ElDmInput } from './el-dm-input.js';

export { ElDmInput };
export type { InputType } from './el-dm-input.js';

/**
 * Register the el-dm-input custom element
 *
 * @example
 * ```ts
 * import { register } from '@duskmoon-dev/el-input';
 * register();
 * ```
 */
export function register(): void {
  if (!customElements.get('el-dm-input')) {
    customElements.define('el-dm-input', ElDmInput);
  }
}
