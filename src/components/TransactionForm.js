import { addObservers, setState, state } from "../store.js";
import { addEventListener } from "../utils/addEvent.js";
import { renderComponent } from "../utils/render.js";
import { categories } from "../constants/categories.js";

export function initTransactionForm() {
  renderTransactionForm();

  addEventListener({
    id: "transaction-form",
    event: "submit",
    onEvent: (e) => {
      e.preventDefault();
      handleTransactionFormSubmit({ form: e.target });
    },
  });

  addEventListener({
    id: "transaction-amount-type-toggle",
    event: "click",
    onEvent: (e) => {
      handleTransactionTypeToggle({ btn: e.target });
    },
  });

  addTransactionFormValidationListeners(
    [
      "date-input",
      "amount-input",
      "desc-input",
      "method-select",
      "category-select",
    ],
    validateTransactionForm
  );
}

function validateTransactionForm() {
  const form = document.getElementById("transaction-form");
  const date = form.querySelector('input[name="date"]').value;
  const amount = form.querySelector('input[name="amount"]').value;
  const description = form.querySelector('input[name="description"]').value;
  const method = form.querySelector('select[name="method"]').value;
  const category = form.querySelector('select[name="category"]').value;
  const submitBtn = form.querySelector("#submit-btn");

  if (date && amount && description && method && category) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

function addTransactionFormValidationListeners(ids, validateForm) {
  ids.forEach((id) => {
    addEventListener({
      id,
      event: "input",
      onEvent: validateForm,
    });
    if (id.endsWith("select")) {
      addEventListener({
        id,
        event: "change",
        onEvent: validateForm,
      });
    }
  });
}

function handleTransactionFormSubmit({ form }) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const item = {
    ...data,
    id: Date.now(), // TODO - generateNextId 생성
  };

  setState({
    items: [...state.items, item],
    curDate: data.date,
  });
}

function handleTransactionTypeToggle({ btn }) {
  const form = btn.closest("form");
  const typeInput = form.querySelector("input[name='type']");
  const categorySelect = form.querySelector("select[name='category']");
  const isMinus = btn.classList.contains("transaction-type-icon-minus");
  let newType;
  if (isMinus) {
    btn.classList.remove("transaction-type-icon-minus");
    btn.classList.add("transaction-type-icon-plus");
    newType = "deposit";
  } else {
    btn.classList.remove("transaction-type-icon-plus");
    btn.classList.add("transaction-type-icon-minus");
    newType = "withdraw";
  }
  if (typeInput) typeInput.value = newType;

  if (categorySelect) {
    categorySelect.innerHTML = createCategoryOptionsInnerHtml(newType, "");
  }
}

function createCategoryOptionsInnerHtml(type, selectedCategory) {
  const options = categories.filter((cat) => cat.type === type);
  return [
    '<option value="">선택하세요</option>',
    ...options.map(
      (cat) =>
        `<option value="${cat.name}"${
          selectedCategory === cat.name ? " selected" : ""
        }>${cat.name}</option>`
    ),
  ].join("");
}

function createTransactionFormInnerHtml() {
  return `
    <div class="transaction-form-row">
          <!-- 일자 -->
          <div class="transaction-form-col">
            <label class="transaction-form-label font-light-12" for="date-input"
              >일자</label
            >
            <input
              id="date-input"
              name="date"
              class="transaction-form-date-input font-semibold-12"
              type="date"
              value="${state.curDate}"
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
              <input
                id="type-input"
                name="type"
                type="hidden"
              />
              <button
                type="button"
                class="transaction-form-toggle-btn transaction-type-icon-minus"
                id="transaction-amount-type-toggle"
              ></button>
              <input
                id="amount-input"
                name="amount"
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
                name="description"
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
              name="method"
              class="transaction-form-select font-semibold-12 text-neutral-text-weak"
            >
              <option value="">선택하세요</option>
              <option value="카드">카드</option>
              <option value="현금">현금</option>
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
              name="category"
              class="transaction-form-select font-semibold-12 text-neutral-text-weak"
            >
              <option value="">선택하세요</option>
              <option value="식비">식비</option>
              <option value="교통">교통</option>
              <!-- 필요시 추가 -->
            </select>
          </div>

          <!-- 제출 버튼 -->
          <div class="transaction-form-submit-col">
            <button type="submit" class="transaction-form-submit-btn" id="submit-btn" disabled>
              <img
                src="./src/assets/icons/check.svg"
                class="transaction-button-check"
              />
            </button>
          </div>
        </div>
    `;
}

function renderTransactionForm() {
  renderComponent({
    id: "transaction-form",
    innerHTML: createTransactionFormInnerHtml(),
  });
  // TODO - 렌더링 이후 유효성 검증 함수를 실행해야하는지
  // validateTransactionForm();
}
