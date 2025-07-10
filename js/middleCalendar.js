// js/calendar.js
let entries = [];
let currentYear = 2023;
let currentMonth = 8; // 1~12

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const monthLabelEl = document.getElementById("month-label");
const toggleSign = document.getElementById("toggle-sign");

toggleSign.addEventListener("click", () => {
  if (toggleSign.textContent === "+") {
    toggleSign.textContent = "-";
    toggleSign.classList.add("minus");
  } else {
    toggleSign.textContent = "+";
    toggleSign.classList.remove("minus");
  }
});
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

    if (!date || !amount || !desc) {
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


const amountInput = document.getElementById("amount");

  amountInput.addEventListener("input", () => {
    // 숫자 외 제거
    const rawValue = amountInput.value.replace(/[^\d]/g, "");
    if (!rawValue) {
      amountInput.value = "";
      return;
    }

    // 쉼표 추가한 값
    const formatted = Number(rawValue).toLocaleString();
    amountInput.value = formatted;
  });



const descInput = document.getElementById("desc");
  const charCount = document.getElementById("char-count");

  descInput.addEventListener("input", () => {
    const length = descInput.value.length;
    charCount.textContent = `${length} / 32`;
  });

// 페이지 로드 시 초기화
updateCalendar();

  const display = document.getElementById("dropdown-display");
  const panel = document.getElementById("dropdown-panel");
  const dropAddBtn = document.getElementById("dropdown-add");

  display.addEventListener("click", ()=>{
    panel.classList.toggle("hidden");
  });

const methodSelect = document.getElementById("method");
  const modal = document.getElementById("modal");
  const confirmAdd = document.getElementById("confirm-add");
  const cancelAdd = document.getElementById("cancel-add");
  const newMethodInput = document.getElementById("new-method");

  dropAddBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    newMethodInput.value = "";
    panel.classList.add("hidden");
  });

  cancelAdd.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

    // 추가 확인
  confirmAdd.addEventListener("click", () => {
    const newMethod = newMethodInput.value.trim();
    if (!newMethod) {
      alert("결제수단을 입력해주세요.");
      return;
    }

    const option = document.createElement("div");
    option.className = "dropdown-option";
    option.dataset.value = newMethod;
    option.innerHTML = `
      <span>${newMethod}</span>
      <button class="delete-btn">❌</button>
    `;
    panel.insertBefore(option, dropAddBtn);

    display.textContent = newMethod;
    selectedMethod = newMethod;
    modal.classList.add("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!document.getElementById("method-wrapper").contains(e.target)) {
      panel.classList.add("hidden");
    }
  });

  // 드롭다운 패널 내부 클릭
  panel.addEventListener("click", (e) => {
    const optionDiv = e.target.closest(".dropdown-option");
    if (e.target.classList.contains("delete-btn")) {
      // 삭제 버튼 클릭
      const methodName = optionDiv.dataset.value;
      optionDiv.remove();
      if (selectedMethod === methodName) {
        display.textContent = "선택하세요";
        selectedMethod = null;
      }
    } else if (optionDiv) {
      // 항목 선택
      const methodName = optionDiv.dataset.value;
      display.textContent = methodName;
      selectedMethod = methodName;
      panel.classList.add("hidden");
    }
  });