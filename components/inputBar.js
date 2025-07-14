import { addNewTransaction } from "../utils/transaction.js";
import { getCurrentYear, getCurrentMonth } from "../utils/currentDate.js";
import { renderTransactionList } from "./transactionsList.js";
import { getFilteringState } from "../pages.js";

export function createInputBar() {
  return ` 
  <form
    class="input-bar flex-row"
    id="inputBarForm"
  >
    <label class="flex-column input-section">
      <div class="input-label light-12">일자</div>
      <input type="date" name="date" class="date-input semibold-12" required value="${
        new Date().toISOString().split("T")[0]
      }" />
    </label>
    <label class="flex-column input-section">
      <div class="input-label light-12">금액</div>
      <div class="flex-row semibold-12">
        <button
          type="button"
          class="amountToggle"
          data-sign="+"
        >
          <img src="../icons/plus.svg" alt="plus" />
        </button>
        <input
          type="number"
          name="amount"
          placeholder="0"
          min="0"
          required
          class="semibold-12 text-input"
        />
        <div class="semibold-12">원</div>
      </div>
    </label>
    <label class="flex-column input-section">
      <div class="input-label light-12">내용</div>
      <input
        type="text"
        name="content"
        maxlength="32"
        placeholder="내용을 입력하세요"
        required
        class="semibold-12 text-input"
      />
    </label>
    <label class="flex-column input-section">
      <div class="input-label light-12">결제수단</div>
      <select
        name="paymentMethod"
        required
        class="semibold-12 text-input"
      >
        <option value="cash">현금</option>
        <option value="card">카드</option>
        <option value="add">추가하기</option>
      </select>
    </label>
    <label class="flex-column w-full px-20">
      <div class="input-label light-12">분류</div>
      <select
        name="category"
        required
        class="semibold-12 text-input"
      >
        <option value="life">생활</option>
        <option value="food">식비</option>
        <option value="transportation">교통</option>
        <option value="shopping">쇼핑/뷰티</option>
        <option value="health">의료/건강</option>
        <option value="entertainment">문화/여가</option>
        <option value="etc">미분류</option>
      </select>
    </label>
    <div class="flex-column">
      <button
        type="submit"
        class="add-button"
      >
        <img src="../icons/check.svg" alt="check" />
      </button>
    </div>
  </form>
  `;
}

export function renderInputBar(container) {
  container.innerHTML = createInputBar();

  const form = container.querySelector("#inputBarForm");
  const amountToggle = container.querySelector(".amountToggle");
  const amountInput = container.querySelector("input[name='amount']");

  if (amountToggle && amountInput) {
    amountToggle.addEventListener("click", () => {
      console.log("amountToggle", amountToggle.dataset.sign);
      //+ - 변경
      if (amountToggle.dataset.sign === "+") {
        amountToggle.innerHTML = `<img src="../icons/minus.svg" alt="minus" />`;
        amountToggle.dataset.sign = "-";
      } else {
        amountToggle.innerHTML = `<img src="../icons/plus.svg" alt="plus" />`;
        amountToggle.dataset.sign = "+";
      }
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // amountToggle 상태에 따라 금액 부호 결정
    if (amountToggle && amountToggle.dataset.sign === "-") {
      data.amount = -Math.abs(parseInt(data.amount));
    } else {
      data.amount = Math.abs(parseInt(data.amount));
    }

    // 새로운 거래내역 추가
    addNewTransaction(getCurrentYear(), getCurrentMonth(), data);

    form.reset();
    amountToggle.innerHTML = `<img src="../icons/plus.svg" alt="plus" />`;
    const { isIncomeChecked, isExpenseChecked } = getFilteringState();
    renderTransactionList(isIncomeChecked, isExpenseChecked);
  });
}
