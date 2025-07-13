import { ElementManager } from "../../utils/ElementManager.js";
import { ListItem } from "./ListItem.js";

export const DayList = (inputs) => {
  const dayList = ElementManager.renderElement("div", "list-day");
  inputs.map((input) => {
    dayList.appendChild(ListItem(input));
  });
  return dayList;
};
