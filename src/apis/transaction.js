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

// 월별 거래 내역 조회
// month: "2024-01"
const getTransactionByMonth = async (month) => {
  const allTransactions = await get("/items");
  return allTransactions.filter((transaction) =>
    transaction.date.startsWith(month)
  );
};

// 최근 6개월간의 카테고리 지출 내역
const getRecent6MonthsCategoryExpense = async (month, category) => {
  const allTransactions = await get("/items");

  // 기준 월 객체로 변환
  const [year, monthNum] = month.split("-").map(Number);
  const baseDate = new Date(year, monthNum - 1); // monthNum - 1: JS 기준

  // 최근 6개월 목록 만들기 (과거부터 정렬)
  const recentMonths = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date(baseDate.getFullYear(), baseDate.getMonth() - i);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    recentMonths.push(`${y}-${m}`);
  }

  // 월별 누적 지출 초기화
  const result = recentMonths.map((m) => ({ month: m, amount: 0 }));

  // 데이터 누적
  allTransactions.forEach((tx) => {
    if (tx.type !== "expense") return;
    if (tx.category !== category) return;

    const txMonth = tx.date.slice(0, 7); // yyyy-mm 추출
    const target = result.find((item) => item.month === txMonth);
    if (target) {
      target.amount += tx.amount;
    }
  });

  return result;
};

// 거래 내역 추가
const postTransaction = async (transaction) => {
  transaction.id = await getNextId();
  const response = await post("/items", transaction);
  return response;
};

// 거래 내역 수정
const putTransaction = async (id, transaction) => {
  const response = await put(`/items/${id}`, transaction);
  return response;
};

// 거래 내역 삭제
const delTransaction = async (id) => {
  const response = await del(`/items/${id}`);
  return response;
};

// ============= 결제 수단 관련 API =============

// 결제 수단 조회
const getTransactionMethod = async () => {
  const response = await get("/method");
  return response.map((method) => method.name);
};

// 결제 수단 추가
const postTransactionMethod = async (method) => {
  const response = await post("/method", { id: method, name: method });
  return response;
};

// 결제 수단 삭제
const delTransactionMethod = async (method) => {
  const response = await del(`/method/${method}`);
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
  postTransaction,
  putTransaction,
  delTransaction,

  // 필터링 조회
  getTransactionByMonth,
  getRecent6MonthsCategoryExpense,

  // 결제 수단
  getTransactionMethod,
  postTransactionMethod,
  delTransactionMethod,

  // 카테고리
  getCategories,
};
