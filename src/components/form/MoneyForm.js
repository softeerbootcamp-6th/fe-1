import { EventDispatcher } from "../../utils/EventDispatcher.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { NumberManager } from "../../utils/NumberManager.js";

export const MoneyForm = (input) => {
  const moneyForm = ElementManager.renderElement("div", "form-money");
  moneyForm.innerHTML = `
    <label for="money" class="light-12">금액</label>
    <div class="money-input-wrapper">
      <img src="./src/assets/expense.png" alt="expense icon">
      <input type="text" id="money" name="money" placeholder="0" value="${input.money}">
      <span>원</span>
    </div>
    `;

  const moneyTypeImg = moneyForm.querySelector(".money-input-wrapper > img");
  EventDispatcher.register({
    eventType: "click",
    selector: "money-input-wrapper > img",
    handler: () => {
      input.moneyType = input.moneyType === "income" ? "expense" : "income";
      moneyTypeImg.src = `./src/assets/${input.moneyType}.png`;
      moneyTypeImg.alt = `${input.moneyType} icon`;
    },
  });
  EventDispatcher.register({
    eventType: "input",
    selector: "form-money",
    handler: (e) => {
      const moneyInput = moneyForm.querySelector(
        ".money-input-wrapper > input"
      );
      const normalMoney = NumberManager.parseToNormalNumber(e.target.value);
      moneyInput.value = NumberManager.parseToCommaNumber(normalMoney);
      input.money = normalMoney;
    },
  });
  return moneyForm;
};
