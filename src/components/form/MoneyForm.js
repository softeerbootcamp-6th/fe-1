export const MoneyForm = (input) => {
  const moneyForm = document.createElement("div");
  moneyForm.classList.add("form-money");
  moneyForm.innerHTML = `
    <label for="money" class="light-12">금액</label>
    <div>
      <img width="16px" src="./src/assets/minus.png" alt="minus icon">
      <input type="text" id="money" name="money" value="${input.money}">
      <span>원</span>
    </div>
    `;
  return moneyForm;
};
