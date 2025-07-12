export function renderComponent({ id, className, innerHTML }) {
  const content = document.getElementById(id);
  content.className = className;
  content.innerHTML = innerHTML;
}
