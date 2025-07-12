import { ElementManager } from "../../utils/ElementManager.js";

export const DropDown = (data) => {
  const dropDown = ElementManager.renderElement("ul", "drop-down");
  data.map((partData) => {
    const dropDownList = document.createElement("li");
    dropDownList.textContent = partData;
    dropDown.appendChild(dropDownList);
  });
  return dropDown;
};
