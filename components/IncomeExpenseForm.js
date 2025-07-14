export function renderIncomeExpenseForm() {
  const form = document.createElement('form');
  form.className = 'income-expense-form';

  // 현재 날짜를 기본값으로 설정
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  const paymentOptions = ['현금', '신용카드'];
  const incomeClasses = ['용돈', '월급'];
  const expenseClasses = ['식비', '교통', '문화여가', '기타'];

  // TODO: select UI 구현 (현재는 단순한 select로 구현)
  const getDateContainerHTML = () => {
    return `
        <div class="date-container">
            <label class="date-label">날짜</label>
            <input type="date" class="date-input" name="date" value="${formattedDate}">
        </div>
    `;
  };

  const getMoneyContainerHTML = () => {
    return `
        <div class="money-container">
            <label class="money-label">금액</label>
            <button class="money-button">
                <img src="../assets/icons/plus.svg" alt="Add"></img>
            </button>
            <input type="string" class="money-input"></input>
        </div>
    `;
  };

  const getDescriptionContainerHTML = () => {
    return `
        <div class="description-container">
            <label class="description-label">내용</label>
            <span class="description-length">0/32</span>
            <input type="text" class="description-input" maxlength="32"></input>
        </div>
    `;
  };

  const getPaymentContainerHTML = () => {
    return `
        <div class="payment-container">
            <label class="payment-label">결제수단</label>
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
            <label class="class-label">분류</label>
            <select class="class-select">
                ${expenseClasses
                  .map(option => `<option value="${option}">${option}</option>`)
                  .join('')}
            </select>
        </div>
        `;
  };

  form.innerHTML = `
    ${getDateContainerHTML()}
    ${getMoneyContainerHTML()}
    ${getDescriptionContainerHTML()}
    ${getPaymentContainerHTML()}
    ${getClassContainerHTML()}
    `;

  return form;
}
