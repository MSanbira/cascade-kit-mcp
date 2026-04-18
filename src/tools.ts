import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const tools: Tool[] = [
  {
    name: "create_component",
    description: "Generate a new CascadeKit component with TSX and CSS files following conventions",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Component name in PascalCase (e.g., 'Button', 'Card', 'NavItem')",
        },
        variants: {
          type: "array",
          items: { type: "string" },
          description: "Variant names (e.g., ['primary', 'secondary', 'ghost'])",
        },
        sizes: {
          type: "array",
          items: { type: "string" },
          description: "Size names (e.g., ['sm', 'md', 'lg']). Optional.",
        },
        hasScopedStyle: {
          type: "boolean",
          description: "Include scopedStyle/scopedLayer props for per-instance style overrides. Use for CONTAINER components (Card, Box, Modal, Panel, Section) that may need dynamic theming. Do NOT use for primitives like Button, Badge, Text - use variants instead.",
        },
        element: {
          type: "string",
          description: "HTML element to use (default: 'div')",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "list_tokens",
    description: "List all available CascadeKit design tokens (spacing, colors, typography, etc.)",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["spacing", "typography", "colors", "radius", "shadows", "transitions", "all"],
          description: "Category of tokens to list",
        },
      },
    },
  },
  {
    name: "list_layout_utils",
    description: "List all available CascadeKit layout utility classes",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["display", "flex", "grid", "align", "justify", "gap", "all"],
          description: "Category of utilities to list",
        },
      },
    },
  },
];

function generateComponentTsx(
  name: string,
  variants: string[] = ["primary"],
  sizes: string[] | undefined,
  hasScopedStyle: boolean = false,
  element: string = "div"
): string {
  const variantType = variants.map((v) => `'${v}'`).join(" | ");
  const sizeType = sizes ? sizes.map((s) => `'${s}'`).join(" | ") : undefined;
  const defaultVariant = variants[0];
  const defaultSize = sizes ? sizes[0] : undefined;

  const imports = [
    `import { classNames } from 'cascade-kit-tools/classNames';`,
    `import { getMixin, type MixinProps } from 'cascade-kit-tools/mixin';`,
  ];
  
  if (hasScopedStyle) {
    imports.push(`import { ScopedStyle, type ScopedStylesObj, type LayerOptions } from 'cascade-kit-tools/scopedStyle';`);
  }
  imports.push(`import './${name}.css';`);

  const typeLines = [`type ${name}Variant = ${variantType};`];
  if (sizeType) {
    typeLines.push(`type ${name}Size = ${sizeType};`);
  }

  const interfaceProps = [
    `  children: React.ReactNode;`,
    `  className?: string;`,
    `  variant?: ${name}Variant;`,
  ];
  if (sizeType) {
    interfaceProps.push(`  size?: ${name}Size;`);
  }
  interfaceProps.push(`  mixin?: MixinProps;`);
  if (hasScopedStyle) {
    interfaceProps.push(`  scopedStyle?: ScopedStylesObj;`);
    interfaceProps.push(`  scopedLayer?: LayerOptions;`);
  }

  const destructureProps = [
    `    variant = '${defaultVariant}'`,
    `    className = ''`,
  ];
  if (defaultSize) {
    destructureProps.push(`    size = '${defaultSize}'`);
  }
  destructureProps.push(`    mixin`);
  if (hasScopedStyle) {
    destructureProps.push(`    scopedStyle`);
    destructureProps.push(`    scopedLayer`);
  }
  destructureProps.push(`    children`);

  const classNamesArray = [
    `\`${name}--\${variant}\``,
  ];
  if (sizes) {
    classNamesArray.push(`\`${name}--\${size}\``);
  }
  classNamesArray.push(`mixinClassName`);
  classNamesArray.push(`className`);

  const childrenContent = hasScopedStyle
    ? `      <ScopedStyle style={scopedStyle} layer={scopedLayer} />\n      {children}`
    : `      {children}`;

  return `${imports.join("\n")}

${typeLines.join("\n")}

interface ${name}Props {
${interfaceProps.join("\n")}
}

export function ${name}({
${destructureProps.join(",\n")},
}: ${name}Props) {
  const { className: mixinClassName, style: mixinStyle } = getMixin(mixin);

  return (
    <${element}
      className={classNames('${name}--root', [
        ${classNamesArray.join(",\n        ")}
      ])}
      style={mixinStyle}
    >
${childrenContent}
    </${element}>
  );
}
`;
}

function generateComponentCss(
  name: string,
  variants: string[] = ["primary"],
  sizes: string[] | undefined
): string {
  const variantCss = variants
    .map(
      (v) => `  .${name}--${v} {
    --${name.toLowerCase()}-bg: var(--color-${v === "primary" ? "primary" : v === "secondary" ? "bg-subtle" : "bg"});
    --${name.toLowerCase()}-color: var(--color-${v === "primary" ? "bg" : "text"});
  }`
    )
    .join("\n\n");

  let sizeCss = "";
  if (sizes) {
    sizeCss = `
@layer component-overrides {
${sizes
  .map((s) => {
    const padding = s === "sm" ? "1" : s === "lg" ? "4" : "2";
    return `  .${name}--${s} {
    --${name.toLowerCase()}-padding: var(--space-${padding});
  }`;
  })
  .join("\n\n")}
}`;
  }

  return `@layer components {
  .${name}--root {
    padding: var(--${name.toLowerCase()}-padding, var(--space-2));
    background: var(--${name.toLowerCase()}-bg, var(--color-surface));
    color: var(--${name.toLowerCase()}-color, var(--color-text));
    border-radius: var(--radius-md);
  }

${variantCss}
}
${sizeCss}
`;
}

const TOKENS_BY_CATEGORY: Record<string, string[]> = {
  spacing: [
    "--space-0_5 (4px)", "--space-1 (8px)", "--space-1_5 (12px)", "--space-2 (16px)",
    "--space-2_5 (20px)", "--space-3 (24px)", "--space-4 (32px)", "--space-5 (40px)",
    "--space-6 (48px)", "--space-8 (64px)", "--space-10 (80px)",
  ],
  typography: [
    "--text-1_5 (12px)", "--text-1_75 (14px)", "--text-2 (16px)", "--text-2_25 (18px)",
    "--text-2_5 (20px)", "--text-3 (24px)", "--text-3_75 (30px)", "--text-4_5 (36px)",
    "--font-sans", "--font-mono",
    "--font-weight-light (300)", "--font-weight-medium (500)", "--font-weight-bold (700)",
  ],
  colors: [
    "--color-bg", "--color-bg-subtle", "--color-bg-muted", "--color-surface",
    "--color-border", "--color-border-subtle",
    "--color-text", "--color-text-muted", "--color-text-subtle",
    "--color-primary", "--color-primary-hover", "--color-primary-subtle",
    "--color-accent", "--color-success", "--color-warning", "--color-error",
  ],
  radius: ["--radius-sm (4px)", "--radius-md (8px)", "--radius-lg (12px)", "--radius-xl (16px)", "--radius-full"],
  shadows: ["--shadow-sm", "--shadow-md", "--shadow-lg"],
  transitions: ["--transition-fast (150ms)", "--transition-base (200ms)", "--transition-slow (300ms)"],
};

const LAYOUT_UTILS_BY_CATEGORY: Record<string, string[]> = {
  display: ["d-flex", "d-grid", "col-container"],
  flex: ["dir-col", "f-wrap", "min-0"],
  grid: ["col-num-2", "col-num-3", "col-num-4", "col-num-auto", "with-divider"],
  align: ["ali-start", "ali-center", "ali-end", "ali-baseline", "ali-stretch"],
  justify: ["jc-start", "jc-center", "jc-end", "jc-sb", "jc-se"],
  gap: ["gap-0_25", "gap-0_5", "gap-1", "gap-1_5", "gap-2", "gap-2_5", "gap-3", "gap-4", "gap-5", "gap-6", "gap-8", "gap-10", "no-gap"],
};

export function handleToolCall(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "create_component": {
      const componentName = args.name as string;
      const variants = (args.variants as string[]) || ["primary"];
      const sizes = args.sizes as string[] | undefined;
      const hasScopedStyle = (args.hasScopedStyle as boolean) || false;
      const element = (args.element as string) || "div";

      const tsx = generateComponentTsx(componentName, variants, sizes, hasScopedStyle, element);
      const css = generateComponentCss(componentName, variants, sizes);

      return {
        content: [
          {
            type: "text",
            text: `# Generated CascadeKit Component: ${componentName}

## ${componentName}.tsx
\`\`\`tsx
${tsx}
\`\`\`

## ${componentName}.css
\`\`\`css
${css}
\`\`\`

## File Structure
\`\`\`
src/components/${componentName}/
  ${componentName}.tsx
  ${componentName}.css
  index.ts  ← export { ${componentName} } from './${componentName}';
\`\`\`
`,
          },
        ],
      };
    }

    case "list_tokens": {
      const category = (args.category as string) || "all";
      let tokens: string[];
      
      if (category === "all") {
        tokens = Object.entries(TOKENS_BY_CATEGORY)
          .map(([cat, toks]) => `## ${cat}\n${toks.join("\n")}`)
          .flat();
      } else {
        tokens = TOKENS_BY_CATEGORY[category] || [];
      }

      return {
        content: [
          {
            type: "text",
            text: `# CascadeKit Design Tokens${category !== "all" ? ` (${category})` : ""}\n\n${tokens.join("\n")}`,
          },
        ],
      };
    }

    case "list_layout_utils": {
      const category = (args.category as string) || "all";
      let utils: string[];
      
      if (category === "all") {
        utils = Object.entries(LAYOUT_UTILS_BY_CATEGORY)
          .map(([cat, cls]) => `## ${cat}\n${cls.join(", ")}`)
          .flat();
      } else {
        utils = LAYOUT_UTILS_BY_CATEGORY[category] || [];
      }

      return {
        content: [
          {
            type: "text",
            text: `# CascadeKit Layout Utilities${category !== "all" ? ` (${category})` : ""}\n\n${utils.join("\n")}`,
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
