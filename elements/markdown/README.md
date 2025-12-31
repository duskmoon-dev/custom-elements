# @duskmoon-dev/el-markdown

A markdown renderer component using remark/rehype with syntax highlighting and mermaid diagram support.

## Installation

```bash
bun add @duskmoon-dev/el-markdown
```

For mermaid diagram support (optional):

```bash
bun add mermaid
```

## Usage

### Inline Content

````html
<script type="module">
  import { register } from '@duskmoon-dev/el-markdown';
  register();
</script>

<el-dm-markdown>
  # Hello World This is **markdown** content with: - Lists - Code blocks - And more! ```javascript
  console.log('Syntax highlighting!');</el-dm-markdown
>
````

</el-dm-markdown>
```

### From URL

```html
<el-dm-markdown src="/docs/readme.md"></el-dm-markdown>
```

### With Mermaid Diagrams

````html
<el-dm-markdown>
  # Flowchart Example ```mermaid graph TD A[Start] --> B{Is it?} B -->|Yes| C[OK] B -->|No|
  D[End]</el-dm-markdown
>
````

</el-dm-markdown>
```

## Features

- **GitHub Flavored Markdown**: Tables, task lists, strikethrough, autolinks
- **Syntax Highlighting**: Powered by highlight.js via rehype-highlight
- **Mermaid Diagrams**: Optional support for flowcharts, sequence diagrams, etc.
- **Multiple Themes**: GitHub, Atom One Dark, Atom One Light
- **Auto Theme**: Respects `prefers-color-scheme` media query
- **Indentation Removal**: Automatically removes common indentation from inline content

## Themes

| Theme            | Description                         |
| ---------------- | ----------------------------------- |
| `auto`           | Follows system preference (default) |
| `github`         | GitHub-style light theme            |
| `atom-one-dark`  | Atom One Dark theme                 |
| `atom-one-light` | Atom One Light theme                |

````html
<el-dm-markdown theme="atom-one-dark"> ```js const dark = true;</el-dm-markdown>
````

</el-dm-markdown>
```

## Attributes

| Attribute    | Type    | Default | Description                    |
| ------------ | ------- | ------- | ------------------------------ |
| `src`        | string  |         | URL to fetch markdown from     |
| `theme`      | string  | `auto`  | Code syntax highlighting theme |
| `debug`      | boolean | `false` | Enable debug logging           |
| `no-mermaid` | boolean | `false` | Disable mermaid rendering      |

## CSS Parts

| Part        | Description                   |
| ----------- | ----------------------------- |
| `container` | The outer container           |
| `content`   | The rendered markdown content |

## Events

| Event         | Detail              | Description                      |
| ------------- | ------------------- | -------------------------------- |
| `dm-rendered` | `{ html: string }`  | Fired after markdown is rendered |
| `dm-error`    | `{ error: string }` | Fired when an error occurs       |

## CSS Custom Properties

| Property                         | Description             |
| -------------------------------- | ----------------------- |
| `--dm-markdown-font-family`      | Font family for content |
| `--dm-markdown-code-font-family` | Font family for code    |
| `--dm-markdown-line-height`      | Line height             |

## Supported Markdown Features

- Headings (h1-h6)
- Paragraphs
- Bold, italic, strikethrough
- Links and images
- Ordered and unordered lists
- Task lists (GFM)
- Blockquotes
- Code (inline and blocks)
- Syntax highlighting
- Tables (GFM)
- Horizontal rules
- Mermaid diagrams (optional)

## Examples

### Task List

```html
<el-dm-markdown> ## Todo - [x] Complete task - [ ] Pending task - [ ] Another task </el-dm-markdown>
```

### Table

```html
<el-dm-markdown>
  | Feature | Status | |---------|--------| | Tables | Supported | | Strikethrough | ~~Yes~~ |
</el-dm-markdown>
```

### Loading Remote Content

```html
<el-dm-markdown src="https://raw.githubusercontent.com/user/repo/main/README.md"></el-dm-markdown>
```

## License

MIT
