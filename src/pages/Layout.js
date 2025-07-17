import { formStore } from "../store/FormStore.js";
import { listStore } from "../store/ListStore.js";
import { EventDispatcher } from "../utils/EventDispatcher.js";
import { renderHeader } from "./Header.js";
import { renderMain } from "./Main.js";

export const createLayout = () => {
  const app = document.getElementById("app");

  const header = renderHeader();
  const main = renderMain();
  app.appendChild(header);
  app.appendChild(main);

  EventDispatcher.register({
    eventType: "click",
    selector: "#app",
    handler: (e) => {
      const entireForm = e.target.closest(".entire-form");
      if (!entireForm && formStore.data.mode === "edit") {
        const uid = formStore.data.uid;
        const uidItem = document.querySelector(`div[data-uid="${uid}"]`);
        uidItem.classList.remove("active");
        formStore.dispatch("reset");
      }
    },
  });
};
