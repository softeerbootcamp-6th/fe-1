export function initAmountListener() {

    const amountInput = document.getElementById("amount");

    amountInput.addEventListener("input", () => {
      const rawValue = amountInput.value.replace(/[^\d]/g, "");
      amountInput.value = rawValue ? Number(rawValue).toLocaleString() : "";
    });
    
}