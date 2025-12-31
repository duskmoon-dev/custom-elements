/**
 * CSS-in-JS utilities for constructable stylesheets
 */

/**
 * Cache for constructed stylesheets
 */
const styleSheetCache = new WeakMap<TemplateStringsArray, CSSStyleSheet>();

/**
 * Creates a CSSStyleSheet from a template literal
 * Results are cached for performance
 *
 * @example
 * ```ts
 * const styles = css`
 *   :host {
 *     display: block;
 *   }
 * `;
 * ```
 *
 * @param strings - Template literal strings
 * @param values - Interpolated values
 * @returns A CSSStyleSheet instance
 */
export function css(strings: TemplateStringsArray, ...values: (string | number)[]): CSSStyleSheet {
  // Check cache first
  const cached = styleSheetCache.get(strings);
  if (cached && values.length === 0) {
    return cached;
  }

  // Construct the CSS string
  let cssText = strings[0];
  for (let i = 0; i < values.length; i++) {
    cssText += String(values[i]) + strings[i + 1];
  }

  // Create and cache the stylesheet
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(cssText);

  // Only cache if there are no dynamic values
  if (values.length === 0) {
    styleSheetCache.set(strings, sheet);
  }

  return sheet;
}

/**
 * Combines multiple CSSStyleSheet instances into an array
 * Useful for composing styles from multiple sources
 *
 * @param sheets - Stylesheets to combine
 * @returns Array of stylesheets
 */
export function combineStyles(...sheets: CSSStyleSheet[]): CSSStyleSheet[] {
  return sheets;
}

/**
 * Creates CSS custom property declarations from an object
 *
 * @example
 * ```ts
 * const vars = cssVars({
 *   'dm-primary': '#3b82f6',
 *   'dm-spacing': '1rem'
 * });
 * // Returns: '--dm-primary: #3b82f6; --dm-spacing: 1rem;'
 * ```
 *
 * @param vars - Object of variable names to values
 * @returns CSS custom property declarations string
 */
export function cssVars(vars: Record<string, string | number>): string {
  return Object.entries(vars)
    .map(([key, value]) => `--${key}: ${value}`)
    .join('; ');
}

/**
 * Default theme CSS custom properties
 */
export const defaultTheme = css`
  :host {
    /* Colors */
    --dm-primary: #3b82f6;
    --dm-primary-hover: #2563eb;
    --dm-primary-active: #1d4ed8;
    --dm-secondary: #6b7280;
    --dm-secondary-hover: #4b5563;
    --dm-secondary-active: #374151;
    --dm-success: #22c55e;
    --dm-warning: #f59e0b;
    --dm-error: #ef4444;
    --dm-info: #3b82f6;

    /* Neutrals */
    --dm-gray-50: #f9fafb;
    --dm-gray-100: #f3f4f6;
    --dm-gray-200: #e5e7eb;
    --dm-gray-300: #d1d5db;
    --dm-gray-400: #9ca3af;
    --dm-gray-500: #6b7280;
    --dm-gray-600: #4b5563;
    --dm-gray-700: #374151;
    --dm-gray-800: #1f2937;
    --dm-gray-900: #111827;

    /* Typography */
    --dm-font-family: system-ui, -apple-system, sans-serif;
    --dm-font-size-xs: 0.75rem;
    --dm-font-size-sm: 0.875rem;
    --dm-font-size-md: 1rem;
    --dm-font-size-lg: 1.125rem;
    --dm-font-size-xl: 1.25rem;
    --dm-font-weight-normal: 400;
    --dm-font-weight-medium: 500;
    --dm-font-weight-semibold: 600;
    --dm-font-weight-bold: 700;

    /* Spacing */
    --dm-spacing-xs: 0.25rem;
    --dm-spacing-sm: 0.5rem;
    --dm-spacing-md: 1rem;
    --dm-spacing-lg: 1.5rem;
    --dm-spacing-xl: 2rem;

    /* Border Radius */
    --dm-radius-sm: 0.25rem;
    --dm-radius-md: 0.5rem;
    --dm-radius-lg: 0.75rem;
    --dm-radius-xl: 1rem;
    --dm-radius-full: 9999px;

    /* Shadows */
    --dm-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --dm-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --dm-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

    /* Transitions */
    --dm-transition-fast: 150ms ease;
    --dm-transition-normal: 200ms ease;
    --dm-transition-slow: 300ms ease;

    /* Focus */
    --dm-focus-ring: 0 0 0 2px var(--dm-primary);
    --dm-focus-ring-offset: 0 0 0 2px white, 0 0 0 4px var(--dm-primary);
  }
`;

/**
 * Reset styles for Shadow DOM elements
 */
export const resetStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    font-family: var(--dm-font-family, system-ui, -apple-system, sans-serif);
  }

  :host([hidden]) {
    display: none !important;
  }
`;
