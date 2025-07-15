// 입력받은 정보를 토대로 삽입 / 수정 / 삭제 기능을 담당하는 함수들을 다루는 파일
import { elements } from "./elements.js";
import { store } from "./store.js";

// 상단 토글 버튼 상태를 위한 변수
let incomeVisible = true;
let outcomeVisible = true;

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

  // 현재 헤더의 날짜에 해당하는 date값만 함수 호출
  records.forEach((record) => {
    const date = record.date;
    //"YYYY-MM-DD" 에서 YYYY와 MM 추출 후 헤더의 날짜와 비교해서 같은 값만 호출
    let year = date.split("-")[0];
    let month = date.split("-")[1];
    if (Number(currentYear) === Number(year) && Number(currentMonth) === Number(month)) {
      const filteredItems = record.items.filter((item) => {
        if (item.amount < 0 && filter.outcome) return true;
        if (item.amount >= 0 && filter.income) return true;
        return false;
      });
      if (filteredItems.length > 0) {
        renderRecordByDate({ date, items: filteredItems });
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
          totalIncome += item.amount;
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
export const renderRecordByDate = ({ date, items }) => {
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
    <div class="record-container">
      <div class="record-header">
        <div class="record-date">${formattedDate}</div>
        <div class="record-amount">${incomeContent}  ${outcomeContent}</div>
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
      <div class="record-item">
        <div class="category ${item.category.replace(/\s+/g, "")}">${item.category}</div>
        <div class="description">${item.description}</div>
        <div class="payment">${item.payment}</div>
        <div class="amount ${sign}">${formatWithComma(item.amount)}</div>
        
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
      income += item.amount;
    }
  });

  return { income, outcome };
};

export const addRecord = ({ recordId, date, item }) => {
  // record에 추가하려는 날짜에 대한 정보가 이미 있나 확인
  const foundRecord = store.getRecords().find((record) => record.date === date);

  if (foundRecord) {
    // 이미 있는 날짜라면 해당 날짜의 items 배열에 추가
    foundRecord.items.push(item);
  } else {
    // 없는 날짜라면 record에 날짜 포함한 새 객체 생성
    store.addRecord({
      id: recordId,
      date,
      items: [item],
    });
  }

  // 이후 다시 렌더링
  const headerEl = elements.headerEl();
  const yearEl = headerEl.querySelector(".year");
  const monthEl = headerEl.querySelector(".month");
  renderRecords(yearEl.textContent, monthEl.textContent, store.getRecords(), {
    income: true,
    outcome: true,
  });
};

// 전체 내역 수입 지출 필터링
const toggleRecordVisibility = (type) => {
  // type = "income" | "outcome"

  const headerEl = elements.headerEl();
  const yearEl = headerEl.querySelector(".year");
  const monthEl = headerEl.querySelector(".month");
  const totalDiv =
    type === "income" ? elements.incomeFilterButtonEl() : elements.outcomeFilterButtonEl();

  // 체크박스 상태를 변경하고 렌더링 함수를 호출
  switch (type) {
    case "income":
      if (incomeVisible) {
        incomeVisible = false;
        totalDiv.innerHTML = `
          <img src="../assets/icons/uncheckbox.svg" alt="checkbox"/>
        `;
      } else {
        incomeVisible = true;
        totalDiv.innerHTML = `
          <img src="../assets/icons/checkbox.svg" alt="checkbox"/>
        `;
      }
      break;
    case "outcome":
      if (outcomeVisible) {
        outcomeVisible = false;
        totalDiv.innerHTML = `
          <img src="../assets/icons/uncheckbox.svg" alt="checkbox"/>
        `;
      } else {
        outcomeVisible = true;
        totalDiv.innerHTML = `
          <img src="../assets/icons/checkbox.svg" alt="checkbox"/>
          `;
      }
      break;
  }
  renderRecords(yearEl.textContent, monthEl.textContent, store.getRecords(), {
    income: incomeVisible,
    outcome: outcomeVisible,
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
