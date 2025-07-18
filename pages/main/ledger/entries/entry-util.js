import { sharedState } from "../../../../store/state.js";
import { category } from "../../../../setting/config.js";

/* 
  getDateFromServer(entry)
  - 서버에서 받아온 entry 객체를 기반으로 entry list항목을 추가하는 기능
  이건 렌더링으로 이름을 바꾸는게 좋아 보인다.

  renderOneEntiry(entry)로 변경함
  
*/
export async function renderOneEntiry(entry) {
  const entryList = document.getElementById("entry-list");

  const dateObj = new Date(entry.date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][dateObj.getDay()];
  const dateLabel = `${month}월 ${day}일 ${weekday}요일`;

  let dateSection = entryList.querySelector(`[data-date="${entry.date}"]`);
  if (!dateSection) {
    dateSection = createEntryDateSection(
      entryList,
      dateSection,
      dateLabel,
      entry
    );
  }
  const entryItems = dateSection.querySelector(".entry-items");
  const item = document.createElement("div");
  item.className = "entry-row";

  const sign = entry.isIncome ? "" : "-";
  const amountClass = entry.isIncome ? "income-amount" : "expense-amount";

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

/* 
  dateSection이 존재하지 않는 경우 entry-date-section를 만들어서 렌더링하는 함수
*/
function createEntryDateSection(entryList, dateSection, dateLabel, entry) {
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
  return dateSection;
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
