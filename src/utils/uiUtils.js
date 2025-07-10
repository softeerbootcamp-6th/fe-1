import { formatDateText } from "./dateUtils.js";
import { formatAmount } from "./formatUtils.js";
import { getFilteredData } from "./dataUtils.js";

// 토글 버튼 이벤트 리스너 설정
export function setupToggleListeners(
  toggleBtns,
  updateAmountSign,
  amountInput
) {
  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const type = this.getAttribute("data-type");

      // 현재 활성화된 버튼 찾기
      const activeBtn = document.querySelector(".toggle-icon.active");

      // 같은 버튼을 클릭한 경우 토글 (상태 변경)
      if (activeBtn === this) {
        // 현재 상태와 반대 상태로 변경
        const newType = type === "minus" ? "plus" : "minus";
        const newBtn = document.querySelector(`[data-type="${newType}"]`);

        // 현재 버튼 비활성화
        this.classList.remove("active");
        // 반대 버튼 활성화
        newBtn.classList.add("active");

        // 토글 상태 업데이트
        window.currentToggleType = newType;
      } else {
        // 다른 버튼을 클릭한 경우 해당 버튼으로 변경
        // 모든 토글 버튼 비활성화
        toggleBtns.forEach((b) => b.classList.remove("active"));

        // 클릭된 버튼 활성화
        this.classList.add("active");

        // 현재 토글 상태 업데이트
        window.currentToggleType = type;
      }

      // 입력값이 있으면 부호 업데이트
      updateAmountSign(window.currentToggleType, amountInput);
    });
  });
}

// 날짜 입력 이벤트 리스너 설정
export function setupDateInputListeners(
  dateInput,
  currentYear,
  currentMonth,
  updateHeaderDate,
  renderHistoryList,
  dummyData,
  historyList,
  enterEditMode,
  deleteItem
) {
  dateInput.addEventListener("change", function () {
    const selectedDate = new Date(this.value);
    const newYear = selectedDate.getFullYear();
    const newMonth = selectedDate.getMonth();

    // 현재 값과 다를 때만 업데이트
    if (newYear !== currentYear || newMonth !== currentMonth) {
      window.currentYear = newYear;
      window.currentMonth = newMonth;
      updateHeaderDate(newYear, newMonth);
      renderHistoryList(
        dummyData,
        newYear,
        newMonth,
        historyList,
        enterEditMode,
        deleteItem
      );
    }
  });
}

// 추가 버튼 클릭 이벤트 리스너 설정
export function setupAddButtonListeners(
  // 입력 폼 관련 쿼리
  addBtn,
  dateInput,
  amountInput,
  contentInput,
  methodSelect,
  categorySelect,
  charCountSpan,
  validateFormData,
  processAmountSign,
  // 데이터 관련 함수
  createNewItem,
  renderHistoryList,
  dummyData,
  currentYear,
  currentMonth,
  historyList,
  enterEditMode,
  deleteItem,
  cancelEditMode
) {
  addBtn.addEventListener("click", function () {
    const date = dateInput.value;
    let amount = amountInput.value.replace(/,/g, "");
    const content = contentInput.value.trim();
    const method = methodSelect.value;
    const category = categorySelect.value;

    // 유효성 검사
    if (!validateFormData(date, amount, content, method, category)) {
      return;
    }

    // 금액 부호 처리
    const amountNum = processAmountSign(amount, window.currentToggleType);

    if (window.isEditMode) {
      // 수정 모드: 기존 아이템 업데이트
      dummyData[window.editingItemIndex] = createNewItem(
        date,
        category,
        content,
        method,
        amountNum
      );
      cancelEditMode();
    } else {
      // 추가 모드: 새 아이템 추가
      dummyData.push(createNewItem(date, category, content, method, amountNum));
    }

    renderHistoryList(
      dummyData,
      currentYear,
      currentMonth,
      historyList,
      enterEditMode,
      deleteItem
    );

    // 입력 폼 초기화 (수정 모드가 아닐 때만)
    if (!window.isEditMode) {
      amountInput.value = "";
      contentInput.value = "";
      methodSelect.selectedIndex = 0;
      categorySelect.selectedIndex = 0;
      charCountSpan.textContent = "0/32";
    }
  });
}

// 수정 모드 활성화 함수
export function enterEditMode(itemIndex) {
  // 전역 변수 수정
  window.isEditMode = true;
  window.editingItemIndex = itemIndex;

  const item = window.dummyData[itemIndex];

  // 입력 폼에 데이터 채우기
  window.dateInput.value = item.date;

  // 금액 입력란에 값 설정 (이벤트 리스너 우회)
  const amountValue = Math.abs(item.amount).toLocaleString();
  window.amountInput.type = "text";
  window.amountInput.value = amountValue;

  window.contentInput.value = item.content;
  window.methodSelect.value = item.method;
  window.categorySelect.value = item.category;

  // 토글 상태 설정
  const isIncome = item.amount > 0;
  window.currentToggleType = isIncome ? "plus" : "minus";

  // 토글 버튼 상태 업데이트
  window.toggleBtns.forEach((btn) => btn.classList.remove("active"));
  const activeToggle = document.querySelector(
    `[data-type="${window.currentToggleType}"]`
  );
  if (activeToggle) activeToggle.classList.add("active");

  // 글자수 업데이트
  window.charCountSpan.textContent = `${window.contentInput.value.length}/32`;

  // 버튼 텍스트 변경
  window.addBtn.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="16" fill="#4CAF50" />
      <polyline points="10,17 15,22 22,12" fill="none" stroke="#fff" stroke-width="2" />
    </svg>
  `;
}

// 수정 모드 취소 함수
export function cancelEditMode() {
  // 전역 변수 수정
  window.isEditMode = false;
  window.editingItemIndex = -1;

  // 입력 폼 초기화
  window.amountInput.value = "";
  window.contentInput.value = "";
  window.methodSelect.selectedIndex = 0;
  window.categorySelect.selectedIndex = 0;
  window.charCountSpan.textContent = "0/32";

  // 토글 상태 초기화
  window.currentToggleType = "minus";
  window.toggleBtns.forEach((btn) => btn.classList.remove("active"));
  const minusToggle = document.querySelector('[data-type="minus"]');
  if (minusToggle) minusToggle.classList.add("active");

  // 버튼 텍스트 원래대로
  window.addBtn.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="16" fill="#b0b0b0" />
      <polyline points="10,17 15,22 22,12" fill="none" stroke="#fff" stroke-width="2" />
    </svg>
  `;

  // 모든 아이템에서 edit-mode 클래스 제거
  const items = document.querySelectorAll(".history-item");
  items.forEach((item) => item.classList.remove("edit-mode"));
}

// 렌더링 함수
export function renderHistoryList(
  dummyData,
  currentYear,
  currentMonth,
  historyList,
  enterEditMode
) {
  // 현재 선택된 월의 내역만 필터링
  const filteredData = getFilteredData(dummyData, currentYear, currentMonth);

  // 날짜별 그룹핑
  const grouped = {};

  filteredData.forEach((item) => {
    if (!grouped[item.date]) grouped[item.date] = [];
    grouped[item.date].push(item);
  });

  // 날짜 내림차순
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  // 전체 합계/건수 계산 (필터링된 데이터 기준)
  let totalIncome = 0,
    totalExpense = 0;
  let totalCount = filteredData.length;

  // 리스트 HTML 생성
  let html = "";
  sortedDates.forEach((date) => {
    const items = grouped[date];
    let dayIncome = 0,
      dayExpense = 0;
    let itemsHtml = "";

    //TODO- 이중 for문이라, 최적화 가능하면 하기
    items.forEach((item, itemIndex) => {
      const isIncome = item.amount > 0;
      if (isIncome) dayIncome += item.amount;
      else dayExpense += -item.amount;

      // 전체 데이터에서 실제 인덱스 찾기
      const globalIndex = dummyData.findIndex(
        (dataItem) =>
          dataItem.date === item.date &&
          dataItem.content === item.content &&
          dataItem.amount === item.amount
      );

      itemsHtml += `
        <div class="history-item" data-index="${globalIndex}" style="cursor: pointer;">
          <div class="history-category category-${item.category.replace(
            "/",
            "/"
          )}">${item.category}</div>
          <div class="history-content">${item.content}</div>
          <div class="history-method">${item.method}</div>
          <div class="history-amount ${isIncome ? "plus" : "minus"}">${
        isIncome ? "" : "-"
      }${formatAmount(item.amount)}원</div>
          <div class="history-actions" style="display: none;" onclick="deleteItem(${globalIndex})">
            <img src="assets/icons/delete.svg" alt="삭제 아이콘"/>
            <p class="delete-btn" style=" color: #ff4444; cursor: pointer; font-size: 12px;">삭제</p>
          </div>
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

  // 아이템 클릭 시 수정 모드 진입/해제
  const items = historyList.querySelectorAll(".history-item");
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      // 삭제 버튼 클릭 시에는 무시
      if (e.target.classList.contains("delete-btn")) return;

      const idx = parseInt(item.getAttribute("data-index"), 10);

      // 이미 수정 모드인 아이템을 클릭한 경우 해제
      if (item.classList.contains("edit-mode")) {
        // 모든 아이템에서 edit-mode 클래스 제거
        items.forEach((i) => i.classList.remove("edit-mode"));

        // 삭제 버튼 숨기기
        items.forEach(
          (i) => (i.querySelector(".history-actions").style.display = "none")
        );

        // 수정 모드 취소 함수 호출
        if (typeof window.cancelEditMode === "function") {
          window.cancelEditMode();
        }
        return;
      }

      // 새로운 아이템 클릭 시 수정 모드 진입
      if (typeof enterEditMode === "function") enterEditMode(idx);

      // 모든 아이템에서 edit-mode 클래스 제거
      items.forEach((i) => i.classList.remove("edit-mode"));

      // 클릭된 아이템에 edit-mode 클래스 추가
      item.classList.add("edit-mode");

      // 삭제 버튼 보이기
      items.forEach(
        (i) => (i.querySelector(".history-actions").style.display = "none")
      );
      item.querySelector(".history-actions").style.display = "flex";
    });
  });
}

// 헤더 버튼 이벤트 리스너 설정
export function setupHeaderListeners(
  currentYear,
  currentMonth,
  updateHeaderDate,
  updateInputDate,
  renderHistoryList,
  dateInput
) {
  const prevBtn = document.getElementById("prevMonthBtn");
  const nextBtn = document.getElementById("nextMonthBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      updateHeaderDate(currentYear, currentMonth);
      updateInputDate(currentYear, currentMonth, dateInput);
      renderHistoryList();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      updateHeaderDate(currentYear, currentMonth);
      updateInputDate(currentYear, currentMonth, dateInput);
      renderHistoryList();
    });
  }
}
