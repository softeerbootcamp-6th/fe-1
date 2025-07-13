import { Modal } from "../components/modal/index.js";
import { ElementManager } from "../utils/ElementManager.js";

export const renderCalendar = () => {
  const calendar = ElementManager.renderElementId("div", "calendar");
  calendar.textContent = "calenadr";
  Modal.renderModal("add");
  return calendar;
};
