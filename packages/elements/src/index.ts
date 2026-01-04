/**
 * @duskmoon-dev/elements
 *
 * All DuskMoon custom elements in one package.
 * Import this package to get access to all element classes and register functions.
 *
 * @example
 * ```ts
 * import { ElDmButton, ElDmCard, registerAll } from '@duskmoon-dev/elements';
 *
 * // Register all elements
 * registerAll();
 *
 * // Or register individually
 * import { registerButton, registerCard } from '@duskmoon-dev/elements';
 * registerButton();
 * registerCard();
 * ```
 */

// Re-export core utilities
export {
  BaseElement,
  css,
  combineStyles,
  cssVars,
  defaultTheme,
  resetStyles,
} from '@duskmoon-dev/el-core';

export type {
  PropertyDefinition,
  PropertyDefinitions,
  Size,
  Variant,
  ValidationState,
  BaseElementProps,
  SizableProps,
  VariantProps,
  FormElementProps,
  ValidatableProps,
  ValueChangeEventDetail,
  AttributeConverter,
} from '@duskmoon-dev/el-core';

// Import elements and register functions
import { ElDmButton, register as registerButton } from '@duskmoon-dev/el-button';
import { ElDmCard, register as registerCard } from '@duskmoon-dev/el-card';
import { ElDmInput, register as registerInput } from '@duskmoon-dev/el-input';
import {
  ElDmMarkdown,
  register as registerMarkdown,
  github,
  atomOneDark,
  atomOneLight,
} from '@duskmoon-dev/el-markdown';

// Re-export all elements
export { ElDmButton, registerButton };
export { ElDmCard, registerCard };
export type { CardVariant, CardPadding } from '@duskmoon-dev/el-card';
export { ElDmInput, registerInput };
export { ElDmMarkdown, registerMarkdown, github, atomOneDark, atomOneLight };
export type { MarkdownTheme } from '@duskmoon-dev/el-markdown';

/**
 * Register all DuskMoon custom elements
 *
 * @example
 * ```ts
 * import { registerAll } from '@duskmoon-dev/elements';
 * registerAll();
 * ```
 */
export function registerAll(): void {
  registerButton();
  registerCard();
  registerInput();
  registerMarkdown();
}
