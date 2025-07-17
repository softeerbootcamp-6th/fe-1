import { EventDispatcher } from "../../utils/EventDispatcher.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { InputValidator } from "../../utils/InputValidator.js";
import { listStore } from "../../store/ListStore.js";
import { formStore } from "../../store/FormStore.js";

export const FormChecker = () => {
  const formChecker = ElementManager.renderElement("div", "form-checker");
  formChecker.innerHTML = `
    <div class="img-wrapper">
      <img src="./src/assets/check.svg" alt="check icon">
    </div>
  `;

  EventDispatcher.register({
    eventType: "click",
    selector: "form-checker",
    handler: () => {
      const isFullFilled = InputValidator.validateFullFilled(formStore.data);
      if (!isFullFilled) return;
      const isFullCorrectType = InputValidator.validateFullCorrectType(
        formStore.data
      );
      if (isFullCorrectType) {
        if (formStore.data.mode === "edit") {
          listStore.dispatch("updateListItem", {
            ...formStore.data,
            date: new Date(formStore.data.date),
          });
        } else {
          listStore.dispatch("addListItem", {
            ...formStore.data,
            date: new Date(formStore.data.date),
            uid: crypto.randomUUID(),
          });
        }
        formStore.dispatch("reset");
      } else {
        console.error("입력이 완료되지 못했습니다.");
      }
    },
  });
  return formChecker;
};
