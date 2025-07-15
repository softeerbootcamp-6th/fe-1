import { ElementManager } from "../utils/ElementManager.js";

export const renderCalendar = () => {
  const calendar = ElementManager.renderElementId("div", "calendar");
  calendar.textContent = "calenadr";
  return calendar;
};
