// 결제 방법 관련 API
export async function getPaymentMethods() {
  return apiRequest("/paymentMethods");
}
