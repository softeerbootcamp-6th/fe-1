import { ElementManager } from "../../utils/ElementManager.js";
import { ListItem } from "./ListItem.js";

export const DayList = (inputs) => {
  const dayList = ElementManager.renderElement("div", "list-day");
  const dayOverview = ElementManager.renderElement("div", [
    "day-overview",
    "serif-14",
  ]);
  dayOverview.innerHTML = `
  <div class="date">
    <span>8월 14일</span>
    <span>월요일</span>
  </div>
  <div class="money-counter">
    <div>
        <span>수입</span>
        <span>0원</span>
    </div>
    <div>
        <span>지출</span>
        <span>0원</span>
    </div>
  </div>
  `;
  dayList.appendChild(dayOverview);

  const dayWrapper = ElementManager.renderElement("div", "day-wrapper");

  inputs.map((input) => {
    dayWrapper.appendChild(ListItem(input));
  });
  dayList.appendChild(dayWrapper);
  return dayList;
};
