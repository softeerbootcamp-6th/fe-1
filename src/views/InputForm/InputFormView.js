import Select from "../../components/Select/Select.js";

const DESCRIPTION_MAX_LENGTH = 32;
const CATEGORY_OPTIONS = {
  income: ["월급", "용돈", "기타수입"],
  expense: [
    "생활",
    "식비",
    "교통",
    "쇼핑/뷰티",
    "의료/건강",
    "문화/여가",
    "미분류",
  ],
};

class InputFormView {
  constructor() {
    this.$root = document.querySelector(".input-form");
  }

  async render(state) {
    const {
      date,
      type,
      amount,
      description,
      method,
      category,
      methodList,
      isValidate,
    } = state;
    const template = `
        <form action="" class="input-form">
            <div class="input-form__row input-form__date">
                <label class="font-light-12" for="date">일자</label>
                <input name="date" class="input-form__date-input" type="date" id="date" required value="${date}" />
            </div>
            <div class="input-form__row input-form__amount">
                <label class="font-light-12" for="amount">금액</label>
                <div class="input-form__amount-wrapper">
                <button
                    class="input-form__amount-icon input-form__amount-icon--${
                      type === "income" ? "plus" : "minus"
                    }"
                    type="button"
                ></button>
                <input
                    name="amount"
                    class="input-form__amount-input"
                    type="text"
                    id="amount"
                    placeholder="0"
                    required
                    value="${amount.toLocaleString() || ""}"
                />
                <span class="font-light-14">원</span>
                </div>
            </div>
            <div class="input-form__row input-form__description">
                <div class="input-form__description-wrapper">
                <label class="font-light-12" for="description">내용</label>
                <span class="input-form__description-count font-light-12">${
                  description.length
                }/${DESCRIPTION_MAX_LENGTH}</span>
                </div>
                <input
                name="description"
                class="input-form__description-input"
                type="text"
                id="description"
                placeholder="입력하세요"
                maxlength="${DESCRIPTION_MAX_LENGTH}"
                required
                value="${description || ""}"
                />
            </div>
            <div id="method-select-container" class="input-form__row input-form__method"></div>
            <div
                id="category-select-container"
                class="input-form__row input-form__category"
            >
            </div>
            <button type="submit" class="input-form__button" ${
              !isValidate ? "disabled" : ""
            }>
                <img
                src="/src/assets/icons/add-button${
                  isValidate ? "" : "-disabled"
                }.svg"
                alt="add-button${isValidate ? "" : "-disabled"}"
                />
            </button>
        </form>
    `;

    const methodSelect = await Select({
      name: "method",
      label: "결제수단",
      options: methodList,
      isEditable: true,
      selected: method,
    });

    const categorySelect = await Select({
      name: "category",
      label: "분류",
      options: CATEGORY_OPTIONS[type],
      isEditable: false,
      selected: category,
    });

    this.$root.innerHTML = template;
    this.$root
      .querySelector("#method-select-container")
      .appendChild(methodSelect);
    this.$root
      .querySelector("#category-select-container")
      .appendChild(categorySelect);
  }

  async renderType(state) {
    const { type, category } = state;
    const $amountIcon = this.$root.querySelector(".input-form__amount-icon");
    if (type === "income") {
      $amountIcon.classList.remove("input-form__amount-icon--minus");
      $amountIcon.classList.add("input-form__amount-icon--plus");
    } else {
      $amountIcon.classList.remove("input-form__amount-icon--plus");
      $amountIcon.classList.add("input-form__amount-icon--minus");
    }

    const $categorySelectContainer = this.$root.querySelector(
      "#category-select-container"
    );
    const categorySelect = await Select({
      name: "category",
      label: "분류",
      options: CATEGORY_OPTIONS[type],
      isEditable: false,
      selected: category,
    });
    $categorySelectContainer.innerHTML = "";
    $categorySelectContainer.appendChild(categorySelect);
  }

  renderAmount(state) {
    const { type, amount } = state;

    this.$root.querySelector(".input-form__amount-input").value =
      amount.toLocaleString();
  }

  renderDescription(state) {
    const { description } = state;
    this.$root.querySelector(".input-form__description-input").value =
      description;
    this.$root.querySelector(
      ".input-form__description-count"
    ).textContent = `${description.length}/${DESCRIPTION_MAX_LENGTH}`;
  }

  async renderMethod(state) {
    const { methodList, method } = state;
    const methodSelect = await Select({
      name: "method",
      label: "결제수단",
      options: methodList,
      isEditable: true,
      selected: method,
    });
    this.$root.querySelector("#method-select-container").innerHTML = "";
    this.$root
      .querySelector("#method-select-container")
      .appendChild(methodSelect);
  }

  async renderCategory(state) {
    const { type, category } = state;
    const categorySelect = await Select({
      name: "category",
      label: "분류",
      options: CATEGORY_OPTIONS[type],
      selected: category,
    });
    this.$root.querySelector("#category-select-container").innerHTML = "";
    this.$root
      .querySelector("#category-select-container")
      .appendChild(categorySelect);
  }

  renderValidate(isValidate) {
    const $submitButton = this.$root.querySelector(".input-form__button");
    const $submitButtonImg = $submitButton.querySelector("img");
    $submitButton.disabled = !isValidate;
    const imgPath = `/src/assets/icons/add-button${
      isValidate ? "" : "-disabled"
    }.svg`;

    $submitButtonImg.src = imgPath;
  }
}

export default InputFormView;
