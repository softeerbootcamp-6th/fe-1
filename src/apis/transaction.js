import { get, post, put, del } from "./index.js";

// ============= 유틸리티 함수 =============

// 다음 ID 가져오기 (새로운 거래 내역용)
const getNextId = async () => {
  try {
    const transactions = await getTransactionAll();
    const maxId = transactions.reduce(
      (max, transaction) => Math.max(max, transaction.id),
      0
    );
    return maxId + 1;
  } catch (error) {
    console.error("Error getting next ID:", error);
    return 1;
  }
};

// ============= 거래 내역 관련 API =============

// 모든 거래 내역 조회
const getTransactionAll = async () => {
  const response = await get("/items");
  return response;
};

// 월별 거래 내역 조회 (프론트엔드에서 필터링)
// month: "2024-01"
const getTransactionByMonth = async (month) => {
  const allTransactions = await get("/items");
  return allTransactions.filter((transaction) =>
    transaction.date.startsWith(month)
  );
};

// 거래 내역 추가
const addTransaction = async (transaction) => {
  transaction.id = await getNextId();
  const response = await post("/items", transaction);
  return response;
};

// 거래 내역 수정
const updateTransaction = async (id, transaction) => {
  const response = await put(`/items/${id}`, transaction);
  return response;
};

// 거래 내역 삭제
const deleteTransaction = async (id) => {
  const response = await del(`/items/${id}`);
  return response;
};

// ============= 결제 수단 관련 API =============

// 결제 수단 조회
const getMethods = async () => {
  const response = await get("/method");
  return response;
};

// 결제 수단 수정 (전체 배열 교체)
const postMethod = async (method) => {
  const response = await post("/method", method);
  return response;
};

// ============= 카테고리 관련 API =============

// 카테고리 조회
// type: "income" or "expense"
const getCategories = async (type) => {
  const response = await get("/category");
  return response[type];
};

export {
  // 기본 CRUD
  getTransactionAll,
  addTransaction,
  updateTransaction,
  deleteTransaction,

  // 필터링 조회
  getTransactionByMonth,

  // 결제 수단
  getMethods,
  postMethod,

  // 카테고리
  getCategories,
};
