import { addNewTransaction } from "../utils/transaction.js";
import { getCurrentYear, getCurrentMonth } from "../utils/currentDate.js";
import { renderTransactionList } from "./transactionsList.js";

export function createInputBar() {
  return ` 
    <form class="input-bar flex-row" id="inputBarForm">
      <div class="flex-column">
        <label>일자
          <input type="date" name="date" required value="${
            new Date().toISOString().split("T")[0]
          }" />
        </label>
      </div>
      <div class="flex-column">
        <label>금액
          <div class="flex-row">
            <button type="button" class="amountToggle" data-sign="+">+</button>
            <input type="number" name="amount" placeholder="금액을 입력하세요" min="0" required />
          </div>
        </label>
      </div>
      <div class="flex-column">
        <label>내용
          <input
            type="text"
            name="content"
            maxlength="32"
            placeholder="내용을 입력하세요"
            required
          />
        </label>
      </div>
      <div class="flex-column">
        <label>결제수단
          <select name="paymentMethod" required>
            <option value="cash">현금</option>
            <option value="card">카드</option>
            <option value="add">추가하기</option>
          </select>
        </label>
      </div>
      <div class="flex-column">
        <label>분류
        <select name="category" required>
          <option value="life">생활</option>
          <option value="food">식비</option>
          <option value="transportation">교통</option>
          <option value="shopping">쇼핑/뷰티</option>
          <option value="health">의료/건강</option>
          <option value="entertainment">문화/여가</option>
          <option value="etc">미분류</option>
        </select>
        </label>
      </div>
      <div class="flex-column">
        <button type="submit" class="add-button">추가</button>
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
      //+ - 변경
      if (amountToggle.dataset.sign === "+") {
        amountToggle.textContent = "-";
        amountToggle.dataset.sign = "-";
      } else {
        amountToggle.textContent = "+";
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
    amountToggle.textContent = "+";

    renderTransactionList();
  });
}
