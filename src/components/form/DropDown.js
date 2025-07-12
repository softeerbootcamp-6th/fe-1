import { ElementManager } from "../../utils/ElementManager.js";

export const DropDown = (type, data) => {
  const dropDown = ElementManager.renderElement("ul", "drop-down");
  data.map((partData) => {
    const dropDownList = document.createElement("li");
    const drpDownListText = document.createElement("span");
    drpDownListText.textContent = partData;
    dropDownList.appendChild(drpDownListText);
    if (type === "payment") {
      const xImg = document.createElement("img");
      xImg.src = "./src/assets/closed.svg";
      xImg.alt = "closed icon";
      dropDownList.appendChild(xImg);
    }
    dropDown.appendChild(dropDownList);
  });
  return dropDown;
};
