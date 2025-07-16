/**
 * CategoryTag 컴포넌트
 *
 * // 기본 사용법
 * const tag = CategoryTag({
 *   label: '생활',
 * });
 *
 * document.body.appendChild(tag);
 */
const CategoryTag = ({ label = null } = {}) => {
  const categoryTag = document.createElement("div");
  categoryTag.className = `category-tag font-light-12 category-tag--${label}`;
  categoryTag.textContent = label;

  return categoryTag;
};

export default CategoryTag;
