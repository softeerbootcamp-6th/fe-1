import { DateManager } from "../../utils/DateManager.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { ListItem } from "./ListItem.js";

export const DateList = (date, list) => {
  const splitDate = date.split("-");
  const dateList = ElementManager.renderElement("div", "list-date");
  const dateOverview = ElementManager.renderElement("div", [
    "date-overview",
    "serif-14",
  ]);
  dateOverview.innerHTML = `
  <div class="date">
    <span>${splitDate[1]}월 ${splitDate[2]}일</span>
    <span>${DateManager.renderDay(date)}요일</span>
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
  dateList.appendChild(dateOverview);

  const dateWrapper = ElementManager.renderElement("div", "date-wrapper");
  list.map((input) => {
    dateWrapper.appendChild(ListItem(input));
  });
  dateList.appendChild(dateWrapper);
  return dateList;
};
