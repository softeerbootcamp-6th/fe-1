import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
} from "../api/transaction.js";
import {
  updateHistoryList,
  cancelEditMode,
} from "../pages/main/utils/main-ui-utils.js";
import { updateHeaderDate, updateInputDate } from "./date-utils.js";
import { dateStore } from "../store/date-store.js";
import { routingStore } from "../store/routing-store.js";
import { transactionUtils } from "../store/transaction-store.js";
import { showModal } from "../layouts/modal/modal.js";

// 현재 선택된 월의 내역만 필터링하는 함수
export function getFilteredData(initialData) {
  return initialData.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getFullYear() === dateStore.getState().currentYear &&
      itemDate.getMonth() === dateStore.getState().currentMonth - 1 // 1를0로 변환
    );
  });
}

// 확장 가능한 필터링 함수 (필터링 조건을 파라미터로 받음)
export function getFilteredDataWithCondition(
  initialData,
  filterCondition = null
) {
  return initialData.filter((item) => {
    const itemDate = new Date(item.date);
    const isCurrentMonth =
      itemDate.getFullYear() === dateStore.getState().currentYear &&
      itemDate.getMonth() === dateStore.getState().currentMonth - 1;

    // 기본 월 필터링
    if (!isCurrentMonth) return false;

    // 추가 필터링 조건이 있으면 적용
    if (filterCondition) {
      return filterCondition(item);
    }

    return true;
  });
}

// 현재 선택된 월의 지출(소비) 데이터만 필터링하는 함수
export function getFilteredExpenseData(initialData) {
  return getFilteredDataWithCondition(initialData, (item) => item.amount < 0);
}

// 현재 선택된 월의 특정 카테고리 지출 데이터만 필터링하는 함수
export function getFilteredExpenseDataByCategory(initialData, category) {
  return getFilteredDataWithCondition(
    initialData,
    (item) => item.amount < 0 && item.category === category
  );
}

// 현재 선택된 월의 수입 데이터만 필터링하는 함수
export function getFilteredIncomeData(initialData) {
  return getFilteredDataWithCondition(initialData, (item) => item.amount > 0);
}

// 아이템 삭제 함수
export async function deleteItemFromData(itemId) {
  return new Promise((resolve) => {
    showModal(
      "삭제 확인",
      "",
      async () => {
        try {
          // 락 걸기
          await transactionUtils.acquireLock();

          await deleteTransaction(itemId);
          // store 데이터 업데이트
          const transactions = await getTransactions();
          transactionUtils.updateTransactions(transactions);
          resolve(true);
        } catch (error) {
          console.error("삭제 실패:", error);
          resolve(false);
        } finally {
          // 락 해제
          transactionUtils.releaseLock();
        }
      },
      "정말 삭제하시겠습니까?",
      true // isDelete flag
    );
  });
}

// 삭제 함수
export async function deleteItem(itemId) {
  //Flag 체크를 통해 삭제 됐나 확인?
  if (await deleteItemFromData(itemId)) {
    // 수동으로 UI 업데이트
    await updateHistoryList();
    cancelEditMode();
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
  try {
    // 락 걸기
    await transactionUtils.acquireLock();

    const newItem = {
      date,
      category,
      content,
      method,
      amount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await createTransaction(newItem);

    // store 데이터 업데이트
    const transactions = await getTransactions();
    transactionUtils.updateTransactions(transactions);

    // UI 업데이트
    await updateHistoryList();
    return newItem;
  } catch (error) {
    console.error("거래 추가 실패:", error);
    throw error;
  } finally {
    // 락 해제
    transactionUtils.releaseLock();
  }
}

// 거래 수정 함수
export async function updateTransactionItem(itemId, updatedData) {
  try {
    // 락 획득
    await transactionUtils.acquireLock();

    await updateTransaction(itemId, updatedData);
    // store 데이터 업데이트
    const transactions = await getTransactions();
    transactionUtils.updateTransactions(transactions);

    // 수동으로 UI 업데이트
    await updateHistoryList();
    return true;
  } catch (error) {
    console.error("거래 수정 실패:", error);
    throw error;
  } finally {
    // 락 해제
    transactionUtils.releaseLock();
  }
}

// 월 변경 처리 함수
export async function onMonthChanged() {
  // 헤더와 입력 폼 동기화
  updateHeaderDate();
  // 메인 페이지에서만 입력 폼 동기화(달을 바꾸면 바로 입력 폼이 해당 달의 1일로 변경됨)
  if (routingStore.getState().currentTab === "MAIN_VIEW") {
    updateInputDate();
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
