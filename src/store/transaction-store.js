import { Store } from "./store.js";
import { getTransactions } from "../api/transaction.js";

// 트랜잭션 데이터를 관리하는 Store 인스턴스
export const transactionStore = new Store({
  transactions: [],
  isLoading: false,
  error: null,
  isLocked: false, // 동시성 제어를 위한 락
});
const lockTimeout = 1000;

// 트랜잭션 관련 유틸리티 함수들
export const transactionUtils = {
  // 락 획득 시도
  async acquireLock(timeout = lockTimeout) {
    const startTime = Date.now();
    while (transactionStore.getState().isLocked) {
      if (Date.now() - startTime > timeout) {
        throw new Error("락 획득 시간 초과");
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    transactionStore.setState({ isLocked: true });
  },

  // 락 해제
  releaseLock() {
    transactionStore.setState({ isLocked: false });
  },

  // 트랜잭션 데이터 가져오기
  async fetchTransactions() {
    if (transactionStore.getState().isLoading) return;

    transactionStore.setState({ isLoading: true, error: null });
    try {
      const transactions = await getTransactions();
      transactionStore.setState({ transactions, isLoading: false });
      return transactions;
    } catch (error) {
      transactionStore.setState({ error, isLoading: false });
      console.error("트랜잭션 데이터 가져오기 실패:", error);
      return [];
    }
  },

  // 현재 트랜잭션 데이터 가져오기
  getCurrentTransactions() {
    return transactionStore.getState().transactions;
  },

  // 트랜잭션 데이터 업데이트
  updateTransactions(transactions) {
    transactionStore.setState({ transactions });
  },
};
