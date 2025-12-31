# @duskmoon-dev/el-core

Core utilities and base classes for DuskMoon custom elements.

## Installation

```bash
bun add @duskmoon-dev/el-core
```

## Usage

### BaseElement

The `BaseElement` class provides a foundation for creating custom elements with:

- Shadow DOM setup with adoptedStyleSheets
- Reactive properties with attribute reflection
- Style injection utilities
- Common lifecycle methods

```typescript
import { BaseElement, css } from '@duskmoon-dev/el-core';

const styles = css`
  :host {
    display: block;
  }
  .greeting {
    color: var(--dm-primary);
  }
`;

class MyGreeting extends BaseElement {
  static properties = {
    name: { type: String, reflect: true, default: 'World' },
  };

  declare name: string;

  constructor() {
    super();
    this.attachStyles(styles);
  }

  render() {
    return `<div class="greeting">Hello, ${this.name}!</div>`;
  }
}

customElements.define('my-greeting', MyGreeting);
```

### CSS Utilities

#### `css` Template Tag

Creates a `CSSStyleSheet` from a template literal:

```typescript
import { css } from '@duskmoon-dev/el-core';

const styles = css`
  :host {
    display: inline-flex;
  }
  button {
    padding: 0.5rem 1rem;
  }
`;
```

#### `combineStyles`

Combines multiple stylesheets:

```typescript
import { combineStyles } from '@duskmoon-dev/el-core';

const combinedStyles = combineStyles(baseStyles, themeStyles, componentStyles);
```

#### `cssVars`

Creates CSS custom property declarations:

```typescript
import { cssVars } from '@duskmoon-dev/el-core';

const vars = cssVars({
  'dm-primary': '#3b82f6',
  'dm-spacing': '1rem',
});
// Returns: '--dm-primary: #3b82f6; --dm-spacing: 1rem;'
```

### Default Theme

The package includes default CSS custom properties for theming:

- Colors: `--dm-primary`, `--dm-secondary`, `--dm-success`, `--dm-warning`, `--dm-error`
- Grays: `--dm-gray-50` through `--dm-gray-900`
- Typography: `--dm-font-family`, `--dm-font-size-*`, `--dm-font-weight-*`
- Spacing: `--dm-spacing-xs` through `--dm-spacing-xl`
- Border Radius: `--dm-radius-sm` through `--dm-radius-full`
- Shadows: `--dm-shadow-sm`, `--dm-shadow-md`, `--dm-shadow-lg`
- Transitions: `--dm-transition-fast`, `--dm-transition-normal`, `--dm-transition-slow`

## API

### BaseElement

| Method                 | Description                       |
| ---------------------- | --------------------------------- |
| `attachStyles(styles)` | Attach stylesheets to Shadow DOM  |
| `render()`             | Override to return HTML content   |
| `update()`             | Called when element should update |
| `emit(name, detail?)`  | Emit a custom event               |
| `query(selector)`      | Query element in Shadow DOM       |
| `queryAll(selector)`   | Query all elements in Shadow DOM  |

### Property Definitions

```typescript
static properties = {
  myProp: {
    type: String,      // String, Number, Boolean, Object, Array
    reflect: true,     // Reflect to attribute
    attribute: 'my-prop', // Custom attribute name
    default: 'value'   // Default value
  }
};
```

## License

MIT
