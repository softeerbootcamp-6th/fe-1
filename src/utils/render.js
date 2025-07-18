export function renderComponent({ id, className, innerHTML }) {
  const content = document.getElementById(id);
  if (!content) return;
  content.className = className;
  content.innerHTML = innerHTML;
}
