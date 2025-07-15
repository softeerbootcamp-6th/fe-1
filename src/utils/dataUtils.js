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
export function deleteItemFromData(itemId) {
  if (confirm("정말 삭제하시겠습니까?")) {
    const result = window.accountBookStore.deleteTransaction(itemId);
    return result !== null;
  }
  return false;
}

// 삭제 함수 (전역 함수용)
export function deleteItem(itemId) {
  if (deleteItemFromData(itemId)) {
    // Store 변경 감지로 자동 업데이트됨
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

// 새 아이템 생성 (Store에 추가)
export function createNewItem(date, amount, content, method, category) {
  const newItem = {
    date,
    amount,
    content,
    method,
    category,
  };

  window.accountBookStore.addTransaction(newItem);
  // Store 변경 감지로 자동 업데이트됨
  return newItem;
}

// 월 변경 처리 함수
export function onMonthChanged(year, month) {
  window.currentYear = year;
  window.currentMonth = month;

  // 헤더와 입력 폼 동기화
  window.updateHeaderDate(year, month);
  window.updateInputDate(year, month, window.dateInput);

  // 최신 데이터로 렌더링
  const currentData = window.accountBookStore.getTransactions();
  window.renderHistoryList(
    currentData,
    year,
    month,
    window.historyList,
    window.enterEditMode,
    window.deleteItem
  );

  // 캘린더 업데이트
  if (window.initCalendar) {
    window.initCalendar();
  }

  // 통계 업데이트
  if (window.updateStatistics) {
    window.updateStatistics(year, month);
  }

  if (window.initStatistic) {
    window.initStatistic();
  }
}

// 카테고리별 월별 지출금액 반환 함수(Chart 에서 data로 사용할 예정)
// return: { '2025-01': 12345, '2025-02': 67890, ... }
export function getMonthlyExpenseByCategory(data, category) {
  const result = {};
  data.forEach((item) => {
    if (item.category === category && item.amount < 0) {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const key = `${year}-${month}`;
      if (!result[key]) result[key] = 0;
      result[key] += Math.abs(item.amount);
    }
  });
  return result;
}
