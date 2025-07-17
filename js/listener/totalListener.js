import { sharedState } from "../state/state.js";
import { initCategoryListener } from "./category.js";
import { initDescriptionListener } from "./description.js";
import { initAmountListener } from "./amount.js";
import { initToggleSignListener } from "./toggleSign.js";
import { createModal } from "../../components/modal.js";

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

  const display = document.getElementById("dropdown-display"); // sharedState에서 dropdownDisplay 요소를 가져옴
  const panel = document.getElementById("dropdown-panel"); // sharedState에서 dropdownPanel 요소를 가져옴
  const dropAddBtn = document.getElementById("dropdown-add"); // sharedState에서 dropdownAddBtn

  const methodWrapper = document.getElementById("method-wrapper"); // sharedState에서 methodWrapper 요소를 가져옴

  // 결제수단 드롭박스
  display.addEventListener("click", () => {
    panel.classList.toggle("hidden");
  });

  //결제수단 추가 버튼 클릭 시 모달 열기
  dropAddBtn.addEventListener("click", () => {
    createModal({
      title: "결제수단 추가",
      confirmText: "추가하기",
      cancelText: "취소",
      onConfirm: () => addNewMethod(),
      onCancel: () => console.log("결제수단 추가 취소"),
      children: `
            <input type="text" id="new-method" placeholder="예: 우리카드" />
          `,
    });
    panel.classList.add("hidden");
  });

  //새 결제수단 추가
  function addNewMethod() {
    const newMethod = document.getElementById("new-method").value.trim();
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
  }

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
