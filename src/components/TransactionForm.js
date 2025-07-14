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
 <div class="flex-row-between">
          <div class="flex-column-start">
            <label class="form-label">일자</label>
            <input
              type="date"
              name="date"
              value="2023-08-17"
              class="input date-input"
            />
          </div>
          <div class="flex-column-start">
            <label class="form-label">금액</label>
            <div class="amount-group">
              <input type="hidden" name="type" value="withdraw" />
              <button type="button" id="toggle-type-btn" class="toggle-btn">
                -
              </button>
              <input
                type="number"
                name="amount"
                value="0"
                class="input amount-input"
                min="0"
              />
              <span class="unit">원</span>
            </div>
          </div>
          <div class="flex-column-start">
            <label class="form-label">내용</label>
            <div class="desc-group">
              <input
                type="text"
                name="description"
                placeholder="입력하세요"
                maxlength="32"
                class="input desc-input"
              />
              <span class="desc-count">0/32</span>
            </div>
          </div>
          <div class="flex-column-start">
            <label class="form-label">결제수단</label>
            <select name="method" class="select">
              <option selected value="">선택하세요</option>
              <option value="카드">카드</option>
              <option value="현금">현금</option>
            </select>
          </div>
          <div class="flex-column-start">
            <label class="form-label">분류</label>
            <select name="category" class="select">
              <option selected value="">선택하세요</option>
              <option value="음식">음식</option>
              <option value="교통">교통</option>
            </select>
          </div>
          <div class="flex-column-start submit-col">
            <button type="submit" class="submit-btn" aria-label="확인">
              <span class="checkmark">✓</span>
            </button>
          </div>
        </div>
    `,
  });
}
