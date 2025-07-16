import transactionState from "../stores/subjects/TransactionState.js";
import modalState from "../stores/subjects/ModalState.js";
import deleteModalTemplate from "../views/Modal/DeleteModalTemplate.js";
import addMethodModalTemplate from "../views/Modal/addMethodModalTemplate.js";
import deleteMethodModalTemplate from "../views/Modal/deleteMethodModalTemplate.js";

const toggleFilter = (type) => {
  const filterState = transactionState.getFilterState();
  filterState[type] = !filterState[type];
  transactionState.setFilterState(filterState);
};

export const handleInputInputForm = (e, inputFormState) => {
  let { name, value } = e.target;
  if (name === "amount") {
    const formattedValue = Number(value.replace(/,/g, ""));
    value = formattedValue;
  }
  inputFormState.setField(name, value);
};

export const handleClickInputForm = (e, inputFormState) => {
  const $amountIcon = e.target.closest(".input-form__amount-icon");
  if ($amountIcon) {
    inputFormState.toggleType();
  }

  const $selectItem = e.target.closest(".select-item");
  if (!$selectItem) return;

  const $deleteButton = e.target.closest(".select-item__delete-button");
  if ($deleteButton) {
    console.log($selectItem.dataset.value);
    modalState.openModal({
      type: "delete",
      title: "해당 결제 수단을 삭제하시겠습니까?",
      content: deleteMethodModalTemplate($selectItem.dataset.value),
      onConfirm: async () => {
        inputFormState.deleteMethod($selectItem.dataset.value);
        modalState.closeModal();
      },
    });

    return;
  }

  const addButton = $selectItem.querySelector("button");
  if (addButton && addButton.classList.contains("select-item__add-button")) {
    modalState.openModal({
      type: "add",
      title: "추가하실 결제 수단을 입력해주세요.",
      content: addMethodModalTemplate(),
      onConfirm: async () => {
        const inputValue = document.querySelector("#modal .text-input").value;
        inputFormState.addMethod(inputValue);
        modalState.closeModal();
      },
    });
    return;
  }

  const $methodSelect = e.target.closest("#method-select-container");
  if ($methodSelect) {
    inputFormState.setField("method", $selectItem.dataset.value);
    return;
  }

  const $categorySelect = e.target.closest("#category-select-container");
  if ($categorySelect) {
    inputFormState.setField("category", $selectItem.dataset.value);
    return;
  }
};

export const handleSubmitInputForm = (e, inputFormState) => {
  e.preventDefault();
  const id = inputFormState.updateId;
  if (id) {
    transactionState.updateTransaction(id, inputFormState.getState());
  } else {
    transactionState.addTransaction(inputFormState.getState());
  }
  inputFormState.reset();
};

export const handleClickTransactions = async (e, inputFormState) => {
  const $contentRow = e.target.closest(".daily-list__content-row");
  if (!$contentRow) return;

  // 현재 이벤트 아이템 데이터 추출
  const $dailyList = e.target.closest(".history__daily-list");
  const amountString = $contentRow.querySelector(
    ".content-row__amount"
  ).textContent;

  const transactionType = amountString[0] === "-" ? "expense" : "income";
  const transactionAmount = Math.abs(
    Number(amountString.slice(0, -1).replace(/,/g, ""))
  );

  const currentData = {
    date: $dailyList.dataset.date,
    type: transactionType,
    amount: transactionAmount,
    description: $contentRow.querySelector(".content-row__description")
      .textContent,
    method: $contentRow.querySelector(".content-row__method").textContent,
    category: $contentRow.querySelector(".category-tag").textContent,
  };

  // 필터 토글 이벤트
  const itemId = $contentRow.dataset.id;
  const $checkboxContainer = e.target.closest(".checkbox-container");
  if ($checkboxContainer) {
    const type = $checkboxContainer.dataset.type;
    toggleFilter(type);
    return;
  }

  // 리스트 아이템 삭제 이벤트
  const $deleteButton = e.target.closest(".content-row__delete-button");
  if ($deleteButton) {
    modalState.openModal({
      type: "delete",
      title: "해당 내역을 삭제하시겠습니까?",
      content: deleteModalTemplate(currentData),
      onConfirm: async () => {
        await transactionState.deleteTransaction(itemId);
        modalState.closeModal();
      },
    });
    return;
  }

  // 리스트 아이템 수정 이벤트
  inputFormState.setUpdateId(itemId);
  inputFormState.setAll(currentData);
  return;
};
