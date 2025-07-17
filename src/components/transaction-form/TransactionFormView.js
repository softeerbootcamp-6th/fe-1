import FormState from "../../store/FormState.js";
import { categories } from "../../constants/categories.js";
import { renderComponent } from "../../utils/render.js";
import { getMetohds } from "../../apis/method.js";

export function updateDescriptionCount(length) {
  const descCount = document.getElementById("desc-count");
  if (descCount) {
    descCount.textContent = `${length}/32`;
  }
}

export function renderCategorySelect(type, selectedCategory) {
  const categorySelect = document.getElementById("category-select");
  if (!categorySelect) return;
  const options = categories.filter((cat) => cat.type === type);
  categorySelect.innerHTML = [
    '<option value="">선택하세요</option>',
    ...options.map(
      (cat) =>
        `<option value="${cat.name}"${
          selectedCategory === cat.name ? " selected" : ""
        }>${cat.name}</option>`
    ),
  ].join("");
}

function createDateInput(date) {
  return `
      <div class="transaction-form-col">
          <label class="transaction-form-label font-light-12" for="date-input"
          >일자</label
          >
              <input
              id="date-input"
              name="date"
              class="transaction-form-date-input font-semibold-12"
              type="date"
              value="${date}"
              />
      </div>
      `;
}

function createAmountGroup({ amount, type }) {
  const typeBtnClass =
    type === "deposit"
      ? "transaction-type-icon-plus"
      : "transaction-type-icon-minus";
  return `
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
                  value="${type}"
                />
                <button
                  type="button"
                  class="transaction-form-toggle-btn ${typeBtnClass}"
                  id="transaction-form-toggle-btn"
                ></button>
                <input
                  id="amount-input"
                  name="amount"
                  class="transaction-form-amount-input font-semibold-12 text-neutral-text-weak"
                  type="text"
                  min="0"
                  value="${amount}"
                />
                <span class="transaction-form-unit">원</span>
              </div>
            </div>
      `;
}

function createDescription(description) {
  return `
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
          value="${description}"
          />
          <span
            class="transaction-form-desc-count font-light-12 text-neutral-text-weak"
            id="desc-count"
            >0/32</span
          >
      </div>
      </div>
      `;
}

export function createMethodSelect({ method, methods }) {
  return `
    <div class="transaction-form-col">
      <label class="transaction-form-label font-light-12" for="method-select">
        결제수단
      </label>
      <select
        id="method-select"
        name="method"
        class="transaction-form-select font-semibold-12 text-neutral-text-weak"
      >
        <option value="" ${method === "" ? "selected" : ""}>선택하세요</option>
        ${methods
          .map(
            (m) =>
              `<option value="${m.id}"${method === m.id ? " selected" : ""}>${
                m.name
              }</option>`
          )
          .join("")}
      </select>
    </div>
  `;
}

export function createCategorySelect({ type, category }) {
  const options = categories.filter((cat) => cat.type === type);
  return `
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
              <option value="" ${
                category === "" ? "selected" : ""
              }>선택하세요</option>
              ${options
                .map(
                  (cat) =>
                    `<option value="${cat.name}"${
                      category === cat.name ? " selected" : ""
                    }>${cat.name}</option>`
                )
                .join("")}
          </select>
      </div>
      `;
}

function createTransactionSubmitButton() {
  return `
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

export async function renderTransactionForm() {
  const { date, amount, type, description, method, category } =
    FormState.getFormState();

  const methods = await getMetohds();

  let innerHTML = "";

  innerHTML += createDateInput(date);
  innerHTML += createAmountGroup({ amount, type });
  innerHTML += createDescription(description);
  innerHTML += createMethodSelect({ method, methods });
  innerHTML += createCategorySelect({ type, category });
  innerHTML += createTransactionSubmitButton();

  renderComponent({
    id: "transaction-form",
    className: "transaction-form-row",
    innerHTML,
  });
}
