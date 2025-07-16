import { sharedState } from "../state/state.js";
import { initCategoryListener } from "./category.js";
import { initDescriptionListener } from "./description.js";
import { initAmountListener } from "./amount.js";
import { initToggleSignListener } from "./toggleSign.js";

//리스너 등록
function initTotalListener() {
    initCategoryListener();
    initDescriptionListener();
    initAmountListener();
    initToggleSignListener();
}

// 이벤트 위임 방식으로 처리하면 좋아 보임
export function initListener() {

    initTotalListener();

    let selectedMethod = sharedState.selectedMethod; // sharedState에서 selectedMethod 요소를 가져옴

    const display = sharedState.dropdownDisplay; // sharedState에서 dropdownDisplay 요소를 가져옴
    const panel = sharedState.dropdownPanel; // sharedState에서 dropdownPanel 요소를 가져옴
    const dropAddBtn = sharedState.dropdownAddBtn; // sharedState에서 dropdownAddBtn

    const modal = sharedState.modal; // sharedState에서 modal 요소를 가져옴
    const confirmAdd = sharedState.confirmAdd; // sharedState에서 confirmAdd 요소를 가져
    const cancelAdd = sharedState.cancelAdd; // sharedState에서 cancelAdd 요소를 가져옴
    const newMethodInput = sharedState.newMethodInput; // sharedState에서 newMethodInput
    const methodWrapper = sharedState.methodWrapper; // sharedState에서 methodWrapper 요소를 가져옴

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
  
}