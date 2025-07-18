// 입력받은 정보를 토대로 삽입 / 수정 / 삭제 기능을 담당하는 함수들을 다루는 파일
import { elements } from "../elements.js";
import { recordStore } from "../../store/recordStore.js";
import { filterState } from "../state/filterState.js";

// records 배열의 각 날짜별로 section을 만드는 함수
export const renderRecords = (
  currentYear,
  currentMonth,
  records,
  filter = { income: true, outcome: true }
) => {
  // 이전 렌더링 초기화
  const recordContainerEl = elements.recordContainerEl();
  recordContainerEl.innerHTML = "";

  // 데이터 날짜순 정렬
  const sortedRecords = recordStore
    .getRecords()
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  sortedRecords.forEach((record) => {
    const date = record.date;
    //"YYYY-MM-DD" 에서 YYYY와 MM 추출 후 헤더의 날짜와 비교해서 같은 값만 호출
    let year = date.split("-")[0];
    let month = date.split("-")[1];
    let dateId = record.id;
    if (Number(currentYear) === Number(year) && Number(currentMonth) === Number(month)) {
      const filteredItems = record.items.filter((item) => {
        if (item.amount < 0 && filter.outcome) return true;
        if (item.amount >= 0 && filter.income) return true;
        return false;
      });
      if (filteredItems.length > 0) {
        renderRecordByDate({ dateId, date, items: filteredItems });
      }
    }
  });
};

// 상단 총 내역 건수와 지출/수입 금액의 합을 렌더링
export const renderRecordHeader = (currentYear, currentMonth, records) => {
  let totalIncome = 0;
  let totalOutcome = 0;
  let itemCount = 0;

  records.forEach((record) => {
    const [year, month] = record.date.split("-");
    if (Number(year) === Number(currentYear) && Number(month) === Number(currentMonth)) {
      record.items.forEach((item) => {
        if (item.amount < 0) {
          totalOutcome += Math.abs(item.amount);
        } else {
          totalIncome += Number(item.amount);
        }
        itemCount += 1;
      });
    }
  });
  const totalAmountEl = elements.totalAmountEl();
  totalAmountEl.innerHTML = `
      <p class="font-light-12 total-count">전체 내역</p>
      <p class="font-light-12 count">${itemCount}건</p>

      <div class="font-light-12 total-income">
        <button class="income-filter">
          <img src="../assets/icons/checkbox.svg" alt="checkbox" />
        </button>
        <p>수입 ${formatWithComma(totalIncome)}원</p>
      </div>

      <div class="font-light-12 total-outcome">
        <button class="outcome-filter">
          <img src="../assets/icons/checkbox.svg" alt="checkbox" />
        </button>
        <p>지출 ${formatWithComma(totalOutcome)}원</p>
      </div>`;

  initVisibleButton();
};

// 날짜와 데이터를 받아와서 섹션을 렌더링
export const renderRecordByDate = ({ dateId, date, items }) => {
  const formattedDate = getFormattedDate(date);
  const recordsHTML = generateRecordHTML(items);
  // 해당 날짜의 총 지출/수입을 구하기 위한 코드
  const { income, outcome } = getTotalAmount(items);
  let incomeContent = "";
  let outcomeContent = "";
  if (income !== 0) incomeContent = `수입 ${formatWithComma(income)}원`;
  if (outcome !== 0) outcomeContent = `지출 ${formatWithComma(outcome)}원`;

  const recordContainerEl = elements.recordContainerEl();
  recordContainerEl.innerHTML += `
    <div class="record-container" date-id="${dateId}">
      <div class="record-header">
        <div class="record-date font-serif-14">${formattedDate}</div>
        <div class="record-amount font-serif-14">${incomeContent}  ${outcomeContent}</div>
      </div> ${recordsHTML}
    </div>
  `;
};

// 아이템 배열을 순회하며 html태그로 만들어주는 함수
export const generateRecordHTML = (items) => {
  let itemsHTML = "";
  let sign = "minus"; // or "plus", 금액의 지출/수입 여부

  items.forEach((item) => {
    if (item.amount < 0) {
      sign = "minus";
    } else {
      sign = "plus";
    }
    itemsHTML += `
      <div class="record-item" item-id="${item.id}">
        <div class="category font-light-12 ${item.category.replace(/\s+/g, "")}">${
      item.category
    }</div>
        <div class="description font-light-14">${item.description}</div>
        <div class="payment font-light-14">${item.payment}</div>
        <div class="amount font-light-14 ${sign}">${formatWithComma(item.amount)}</div>
        <div class="delete font-semibold-12">
          <div class="delete-button-wrapper">
          <img src="../assets/icons/closed.svg" class="delete-icon" alt="삭제" />
        </div>
      삭제
      </div>
      </div>`;
  });
  return itemsHTML;
};

// 날짜 데이터를 출력 포맷으로 바꿔주는 함수
export const getFormattedDate = (dateStr) => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayIndex = date.getDay();

  const koreanDayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  return `${month}월 ${day}일 ${koreanDayNames[dayIndex]}`;
};

// 숫자 데이터에 3자리마다 쉼표(,) 추가하는 함수
export const formatWithComma = (num) => {
  if (typeof num === "number") num = String(num);
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 날짜 별 수입, 지출의 합을 구해주는 함수
export const getTotalAmount = (items) => {
  let income = 0;
  let outcome = 0;

  items.forEach((item) => {
    if (item.amount < 0) {
      outcome += Math.abs(item.amount);
    } else {
      income += Number(item.amount);
    }
  });

  return { income, outcome };
};

// 전체 내역 수입 지출 필터링
const toggleRecordVisibility = (type) => {
  const headerEl = elements.headerEl();
  const yearEl = headerEl.querySelector(".year");
  const monthEl = headerEl.querySelector(".month");
  const totalDiv =
    type === "income" ? elements.incomeFilterButtonEl() : elements.outcomeFilterButtonEl();

  // 상태 토글 (수입/지출 필터링)
  filterState.toggle(type);

  const isVisible = type === "income" ? filterState.incomeVisible : filterState.outcomeVisible;
  totalDiv.innerHTML = `
    <img src="../assets/icons/${isVisible ? "checkbox" : "uncheckbox"}.svg" alt="checkbox"/>
  `;

  renderRecords(yearEl.textContent, monthEl.textContent, recordStore.getRecords(), {
    income: filterState.incomeVisible,
    outcome: filterState.outcomeVisible,
  });
};

export function initVisibleButton() {
  const incomeButtonEl = elements.incomeFilterDivEl();
  const outcomeButtonEl = elements.outcomeFilterDivEl();

  incomeButtonEl.addEventListener("click", (e) => {
    toggleRecordVisibility("income");
  });

  outcomeButtonEl.addEventListener("click", (e) => {
    toggleRecordVisibility("outcome");
  });
}
