import { Prompt } from "@modelcontextprotocol/sdk/types.js";

export const prompts: Prompt[] = [
  {
    name: "cascadekit-component",
    description: "Instructions for building a CascadeKit component",
    arguments: [
      {
        name: "componentName",
        description: "Name of the component to create",
        required: true,
      },
      {
        name: "description",
        description: "What the component should do",
        required: false,
      },
    ],
  },
  {
    name: "cascadekit-page",
    description: "Instructions for building a CascadeKit page",
    arguments: [
      {
        name: "pageName",
        description: "Name of the page to create",
        required: true,
      },
      {
        name: "description",
        description: "What the page should contain",
        required: false,
      },
    ],
  },
  {
    name: "cascadekit-setup",
    description: "Instructions for setting up CascadeKit in a new project",
  },
];

const CASCADEKIT_RULES = `## CascadeKit Core Rules

1. **Layered Cascade**: All CSS in @layer (base, utils, components, pages, component-overrides, user-overrides)
2. **No Inline Styles**: Use classes, never inline style for layout/theming
3. **Naming**: Single \`--\` delimiter: \`.ComponentName--root\`, \`.ComponentName--variant\`
4. **Co-located CSS**: Each component imports its own CSS file
5. **Token-Driven**: All values derive from \`--base-size\`
6. **Variants Set Variables Only**: Never repeat CSS properties in variants

## Tools Available
- \`classNames('Root--root', ['Root--variant', className])\` — class composition
- \`getMixin({ p: 2, mt: 4 })\` — responsive spacing/layout props
- \`<ScopedStyle style={...} />\` — per-instance overrides (containers only)
- Layout utils: \`d-flex\`, \`col-container\`, \`gap-*\`, \`ali-*\`, \`jc-*\`

## ScopedStyle (for Container Components Only)

ScopedStyle renders a \`<style>\` tag inside the component using CSS \`@scope\` for per-instance overrides while preserving cascade control.

**When to use**: Container components (Card, Box, Modal, Panel, Section) that may need:
- Dynamic values from state/props
- Backend/CMS-driven theming
- Hover states impossible with inline styles
- Theming children via CSS variable inheritance

**Do NOT use for**: Primitives (Button, Badge, Text) — unless there is a real need for dynamic styling.

**Pattern**:
\`\`\`tsx
import { ScopedStyle, type ScopedStylesObj, type LayerOptions } from 'cascade-kit-tools/scopedStyle';

interface CardProps {
  scopedStyle?: ScopedStylesObj;  // CSS props, --variables, nested selectors
  scopedLayer?: LayerOptions;     // defaults to 'component-overrides'
}

// Inside component:
<div className="Card--root">
  <ScopedStyle style={scopedStyle} layer={scopedLayer} />
  {children}
</div>
\`\`\`

**Usage examples**:
\`\`\`tsx
// Token overrides (children inherit)
<Card scopedStyle={{ '--color-primary': '#10b981' }}>

// CSS properties
<Card scopedStyle={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>

// Nested selectors with hover
<Card scopedStyle={{ '&:hover': { transform: 'scale(1.02)' } }}>

// Dynamic values
<Card scopedStyle={{ '--progress': \`\${percent}%\` }}>
\`\`\`
`;

export function getPrompt(name: string, args: Record<string, string>) {
  switch (name) {
    case "cascadekit-component": {
      const componentName = args.componentName || "Component";
      const description = args.description || "";

      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Create a CascadeKit component called "${componentName}"${description ? `: ${description}` : ""}.

${CASCADEKIT_RULES}

## Component Structure Required

### ${componentName}.tsx
\`\`\`tsx
import { classNames } from 'cascade-kit-tools/classNames';
import { getMixin, type MixinProps } from 'cascade-kit-tools/mixin';
import './${componentName}.css';

interface ${componentName}Props {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  mixin?: MixinProps;
}

export function ${componentName}({ variant = 'primary', className = '', mixin, children }: ${componentName}Props) {
  const { className: mixinClassName, style: mixinStyle } = getMixin(mixin);
  
  return (
    <div 
      className={classNames('${componentName}--root', [\`${componentName}--\${variant}\`, mixinClassName, className])}
      style={mixinStyle}
    >
      {children}
    </div>
  );
}
\`\`\`

### ${componentName}.css
\`\`\`css
@layer components {
  .${componentName}--root {
    /* Base styles with CSS variable fallbacks */
  }
  
  .${componentName}--primary {
    /* Only set variable values */
  }
  
  .${componentName}--secondary {
    /* Only set variable values */
  }
}
\`\`\`

Now create the full implementation.`,
            },
          },
        ],
      };
    }

    case "cascadekit-page": {
      const pageName = args.pageName || "Page";
      const description = args.description || "";

      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Create a CascadeKit page called "${pageName}"${description ? `: ${description}` : ""}.

${CASCADEKIT_RULES}

## Page Structure Required

### ${pageName}Page.tsx
- Compose existing components (Section, Card, Button, Text, Box)
- Use layout utils for structure: \`d-flex\`, \`col-container\`, \`gap-*\`
- Use mixin for responsive layouts
- Import ${pageName}Page.css

### ${pageName}Page.css
- Use \`@layer pages { }\`
- Page-specific compositions only
- Override component styles via \`.${pageName}Page--root .Component--root { }\`

Now create the full implementation.`,
            },
          },
        ],
      };
    }

    case "cascadekit-setup": {
      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Set up CascadeKit in a new React project.

## Required Steps

### 1. Install
\`\`\`bash
npm install cascade-kit-tools
\`\`\`

### 2. Create src/styles/layers.css
\`\`\`css
@layer base, utils, components, pages, component-overrides, user-overrides;
\`\`\`

### 3. Create src/styles/base.css
\`\`\`css
@layer base {
  :root {
    --base-size: clamp(8px, 0.5vw, 12px);
    
    /* Spacing */
    --space-1: var(--base-size);
    --space-2: calc(var(--base-size) * 2);
    --space-3: calc(var(--base-size) * 3);
    --space-4: calc(var(--base-size) * 4);
    
    /* Colors */
    --color-bg: #ffffff;
    --color-text: #212529;
    --color-primary: #6366f1;
    --color-border: #dee2e6;
  }
}
\`\`\`

### 4. Update App.tsx imports (order matters!)
\`\`\`tsx
import './styles/layers.css';
import './styles/base.css';
import 'cascade-kit-tools/layoutUtils/styles';
import 'cascade-kit-tools/mixin/styles';
\`\`\`

### 5. Create first component following the pattern

${CASCADEKIT_RULES}`,
            },
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown prompt: ${name}`);
  }
}
