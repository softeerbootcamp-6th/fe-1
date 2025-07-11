export const MoneyForm = (input) => {
  const moneyForm = document.createElement("div");
  moneyForm.classList.add("form-money");
  moneyForm.innerHTML = `
    <label for="money" class="light-12">금액</label>
    <div class="money-input-wrapper">
      <img src="./src/assets/${input.moneyType}.png" alt="${input.moneyType} icon">
      <input type="text" id="money" name="money" value="${input.money}">
      <span>원</span>
    </div>
    `;

  const moneyTypeImg = moneyForm.querySelector(".money-input-wrapper > img");
  moneyTypeImg.addEventListener("click", () => {
    input.moneyType = input.moneyType === "income" ? "expense" : "income";
    moneyTypeImg.src = `./src/assets/${input.moneyType}.png`;
    moneyTypeImg.alt = `${input.moneyType} icon`;
  });
  return moneyForm;
};
