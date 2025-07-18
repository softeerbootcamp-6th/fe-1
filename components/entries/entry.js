import { deleteEntryToServer } from "../../api.js";
import { sharedState } from "../../store/state.js";
import { renderCategoryOptions } from "../inputForm/inputFormItems/categoryRender.js";
import { updateTotalAmounts } from "../totalAmount/totalAmount-util.js";
import { createModal } from "../modal.js";
import { store } from "../../store/store.js";
import { updateDateSectionTotals } from "./entryTotalAmount.js";

/* 
  엔트리 삭제 기능 deleteEntry()
  이 함수는 엔트리 리스트에서 삭제 버튼을 클릭했을 때 실행된다.
  삭제버튼이 아니면 수정 로직이 수행 된다.
*/
export function deleteEntry() {
  document.getElementById("entry-list").addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-btn");

    if (deleteBtn) {
      createModal({
        title: "삭제하시겠습니까?",
        confirmText: "삭제하기",
        cancelText: "취소",
        onConfirm: () => deleteEntryConfirm(deleteBtn),
      });
    } else {
      updatelist(e);
    }
  });
}

export function deleteEntryConfirm(deleteBtn) {
  const entrySection = deleteBtn.closest(".entry-date-section");
  if (!entrySection) return;

  const entryRow = deleteBtn.closest(".entry-row");
  const id = entryRow.dataset.id;

  if (!id) return;

  entryRow.remove();
  if (entrySection.querySelectorAll(".entry-row").length === 0) {
    entrySection.remove();
  }
  sharedState.entries = sharedState.entries.filter((entry) => entry.id !== id);
  const date = entrySection.getAttribute("data-date");
  const yearMonth = date.split("-").slice(0, 2).join("-");
  deleteEntryToServer(yearMonth, id);

  updateDateSectionTotals(date);

  updateTotalAmounts();

  import("../../pages/main/calendar/calendarTotalAmount.js").then((module) => {
    module.updateCalendarTotalAmount();
  });
}

function updatelist(e) {
  const entryRow = e.target.closest(".entry-row");

  if (!entryRow) return;
  const id = Number(entryRow.dataset.id);
  const entry = sharedState.entries.find((entry) => entry.id === id);

  const toggleSign = document.getElementById("toggle-sign");
  if (entry.isIncome) {
    toggleSign.textContent = "+";
    toggleSign.classList.toggle("minus", !entry.isIncome);
    store.setState({ isIncome: true });
    renderCategoryOptions();
  } else {
    toggleSign.textContent = "-";
    toggleSign.classList.toggle("minus", !entry.isIncome);
    store.setState({ isIncome: false });
    renderCategoryOptions();
  }
  document.getElementById("dropdown-display").textContent = entry.method;
  document.getElementById("category-display").textContent = entry.category;

  store.setState({
    isIncome: entry.isIncome,
    selectedMethod: entry.method,
    selectedCategory: entry.category,
    entryId: entry.id, // 수정 ID 설정
  });

  document.getElementById("date").value = entry.date;
  document.getElementById("amount").value = entry.amount.toLocaleString();
  document.getElementById("desc").value = entry.desc;

  store.setState({ entryId: entry.id }); // store에 entryId 저장

  return;
}
