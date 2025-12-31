# DuskMoon Elements

A collection of customizable web components built with vanilla JavaScript and Shadow DOM.

## Features

- **Lightweight**: No framework dependencies, pure web components
- **Customizable**: CSS custom properties for easy theming
- **Accessible**: Built with accessibility in mind
- **TypeScript**: Full TypeScript support with type definitions
- **Tree-shakable**: Import only what you need

## Packages

| Package                                          | Description                     | Version |
| ------------------------------------------------ | ------------------------------- | ------- |
| [@duskmoon-dev/el-core](./packages/core)         | Core utilities and base classes | 0.0.1   |
| [@duskmoon-dev/el-button](./elements/button)     | Button component                | 0.0.1   |
| [@duskmoon-dev/el-card](./elements/card)         | Card container component        | 0.0.1   |
| [@duskmoon-dev/el-input](./elements/input)       | Text input component            | 0.0.1   |
| [@duskmoon-dev/el-markdown](./elements/markdown) | Markdown renderer component     | 0.0.1   |

## Installation

```bash
# Install a specific element
bun add @duskmoon-dev/el-button

# Or install the core package for building custom elements
bun add @duskmoon-dev/el-core
```

## Usage

```html
<script type="module">
  import { register } from "@duskmoon-dev/el-button";
  register();
</script>

<el-dm-button variant="primary">Click me</el-dm-button>
```

## Custom Elements

### Button (`<el-dm-button>`)

```html
<el-dm-button variant="primary">Primary</el-dm-button>
<el-dm-button variant="secondary" size="lg">Large Secondary</el-dm-button>
<el-dm-button variant="outline" loading>Loading...</el-dm-button>
```

### Card (`<el-dm-card>`)

```html
<el-dm-card>
  <h3 slot="header">Card Title</h3>
  <p>Card content goes here.</p>
  <div slot="footer">
    <el-dm-button size="sm">Action</el-dm-button>
  </div>
</el-dm-card>
```

### Input (`<el-dm-input>`)

```html
<el-dm-input label="Email" type="email" placeholder="you@example.com" required></el-dm-input>
```

### Markdown (`<el-dm-markdown>`)

````html
<el-dm-markdown>
  # Hello Markdown! This is **bold** and *italic* text. ```javascript console.log('Syntax
  highlighting!');</el-dm-markdown
>
````

</el-dm-markdown>
```

## Theming

All elements use CSS custom properties for styling. Override these in your CSS:

```css
:root {
  /* Primary colors */
  --dm-primary: #8b5cf6;
  --dm-primary-hover: #7c3aed;
  --dm-primary-active: #6d28d9;

  /* Secondary colors */
  --dm-secondary: #64748b;

  /* Typography */
  --dm-font-family: "Inter", system-ui, sans-serif;

  /* Spacing */
  --dm-spacing-md: 1rem;

  /* Border radius */
  --dm-radius-md: 0.5rem;
}
```

See the [core package documentation](./packages/core/README.md) for a complete list of CSS custom properties.

## Development

### Prerequisites

- [Bun](https://bun.sh/) v1.0 or higher

### Setup

```bash
# Install dependencies
bun install

# Build all packages
bun run build

# Run tests
bun run test

# Type check
bun run typecheck
```

### Project Structure

```
duskmoon-elements/
├── elements/                    # Element packages
│   ├── button/                  # @duskmoon-dev/el-button
│   ├── card/                    # @duskmoon-dev/el-card
│   ├── input/                   # @duskmoon-dev/el-input
│   └── markdown/                # @duskmoon-dev/el-markdown
├── packages/
│   └── core/                    # @duskmoon-dev/el-core
├── playground/                  # Interactive demo
├── package.json                 # Root workspace config
├── tsconfig.json               # Root TypeScript config
└── bunfig.toml                 # Bun configuration
```

### Running the Playground

```bash
# Start the development server
bun --bun run playground/index.html
```

Or use any static file server in the project root.

### Creating a New Element

1. Create a new directory in `elements/`:

```bash
mkdir -p elements/my-element/src
```

2. Add package configuration files (see existing elements for reference)

3. Create the element class extending `BaseElement`:

```typescript
import { BaseElement, css } from "@duskmoon-dev/el-core";

const styles = css`
  :host {
    display: block;
  }
`;

export class ElDmMyElement extends BaseElement {
  static properties = {
    // Define reactive properties
  };

  constructor() {
    super();
    this.attachStyles(styles);
  }

  render() {
    return `<div>My Element</div>`;
  }
}

export function register() {
  if (!customElements.get("el-dm-my-element")) {
    customElements.define("el-dm-my-element", ElDmMyElement);
  }
}
```

## Browser Support

DuskMoon Elements use modern web standards:

- Custom Elements v1
- Shadow DOM v1
- Constructable Stylesheets
- ES2022+

Supported browsers:

- Chrome/Edge 84+
- Firefox 101+
- Safari 16.4+

## License

MIT
