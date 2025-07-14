export function renderIncomeExpenseForm() {
  const form = document.createElement('form');
  form.className = 'income-expense-form';

  // 현재 날짜를 기본값으로 설정
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  let isIncome = true; // true: 수입, false: 지출
  const paymentOptions = ['현금', '신용카드'];
  const incomeClasses = ['용돈', '월급'];
  const expenseClasses = ['식비', '교통', '문화여가', '기타'];

  // TODO: select UI 구현 (현재는 단순한 select로 구현)
  const getDateContainerHTML = () => {
    return `
        <div class="date-container">
            <label class="date-label light12">날짜</label>
            <input type="date" class="date-input" name="date" value="${formattedDate}">
        </div>
    `;
  };

  const getMoneyContainerHTML = () => {
    return `
        <div class="money-container">
            <label class="money-label light12" for="money-input">금액</label>
            <div class="money-input-container">
                <button class="money-button">
                    <img src="../assets/icons/plus.svg"/>
                </button>
                <input id="money-input" type="string" class="money-input"></input>
            </div>
        </div>
    `;
  };

  const getDescriptionContainerHTML = () => {
    return `
        <div class="description-container">
            <div class="description-label-container">
                <label class="description-label light12" for="description-input">내용</label>
                <span class="description-length light12">0/32</span>
            </div>
            <input id="description-input" type="text" class="description-input" maxlength="32"></input>
        </div>
    `;
  };

  const getPaymentContainerHTML = () => {
    return `
        <div class="payment-container">
            <label class="payment-label light12">결제수단</label>
            <select class="payment-select">
                ${paymentOptions
                  .map(option => `<option value="${option}">${option}</option>`)
                  .join('')}
            </select>
        </div>
    `;
  };

  const getClassContainerHTML = () => {
    return `
        <div class="class-container">
            <label class="class-label light12">분류</label>
            <select class="class-select">
                ${
                  isIncome
                    ? incomeClasses
                    : expenseClasses
                        .map(
                          option =>
                            `<option value="${option}">${option}</option>`
                        )
                        .join('')
                }
            </select>
        </div>
        `;
  };

  const getVerticalLineHTML = () => {
    return `
        <div class="vertical-line"></div>
    `;
  };

  const addButtonHTML = () => {
    return `
        <button type="submit" class="add-button">
            <img src="../assets/icons/add-button.svg" alt="Add"></img>
        </button>
    `;
  };

  form.innerHTML = `
    ${getDateContainerHTML()}
    ${getVerticalLineHTML()}
    ${getMoneyContainerHTML()}
    ${getVerticalLineHTML()}
    ${getDescriptionContainerHTML()}
    ${getVerticalLineHTML()}
    ${getPaymentContainerHTML()}
    ${getVerticalLineHTML()}
    ${getClassContainerHTML()}
    ${addButtonHTML()}
    `;

  const moneyButton = form.querySelector('.money-button');
  const moneyButtonIcon = moneyButton.querySelector('img');
  const classSelect = form.querySelector('.class-select');

  moneyButton.addEventListener('click', e => {
    e.preventDefault();
    isIncome = !isIncome;
    moneyButtonIcon.src = isIncome
      ? '../assets/icons/plus.svg'
      : '../assets/icons/minus.svg';

    // 클래스 옵션 업데이트
    updateClassSelect(incomeClasses, expenseClasses);
  });

  const updateClassSelect = (incomeClasses, expenseClasses) => {
    classSelect.innerHTML = isIncome
      ? incomeClasses
          .map(option => `<option value="${option}">${option}</option>`)
          .join('')
      : expenseClasses
          .map(option => `<option value="${option}">${option}</option>`)
          .join('');
  };

  return form;
}
