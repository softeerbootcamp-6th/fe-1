// 합계 포맷 함수
export function formatAmount(num) {
  return Math.abs(num).toLocaleString();
}

// 입력값에 부호 적용하는 함수
export function updateAmountSign(currentToggleType, amountInput) {
  const currentValue = amountInput.value.replace(/[^0-9]/g, "");
  if (currentValue) {
    const signedValue =
      currentToggleType === "minus" ? `-${currentValue}` : currentValue;
    amountInput.value = signedValue;
  }
}

// 금액 입력란 포맷팅 함수
export function formatAmountInput(value) {
  let cleanValue = value.replace(/[^0-9\-]/g, "");
  cleanValue = cleanValue.replace(/(?!^)-/g, "");

  if (
    cleanValue.length > 1 &&
    cleanValue.startsWith("0") &&
    !cleanValue.startsWith("-0")
  ) {
    cleanValue = cleanValue.replace(/^0+/, "");
    if (cleanValue === "") cleanValue = "0";
  }

  let formatted = cleanValue;
  if (cleanValue.startsWith("-")) {
    formatted = "-" + cleanValue.slice(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    formatted = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return formatted;
}

// 금액 입력란 이벤트 리스너 설정
export function setupAmountInputListeners(
  amountInput,
  isEditMode,
  editingItemIndex
) {
  amountInput.addEventListener("input", function (e) {
    // 수정 모드에서 값 설정 중일 때는 이벤트 처리 안함
    if (isEditMode && editingItemIndex !== -1) return;

    const formatted = formatAmountInput(amountInput.value);
    amountInput.type = "text";
    amountInput.value = formatted;
  });

  amountInput.addEventListener("focus", function () {
    amountInput.value = amountInput.value.replace(/,/g, "");
    amountInput.type = "number";
  });

  amountInput.addEventListener("blur", function () {
    const formatted = formatAmountInput(amountInput.value);
    amountInput.type = "text";
    amountInput.value = formatted;
  });
}

// 내용 입력란 글자수 표시 이벤트 리스너 설정
export function setupContentInputListeners(contentInput, charCountSpan) {
  contentInput.addEventListener("input", function () {
    const len = contentInput.value.length;
    charCountSpan.textContent = `${len}/32`;
  });
}
