/**
 * @duskmoon-dev/el-card
 *
 * DuskMoon Card custom element
 */

import { ElDmCard } from './el-dm-card.js';

export { ElDmCard };
export type { CardVariant, CardPadding } from './el-dm-card.js';

/**
 * Register the el-dm-card custom element
 *
 * @example
 * ```ts
 * import { register } from '@duskmoon-dev/el-card';
 * register();
 * ```
 */
export function register(): void {
  if (!customElements.get('el-dm-card')) {
    customElements.define('el-dm-card', ElDmCard);
  }
}
