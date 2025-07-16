import { EventDispatcher } from "../../utils/EventDispatcher.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { listStore } from "../../store/ListStore.js";
import { formStore } from "../../store/FormStore.js";

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
    selector: "list-item",
    handler: (e) => {
      const listItem = e.target.closest(".list-item");
      const uid = listItem.dataset.uid;
      if (e.target.closest(".delete-button")) {
        // 리스트에서 삭제
        listStore.dispatch("removeListItemByUID", uid);
      } else {
        // 폼에 반영하여 수정
        const item = listStore.data.find((partData) => partData.uid === uid);
        if (item) {
          formStore.dispatch("edit", item);
        }
      }
    },
  });
  return listItem;
};
