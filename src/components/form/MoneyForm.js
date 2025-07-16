import { EventDispatcher } from "../../utils/EventDispatcher.js";
import { ElementManager } from "../../utils/ElementManager.js";
import { formStore } from "../../store/FormStore.js";
import { NumberManager } from "../../utils/NumberManager.js";

export const MoneyForm = () => {
  const moneyForm = ElementManager.renderElement("div", "form-money");
  moneyForm.innerHTML = `
    <label for="money" class="light-12">금액</label>
    <div class="money-input-wrapper">
      <img src="./src/assets/expense.png" alt="expense icon">
      <input type="text" id="money" name="money" placeholder="0" value="${formStore.data.money}">
      <span>원</span>
    </div>
    `;

  formStore.subscribe((newData) => {
    //결제값 변경시 화면 업데이트
    console.log(newData);
    const moneyInput = moneyForm.querySelector("#money");
    moneyInput.value = NumberManager.parseToCommaNumber(newData.money);

    // 결제 방법 클릭시 화면 업데이트
    moneyTypeImg.src = `./src/assets/${newData.moneyType}.png`;
    moneyTypeImg.alt = `${newData.moneyType} icon`;
  });

  const moneyTypeImg = moneyForm.querySelector(".money-input-wrapper > img");
  EventDispatcher.register({
    eventType: "click",
    selector: "money-input-wrapper > img",
    handler: () => {
      const updatedMoneyType =
        formStore.data.moneyType === "income" ? "expense" : "income";
      formStore.dispatch("update", {
        moneyType: updatedMoneyType,
      });
    },
  });
  return moneyForm;
};
