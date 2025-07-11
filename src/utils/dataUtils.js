// 현재 선택된 월의 내역만 필터링하는 함수
export function getFilteredData(dummyData, currentYear, currentMonth) {
  return dummyData.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getFullYear() === currentYear &&
      itemDate.getMonth() === currentMonth
    );
  });
}

// 아이템 삭제 함수
export function deleteItemFromData(dummyData, itemIndex) {
  if (confirm("정말 삭제하시겠습니까?")) {
    dummyData.splice(itemIndex, 1);
    return true;
  }
  return false;
}

// 삭제 함수 (전역 함수용)
export function deleteItem(itemIndex) {
  if (deleteItemFromData(window.dummyData, itemIndex)) {
    window.renderHistoryList(
      window.dummyData,
      window.currentYear,
      window.currentMonth,
      window.historyList,
      window.enterEditMode,
      window.deleteItem
    );
    window.cancelEditMode();
  }
}

// 폼 데이터 유효성 검사
export function validateFormData(date, amount, content, method, category) {
  if (!date || !amount || !content || !method || !category) {
    alert("모든 항목을 올바르게 입력해 주세요.");
    return false;
  }
  return true;
}

// 금액 부호 처리
export function processAmountSign(amount, currentToggleType) {
  let amountNum = parseFloat(amount);
  if (currentToggleType === "minus" && amountNum > 0) {
    amountNum = -amountNum;
  } else if (currentToggleType === "plus" && amountNum < 0) {
    amountNum = Math.abs(amountNum);
  }
  return amountNum;
}

// 새 아이템 생성 (객체 반환)
export function createNewItem(date, amount, content, method, category) {
  return {
    date,
    amount,
    content,
    method,
    category,
  };
}

// 월 변경 처리 함수
export function onMonthChanged(year, month) {
  window.currentYear = year;
  window.currentMonth = month;

  // 헤더와 입력 폼 동기화
  window.updateHeaderDate(year, month);
  window.updateInputDate(year, month, window.dateInput);
  window.renderHistoryList(
    window.dummyData,
    year,
    month,
    window.historyList,
    window.enterEditMode,
    window.deleteItem
  );

  // 캘린더 업데이트
  window.initCalendar();

  // 통계 업데이트
  window.updateStatistics(year, month);
}
