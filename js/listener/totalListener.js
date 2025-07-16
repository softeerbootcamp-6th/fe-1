import { sharedState } from "../state/state.js";
import { renderCategoryOptions } from "../function/categoryRender.js";

export function initListener() {
    let selectedMethod = sharedState.selectedMethod; // sharedState에서 selectedMethod 요소를 가져옴
    let selectedCategory = sharedState.selectedCategory; // sharedState에서 selectedCategory 요소를 가져옴
    let isIncome = sharedState.isIncome; // 수입/지출 여부를 sharedState에서 가져옴
    const toggleSign = sharedState.toggleSign; // sharedState에서 toggleSign 요소를 가져옴

    const display = sharedState.dropdownDisplay; // sharedState에서 dropdownDisplay 요소를 가져옴
    const panel = sharedState.dropdownPanel; // sharedState에서 dropdownPanel 요소를 가져옴
    const dropAddBtn = sharedState.dropdownAddBtn; // sharedState에서 dropdownAddBtn

    const amountInput = sharedState.amount; // sharedState에서 amount 요소를 가져옴
    const charCount = sharedState.charCount; // sharedState에서 charCount 요소를 가져옴
    const descInput = sharedState.descInput; // sharedState에서 descInput 요소를 가져옴

    const modal = sharedState.modal; // sharedState에서 modal 요소를 가져옴
    const confirmAdd = sharedState.confirmAdd; // sharedState에서 confirmAdd 요소를 가져
    const cancelAdd = sharedState.cancelAdd; // sharedState에서 cancelAdd 요소를 가져옴
    const newMethodInput = sharedState.newMethodInput; // sharedState에서 newMethodInput
    const methodWrapper = sharedState.methodWrapper; // sharedState에서 methodWrapper 요소를 가져옴

    const categoryWrapper = sharedState.categoryWrapper; // sharedState에서 categoryWrapper 요소를 가져옴
    const categoryDisplay = sharedState.categoryDisplay; // sharedState에서 categoryDisplay 요소를 가져옴
    const categoryPanel = sharedState.categoryPanel; // sharedState에서 categoryPanel 요소

    toggleSign.addEventListener("click", () => {
      isIncome = !isIncome;
      sharedState.isIncome = isIncome; // sharedState에 isIncome 업데이트
      toggleSign.textContent = isIncome ? "+" : "-";
      toggleSign.classList.toggle("minus", !isIncome);
      categoryDisplay.textContent = "선택하세요";
      selectedCategory = null;
      sharedState.selectedCategory = selectedCategory; // sharedState에 selectedCategory 업데이트
      renderCategoryOptions();
    });
  
    //금액에 숫자만 입력되도록 필터링하고, 천 단위로 콤마 추가
    amountInput.addEventListener("input", () => {
      const rawValue = amountInput.value.replace(/[^\d]/g, "");
      amountInput.value = rawValue ? Number(rawValue).toLocaleString() : "";
    });
  
    //내용 32자 제한
    descInput.addEventListener("input", () => {
      const length = descInput.value.length;
      charCount.textContent = `${length} / 32`;
    });
  
    //결제수단 드롭박스
    display.addEventListener("click", () => {
      panel.classList.toggle("hidden");
    });
  
    //결제수단 추가 버튼 클릭 시 모달 열기
    dropAddBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
      newMethodInput.value = "";
      panel.classList.add("hidden");
    });
  
    //모달 닫기 버튼 클릭 시 모달 닫기
    cancelAdd.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  
    //새 결제수단 추가
    confirmAdd.addEventListener("click", () => {
      const newMethod = newMethodInput.value.trim();
      if (!newMethod) {
        alert("결제수단을 입력해주세요.");
        return;
      }
  
      const option = document.createElement("div");
      option.className = "dropdown-option";
      option.dataset.value = newMethod;
      option.innerHTML = `<span>${newMethod}</span><button class="delete-btn">❌</button>`;
      panel.insertBefore(option, dropAddBtn);
  
      display.textContent = newMethod;
      selectedMethod = newMethod;
      sharedState.selectedMethod = selectedMethod; // sharedState에 selectedMethod 업데이트
      modal.classList.add("hidden");
    });
  
    document.addEventListener("click", (e) => {
      if (!methodWrapper.contains(e.target)) {
        panel.classList.add("hidden");
      }
      if (!categoryWrapper.contains(e.target)) {
        categoryPanel.classList.add("hidden");
      }
    });
  
    panel.addEventListener("click", (e) => {
      const optionDiv = e.target.closest(".dropdown-option");
      if (!optionDiv) return;
  
      const methodName = optionDiv.dataset.value;
  
      if (e.target.classList.contains("delete-btn")) {
        optionDiv.remove();
        if (selectedMethod === methodName) {
          display.textContent = "선택하세요";
          selectedMethod = null;
        }
      } else {
        display.textContent = methodName;
        selectedMethod = methodName;
        panel.classList.add("hidden");
      }
    });
  
    categoryDisplay.addEventListener("click", () => {
      categoryPanel.classList.toggle("hidden");
    });
  
    categoryPanel.addEventListener("click", (e) => {
      if (e.target.classList.contains("dropdown-option")) {
        selectedCategory = e.target.dataset.value;
        sharedState.selectedCategory = selectedCategory; // sharedState에 selectedCategory 업데이트
        categoryDisplay.textContent = selectedCategory;
        categoryPanel.classList.add("hidden");
      }
    });
  
}