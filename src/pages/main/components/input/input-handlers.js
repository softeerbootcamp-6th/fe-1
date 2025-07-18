import {
  formatAmountInput,
  updateAmountSign,
} from "../../../../utils/format-utils.js";
import {
  createNewItem,
  updateTransactionItem,
  processAmountSign,
} from "../../../../utils/data-utils.js";
import { editStore, editUtils } from "../../../../store/edit-mode-store.js";
import { toggleUtils } from "../../../../store/toggle-store.js";
import {
  updateFormValidation,
  getDropdownValue,
  setDropdownValue,
} from "../../utils/form-utils.js";
import { getTransactionById } from "../../../../api/transaction.js";
import { updateSubmitButtonState } from "../../utils/form-utils.js";
import { onDataChanged } from "../summary/summary-handlers.js";
import { transactionUtils } from "../../../../store/transaction-store.js";

// 토글 버튼 이벤트 리스너 설정
export function setupToggleListeners() {
  const toggleBtns = document.querySelectorAll(".toggle-icon");

  if (toggleBtns.length !== 2) return; // plus, minus 두 개만 있어야 함

  // data-type을 이용해서 정확히 가져오기
  const minusBtn = document.querySelector('.toggle-icon[data-type="minus"]');
  const plusBtn = document.querySelector('.toggle-icon[data-type="plus"]');

  if (!minusBtn || !plusBtn) return;

  // plusBtn만 클릭 이벤트 리스너 등록
  plusBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    // 현재 상태 확인
    const isMinusActive = minusBtn.classList.contains("active");

    if (isMinusActive) {
      // minus가 active면 plus로 변경
      minusBtn.classList.remove("active");
      plusBtn.classList.add("active");
      toggleUtils.setPlus();
    } else {
      // plus가 active면 minus로 변경
      plusBtn.classList.remove("active");
      minusBtn.classList.add("active");
      toggleUtils.setMinus();
    }

    // 입력 필드 클래스도 업데이트
    const amountInput = document.querySelector(".amount-input");
    if (amountInput) {
      amountInput.classList.remove("plus", "minus");
      amountInput.classList.add(toggleUtils.getCurrentToggleType());

      // 입력 필드에 값이 있으면 부호 적용
      if (amountInput.value && amountInput.value !== "") {
        updateAmountSign(toggleUtils.getCurrentToggleType(), amountInput);
      }
    }

    updateFormValidation();
  });
}

// 날짜 입력 필드 이벤트 리스너 설정
export function setupDateInputListeners() {
  const dateInput = document.querySelector(".date-input");
  if (!dateInput) return;

  // 기존 이벤트 리스너 제거
  dateInput.addEventListener("change", function () {
    updateFormValidation();
  });
}

// 금액 입력 필드 이벤트 리스너 설정
export function setupAmountInputListeners() {
  const amountInput = document.querySelector(".amount-input");
  if (!amountInput) return;

  // 기존 이벤트 리스너 제거
  amountInput.addEventListener("input", function (e) {
    formatAmountInput(e);
    updateFormValidation();
  });
}

// 내용 입력 필드 이벤트 리스너 설정
export function setupContentInputListeners() {
  const contentInput = document.querySelector(".input-cell.content input");
  const charCountSpan = document.querySelector(
    ".input-cell.content .char-count"
  );
  if (!contentInput || !charCountSpan) return;

  // 기존 이벤트 리스너 제거
  contentInput.addEventListener("input", function () {
    const maxLength = 32;
    const currentLength = this.value.length;
    charCountSpan.textContent = `${currentLength}/${maxLength}`;
    updateFormValidation();
  });
}

// 제출 버튼 이벤트 리스너 설정
export function setupAddButtonListeners() {
  const addBtn = document.querySelector(".input-cell.submit button");

  addBtn.addEventListener("click", async function () {
    const dateInput = document.querySelector(".date-input");
    const amountInput = document.querySelector(".amount-input");
    const contentInput = document.querySelector(".input-cell.content input");
    const methodDropdown = document.querySelector(
      ".input-cell.method .custom-dropdown"
    );
    const categoryDropdown = document.querySelector(
      ".input-cell.category .custom-dropdown"
    );
    const charCountSpan = document.querySelector(
      ".input-cell.content .char-count"
    );

    if (
      !dateInput ||
      !amountInput ||
      !contentInput ||
      !methodDropdown ||
      !categoryDropdown ||
      !charCountSpan
    ) {
      console.warn("Some form elements not found");
      return;
    }

    const date = dateInput.value;
    let amount = amountInput.value.replace(/,/g, "");
    const content = contentInput.value.trim();
    const method = getDropdownValue(methodDropdown);
    const category = getDropdownValue(categoryDropdown);
    const amountNum = processAmountSign(
      amount,
      toggleUtils.getCurrentToggleType()
    );

    // 데이터 검증 추가
    if (!date || !amount || !content || !method || !category) {
      alert("모든 항목을 올바르게 입력해 주세요.");
      return;
    }

    if (isNaN(amountNum)) {
      alert("올바른 금액을 입력해 주세요.");
      return;
    }

    if (editUtils.isEditMode()) {
      // 수정 모드 - transaction.js API 사용
      try {
        await updateTransactionItem(editStore.getState().editingItemId, {
          date,
          amount: amountNum,
          content,
          method,
          category,
        });
        await onDataChanged(); // 데이터 변경 후 summary 업데이트
      } catch (error) {
        console.error("거래 내역 수정 실패:", error);
        return;
      }
      cancelEditMode();
    } else {
      // 새 항목 추가 - transaction.js API 사용
      try {
        await createNewItem(date, amountNum, content, method, category);
        await onDataChanged(); // 데이터 변경 후 summary 업데이트
      } catch (error) {
        console.error("거래 내역 추가 실패:", error);
        return;
      }
    }

    // 입력 폼 초기화
    resetForm();
  });
}

// 폼 초기화 함수
export function resetForm() {
  const amountInput = document.querySelector(".amount-input");
  const contentInput = document.querySelector(".input-cell.content input");
  const methodDropdown = document.querySelector(
    ".input-cell.method .custom-dropdown"
  );
  const categoryDropdown = document.querySelector(
    ".input-cell.category .custom-dropdown"
  );
  const charCountSpan = document.querySelector(
    ".input-cell.content .char-count"
  );

  amountInput.value = "";
  contentInput.value = "";
  setDropdownValue(methodDropdown, "");
  setDropdownValue(categoryDropdown, "");
  charCountSpan.textContent = "0/32";

  // 토글 상태 초기화 - toggle-btn 기준으로 수정
  toggleUtils.setMinus();
  const toggleBtnContainer = document.querySelector(".toggle-btn");
  if (toggleBtnContainer) {
    const toggleBtns = toggleBtnContainer.querySelectorAll(".toggle-icon");
    toggleBtns.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.dataset.type === "minus") {
        btn.classList.add("active");
      }
    });
  }

  // 입력 필드 클래스도 초기화
  amountInput.classList.remove("plus", "minus");
  amountInput.classList.add("minus");

  updateFormValidation();
}

// 수정 모드 진입 함수
export function enterEditMode(itemId) {
  editUtils.enableEditMode();
  editStore.setState({ editingItemId: itemId });

  // store에서 현재 아이템 찾기 (불필요한 fetch 방지)
  const transactions = transactionUtils.getCurrentTransactions();
  const item = transactions.find((t) => t.id === itemId);

  if (!item) {
    console.error("거래 내역을 찾을 수 없습니다.");
    return;
  }

  const amountInput = document.querySelector(".amount-input");
  const contentInput = document.querySelector(".input-cell.content input");
  const methodDropdown = document.querySelector(
    ".input-cell.method .custom-dropdown"
  );
  const categoryDropdown = document.querySelector(
    ".input-cell.category .custom-dropdown"
  );
  const dateInput = document.querySelector(".date-input");
  const charCountSpan = document.querySelector(
    ".input-cell.content .char-count"
  );

      dateInput.value = item.date;

      const amountValue = Math.abs(item.amount).toLocaleString();
      amountInput.type = "text";
      amountInput.value = amountValue;

      contentInput.value = item.content;
      setDropdownValue(methodDropdown, item.method);
      setDropdownValue(categoryDropdown, item.category);

      const isIncome = item.amount > 0;
      toggleUtils.setToggleType(isIncome ? "plus" : "minus");

      const toggleBtns = document.querySelectorAll(".toggle-icon");
      toggleBtns.forEach((btn) => btn.classList.remove("active"));
      const activeToggle = document.querySelector(
        `[data-type="${toggleUtils.getCurrentToggleType()}"]`
      );
      if (activeToggle) activeToggle.classList.add("active");

      charCountSpan.textContent = `${contentInput.value.length}/32`;
      const milliSecond = 10;
      setTimeout(() => {
        updateFormValidation();
      }, milliSecond);
}

// 수정 모드 취소 함수
export function cancelEditMode() {
  editUtils.disableEditMode();
  editStore.setState({ editingItemId: null });

  const amountInput = document.querySelector(".amount-input");
  const contentInput = document.querySelector(".input-cell.content input");
  const methodDropdown = document.querySelector(
    ".input-cell.method .custom-dropdown"
  );
  const categoryDropdown = document.querySelector(
    ".input-cell.category .custom-dropdown"
  );
  const charCountSpan = document.querySelector(
    ".input-cell.content .char-count"
  );
  const addBtn = document.querySelector(".input-cell.submit button");

  amountInput.value = "";
  contentInput.value = "";
  setDropdownValue(methodDropdown, "");
  setDropdownValue(categoryDropdown, "");
  charCountSpan.textContent = "0/32";

  toggleUtils.setMinus();
  const toggleBtns = document.querySelectorAll(".toggle-icon");
  toggleBtns.forEach((btn) => btn.classList.remove("active"));
  const minusToggle = document.querySelector('[data-type="minus"]');
  if (minusToggle) minusToggle.classList.add("active");

  updateSubmitButtonState(addBtn, false);

  document
    .querySelectorAll(".history-item")
    .forEach((item) => item.classList.remove("edit-mode"));
}
