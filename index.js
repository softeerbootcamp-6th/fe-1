import { dummyData } from "./dummy.js";
// 내용 입력란 글자수 표시를 위한 쿼리
const contentInput = document.querySelector(".input-cell.content input");
const charCountSpan = document.querySelector(".input-cell.content .char-count");

// 내역 추가 기능을 위한 쿼리
const addBtn = document.querySelector(".input-cell.submit button");
const dateInput = document.querySelector(".date-input");
const amountInput2 = document.querySelector(".amount-input");
const contentInput2 = document.querySelector(".input-cell.content input");
const methodSelect = document.querySelector(".input-cell.method select");
const categorySelect = document.querySelector(".input-cell.category select");
const historyList = document.querySelector(".history-list");

// 날짜 포맷 함수
function formatDateText(dateStr) {
  const dateObj = new Date(dateStr);
  return `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 ${
    ["일", "월", "화", "수", "목", "금", "토"][dateObj.getDay()]
  }요일`;
}

// 합계 포맷 함수
function formatAmount(num) {
  return Math.abs(num).toLocaleString();
}

// 렌더링 함수
function renderHistoryList() {
  // 날짜별 그룹핑
  const grouped = {};
  dummyData.forEach((item) => {
    if (!grouped[item.date]) grouped[item.date] = [];
    grouped[item.date].push(item);
  });

  // 날짜 내림차순
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  // 전체 합계/건수 계산
  let totalIncome = 0,
    totalExpense = 0;
  let totalCount = dummyData.length;

  // 리스트 HTML 생성
  let html = "";
  sortedDates.forEach((date) => {
    const items = grouped[date];
    let dayIncome = 0,
      dayExpense = 0;
    let itemsHtml = "";
    items.forEach((item) => {
      const isIncome = item.amount > 0;
      if (isIncome) dayIncome += item.amount;
      else dayExpense += -item.amount;

      itemsHtml += `
        <div class="history-item">
          <div class="history-category category-${item.category.replace(
            "/",
            "/"
          )}">${item.category}</div>
          <div class="history-content">${item.content}</div>
          <div class="history-method">${item.method}</div>
          <div class="history-amount ${isIncome ? "plus" : "minus"}">${
        isIncome ? "" : "-"
      }${formatAmount(item.amount)}원</div>
        </div>
      `;
    });

    // 날짜별 합계
    let dayTotalText = "";
    if (dayIncome && dayExpense)
      dayTotalText = `수입 ${formatAmount(dayIncome)}원 지출 ${formatAmount(
        dayExpense
      )}원`;
    else if (dayIncome) dayTotalText = `수입 ${formatAmount(dayIncome)}원`;
    else if (dayExpense) dayTotalText = `지출 ${formatAmount(dayExpense)}원`;
    html += `
      <div class="history-date-group">
        <div class="history-date">${formatDateText(
          date
        )} <span class="history-total">${dayTotalText}</span></div>
        ${itemsHtml}
      </div>
    `;
    totalIncome += dayIncome;
    totalExpense += dayExpense;
  });
  historyList.innerHTML = html;

  // 합계/건수 반영
  const summaryB = document.querySelectorAll(".summary-row b");
  if (summaryB.length >= 3) {
    summaryB[0].textContent = `${totalCount}건`;
    summaryB[1].textContent = formatAmount(totalIncome);
    summaryB[2].textContent = formatAmount(totalExpense);
  }
}

// 내용 입력란 글자수 표시
contentInput.addEventListener("input", function () {
  const len = contentInput.value.length;
  charCountSpan.textContent = `${len}/32`;
});

// 금액 입력란 3자리 콤마 추가
const amountInput = document.querySelector(".amount-input");
amountInput.addEventListener("input", function (e) {
  let value = amountInput.value.replace(/[^0-9\-]/g, ""); // - 부호 허용
  // 맨 앞에만 - 허용, 그 외 -는 제거
  value = value.replace(/(?!^)-/g, "");
  if (value.length > 1 && value.startsWith("0") && !value.startsWith("-0")) {
    value = value.replace(/^0+/, "");
    if (value === "") value = "0";
  }
  // 콤마 추가 (음수도 지원)
  let formatted = value;
  if (value.startsWith("-")) {
    formatted = "-" + value.slice(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  amountInput.type = "text";
  amountInput.value = formatted;
});
amountInput.addEventListener("focus", function () {
  amountInput.value = amountInput.value.replace(/,/g, "");
  amountInput.type = "number";
});
amountInput.addEventListener("blur", function () {
  let value = amountInput.value.replace(/[^0-9\-]/g, ""); // - 부호 허용
  value = value.replace(/(?!^)-/g, "");
  if (value === "") value = "0";
  let formatted = value;
  if (value.startsWith("-")) {
    formatted = "-" + value.slice(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  amountInput.type = "text";
  amountInput.value = formatted;
});
addBtn.addEventListener("click", function () {
  const date = dateInput.value;
  let amount = amountInput2.value.replace(/,/g, "");
  const content = contentInput2.value.trim();
  const method = methodSelect.value;
  const category = categorySelect.value;

  // 유효성 검사
  if (
    !date ||
    !amount ||
    !content ||
    method === "선택하세요" ||
    category === "선택하세요"
  ) {
    alert("모든 항목을 올바르게 입력해 주세요.");
    return;
  }

  // amount: 입력값 부호 그대로 사용
  let amountNum = parseFloat(amount);

  // 데이터 추가
  historyData.push({
    date,
    category,
    content,
    method,
    amount: amountNum,
  });

  renderHistoryList();

  // 입력 폼 초기화
  amountInput2.value = "";
  contentInput2.value = "";
  methodSelect.selectedIndex = 0;
  categorySelect.selectedIndex = 0;
  charCountSpan.textContent = "0/32";
});

// 최초 렌더링 함수 호출
renderHistoryList();
