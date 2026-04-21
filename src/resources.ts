import { Resource } from "@modelcontextprotocol/sdk/types.js";

export const resources: Resource[] = [
  {
    uri: "cascadekit://docs/core-principles",
    name: "CascadeKit Core Principles",
    description: "The 5 core principles of CascadeKit: Layered Cascade, No Inline Styles, Naming Convention, Co-located CSS, Token-Driven Values",
    mimeType: "text/markdown",
  },
  {
    uri: "cascadekit://docs/tokens",
    name: "Design Tokens",
    description: "All available CSS custom properties: spacing, typography, colors, borders, shadows, transitions",
    mimeType: "text/markdown",
  },
  {
    uri: "cascadekit://docs/layout-utils",
    name: "Layout Utility Classes",
    description: "Available CSS utility classes: d-flex, col-container, gap-*, ali-*, jc-*",
    mimeType: "text/markdown",
  },
  {
    uri: "cascadekit://docs/mixin-props",
    name: "Mixin Props Reference",
    description: "All available mixin props and responsive breakpoints",
    mimeType: "text/markdown",
  },
  {
    uri: "cascadekit://docs/component-pattern",
    name: "Component Pattern",
    description: "How to structure CascadeKit components: TSX and CSS patterns",
    mimeType: "text/markdown",
  },
  {
    uri: "cascadekit://docs/scoped-style",
    name: "ScopedStyle Deep Dive",
    description: "Per-instance style overrides using CSS @scope - when to use, how it works, patterns and examples",
    mimeType: "text/markdown",
  },
  {
    uri: "cascadekit://docs/consumer-patterns",
    name: "Consumer & Composition Patterns",
    description: "CRITICAL: How to USE CascadeKit tools when composing components into features and pages. Covers when to use layout utils vs CSS, mixin as a consumer, and scopedStyle for dynamic states.",
    mimeType: "text/markdown",
  },
];

const CORE_PRINCIPLES = `# CascadeKit Core Principles

## 1. Layered Cascade
All styles in explicit layers:
\`\`\`css
@layer base, utils, components, pages, component-overrides, user-overrides;
\`\`\`

**Layer order:**
- **base** — Design tokens, resets, root variables
- **utils** — Reusable layout utilities (d-flex, col-container, gap-*)
- **components** — Component base styles + variants
- **pages** — Page-specific compositions
- **component-overrides** — Modifiers, sizes, states, mixins
- **user-overrides** — Consumer customizations (always wins)

## 2. No Inline Styles, No Unnecessary CSS
Styles via classes, never inline \`style\` for layout/theming. Inline breaks cascade control.
CSS variables in \`style\` are OK—they're inputs to class rules, not rules themselves.

**Equally important:** Don't write CSS for things CascadeKit tools already handle:
- **Layout (flex/grid)** → Use layout util classes (\`d-flex\`, \`col-container\`, \`gap-*\`, \`ali-*\`, \`jc-*\`)
- **Spacing between composed elements** → Use \`mixin={{ mt: 2 }}\` or \`gap-*\` on parent
- **Dynamic per-instance styles** → Use \`scopedStyle\` on container components
- **Responsive changes** → Use \`mixin={{ smallScreen: { ... } }}\`

If a utility or tool can do it, never write CSS for it.

## 3. Naming Convention
Single \`--\` delimiter: \`.ComponentName--root\`, \`.ComponentName--variant\`, \`.ComponentName--element\`

## 4. Co-located Component CSS
\`\`\`
/Button
  Button.tsx  ← imports Button.css
  Button.css  ← @layer components { }
  index.ts
\`\`\`

## 5. Token-Driven Values
All values derive from \`--base-size\`:
\`\`\`css
--base-size: clamp(8px, .5vw, 12px);
--space-2: calc(var(--base-size) * 2);
\`\`\`
`;

const TOKENS = `# CascadeKit Design Tokens

All values derive from \`--base-size: clamp(8px, 0.5vw, 12px)\`

## Spacing Scale
- \`--space-0_5\`: calc(var(--base-size) * 0.5)  — 4px
- \`--space-1\`: var(--base-size)                — 8px
- \`--space-1_5\`: calc(var(--base-size) * 1.5)  — 12px
- \`--space-2\`: calc(var(--base-size) * 2)      — 16px
- \`--space-2_5\`: calc(var(--base-size) * 2.5)  — 20px
- \`--space-3\`: calc(var(--base-size) * 3)      — 24px
- \`--space-4\`: calc(var(--base-size) * 4)      — 32px
- \`--space-5\`: calc(var(--base-size) * 5)      — 40px
- \`--space-6\`: calc(var(--base-size) * 6)      — 48px
- \`--space-8\`: calc(var(--base-size) * 8)      — 64px
- \`--space-10\`: calc(var(--base-size) * 10)    — 80px

## Typography Scale
- \`--text-1_5\`: calc(var(--base-size) * 1.5)   — 12px
- \`--text-1_75\`: calc(var(--base-size) * 1.75) — 14px
- \`--text-2\`: calc(var(--base-size) * 2)       — 16px
- \`--text-2_25\`: calc(var(--base-size) * 2.25) — 18px
- \`--text-2_5\`: calc(var(--base-size) * 2.5)   — 20px
- \`--text-3\`: calc(var(--base-size) * 3)       — 24px
- \`--text-3_75\`: calc(var(--base-size) * 3.75) — 30px
- \`--text-4_5\`: calc(var(--base-size) * 4.5)   — 36px

## Border Radius
- \`--radius-sm\`: calc(var(--base-size) * 0.5)  — 4px
- \`--radius-md\`: var(--base-size)              — 8px
- \`--radius-lg\`: calc(var(--base-size) * 1.5)  — 12px
- \`--radius-xl\`: calc(var(--base-size) * 2)    — 16px
- \`--radius-full\`: 100vmax

## Colors (Light Mode)
- \`--color-bg\`: #ffffff
- \`--color-bg-subtle\`: #f8f9fa
- \`--color-bg-muted\`: #e9ecef
- \`--color-surface\`: #ffffff
- \`--color-border\`: #dee2e6
- \`--color-border-subtle\`: #e9ecef
- \`--color-text\`: #212529
- \`--color-text-muted\`: #6c757d
- \`--color-text-subtle\`: #adb5bd
- \`--color-primary\`: #6366f1
- \`--color-primary-hover\`: #4f46e5
- \`--color-primary-subtle\`: #eef2ff
- \`--color-accent\`: #06b6d4
- \`--color-success\`: #10b981
- \`--color-warning\`: #f59e0b
- \`--color-error\`: #ef4444

## Transitions
- \`--transition-fast\`: 150ms ease
- \`--transition-base\`: 200ms ease
- \`--transition-slow\`: 300ms ease

## Shadows
- \`--shadow-sm\`: subtle elevation
- \`--shadow-md\`: medium elevation
- \`--shadow-lg\`: large elevation

## Font Stacks
- \`--font-sans\`: system-ui, -apple-system, BlinkMacSystemFont, sans-serif
- \`--font-mono\`: 'SF Mono', 'Fira Code', Consolas, monospace
`;

const LAYOUT_UTILS = `# CascadeKit Layout Utility Classes

Uses \`:where()\` for low specificity. Import via:
\`\`\`tsx
import 'cascade-kit-tools/layoutUtils/styles';
\`\`\`

## Display
- \`d-flex\` — display: flex
- \`d-grid\` — display: grid
- \`col-container\` — display: grid with column template

## Flex Modifiers
- \`dir-col\` — flex-direction: column
- \`f-wrap\` — flex-wrap: wrap
- \`min-0\` — min-width: 0

## Column Grid
- \`col-num-2\` — 2 equal columns
- \`col-num-3\` — 3 equal columns
- \`col-num-4\` — 4 equal columns
- \`col-num-auto\` — auto-fill columns (use with \`--auto-col-min-width\`)
- \`with-divider\` — adds vertical dividers between columns

## Align Items
- \`ali-start\` — align-items: flex-start
- \`ali-center\` — align-items: center
- \`ali-end\` — align-items: flex-end
- \`ali-baseline\` — align-items: baseline
- \`ali-stretch\` — align-items: stretch

## Justify Content
- \`jc-start\` — justify-content: flex-start
- \`jc-center\` — justify-content: center
- \`jc-end\` — justify-content: flex-end
- \`jc-sb\` — justify-content: space-between
- \`jc-se\` — justify-content: space-evenly

## Gap
- \`gap-0_25\`, \`gap-0_5\`, \`gap-1\`, \`gap-1_5\`, \`gap-2\`, \`gap-2_5\`
- \`gap-3\`, \`gap-4\`, \`gap-5\`, \`gap-6\`, \`gap-7\`, \`gap-8\`, \`gap-10\`
- \`no-gap\` — gap: 0

## Usage Examples
\`\`\`tsx
<div className="d-flex dir-col gap-2 ali-center">
<div className="col-container col-num-3 gap-4">
<div className="d-flex jc-sb ali-center gap-2">
\`\`\`
`;

const MIXIN_PROPS = `# CascadeKit Mixin Props

Import via:
\`\`\`tsx
import { getMixin, type MixinProps } from 'cascade-kit-tools/mixin';
import 'cascade-kit-tools/mixin/styles';
\`\`\`

## Spacing Props
Numbers are multiplied by \`--base-size\`. Strings are used as-is.

**Margin:** \`m\`, \`mt\`, \`mr\`, \`mb\`, \`ml\`, \`mx\`, \`my\`
**Padding:** \`p\`, \`pt\`, \`pr\`, \`pb\`, \`pl\`, \`px\`, \`py\`

## Layout Props
- \`display\`: 'flex' | 'grid' | 'block' | 'inline' | etc.
- \`opacity\`: number (0-1)
- \`position\`: 'relative' | 'absolute' | 'fixed' | 'sticky'
- \`inset\`, \`top\`, \`right\`, \`bottom\`, \`left\`: spacing values

## Flex/Grid Props
- \`flexDirection\`: 'row' | 'column' | 'row-reverse' | 'column-reverse'
- \`flexWrap\`: 'wrap' | 'nowrap' | 'wrap-reverse'
- \`alignItems\`: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
- \`justifyContent\`: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-evenly'
- \`gap\`: spacing value
- \`gridColTemplate\`: string (e.g., '1fr 1fr 1fr')
- \`gridRowTemplate\`: string
- \`gridColumn\`: string (e.g., 'span 2')
- \`gridRow\`: string

## Responsive Breakpoints
- \`smallScreen\`: < 768px
- \`mediumScreen\`: 768px - 1024px
- \`bigScreen\`: > 1024px
- \`smallContainer\`: < 400px (container query)
- \`mediumContainer\`: 400px - 800px
- \`bigContainer\`: > 800px

## Usage Examples
\`\`\`tsx
const { className, style } = getMixin({ p: 2, mt: 4 });

// Responsive
const { className, style } = getMixin({ 
  p: 2,
  smallScreen: { p: 1, flexDirection: 'column' },
  bigScreen: { p: 4, flexDirection: 'row' }
});

<div className={className} style={style}>
\`\`\`
`;

const COMPONENT_PATTERN = `# CascadeKit Component Pattern

## TSX Structure
\`\`\`tsx
import { classNames } from 'cascade-kit-tools/classNames';
import { getMixin, type MixinProps } from 'cascade-kit-tools/mixin';
import './ComponentName.css';

type ComponentVariant = 'primary' | 'secondary';
type ComponentSize = 'sm' | 'md' | 'lg';

interface ComponentProps {
  variant?: ComponentVariant;
  size?: ComponentSize;
  children: React.ReactNode;
  className?: string;
  mixin?: MixinProps;
}

export function ComponentName({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  mixin,
  children,
  ...props 
}: ComponentProps) {
  const { className: mixinClassName, style: mixinStyle } = getMixin(mixin);
  
  return (
    <div 
      className={classNames('ComponentName--root', [
        \`ComponentName--\${variant}\`,
        \`ComponentName--\${size}\`,
        mixinClassName,
        className
      ])}
      style={mixinStyle}
      {...props}
    >
      {children}
    </div>
  );
}
\`\`\`

## CSS Structure
\`\`\`css
@layer components {
  .ComponentName--root {
    /* Base styles using CSS variables with fallbacks */
    padding: var(--component-padding, var(--space-2));
    background: var(--component-bg, var(--color-surface));
    color: var(--component-color, var(--color-text));
    border: 1px solid var(--component-border, var(--color-border));
  }
  
  /* Variants ONLY set variable values */
  .ComponentName--primary {
    --component-bg: var(--color-primary);
    --component-color: white;
  }
  
  .ComponentName--secondary {
    --component-bg: var(--color-bg-subtle);
    --component-border: var(--color-border);
  }
}

@layer component-overrides {
  /* Sizes and states in higher layer */
  .ComponentName--sm {
    --component-padding: var(--space-1);
  }
  
  .ComponentName--lg {
    --component-padding: var(--space-4);
  }
}
\`\`\`

## Key Rules
1. Base styles use CSS variables with fallbacks
2. Variants ONLY set variable values, never repeat properties
3. Sizes/states go in \`component-overrides\` layer
4. Always include \`mixin\` prop support
5. Use \`classNames\` helper for class composition

## Using Components (Consumer Side)

When you USE these components, apply CascadeKit tools for layout and spacing:

\\\`\\\`\\\`tsx
// Layout with utils, spacing with mixin, dynamic state with scopedStyle
<div className="d-flex dir-col gap-3">
  <Card mixin={{ p: 3 }} scopedStyle={isHighlighted ? {
    '--color-border': 'var(--color-primary)',
  } : undefined}>
    <div className="d-flex ali-center jc-sb gap-2">
      <Text variant="h4">{title}</Text>
      <Badge variant="success">Active</Badge>
    </div>
  </Card>
</div>
\\\`\\\`\\\`

**Never write CSS for:** flex/grid layout (use utils), spacing between elements (use gap or mixin), dynamic per-instance styles (use scopedStyle).
`;

const SCOPED_STYLE = `# ScopedStyle — Per-Instance Style Overrides

## The Problem with Inline Styles

Inline \`style\` attributes bypass the CSS cascade entirely:
\`\`\`tsx
// ❌ BAD: Can't be overridden by CSS, breaks cascade control
<div style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
\`\`\`

This is problematic because:
1. \`user-overrides\` layer can't override inline styles
2. No hover/focus/media query support
3. Breaks the layered cascade principle

## The Solution: ScopedStyle

\`ScopedStyle\` renders an actual \`<style>\` tag inside the component that:
- Uses \`@layer\` to participate in the cascade
- Uses \`@scope\` to scope styles to just this instance
- Uses \`:scope\` to target the parent element

\`\`\`tsx
import { ScopedStyle } from 'cascade-kit-tools/scopedStyle';

<Card scopedStyle={{ '--color-primary': '#10b981' }}>
\`\`\`

## What It Renders

\`\`\`html
<div class="Card--root">
  <style>
    @layer component-overrides {
      @scope {
        :scope {
          --color-primary: #10b981;
        }
      }
    }
  </style>
  <!-- children -->
</div>
\`\`\`

The \`<style>\` tag is INSIDE the component. \`@scope\` without a selector scopes to its DOM position, so \`:scope\` refers to the parent element (Card--root).

## The ScopedStylesObj Type

\`\`\`typescript
type ScopedStylesObj = CSSProperties & CSSVars & {
  [selector: string]: ScopedStylesObj;
};
\`\`\`

This recursive type allows three kinds of values:

### 1. CSS Properties (camelCase)
\`\`\`tsx
<Card scopedStyle={{
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  transform: 'translateY(-2px)',
  borderRadius: 'var(--radius-lg)',
}}>
\`\`\`

### 2. CSS Custom Properties (--variables)
\`\`\`tsx
<Card scopedStyle={{
  '--color-primary': '#10b981',
  '--color-border': '#10b981',
  '--card-padding': 'var(--space-4)',
}}>
\`\`\`

### 3. Nested Selectors (scoped to this instance)
\`\`\`tsx
<Card scopedStyle={{
  '.Card--title': { 
    color: '#000', 
    fontWeight: 700 
  },
  '.Card--content': { 
    fontSize: 'var(--text-1_75)' 
  },
  '&:hover': {
    transform: 'scale(1.02)',
  },
}}>
\`\`\`

## Layer Control

The \`layer\` prop controls where styles land in the cascade:

\`\`\`tsx
<Card 
  scopedStyle={{ '--color-primary': '#f59e0b' }} 
  scopedLayer="user-overrides"  // Highest priority
>
\`\`\`

Available layers (in priority order):
1. \`base\` — lowest
2. \`utils\`
3. \`components\`
4. \`pages\`
5. \`component-overrides\` — default
6. \`user-overrides\` — highest

## When to Use ScopedStyle

### ✅ USE for:
- **Dynamic values from state/props**
  \`\`\`tsx
  <Card scopedStyle={{ '--progress': \`\${percent}%\` }}>
  \`\`\`

- **Backend/CMS-driven theming**
  \`\`\`tsx
  <Card scopedStyle={{ '--color-primary': brand.primaryColor }}>
  \`\`\`

- **Per-instance overrides that need cascade control**
  \`\`\`tsx
  <Card scopedStyle={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
  \`\`\`

- **Hover/focus states impossible with inline styles**
  \`\`\`tsx
  <Card scopedStyle={{ '&:hover': { transform: 'scale(1.02)' } }}>
  \`\`\`

- **Theming children via CSS variable inheritance**
  \`\`\`tsx
  <Card scopedStyle={{ '--color-primary': '#10b981' }}>
    <Button variant="primary">Inherits green</Button>
  </Card>
  \`\`\`

### ❌ DO NOT USE for:
- **Static styles** → Use CSS classes
- **Simple components** (Button, Badge) → Use variants
- **Layout** → Use mixin props or layoutUtils

## Which Components Should Support ScopedStyle

**Add scopedStyle/scopedLayer props to:**
- Container components: Card, Box, Modal, Panel, Section
- Themeable wrappers that might receive dynamic styles

**DO NOT add to primitives:**
- Button, Badge, Text, Icon → Use variants instead

## Component Implementation Pattern

\`\`\`tsx
import { ScopedStyle, type ScopedStylesObj, type LayerOptions } from 'cascade-kit-tools/scopedStyle';

interface CardProps {
  children: React.ReactNode;
  mixin?: MixinProps;
  scopedStyle?: ScopedStylesObj;
  scopedLayer?: LayerOptions;
}

export function Card({ children, mixin, scopedStyle, scopedLayer }: CardProps) {
  const { className: mixinClassName, style: mixinStyle } = getMixin(mixin);
  
  return (
    <div className={classNames('Card--root', [mixinClassName])} style={mixinStyle}>
      <ScopedStyle style={scopedStyle} layer={scopedLayer} />
      {children}
    </div>
  );
}
\`\`\`

**Key points:**
1. \`ScopedStyle\` is placed as the first child
2. It renders a \`<style>\` tag that scopes to the parent
3. \`scopedLayer\` defaults to \`'component-overrides'\`

## Real-World Examples

### Status Card with Dynamic Color
\`\`\`tsx
const statusColors = {
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

<Card scopedStyle={{
  '--color-primary': statusColors[status],
  '--color-border': statusColors[status],
}}>
  <Badge variant="primary">{status}</Badge>
  <Text>{message}</Text>
</Card>
\`\`\`

### Progress Card with CSS Variable
\`\`\`tsx
<Card scopedStyle={{ '--progress': \`\${progress}%\` }}>
  <div className="ProgressBar--fill" /> {/* Uses var(--progress) in CSS */}
</Card>
\`\`\`

### Interactive Card with Hover Effect
\`\`\`tsx
<Card scopedStyle={{
  transition: 'transform var(--transition-base), box-shadow var(--transition-base)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 'var(--shadow-lg)',
  },
}}>
\`\`\`

### Conditional Loading State
\`\`\`tsx
<Card scopedStyle={{
  opacity: isLoading ? 0.6 : 1,
  pointerEvents: isLoading ? 'none' : 'auto',
}}>
\`\`\`

## How parseStyles Works

The \`parseStyles\` function converts the object to CSS:

\`\`\`typescript
parseStyles({
  '--color-primary': '#10b981',
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  '.Card--title': { color: '#000' },
})
// Returns:
// "--color-primary: #10b981; box-shadow: 0 4px 20px rgba(0,0,0,0.3); .Card--title { color: #000; }"
\`\`\`

- CSS properties are converted to kebab-case
- CSS variables (--*) are kept as-is
- Nested objects become nested selectors

## ScopedStyle vs Inline Style vs CSS Classes

| Approach | Cascade Control | Hover/Media | Dynamic Values | Use When |
|----------|-----------------|-------------|----------------|----------|
| CSS Classes | ✅ Full | ✅ Yes | ❌ No | Static styles |
| ScopedStyle | ✅ Full | ✅ Yes | ✅ Yes | Dynamic per-instance |
| Inline style | ❌ None | ❌ No | ✅ Yes | Never (breaks cascade) |
| Mixin | ✅ Full | ❌ No | ✅ Yes | Spacing/layout only |

## Summary

ScopedStyle solves the "I need dynamic styles but inline breaks the cascade" problem by:
1. Rendering a real \`<style>\` tag (not inline)
2. Using \`@scope\` to limit styles to this instance
3. Using \`@layer\` to participate in the cascade
4. Supporting nested selectors and pseudo-classes
`;

const CONSUMER_PATTERNS = `# Consumer & Composition Patterns

## The Common Mistake

AI agents (and developers) often apply CascadeKit conventions correctly when BUILDING components but revert to raw CSS when COMPOSING them into features and pages.

\`\`\`tsx
// ❌ WRONG: Writing CSS for layout in a feature
// FeatureCard.css
.FeatureCard--header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

// ✅ CORRECT: Use layout utils + mixin
<div className="d-flex ali-center jc-sb gap-2">
  <Text variant="h3">{title}</Text>
  <Button variant="ghost">Edit</Button>
</div>
\`\`\`

The rule is simple: **If a layout utility or mixin can do it, never write CSS for it.**

---

## Rule 1: Layout Utils Replace CSS Flex/Grid

Every time you reach for \`display: flex\`, \`align-items\`, \`gap\`, etc. in CSS — STOP. Use layout util classes instead.

### Before (wrong)
\`\`\`css
@layer pages {
  .Dashboard--header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .Dashboard--grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .Dashboard--sidebar {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
\`\`\`

### After (correct)
\`\`\`tsx
<div className="d-flex ali-center jc-sb gap-2">
  {/* header content */}
</div>

<div className="col-container col-num-3 gap-3">
  {/* grid items */}
</div>

<aside className="d-flex dir-col gap-1">
  {/* sidebar content */}
</aside>
\`\`\`

**Zero CSS needed for layout.** The layout utils handle flex, grid, alignment, and gap.

### Decision: Layout Utils vs CSS

| Need | Use | NOT |
|------|-----|-----|
| flex row | \`className="d-flex"\` | \`display: flex\` in CSS |
| flex column | \`className="d-flex dir-col"\` | \`flex-direction: column\` in CSS |
| center items | \`className="ali-center"\` | \`align-items: center\` in CSS |
| space between | \`className="jc-sb"\` | \`justify-content: space-between\` in CSS |
| gap | \`className="gap-2"\` | \`gap: 16px\` in CSS |
| grid columns | \`className="col-container col-num-3"\` | \`grid-template-columns\` in CSS |
| wrap | \`className="f-wrap"\` | \`flex-wrap: wrap\` in CSS |

**When CSS IS appropriate for layout:**
- Complex grid layouts that utils can't express (e.g., \`grid-template-areas\`)
- Component-internal layout that's part of the component's identity (e.g., a Sidebar component's own width)

---

## Rule 2: Mixin Props for Spacing Between Composed Elements

When you compose components together, spacing between them belongs on the \`mixin\` prop — NOT in CSS.

### Before (wrong)
\`\`\`css
@layer pages {
  .Dashboard--root .Card--root {
    margin-bottom: 24px;
  }
  .Dashboard--root .Card--root:last-child {
    margin-bottom: 0;
  }
}
\`\`\`

### After (correct)
\`\`\`tsx
<Card mixin={{ mb: 3 }}>
  {/* card content */}
</Card>
\`\`\`

Or better, use gap on the parent:
\`\`\`tsx
<div className="d-flex dir-col gap-3">
  <Card>{/* card 1 */}</Card>
  <Card>{/* card 2 */}</Card>
  <Card>{/* card 3 */}</Card>
</div>
\`\`\`

### When to Use Mixin vs Gap

| Scenario | Use |
|----------|-----|
| Equal spacing between siblings | \`gap-*\` on parent |
| One-off margin/padding on specific element | \`mixin={{ mt: 2 }}\` on that element |
| Responsive spacing | \`mixin={{ p: 2, smallScreen: { p: 1 } }}\` |
| Internal component padding | CSS in the component itself |

### Mixin for Responsive Layouts
\`\`\`tsx
<Card mixin={{
  p: 3,
  smallScreen: { p: 1_5 },
  bigScreen: { p: 4 }
}}>
  {/* Padding adapts to screen size */}
</Card>

<div 
  className="d-flex gap-3"
  {...getMixin({
    flexDirection: 'row',
    smallScreen: { flexDirection: 'column' }
  })}
>
  {/* Row on desktop, column on mobile */}
</div>
\`\`\`

---

## Rule 3: ScopedStyle for Dynamic Per-Instance States

When a composed component instance has dynamic visual state — use \`scopedStyle\`, not a CSS class.

### Before (wrong)
\`\`\`css
/* Writing a CSS class for each visual state */
@layer components {
  .EntryCard--pinned {
    border-left: 3px solid var(--color-primary);
  }
  .EntryCard--urgent {
    border-left: 3px solid var(--color-error);
  }
  .EntryCard--hoverable:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
}
\`\`\`

### After (correct)
\`\`\`tsx
// Dynamic per-instance — scopedStyle
<Card scopedStyle={entry.isPinned ? {
  borderLeft: '3px solid var(--color-primary)',
  '--color-border': 'var(--color-primary)',
} : undefined}>

// Dynamic color from data — scopedStyle
<Card scopedStyle={{
  '--color-primary': getCategoryColor(entry.category),
}}>

// Per-instance hover — scopedStyle
<Card scopedStyle={isInteractive ? {
  transition: 'transform var(--transition-base), box-shadow var(--transition-base)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: 'var(--shadow-lg)',
  },
} : undefined}>
\`\`\`

### Decision: ScopedStyle vs CSS Class vs Variant

| Situation | Use |
|-----------|-----|
| Visual state known at build time, finite set | **Variant** (\`variant="primary"\`) |
| Visual state from data/props, per-instance | **ScopedStyle** |
| Hover/focus effect specific to one instance | **ScopedStyle** |
| Hover/focus effect for ALL instances of a component | **CSS class** in component |
| Color from backend/CMS | **ScopedStyle** |
| Static layout structure | **CSS class** |

---

## Rule 4: Page CSS Should Be Minimal

If you're writing a page and the CSS file is longer than ~20 lines, you're probably doing something wrong.

### What Page CSS SHOULD contain:
- Page-specific compositions that can't be expressed with utils
- Unique layout structures (e.g., sidebar + main with specific widths)
- Page-level animation/transition definitions

### What Page CSS should NOT contain:
- \`display: flex\` → use layout utils
- \`gap: ...\` → use layout utils
- \`margin/padding\` → use mixin props
- \`border-left: 3px solid ...\` based on state → use scopedStyle
- Color overrides per instance → use scopedStyle

### Example: Correct Page
\`\`\`tsx
// DashboardPage.tsx — almost no CSS needed!
import './DashboardPage.css';

export function DashboardPage({ entries, stats }) {
  return (
    <div className="d-flex gap-4">
      <main className="d-flex dir-col gap-3" style={{ flex: 1 }}>
        <div className="d-flex ali-center jc-sb gap-2">
          <Text variant="h2">Dashboard</Text>
          <Button variant="primary">New Entry</Button>
        </div>

        <div className="col-container col-num-3 gap-3">
          {stats.map(stat => (
            <Card key={stat.id} mixin={{ p: 2 }} scopedStyle={{
              '--color-primary': stat.color,
            }}>
              <Text variant="h4">{stat.value}</Text>
              <Text variant="body-sm">{stat.label}</Text>
            </Card>
          ))}
        </div>

        <div className="d-flex dir-col gap-2">
          {entries.map(entry => (
            <Card key={entry.id}
              mixin={{ p: 2 }}
              scopedStyle={entry.pinned ? {
                borderLeft: '3px solid var(--color-primary)',
                '&:hover': { transform: 'translateY(-1px)' },
              } : {
                '&:hover': { transform: 'translateY(-1px)' },
              }}
            >
              <div className="d-flex ali-center jc-sb gap-2">
                <Text>{entry.title}</Text>
                <Badge variant={entry.status}>{entry.status}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <aside className="DashboardPage--sidebar d-flex dir-col gap-2">
        {/* sidebar content */}
      </aside>
    </div>
  );
}
\`\`\`

\`\`\`css
/* DashboardPage.css — minimal! Only what utils can't do */
@layer pages {
  .DashboardPage--sidebar {
    width: 280px;
    flex-shrink: 0;
  }
}
\`\`\`

---

## Quick Reference: "Should I write CSS for this?"

1. **Is it flex/grid layout?** → Use layout utils (\`d-flex\`, \`col-container\`, etc.)
2. **Is it spacing between elements?** → Use \`gap-*\` on parent or \`mixin={{ mt: 2 }}\`
3. **Is it a dynamic visual state?** → Use \`scopedStyle\`
4. **Is it a responsive change?** → Use \`mixin={{ smallScreen: { ... } }}\`
5. **Is it component-internal structure?** → Write CSS in the component
6. **Is it a unique page layout element (sidebar width, etc.)?** → Write CSS in \`@layer pages\`
7. **Everything else?** → Probably a variant or token
`;

const resourceContents: Record<string, string> = {
  "cascadekit://docs/core-principles": CORE_PRINCIPLES,
  "cascadekit://docs/tokens": TOKENS,
  "cascadekit://docs/layout-utils": LAYOUT_UTILS,
  "cascadekit://docs/mixin-props": MIXIN_PROPS,
  "cascadekit://docs/component-pattern": COMPONENT_PATTERN,
  "cascadekit://docs/scoped-style": SCOPED_STYLE,
  "cascadekit://docs/consumer-patterns": CONSUMER_PATTERNS,
};

export function readResource(uri: string) {
  const content = resourceContents[uri];
  if (!content) {
    throw new Error(`Resource not found: ${uri}`);
  }
  return {
    contents: [
      {
        uri,
        mimeType: "text/markdown",
        text: content,
      },
    ],
  };
}
