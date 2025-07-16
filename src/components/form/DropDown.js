import { ElementManager } from "../../utils/ElementManager.js";

export const DropDown = ({ type, data }) => {
  const dropDown = ElementManager.renderElement("ul", "drop-down");
  data.map((partData) => {
    const dropDownList = document.createElement("li");

    const drpDownListText = ElementManager.renderElement(
      "span",
      "drop-down-li"
    );
    drpDownListText.textContent = partData;
    dropDownList.appendChild(drpDownListText);

    if (type === "payment") {
      const xImg = ElementManager.renderElement("img", "delete-button");
      xImg.src = "./src/assets/closed.svg";
      xImg.alt = "closed icon";
      dropDownList.appendChild(xImg);
    }
    dropDown.appendChild(dropDownList);
  });
  if (type === "payment") {
    const addButton = ElementManager.renderElement("li", "add-button");
    addButton.textContent = "추가하기";
    dropDown.appendChild(addButton);
  }

  return dropDown;
};
