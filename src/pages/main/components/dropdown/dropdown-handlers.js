import { showModal } from "../../../../layouts/modal/modal.js";
import {
  getDropdownValue,
  setDropdownValue,
  updateFormValidation,
} from "../../utils/form-utils.js";

// 결제 수단 배열 초기화 (정적 데이터)
const paymentMethods = ["현금", "신용카드"];

// 드롭다운 관련 함수들
export function setupCustomDropdowns() {
  const dropdowns = document.querySelectorAll(".custom-dropdown");

  dropdowns.forEach((dropdown) => {
    const selected = dropdown.querySelector(".dropdown-selected");
    const options = dropdown.querySelector(".dropdown-options");
    const dropdownType = dropdown.dataset.type;

    selected.addEventListener(
      "click",
      (e) => {
        e.preventDefault(); // 기본 동작 방지
        e.stopPropagation(); // 이벤트 버블링 방지
        e.stopImmediatePropagation(); // 즉시 전파 중단

        const isActive = selected.classList.contains("active");

        // 다른 드롭다운들만 닫기
        dropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            const otherSelected =
              otherDropdown.querySelector(".dropdown-selected");
            const otherOptions =
              otherDropdown.querySelector(".dropdown-options");
            otherSelected.classList.remove("active");
            otherOptions.classList.remove("show");
          }
        });

        // 현재 드롭다운 토글
        if (!isActive) {
          selected.classList.add("active");
          options.classList.add("show");
          if (dropdownType === "method") updatePaymentMethodOptions(dropdown);
        } else {
          selected.classList.remove("active");
          options.classList.remove("show");
        }
      },
      { once: false, passive: false }
    ); // 이벤트 옵션 명시

    options.addEventListener("click", (e) => {
      e.stopPropagation(); // 옵션 클릭 시 버블링 방지

      const option = e.target.closest(".dropdown-option");
      const deleteBtn = e.target.closest(".delete-btn");

      if (!option) return;

      if (deleteBtn) {
        e.stopPropagation();
        handleDeletePaymentMethod(deleteBtn);
      } else if (option.classList.contains("add-option")) {
        handleAddPaymentMethod(dropdown);
      } else {
        selectDropdownOption(dropdown, option);
      }
    });
  });

  // 문서 클릭 시 드롭다운 닫기 (이벤트 위임 사용)
  document.addEventListener(
    "click",
    (e) => {
      if (!e.target.closest(".custom-dropdown")) {
        closeAllDropdowns();
      }
    },
    { passive: true }
  );
}

// 모든 드롭다운 닫기 (특정 드롭다운 제외)
export function closeAllDropdowns(excludeDropdown = null) {
  document.querySelectorAll(".dropdown-selected").forEach((selected) => {
    if (
      excludeDropdown &&
      selected.closest(".custom-dropdown") === excludeDropdown
    ) {
      return; // 제외할 드롭다운은 건너뛰기
    }
    selected.classList.remove("active");
  });
  document.querySelectorAll(".dropdown-options").forEach((options) => {
    if (
      excludeDropdown &&
      options.closest(".custom-dropdown") === excludeDropdown
    ) {
      return; // 제외할 드롭다운은 건너뛰기
    }
    options.classList.remove("show");
  });
}

// 드롭다운 옵션 선택
export function selectDropdownOption(dropdown, option) {
  const selected = dropdown.querySelector(".dropdown-selected .selected-text");
  const value = option.dataset.value;

  dropdown
    .querySelectorAll(".dropdown-option")
    .forEach((opt) => opt.classList.remove("selected"));
  option.classList.add("selected");

  const optionText = option.querySelector("span")
    ? option.querySelector("span").textContent
    : option.textContent;
  selected.textContent = optionText;

  closeAllDropdowns();
  updateFormValidation();
}

// 결제 수단 옵션 업데이트
export function updatePaymentMethodOptions(dropdown) {
  const options = dropdown.querySelector(".dropdown-options");
  const currentValue = dropdown.querySelector(".selected-text").textContent;

  options.innerHTML = `
    <div class="dropdown-option" data-value=""><span>선택하세요</span></div>
    ${paymentMethods
      .map(
        (method) => `
      <div class="dropdown-option" data-value="${method}">
        <span>${method}</span>
        <div class="edit-actions">
          <button class="delete-btn">
            <img src="assets/icons/red-closed.svg" alt="delete" class="delete-icon" />
          </button>
        </div>
      </div>
    `
      )
      .join("")}
    <div class="dropdown-option add-option">
      <img src="assets/icons/plus.svg" alt="add" class="add-icon" />
      <span>추가하기</span>
    </div>
  `;

  if (currentValue && currentValue !== "선택하세요") {
    const selectedOption = options.querySelector(
      `[data-value="${currentValue}"]`
    );
    if (selectedOption) selectedOption.classList.add("selected");
  }
}

// 결제 수단 추가
export function handleAddPaymentMethod(dropdown) {
  showModal("새로운 결제 수단 추가", "결제 수단을 입력하세요", (inputValue) => {
    if (inputValue && inputValue.trim()) {
      const trimmedName = inputValue.trim();
      if (!paymentMethods.includes(trimmedName)) {
        paymentMethods.push(trimmedName);
        updatePaymentMethodOptions(dropdown);
      } else {
        alert("이미 존재하는 결제 수단입니다.");
      }
    }
  });
}

// 결제 수단 삭제
export function handleDeletePaymentMethod(deleteBtn) {
  const option = deleteBtn.closest(".dropdown-option");
  const value = option.dataset.value;

  if (confirm(`'${value}' 결제 수단을 삭제하시겠습니까?`)) {
    const index = paymentMethods.indexOf(value);
    if (index !== -1) {
      paymentMethods.splice(index, 1);
      const dropdown = deleteBtn.closest(".custom-dropdown");
      const selectedText = dropdown.querySelector(".selected-text");
      if (selectedText.textContent === value)
        selectedText.textContent = "선택하세요";
      updatePaymentMethodOptions(dropdown);
      updateFormValidation();
    }
  }
}
