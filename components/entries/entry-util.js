import { category } from "../../setting/config.js";
import { updateDateSectionTotals } from "./entryTotalAmount.js";

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
    dateSection = createEntryDateSection(dateSection, dateLabel, entry);
    entryList.insertBefore(dateSection, entryList.firstChild);
  }
  const entryItems = dateSection.querySelector(".entry-items");
  const item = createEntryRow(entry);
  entryItems.appendChild(item);
  // 항목을 추가한 후 해당 날짜의 수입/지출 금액 합계 업데이트
  updateDateSectionTotals(entry.date);
}

/* 
  dateSection이 존재하지 않는 경우 entry-date-section를 만들어서 렌더링하는 함수
*/
function createEntryDateSection(dateSection, dateLabel, entry) {
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
  return dateSection;
}
/* 
  entry-row를 만들어서 렌더링하는 함수
*/
function createEntryRow(entry) {
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

  return item;
}
