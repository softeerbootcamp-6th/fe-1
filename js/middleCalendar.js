// js/calendar.js
let entries = [];
let currentYear = 2023;
let currentMonth = 8; // 1~12

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const monthLabelEl = document.getElementById("month-label");

const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");


const addBtn = document.getElementById("add-btn");


const monthNames = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function updateCalendar() {
  yearEl.textContent = currentYear;
  monthEl.textContent = currentMonth;
  monthLabelEl.textContent = monthNames[currentMonth];

  renderPageFor(currentYear, currentMonth);
}

function renderPageFor(year, month) {
  console.log(`렌더링 중: ${year}년 ${month}월`);
  // 여기에 실제로 페이지 내용 바꾸는 로직 작성
}

addBtn.addEventListener("click", () => {
    const date = document.getElementById("date").value;
    const amount = Number(document.getElementById("amount").value);
    const desc = document.getElementById("desc").value;
    const method = document.getElementById("method").value;
    const category = document.getElementById("category").value;

    if (!date || !amount || !desc || method === "결제수단" || category === "분류") {
      alert("모든 항목을 정확히 입력해주세요!");
      return;
    }

    // 객체로 저장
    const entry = { date, amount, desc, method, category };
    entries.push(entry);

    // 화면에 추가
    addEntryToDOM(entry);

    // 폼 초기화
    document.getElementById("date").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("method").selectedIndex = 0;
    document.getElementById("category").selectedIndex = 0;
  });


function addEntryToDOM(entry) {
  const entryList = document.getElementById("entry-list");

  const dateObj = new Date(entry.date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][dateObj.getDay()];
  const dateLabel = `${month}월 ${day}일 ${weekday}요일`;

  // 날짜 제목 (중복 방지용)
  let dateSection = entryList.querySelector(`[data-date="${entry.date}"]`);
  if (!dateSection) {
    dateSection = document.createElement("div");
    dateSection.className = "entry-date-section";
    dateSection.setAttribute("data-date", entry.date);
    dateSection.innerHTML = `
      <div class="entry-sort">
        <div>${dateLabel}</div>
        <div>${entry.amount}</div>
        </div>
      <div class="entry-items"></div>
    `;
    entryList.appendChild(dateSection);
  }

  const entryItems = dateSection.querySelector(".entry-items");
  const item = document.createElement("div");
  item.className = "entry-row";
  item.innerHTML = `
    <div class="entry-category">${entry.category}</div>
    <div class="entry-desc">${entry.desc}</div>
    <div class="entry-method">${entry.method}</div>
    <div class="entry-amount">-${entry.amount.toLocaleString()}원</div>
  `;
  entryItems.appendChild(item);
}

prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  }
  updateCalendar();
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  }
  updateCalendar();
});

// 페이지 로드 시 초기화
updateCalendar();