import { EventDispatcher } from "../../utils/EventDispatcher.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { listStore } from "../../store/ListStore.js";
import { formStore } from "../../store/FormStore.js";
import { NumberManager } from "../../utils/NumberManager.js";
import { Modal } from "../modal/index.js";
import { Timer } from "../../utils/Timer.js";

const BACKGROUND_COLOR = {
  생활: 90,
  "쇼핑/뷰티": 30,
  "의료/건강": 50,
  식비: 60,
  교통: 70,
  "문화/여가": 100,
  미분류: 110,
  월급: 20,
  "기타 수입": 10,
  용돈: 40,
};

export const ListItem = (item) => {
  const listItem = ElementManager.renderElement("div", "list-item");
  listItem.dataset.uid = item.uid;
  listItem.innerHTML = `
  <span class="category light-12" style="background-color:var(--colorchip-${
    BACKGROUND_COLOR[item.category]
  })">${item.category}</span>
  <span class="content">${item.content}</span>
  <span class="payment">${item.payment}</span>
  <span class="money" style=${
    item.moneyType === "expense"
      ? "color:var(--brand-text-expense)"
      : "color:var(--brand-text-income)"
  }>${
    item.moneyType === "expense" ? "-" : ""
  }${NumberManager.parseToCommaNumber(item.money)}원</span>
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
      console.log(listItem);
      if (e.target.closest(".delete-button")) {
        // 값 삭제
        const uidItem = listStore.data.find((partData) => partData.uid === uid);
        Modal.renderModal(
          "deleteListItem",
          () => {
            Timer(1000, () => {
              listStore.dispatch("removeListItemByUID", uid);
            });
          },
          uidItem
        );
      } else {
        // 폼에 반영하여 수정
        listItem.classList.add("active");
        const item = listStore.data.find((partData) => partData.uid === uid);
        if (item) {
          formStore.dispatch("edit", item);
        }
      }
    },
  });
  return listItem;
};
