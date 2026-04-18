# cascade-kit-mcp

MCP (Model Context Protocol) server that helps AI agents build React applications following [CascadeKit](https://github.com/msanbira/cascade-kit-tools) conventions.

Works with Claude Desktop, Windsurf, Cursor, and any MCP-compatible AI client.

## Installation

```bash
npm install -g cascade-kit-mcp
```

## Configuration

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "cascadekit": {
      "command": "cascade-kit-mcp"
    }
  }
}
```

### Windsurf / Cursor

Add to your MCP config:

```json
{
  "mcpServers": {
    "cascadekit": {
      "command": "cascade-kit-mcp"
    }
  }
}
```

Restart the app after adding configuration.

## What It Provides

### Resources (Documentation)
| URI | Description |
|-----|-------------|
| `cascadekit://docs/core-principles` | 5 core CascadeKit principles |
| `cascadekit://docs/tokens` | Design tokens (spacing, colors, typography) |
| `cascadekit://docs/layout-utils` | Layout utility classes |
| `cascadekit://docs/mixin-props` | Mixin props and breakpoints |
| `cascadekit://docs/component-pattern` | TSX and CSS structure guide |

### Tools
| Tool | Description |
|------|-------------|
| `create_component` | Generate component scaffolding (TSX + CSS) |
| `list_tokens` | Query design tokens by category |
| `list_layout_utils` | Query layout utility classes |

### Prompts
| Prompt | Description |
|--------|-------------|
| `cascadekit-component` | Build a component with CascadeKit conventions |
| `cascadekit-page` | Build a page composing CascadeKit components |
| `cascadekit-setup` | Set up CascadeKit in a new project |

## Usage Examples

Once configured, just ask your AI assistant:

```
"Create a Card component with variants: default, elevated, outlined"

"Build a dashboard page with a sidebar and a grid of stat cards"

"Set up CascadeKit in my new React project"
```

The AI will automatically use CascadeKit conventions:
- Layered cascade (`@layer components { }`)
- Token-driven values (`--space-2`, `--color-primary`)
- Proper naming (`.Card--root`, `.Card--elevated`)
- Mixin support for responsive props

## Related

- [cascade-kit-tools](https://www.npmjs.com/package/cascade-kit-tools) — The CascadeKit utilities (classNames, mixin, scopedStyle, layoutUtils)
- [CascadeKit Documentation](https://github.com/msanbira/CascadeKit) — Full documentation and examples

## License

MIT
