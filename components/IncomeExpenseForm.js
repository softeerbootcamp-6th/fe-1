import { incomeExpenseStore } from "../store/incomeExpenseStore.js";
import { renderListItem } from "./IncomeExpenseList.js";
import { renderSelectBox } from "./SelectBox.js";

export function renderIncomeExpenseForm() {
  const form = document.createElement("form");
  form.className = "income-expense-form";

  // 현재 날짜를 기본값으로 설정
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  let isEdit = false;
  let isIncome = true; // true: 수입, false: 지출
  let itemID = null; // list item id 초기화 -> list item 클릭하여 수정하는 경우에만 다른 숫자 가능
  const maxDescriptionLength = 32;
  let descriptionLength = 0;
  const paymentOptions = ["현금", "신용카드"];
  const incomeTags = ["월급", "용돈", "기타 수입"];
  const expenseTags = [
    "생활",
    "의료/건강",
    "쇼핑/뷰티",
    "교통",
    "식비",
    "문화/여가",
    "미분류",
  ];

  document.addEventListener("add-payment", (e) => {
    const paymentName = e.detail.paymentName;
    paymentOptions.push(paymentName);

    updatePaymentSelect(paymentOptions);
  });

  document.addEventListener("delete-payment", (e) => {
    const optionName = e.detail.optionName;
    const index = paymentOptions.indexOf(optionName);
    if (index > -1) {
      paymentOptions.splice(index, 1);
    }
  });

  // TODO: select UI 구현 (현재는 단순한 select로 구현)
  const getDateContainerHTML = () => {
    return `
        <div class="date-container">
            <label class="date-label light12">날짜</label>
            <input type="date" class="date-input" name="date" value="${formattedDate}">
        </div>
    `;
  };

  const getMoneyContainerHTML = () => {
    return `
        <div class="money-container">
            <label class="money-label light12" for="money-input">금액</label>
            <div class="money-input-container">
                <button class="money-button">
                    <img src="../assets/icons/plus.svg"/>
                </button>
                <input id="money-input" type="string" class="money-input" value="0" dir="rtl"></input>
                <span class="money-unit light12">원</span>
            </div>
        </div>
    `;
  };

  const getDescriptionContainerHTML = (maxDescriptionLength) => {
    return `
        <div class="description-container">
            <div class="description-label-container">
                <label class="description-label light12" for="description-input">내용</label>
                <span class="description-length light12">${descriptionLength}/${maxDescriptionLength}</span>
            </div>
            <input id="description-input" type="text" class="description-input" maxlength="32"></input>
        </div>
    `;
  };

  const getPaymentContainerHTML = () => {
    return `
        <div class="payment-container">
            <label class="payment-label light12">결제수단</label>
        </div>
    `;
  };

  const getTagContainerHTML = () => {
    return `
        <div class="tag-container">
            <label class="tag-label light12">분류</label>
        </div>
        `;
  };

  const getVerticalLineHTML = () => {
    return `
        <div class="vertical-line"></div>
    `;
  };

  const addButtonHTML = () => {
    return `
        <button type="submit" class="add-button">
            <img src="../assets/icons/add-button.svg" alt="Add"></img>
        </button>
    `;
  };

  form.innerHTML = `
    ${getDateContainerHTML()}
    ${getVerticalLineHTML()}
    ${getMoneyContainerHTML()}
    ${getVerticalLineHTML()}
    ${getDescriptionContainerHTML(maxDescriptionLength)}
    ${getVerticalLineHTML()}
    ${getPaymentContainerHTML()}
    ${getVerticalLineHTML()}
    ${getTagContainerHTML()}
    ${addButtonHTML()}
    `;

  const paymentContainer = form.querySelector(".payment-container");
  let selectBox = renderSelectBox(paymentOptions, true, true);
  paymentContainer.appendChild(selectBox);

  const tagContainer = form.querySelector(".tag-container");
  const incomeExpenseTags = isIncome ? incomeTags : expenseTags;
  let tagSelectBox = renderSelectBox(incomeExpenseTags, false, false);
  tagContainer.appendChild(tagSelectBox);

  // 날짜
  const dateInput = form.querySelector(".date-input");

  // 금액
  const moneyButton = form.querySelector(".money-button");
  const moneyButtonIcon = moneyButton.querySelector("img");
  const moneyInput = form.querySelector("#money-input");

  // 내용
  const descriptionInput = form.querySelector("#description-input");

  // add 버튼
  const addButton = form.querySelector(".add-button");

  moneyButton.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    isIncome = !isIncome;
    moneyButtonIcon.src = isIncome
      ? "../assets/icons/plus.svg"
      : "../assets/icons/minus.svg";

    // 클래스 옵션 업데이트
    updateTagSelect(incomeTags, expenseTags);
  });

  moneyInput.addEventListener("keyup", ({ target }) => {
    let moneyValue = Number(target.value.replace(/[^0-9]/g, "")); // 숫자가 아닌 것들은 제외
    let formattedValue = moneyValue.toLocaleString("ko-KR"); // 세자리마다 콤마
    target.value = formattedValue; // 입력 필드에 포맷된 값 설정
  });

  form.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // 입력 시 기본값 0 제거
  moneyInput.addEventListener("focus", ({ target }) => {
    if (target.value === "0") {
      target.value = "";
    }
  });

  descriptionInput.addEventListener("keyup", ({ target }) => {
    descriptionLength = target.value.length;
    const lengthSpan = form.querySelector(".description-length");
    lengthSpan.textContent = `${descriptionLength}/32`;
  });

  // keyup, select 이벤트 발생 시 유효성 검사
  [dateInput, moneyInput, descriptionInput].forEach((input) => {
    input.addEventListener("keyup", () => {
      validateForm(dateInput, moneyInput, descriptionInput);
    });
    input.addEventListener("change", () => {
      validateForm(dateInput, moneyInput, descriptionInput);
    });
  });

  document.addEventListener("select-change", () => {
    validateForm(dateInput, moneyInput, descriptionInput);
  });

  addButton.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();

    const incomeExpenseListContainer = document.querySelector(
      ".income-expense-list-container",
    );

    handleSubmit(e, itemID, dateInput, moneyInput, descriptionInput);
    formInit(dateInput, moneyInput, descriptionInput);
    isEdit = false;
    renderListItem(incomeExpenseListContainer);
  });

  document.addEventListener("edit-item", (e) => {
    const data = e.detail;
    isEdit = true;
    setItemToForm(data);
  });

  // 내가 클릭한 것이 아닌지 확인할 수 있으면 됨
  // 생각을 거꾸로
  // 바깔부분 클릭하면 edit 해제
  document.body.addEventListener("click", (event) => {
    // 특정 요소 안에서 클릭했는지 확인
    const isInsideList = event.target.closest("li");
    if (!isInsideList && isEdit) {
      formInit(dateInput, moneyInput, descriptionInput);
      isEdit = false;
    }
  });

  const updateTagSelect = (incomeTags, expenseTags) => {
    const oldSelectBox = tagContainer.querySelector(".select-box");
    if (oldSelectBox) {
      tagContainer.removeChild(oldSelectBox);
    }

    if (isIncome) {
      tagContainer.appendChild(renderSelectBox(incomeTags, false, false));
    } else {
      tagContainer.appendChild(renderSelectBox(expenseTags, false, false));
    }
  };

  const updatePaymentSelect = (options) => {
    const oldSelectBox = paymentContainer.querySelector(".select-box");
    if (oldSelectBox) {
      paymentContainer.removeChild(oldSelectBox);
    }
    paymentContainer.appendChild(renderSelectBox(options, true, true));
    const newSelectBox = paymentContainer.querySelector(".select-box");
    newSelectBox.addEventListener("change", () => {
      validateForm(dateInput, moneyInput, descriptionInput);
    });
  };

  // 입력값 유효성 검사
  const validateForm = (dateInput, moneyInput, descriptionInput) => {
    const paymentSelect = form.querySelector(".select-box");
    const tagSelect = form.querySelectorAll(".select-box")[1];

    // 날짜 입력값 확인
    const isDateValid = !!dateInput.value; // 날짜가 선택되었는지 확인(true/false 강제변환)
    // 금액 입력값 확인 (0 보다 큰가)
    const isMoneyValid = Number(moneyInput.value.replace(/[^0-9]/g, "")) > 0;
    // 내용 입력값 확인 (1글자 이상)
    const isDescriptionValid = descriptionInput.value.trim().length > 0;
    // 결제수단 선택 여부 확인
    const isPaymentValid = paymentSelect.dataset.value !== "";
    // 분류 선택 여부 확인
    const isTagValid = tagSelect.dataset.value !== "";

    const isValid =
      isDateValid &&
      isMoneyValid &&
      isDescriptionValid &&
      isPaymentValid &&
      isTagValid;

    activeAddButton(isValid);
  };

  const activeAddButton = (isValid) => {
    if (isValid) {
      addButton.classList.toggle("active", isValid);
    } else {
      addButton.classList.remove("active");
    }
  };

  const handleSubmit = (e, ID, dateInput, moneyInput, descriptionInput) => {
    e.preventDefault();

    const paymentSelect = form.querySelector(".select-box");
    const tagSelect = form.querySelectorAll(".select-box")[1];

    const dateInputValue = dateInput.value;
    const moneyInputValue = moneyInput.value.replace(/[^0-9]/g, ""); // 숫자만 추출
    const descriptionInputValue = descriptionInput.value.trim();
    const paymentSelectValue = paymentSelect.dataset.value;
    const tagSelectValue = tagSelect.dataset.value;

    const newIncomeExpense = {
      id: ID,
      type: isIncome ? "income" : "expense",
      money: isIncome ? Number(moneyInputValue) : -Number(moneyInputValue),
      description: descriptionInputValue,
      payment: paymentSelectValue,
      tag: tagSelectValue,
    };

    incomeExpenseStore.updateIncomeExpenseData(
      dateInputValue,
      newIncomeExpense,
    );
  };

  const formInit = (dateInput, moneyInput, descriptionInput) => {
    const paymentSelect = form.querySelector(".select-box");
    const tagSelect = form.querySelectorAll(".select-box")[1];

    itemID = null;
    dateInput.value = formattedDate;
    moneyInput.value = "";
    descriptionInput.value = "";

    paymentSelect.dataset.value = "";
    tagSelect.dataset.value = "";
    paymentSelect.querySelector(".select-button-span").textContent =
      "선택하세요";
    tagSelect.querySelector(".select-button-span").textContent = "선택하세요";
    activeAddButton(false);
  };

  const setItemToForm = ({
    targetListItemDate,
    id,
    type,
    money,
    description,
    payment,
    tag,
  }) => {
    isIncome = type === "income" ? true : false;
    moneyButtonIcon.src = isIncome
      ? "../assets/icons/plus.svg"
      : "../assets/icons/minus.svg";
    updateTagSelect(incomeTags, expenseTags);
    itemID = id;
    dateInput.value = targetListItemDate;
    moneyInput.value = money > 0 ? money : -money;
    descriptionInput.value = description;

    const lengthSpan = form.querySelector(".description-length");
    descriptionLength = description.length;
    lengthSpan.textContent = `${descriptionLength}/32`;

    const paymentSelect = form.querySelector(".select-box");
    const tagSelect = form.querySelectorAll(".select-box")[1];
    paymentSelect.dataset.value = payment;
    paymentSelect.querySelector(".select-button-span").textContent = payment;
    tagSelect.querySelector(".select-button-span").textContent = tag;
    tagSelect.dataset.value = tag;
  };

  return form;
}
