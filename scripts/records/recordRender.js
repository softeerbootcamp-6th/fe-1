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

  // 해당 페이지에 렌더링할 섹션을 담을 document fragment 생성
  const fragment = document.createDocumentFragment();

  // 데이터 날짜순 정렬
  const sortedRecords = records.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  sortedRecords.forEach((record) => {
    //"YYYY-MM-DD" 에서 YYYY와 MM 추출 후 헤더의 날짜와 비교해서 같은 값만 호출
    let year = date.split("-")[0];
    let month = date.split("-")[1];

    if (Number(currentYear) !== Number(year) || Number(currentMonth) !== Number(month)) return;

    // 수입/지출 필터링
    const filteredItems = record.items.filter((item) => {
      return item.amount < 0 ? filter.outcome : filter.income;
    });
    if (filteredItems.length > 0) {
      const section = renderRecordByDate({
        dateId: record.id,
        date: record.date,
        items: filteredItems,
      });
      fragment.appendChild(section);
    }
  });

  recordContainerEl.appendChild(fragment);
};

// 상단 해당 월의 총 내역 건수와 지출/수입 금액의 합을 렌더링
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

// 받아온 날짜의 내역 섹션을 생성
export const renderRecordByDate = ({ dateId, date, items }) => {
  // section 태그 생성
  const containerEl = document.createElement("div");
  containerEl.className = "record-container";
  containerEl.setAttribute("date-id", dateId);

  // 헤더 - 날짜 + 수입/지출 금액 합계
  const headerEl = document.createElement("div");
  headerEl.className = "record-header";

  const dateEl = document.createElement("div");
  dateEl.className = "record-date font-serif-14";
  dateEl.textContent = getFormattedDate(date);

  const amountEl = document.createElement("div");
  amountEl.className = "record-amount font-serif-14";
  const { income, outcome } = getTotalAmount(items);
  if (income) amountEl.innerHTML += `수입 ${formatWithComma(income)}원`;
  if (outcome) amountEl.innerHTML += `지출 ${formatWithComma(outcome)}원`;

  headerEl.appendChild(dateEl);
  headerEl.appendChild(amountEl);

  containerEl.appendChild(headerEl);

  // 아이템 목록
  items.forEach((item) => {
    const itemEl = generateItemEl(item);
    container.appendChild(itemEl);
  });
};

// 아이템 배열을 순회하며 html태그로 만들어주는 함수
export const generateItemEl = (item) => {
  const sign = item.amount < 0 ? "minus" : "plus"; // 부호별 색상 변경을 위해 css 클래스 이름 지정
  const recordItemEl = document.createElement("div");
  recordItemEl.className = `record-item`;
  recordItemEl.setAttribute("item-id", item.id);

  recordItemEl.innerHTML = `
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
      </div>`;
  return recordItemEl;
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
