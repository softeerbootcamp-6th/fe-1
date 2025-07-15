// 입력받은 정보를 토대로 삽입 / 수정 / 삭제 기능을 담당하는 함수들을 다루는 파일
import { elements } from "./elements.js";

export const records = [
  {
    date: "2025-08-14",
    items: [
      {
        category: "문화/여가",
        description: "스트리밍 서비스 정기 결제",
        payment: "현대카드",
        amount: -10900,
      },
      {
        category: "교통",
        description: "후불 교통비 결제",
        payment: "현대카드",
        amount: -45340,
      },
    ],
  },
  {
    date: "2025-08-13",
    items: [
      {
        category: "미분류",
        description: "온라인 세미나 신청",
        payment: "현대카드",
        amount: -10000,
      },
    ],
  },
  {
    date: "2025-08-10",
    items: [
      {
        category: "식비",
        description: "잔치국수와 김밥",
        payment: "현대카드",
        amount: -9500,
      },
      {
        category: "월급",
        description: "8월 급여",
        payment: "현금",
        amount: 2010580,
      },
    ],
  },
];

// records 배열의 각 날짜별로 section을 만드는 함수
export const renderRecords = (currentYear, currentMonth, records) => {
  // 이전 렌더링 초기화
  const recordContainerEl = elements.recordContainerEl();
  recordContainerEl.innerHTML = "";

  // 현재 헤더의 날짜에 해당하는 date값만 함수 호출
  records.forEach((record) => {
    const date = record.date;
    //"YYYY-MM-DD" 에서 YYYY와 MM 추출 후 헤더의 날짜와 비교해서 같은 값만 호출
    let year = date.split("-")[0];
    let month = date.split("-")[1];
    const items = record.items;
    if (Number(currentYear) === Number(year) && Number(currentMonth) === Number(month)) {
      renderRecordByDate({ date, items });
    }
  });
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
        <div class="category ${item.category}">${item.category}</div>
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

export const addRecord = ({ date, sign, value, description, payment, category }) => {
  // 부호 처리
  let amount = sign + value;

  // record에 추가하려는 날짜에 대한 정보가 이미 있나 확인
  const foundRecord = records.find((record) => record.date === date);

  if (foundRecord) {
    // 이미 있는 날짜 처리
    foundRecord.items.push({
      category,
      description,
      payment,
      amount,
    });
  } else {
    // 없는 날짜라면 record에 날짜 포함 객체 생성
    records.push({
      date,
      items: [{ category, description, payment, amount }],
    });
  }

  // 이후 다시 렌더링
  const headerEl = elements.headerEl();
  const yearEl = headerEl.querySelector(".year");
  const monthEl = headerEl.querySelector(".month");
  renderRecords(yearEl.textContent, monthEl.textContent, records);
};

// 전체 내역 수입 지출 필터링
const toggleRecordVisibility = (type, isChecked) => {
  // type = "income" | "outcome"
  const visibleButtonEl = "";
  if (type === income) {
    visibleButtonEl = elements.incomeFilterButtonEl();
  } else {
    visibleButtonEl = elements.outcomeFilterButtonEl();
  }

  if (isChecked) {
    // check 상태였다면 토글 후 필터링
    isChecked = false;
    // 필터링을 어케함 ???
  }
};
