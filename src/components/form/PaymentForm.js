export const PaymentForm = () => {
  const paymentForm = document.createElement("div");
  paymentForm.classList.add("form-payment");
  paymentForm.innerHTML = `
  <label for="payment" class="light-12">결제수단</label>
  <input type="text" id="payment" name="payment">
  `;
  return paymentForm;
};
