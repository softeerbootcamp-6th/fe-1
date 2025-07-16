import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../api/transaction.js";
import { updateHistoryList } from "../pages/main/main-ui-utils.js";

// 현재 선택된 월의 내역만 필터링하는 함수
export function getFilteredData(initialData, currentYear, currentMonth) {
  return initialData.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getFullYear() === currentYear &&
      itemDate.getMonth() === currentMonth
    );
  });
}

// 아이템 삭제 함수
export async function deleteItemFromData(itemId) {
  if (confirm("정말 삭제하시겠습니까?")) {
    try {
      await deleteTransaction(itemId);
      return true;
    } catch (error) {
      console.error("삭제 실패:", error);
      return false;
    }
  }
  return false;
}

// 삭제 함수 (전역 함수용)
export async function deleteItem(itemId) {
  console.log("deleteItem 함수 호출", itemId);
  if (await deleteItemFromData(itemId)) {
    // 수동으로 UI 업데이트
    await updateHistoryList();
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

// 금액 부호 처리(Toggle 버튼 클릭 시 부호 변경)
export function processAmountSign(amount, currentToggleType) {
  let amountNumWithSign = parseFloat(amount);
  if (currentToggleType === "minus" && amountNumWithSign > 0) {
    amountNumWithSign = -amountNumWithSign;
  } else if (currentToggleType === "plus" && amountNumWithSign < 0) {
    amountNumWithSign = Math.abs(amountNumWithSign);
  }
  return amountNumWithSign;
}

// 새 아이템 생성 (API에 추가)
export async function createNewItem(date, amount, content, method, category) {
  const newItem = {
    date,
    category,
    content,
    method,
    amount,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  console.log("createNewItem 함수 호출", newItem);

  try {
    await createTransaction(newItem);
    // JSON Server가 파일 쓰기를 완료할 시간을 준 뒤 업데이트(동시성 문제 해결)
    await new Promise((resolve) => setTimeout(resolve, 100));
    await updateHistoryList();
    return newItem;
  } catch (error) {
    console.error("거래 추가 실패:", error);
    throw error;
  }
}

// 거래 수정 함수
export async function updateTransactionItem(itemId, updatedData) {
  try {
    await updateTransaction(itemId, updatedData);
    // 수동으로 UI 업데이트
    await updateHistoryList();
    return true;
  } catch (error) {
    console.error("거래 수정 실패:", error);
    throw error;
  }
}

// 월 변경 처리 함수
export async function onMonthChanged(year, month) {
  window.currentYear = year;
  window.currentMonth = month;

  // 헤더와 입력 폼 동기화
  window.updateHeaderDate(year, month);
  window.updateInputDate(year, month, window.dateInput);

  // 최신 데이터로 렌더링
  try {
    const transactions = await getTransactions();
    window.renderHistoryList(
      transactions,
      year,
      month,
      window.historyList,
      window.enterEditMode,
      window.deleteItem
    );
  } catch (error) {
    console.error("거래 내역 로드 실패:", error);
  }

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
