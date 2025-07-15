export const createHTML = async (path) => {
  const response = await fetch(path);
  const template = await response.text();

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = template;
  const element = tempDiv.firstElementChild;

  return element;
};
