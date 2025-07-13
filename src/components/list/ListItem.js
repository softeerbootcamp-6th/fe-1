import { ElementManager } from "../../utils/ElementManager.js";

export const ListItem = (item) => {
  const listItem = ElementManager.renderElement("div", "list-item");
  listItem.innerHTML = `
  <span class="category light-12">${item.category}</span>
  <span class="content">${item.content}</span>
  <span class="payment">${item.payment}</span>
  <span class="money">${item.moneyType === "expense" ? "-" : ""}${
    item.money
  }원</span>
  </div>
  `;
  return listItem;
};
