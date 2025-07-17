import { CATEGORY_COLORS } from "../constants/category.js";

export function getCategoryColor(category) {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const cssVar = CATEGORY_COLORS[category];
  if (!cssVar) return "--colorchip-10";

  const match = cssVar.match(/var\((--[\w-]+)\)/);
  if (match) {
    return styles.getPropertyValue(match[1]);
  }

  return cssVar;
}
