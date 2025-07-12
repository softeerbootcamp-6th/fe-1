export function addEventListener({ id, event, onEvent }) {
  const target = document.getElementById(id);
  target.addEventListener(event, onEvent);
}
