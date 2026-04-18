/**
 * Re-export types from cascade-kit-tools for reference and future use.
 * This ensures the MCP server stays in sync with cascade-kit-tools types.
 */

export type {
  MixinProps,
  MixinBaseProps,
  MixinResult,
  ScreenBreakpoint,
  ContainerBreakpoint,
  ResponsiveMixin,
  ContainerMixin,
} from "cascade-kit-tools/mixin";

export type {
  ScopedStylesObj,
  LayerOptions,
} from "cascade-kit-tools/scopedStyle";

export type {
  LayoutUtilClass,
} from "cascade-kit-tools/layoutUtils";

// Re-export the actual classNames function signature for reference
export { classNames } from "cascade-kit-tools/classNames";

/**
 * Available mixin props - keep in sync with MixinBaseProps
 */
export const MIXIN_PROPS = [
  "m", "mt", "mr", "mb", "ml", "mx", "my",
  "p", "pt", "pr", "pb", "pl", "px", "py",
  "display", "opacity", "position",
  "inset", "top", "right", "bottom", "left",
  "flexDirection", "flexWrap", "alignItems", "justifyContent", "gap",
  "gridColTemplate", "gridRowTemplate", "gridColumn", "gridRow",
] as const;

/**
 * Available responsive breakpoints
 */
export const SCREEN_BREAKPOINTS = ["smallScreen", "mediumScreen", "bigScreen"] as const;
export const CONTAINER_BREAKPOINTS = ["smallContainer", "mediumContainer", "bigContainer"] as const;

/**
 * Available layer options
 */
export const LAYER_OPTIONS = [
  "base",
  "utils", 
  "components",
  "pages",
  "component-overrides",
  "user-overrides",
] as const;
