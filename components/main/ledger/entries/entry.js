import { deleteEntry } from "../../../../api.js";
import { sharedState } from "../../../../store/state.js";
import { renderCategoryOptions } from "../../../inputForm/inputFormItems/categoryRender.js";
import { updateTotalAmounts } from "../totalAmount/totalAmount.js";
import { createModal } from "../../../modal.js";
import { store } from "../../../../store/store.js";

export function deleteEntry() {
  //이벤트 위임 방식
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
  deleteEntry(yearMonth, id);

  updateDateSectionTotals(date);

  updateTotalAmounts();

  import("../../calendar/calendarTotalAmount.js").then((module) => {
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
  // 결제수단 표시
  document.getElementById("dropdown-display").textContent = entry.method;

  // sharedState.selectedMethod = entry.method;

  // 카테고리 표시
  document.getElementById("category-display").textContent = entry.category;
  // sharedState.selectedCategory = entry.category;

  store.setState({
    isIncome: entry.isIncome,
    selectedMethod: entry.method,
    selectedCategory: entry.category,
    entryId: entry.id, // 수정 ID 설정
  });

  document.getElementById("date").value = entry.date;
  document.getElementById("amount").value = entry.amount.toLocaleString();
  document.getElementById("desc").value = entry.desc;

  // sharedState.entryId = entry.id; // sharedState에 entryId 저장
  store.setState({ entryId: entry.id }); // store에 entryId 저장

  return;
}
