import { setState, state } from "../store.js";
import { addEventListener } from "../utils/addEvent.js";
import { renderComponent } from "../utils/render.js";

export function initTransactionForm() {
  addEventListener({
    id: "transaction-form",
    event: "submit",
    onEvent: (e) => {
      e.preventDefault();
      addItem({ form: e.target });
    },
  });
  renderTransactionForm();
}

function addItem({ form }) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const item = {
    ...data,
    id: Date.now(), // TODO - generateNextId 생성
  };

  setState({
    items: [...state.items, item],
  });
}

function renderTransactionForm() {
  renderComponent({
    id: "transaction-form",
    innerHTML: `
    <div class="transaction-form-row">
          <!-- 일자 -->
          <div class="transaction-form-col">
            <label class="transaction-form-label font-light-12" for="date-input"
              >일자</label
            >
            <input
              id="date-input"
              class="transaction-form-date-input font-semibold-12"
              type="date"
              value="2023-08-17"
            />
          </div>
          <!-- 금액 -->
          <div class="transaction-form-col">
            <label
              class="transaction-form-label font-light-12"
              for="amount-input"
              >금액</label
            >
            <div class="transaction-form-amount-group">
              <button
                type="button"
                class="transaction-form-toggle-btn transaction-type-icon-plus"
                id="amount-toggle"
              ></button>
              <input
                id="amount-input"
                class="transaction-form-amount-input font-semibold-12 text-neutral-text-weak"
                type="number"
                min="0"
                value="0"
              />
              <span class="transaction-form-unit">원</span>
            </div>
          </div>

          <!-- 내용 -->
          <div class="transaction-form-col">
            <label class="transaction-form-label font-light-12" for="desc-input"
              >내용</label
            >
            <div class="transaction-form-desc-group">
              <input
                id="desc-input"
                class="transaction-form-desc-input font-semibold-12 text-neutral-text-weak"
                type="text"
                maxlength="32"
                placeholder="입력하세요"
              />
              <span
                class="transaction-form-desc-count font-light-12 text-neutral-text-weak"
                id="desc-count"
                >0/32</span
              >
            </div>
          </div>

          <!-- 결제수단 -->
          <div class="transaction-form-col">
            <label
              class="transaction-form-label font-light-12"
              for="method-select"
              >결제수단</label
            >
            <select
              id="method-select"
              class="transaction-form-select font-semibold-12 text-neutral-text-weak"
            >
              <option value="">선택하세요</option>
              <option value="card">카드</option>
              <option value="cash">현금</option>
              <!-- 필요시 추가 -->
            </select>
          </div>

          <!-- 분류 -->
          <div class="transaction-form-col">
            <label
              class="transaction-form-label font-light-12"
              for="category-select"
              >분류</label
            >
            <select
              id="category-select"
              class="transaction-form-select font-semibold-12 text-neutral-text-weak"
            >
              <option value="">선택하세요</option>
              <option value="food">식비</option>
              <option value="transport">교통</option>
              <!-- 필요시 추가 -->
            </select>
          </div>

          <!-- 제출 버튼 -->
          <div class="transaction-form-submit-col">
            <button type="submit" class="transaction-form-submit-btn">
              <img
                src="./src/assets/icons/check.svg"
                class="transaction-button-check"
              />
            </button>
          </div>
        </div>
    `,
  });
}
