import { EventDispatcher } from "../../utils/EventDispatcher.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { listStore } from "../../store/ListStore.js";

export const ListItem = (item) => {
  const listItem = ElementManager.renderElement("div", "list-item");
  listItem.dataset.uid = item.uid;
  listItem.innerHTML = `
  <span class="category light-12">${item.category}</span>
  <span class="content">${item.content}</span>
  <span class="payment">${item.payment}</span>
  <span class="money">${item.moneyType === "expense" ? "-" : ""}${
    item.money
  }원</span>
  <button class="delete-button">
    <div class="img-wrapper">
      <img width="8px" height="8px" src="./src/assets/closed_white.svg" alt="closed icon"/>
    </div>
    <span class="semibold-12">삭제</span>
  </button>
  `;

  EventDispatcher.register({
    eventType: "click",
    selector: "delete-button",
    handler: (e) => {
      const listItem = e.target.closest(".list-item");
      const uid = listItem.dataset.uid;
      //data update
      listStore.dispatch("removeListItemByUID", uid);

      //dom update
      listItem.remove();
    },
  });
  return listItem;
};
