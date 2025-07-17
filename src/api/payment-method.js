// 결제 방법 관련 API
export async function getPaymentMethods() {
  return apiRequest("/paymentMethods");
}

// 결제 방법 추가
export async function createPaymentMethod(paymentMethod) {
  return apiRequest("/paymentMethods", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentMethod),
  });
}

// 결제 방법 삭제
export async function deletePaymentMethod(id) {
  return apiRequest(`/paymentMethods/${id}`, {
    method: "DELETE",
  });
}
