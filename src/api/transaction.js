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
