import { store } from "../../../store/store.js";
import { createModal } from "../../modal.js";

/* 
  결제수단 관련 리스너를 등록하는 함수
  결제수단을 선택하거나 추가하는 로직이 들어가 있으며 변수이름이 맘에 들지 않아서 수정이 필요해 보인다.
  내부에 있는 함수를 밖으로 빼내도 좋을거 같고 리스너안에 너무 광활한 코드가 들어가 있어 로직을 함수로 빼낼 필요가 있어 보인다.
*/
export function initPaymentMethodListener() {
  let selectedMethod = store.getState().selectedMethod;

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
    const selectedMethod = newMethod;
    store.setState({ selectedMethod });
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
