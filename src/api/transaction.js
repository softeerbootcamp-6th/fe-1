import { apiRequest } from "./api-client.js";

// 거래 내역 조회
export async function getTransactions() {
  return apiRequest("/transactions");
}

// 거래 내역 조회
export async function getTransactionById(id) {
  return apiRequest(`/transactions/${id}`);
}

// 거래 내역 생성
export async function createTransaction(transactionData) {
  console.log("createTransaction 함수 호출", transactionData);
  return apiRequest("/transactions", {
    method: "POST",
    body: JSON.stringify(transactionData),
  });
}

// 거래 내역 수정
export async function updateTransaction(id, transactionData) {
  return apiRequest(`/transactions/${id}`, {
    method: "PUT",
    body: JSON.stringify(transactionData),
  });
}

// 거래 내역 삭제
export async function deleteTransaction(id) {
  return apiRequest(`/transactions/${id}`, {
    method: "DELETE",
  });
}

// 통계 관련 API
export async function getSummary() {
  return apiRequest("/transactions/summary");
}

// 카테고리별 통계 조회
export async function getCategorySummary(month = null) {
  const params = month ? { month } : {};
  const queryString = new URLSearchParams(params).toString();
  const endpoint = `/transactions/category-summary${
    queryString ? `?${queryString}` : ""
  }`;
  return apiRequest(endpoint);
}

// 카테고리별 월별 통계 조회
export async function getMonthlyCategoryData(category = null) {
  const params = category ? { category } : {};
  const queryString = new URLSearchParams(params).toString();
  const endpoint = `/transactions/monthly-category${
    queryString ? `?${queryString}` : ""
  }`;
  return apiRequest(endpoint);
}

// 필터링된 거래 내역 조회
export async function getTransactionsByDateRange(startDate, endDate) {
  return apiRequest(`/transactions?date_gte=${startDate}&date_lte=${endDate}`);
}

// 카테고리별 거래 내역 조회
export async function getTransactionsByCategory(category) {
  return apiRequest(`/transactions?category=${encodeURIComponent(category)}`);
}

// 월별 거래 내역 조회
export async function getTransactionsByMonth(year, month) {
  const monthStr = month.toString().padStart(2, "0");
  const startDate = `${year}-${monthStr}-01`;
  const endDate = `${year}-${monthStr}-31`;
  return getTransactionsByDateRange(startDate, endDate);
}
