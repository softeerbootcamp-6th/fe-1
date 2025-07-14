import { saveEntriesToServer } from "../api/api.js";
import { sharedState } from "../state/state.js";
import { updateTotalAmounts } from "./totalAmount.js";

export function deleteEntries() {

    //이벤트 위임 방식
  document.getElementById("entry-list").addEventListener("click", (e) => {
    // 삭제 버튼 또는 내부 요소 클릭 시
    const deleteBtn = e.target.closest(".delete-btn");
    if (!deleteBtn) return;

    // 가장 가까운 entry-row 찾기
    const entryRow = deleteBtn.closest(".entry-row");
    const id = entryRow.dataset.id;

    if (!id) return;

    // DOM에서 삭제
    entryRow.remove();

    // 배열에서 삭제
    sharedState.entries = sharedState.entries.filter(entry => entry.id !== id);

    // // 서버에 저장
    // saveEntriesToServer(sharedState.entries)
    //   .then(() => console.log("Entry deleted and saved"))
    //   .catch(err => console.error("Failed to save after delete:", err));

    // updateTotalAmounts();
  });
}