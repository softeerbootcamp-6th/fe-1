import { deleteEntry } from "../../api/api.js";
import { sharedState } from "../../state/state.js";
import { renderCategoryOptions } from "../categoryRender.js";
import { updateTotalAmounts } from "../totalAmount.js";
import { createModal } from "../../../components/modal.js";

export function deleteEntries() {
  //이벤트 위임 방식
  document.getElementById("entry-list").addEventListener("click", (e) => {
    // 삭제 버튼 또는 내부 요소 클릭 시
    const deleteBtn = e.target.closest(".delete-btn");
    if (!deleteBtn) {
      //수정
      const entryRow = e.target.closest(".entry-row");

      if (!entryRow) return;
      const id = Number(entryRow.dataset.id);
      const entry = sharedState.entries.find((entry) => entry.id === id);

      const toggleSign = document.getElementById("toggle-sign");
      if (entry.isIncome) {
        toggleSign.textContent = "+";
        toggleSign.classList.toggle("minus", !entry.isIncome);
        sharedState.isIncome = true;
        renderCategoryOptions();
      } else {
        toggleSign.textContent = "-";
        toggleSign.classList.toggle("minus", !entry.isIncome);
        sharedState.isIncome = false;
        renderCategoryOptions();
      }

      // 결제수단 표시
      document.getElementById("dropdown-display").textContent = entry.method;
      sharedState.selectedMethod = entry.method;

      // 카테고리 표시
      document.getElementById("category-display").textContent = entry.category;
      sharedState.selectedCategory = entry.category;

      document.getElementById("date").value = entry.date;
      document.getElementById("amount").value = entry.amount.toLocaleString();
      document.getElementById("desc").value = entry.desc;

      sharedState.entryId = entry.id; // sharedState에 entryId 저장

      return;
    }
    deleteBtn.addEventListener("click", (e) => {
      createModal({
        title: "삭제하시겠습니까?",
        confirmText: "삭제하기",
        cancelText: "취소",
        onConfirm: () => deleteEntryConfirm(deleteBtn),
      });
    });
  });
}

export function deleteEntryConfirm(deleteBtn) {
  const entrySection = deleteBtn.closest(".entry-date-section");
  if (!entrySection) return;

  // 가장 가까운 entry-row 찾기
  const entryRow = deleteBtn.closest(".entry-row");
  const id = entryRow.dataset.id;

  if (!id) return;

  // 삭제 확인 버튼 클릭 시
  // DOM에서 삭제
  entryRow.remove();
  if (entrySection.querySelectorAll(".entry-row").length === 0) {
    // entry-row가 하나도 없으면 entry-date-section도 삭제
    entrySection.remove();
  }
  // 배열에서 삭제
  sharedState.entries = sharedState.entries.filter((entry) => entry.id !== id);
  const date = entrySection.getAttribute("data-date");
  const yearMonth = date.split("-").slice(0, 2).join("-");
  deleteEntry(yearMonth, id);

  // 날짜 섹션의 수입/지출 합계 업데이트
  updateDateSectionTotals(date);

  // 전체 합계 업데이트
  updateTotalAmounts();

  // 캘린더 뷰 총액 업데이트
  import("../calendarTotalAmount.js").then((module) => {
    module.updateCalendarTotalAmount();
  });
}

// 특정 날짜의 수입/지출 합계 계산 및 업데이트 함수
export function updateDateSectionTotals(date) {
  const dateSection = document.querySelector(
    `.entry-date-section[data-date="${date}"]`
  );
  if (!dateSection) return;

  // 해당 날짜 섹션에서 수입/지출 항목 찾기
  const incomeItems = dateSection.querySelectorAll(".income-amount");
  const expenseItems = dateSection.querySelectorAll(".expense-amount");

  let incomeTotalAmount = 0;
  let expenseTotalAmount = 0;

  // 수입 항목이 있는지 확인 (필터링 상태도 고려)
  const hasIncomeEntries =
    incomeItems.length > 0 &&
    sharedState.showIncome &&
    Array.from(incomeItems).some(
      (item) => !item.closest(".entry-row").classList.contains("hidden-income")
    );

  // 지출 항목이 있는지 확인 (필터링 상태도 고려)
  const hasExpenseEntries =
    expenseItems.length > 0 &&
    sharedState.showExpense &&
    Array.from(expenseItems).some(
      (item) => !item.closest(".entry-row").classList.contains("hidden-expense")
    );

  // 수입 합계 계산
  incomeItems.forEach((item) => {
    if (!item.closest(".entry-row").classList.contains("hidden-income")) {
      const amount = parseInt(item.textContent.replace(/[^\d]/g, ""));
      incomeTotalAmount += amount;
    }
  });

  // 지출 합계 계산
  expenseItems.forEach((item) => {
    if (!item.closest(".entry-row").classList.contains("hidden-expense")) {
      const amount = parseInt(item.textContent.replace(/[^\d]/g, ""));
      expenseTotalAmount += amount;
    }
  });

  // 화면에 업데이트
  const dateIncomeAmount = dateSection.querySelector(".date-income-amount");
  const dateExpenseAmount = dateSection.querySelector(".date-expense-amount");
  const dateIncomeLabel = dateSection.querySelector(".date-income-label");
  const dateExpenseLabel = dateSection.querySelector(".date-expense-label");

  // 수입 부분 업데이트 및 표시/숨김 처리
  if (dateIncomeAmount && dateIncomeLabel) {
    dateIncomeAmount.textContent = `${incomeTotalAmount.toLocaleString()}원`;

    // 수입 항목이 없으면 숨김
    dateIncomeAmount.classList.toggle("hidden", !hasIncomeEntries);
    dateIncomeLabel.classList.toggle("hidden", !hasIncomeEntries);
  }

  // 지출 부분 업데이트 및 표시/숨김 처리
  if (dateExpenseAmount && dateExpenseLabel) {
    dateExpenseAmount.textContent = `${expenseTotalAmount.toLocaleString()}원`;

    // 지출 항목이 없으면 숨김
    dateExpenseAmount.classList.toggle("hidden", !hasExpenseEntries);
    dateExpenseLabel.classList.toggle("hidden", !hasExpenseEntries);
  }
}

export async function getDateFromServer(entry) {
  const entryList = document.getElementById("entry-list");

  const dateObj = new Date(entry.date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][dateObj.getDay()];
  const dateLabel = `${month}월 ${day}일 ${weekday}요일`;

  let dateSection = entryList.querySelector(`[data-date="${entry.date}"]`);
  if (!dateSection) {
    dateSection = document.createElement("div");
    dateSection.className = "entry-date-section";
    dateSection.setAttribute("data-date", entry.date);
    dateSection.innerHTML = `
        <div class="entry-sort">
          <div>${dateLabel}</div>
          <div class="entry-amount-section">
            <div class="date-income-label">수입</div>
            <div class="date-income-amount">0원</div>
            <div class="date-expense-label">지출</div>
            <div class="date-expense-amount">0원</div>
          </div>
        </div>
        <div class="entry-items"></div>
      `;
    entryList.insertBefore(dateSection, entryList.firstChild);
  }

  // 새 항목 DOM에 추가
  const entryItems = dateSection.querySelector(".entry-items");
  const item = document.createElement("div");
  item.className = "entry-row";

  // 수입이면 + 기호, 지출이면 - 기호 표시
  const sign = entry.isIncome ? "" : "-";
  const amountClass = entry.isIncome ? "income-amount" : "expense-amount";

  const category = {
    생활: "--colorchip-90",
    식비: "--colorchip-60",
    교통: "--colorchip-70",
    "쇼핑/뷰티": "--colorchip-30",
    "의료/건강": "--colorchip-50",
    "문화/여가": "--colorchip-100",
    미분류: "--colorchip-110",
    월급: "--colorchip-20",
    용돈: "--colorchip-40",
    기타수입: "--colorchip-10",
  };

  item.setAttribute("data-id", entry.id);

  item.innerHTML = `
      <div class="entry-category ${category[entry.category]}">${
    entry.category
  }</div>
      <div class="entry-desc">${entry.desc}</div>
      <div class="entry-method">${entry.method}</div>
      <div class="entry-amount-delete">
        <div class="entry-amount ${amountClass}">${sign}${entry.amount.toLocaleString()}원</div>
        <div class="delete-btn">
          <div class="delete-icon-wrapper">
          <img src="../../assets/icons/delete-botton.svg" alt="삭제" class="delete-icon"></img>
          삭제
          </div>
        </div>
      </div>
    `;
  entryItems.appendChild(item);
  // 항목을 추가한 후 해당 날짜의 수입/지출 금액 합계 업데이트
  updateDateSectionTotals(entry.date);
}
