export const ElementManager = {
  renderElement: (tagType, className) => {
    const element = document.createElement(tagType);
    if (Array.isArray(className)) {
      element.classList.add(...className);
    } else {
      element.classList.add(className);
    }
    return element;
  },
  renderElementId: (tagType, idName) => {
    const element = document.createElement(tagType);
    element.id = idName;
    return element;
  },
};
