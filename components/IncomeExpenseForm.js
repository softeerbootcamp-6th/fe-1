import { store } from '../store/store.js';
import { renderListItem } from './IncomeExpenseList.js';

export function renderIncomeExpenseForm() {
  const form = document.createElement('form');
  form.className = 'income-expense-form';

  // 현재 날짜를 기본값으로 설정
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  let isIncome = true; // true: 수입, false: 지출
  const maxDescriptionLength = 32;
  let descriptionLength = 0;
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
                <input id="money-input" type="string" class="money-input" value="0" dir="rtl"></input>
                <span class="money-unit light12">원</span>
            </div>
        </div>
    `;
  };

  const getDescriptionContainerHTML = maxDescriptionLength => {
    return `
        <div class="description-container">
            <div class="description-label-container">
                <label class="description-label light12" for="description-input">내용</label>
                <span class="description-length light12">${descriptionLength}/${maxDescriptionLength}</span>
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
            <option value="" selected disabled hidden>선택하세요</option>
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
            <option value="" selected disabled hidden>선택하세요</option>
                ${incomeClasses
                  .map(option => `<option value="${option}">${option}</option>`)
                  .join('')}
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
    ${getDescriptionContainerHTML(maxDescriptionLength)}
    ${getVerticalLineHTML()}
    ${getPaymentContainerHTML()}
    ${getVerticalLineHTML()}
    ${getClassContainerHTML()}
    ${addButtonHTML()}
    `;

  // 날짜
  const dateInput = form.querySelector('.date-input');

  // 금액
  const moneyButton = form.querySelector('.money-button');
  const moneyButtonIcon = moneyButton.querySelector('img');
  const moneyInput = form.querySelector('#money-input');

  // 내용
  const descriptionInput = form.querySelector('#description-input');

  // 결제수단
  const paymentSelect = form.querySelector('.payment-select');

  // 분류
  const classSelect = form.querySelector('.class-select');

  // add 버튼
  const addButton = form.querySelector('.add-button');

  moneyButton.addEventListener('click', e => {
    e.preventDefault();
    isIncome = !isIncome;
    moneyButtonIcon.src = isIncome
      ? '../assets/icons/plus.svg'
      : '../assets/icons/minus.svg';

    // 클래스 옵션 업데이트
    updateClassSelect(incomeClasses, expenseClasses);
  });

  moneyInput.addEventListener('keyup', ({ target }) => {
    let moneyValue = Number(target.value.replace(/[^0-9]/g, '')); // 숫자가 아닌 것들은 제외
    let formattedValue = moneyValue.toLocaleString('ko-KR'); // 세자리마다 콤마
    target.value = formattedValue; // 입력 필드에 포맷된 값 설정
  });

  // 입력 시 기본값 0 제거
  moneyInput.addEventListener('focus', ({ target }) => {
    if (target.value === '0') {
      target.value = '';
    }
  });

  descriptionInput.addEventListener('keyup', ({ target }) => {
    descriptionLength = target.value.length;
    const lengthSpan = form.querySelector('.description-length');
    lengthSpan.textContent = `${descriptionLength}/32`;
  });

  // keyup, select 이벤트 발생 시 유효성 검사
  [dateInput, moneyInput, descriptionInput, paymentSelect, classSelect].forEach(
    input => {
      input.addEventListener('keyup', () => {
        validateForm(
          dateInput,
          moneyInput,
          descriptionInput,
          paymentSelect,
          classSelect
        );
      });
      input.addEventListener('change', () => {
        validateForm(
          dateInput,
          moneyInput,
          descriptionInput,
          paymentSelect,
          classSelect
        );
      });
    }
  );

  addButton.addEventListener('click', e => {
    e.preventDefault();
    const incomeExpenseListContainer = document.querySelector(
      '.income-expense-list-container'
    );
    console.log(incomeExpenseListContainer);
    console.log(incomeExpenseListContainer.firstChild);

    handleSubmit(
      e,
      dateInput,
      moneyInput,
      descriptionInput,
      paymentSelect,
      classSelect
    );
    formInit(
      dateInput,
      moneyInput,
      descriptionInput,
      paymentSelect,
      classSelect
    );
    renderListItem(incomeExpenseListContainer);
  });

  const updateClassSelect = (incomeClasses, expenseClasses) => {
    classSelect.innerHTML = `<option value="" selected disabled hidden>선택해주세요</option>
    ${(isIncome ? incomeClasses : expenseClasses)
      .map(option => `<option value="${option}">${option}</option>`)
      .join('')}`;
  };

  // 입력값 유효성 검사
  const validateForm = (
    dateInput,
    moneyInput,
    descriptionInput,
    paymentSelect,
    classSelect
  ) => {
    // 날짜 입력값 확인
    const isDateValid = !!dateInput.value; // 날짜가 선택되었는지 확인(true/false 강제변환)
    // 금액 입력값 확인 (0 보다 큰가)
    const isMoneyValid = Number(moneyInput.value.replace(/[^0-9]/g, '')) > 0;
    // 내용 입력값 확인 (1글자 이상)
    const isDescriptionValid = descriptionInput.value.trim().length > 0;
    // 결제수단 선택 여부 확인
    const isPaymentValid = paymentSelect.value !== '';
    // 분류 선택 여부 확인
    const isClassValid = classSelect.value !== '';

    const isValid =
      isDateValid &&
      isMoneyValid &&
      isDescriptionValid &&
      isPaymentValid &&
      isClassValid;

    activeAddButton(isValid);
  };

  const activeAddButton = isValid => {
    if (isValid) {
      addButton.classList.toggle('active', isValid);
    } else {
      addButton.classList.remove('active');
    }
  };

  const handleSubmit = (
    e,
    dateInput,
    moneyInput,
    descriptionInput,
    paymentSelect,
    classSelect
  ) => {
    e.preventDefault();

    const dateInputValue = dateInput.value;
    const moneyInputValue = moneyInput.value.replace(/[^0-9]/g, ''); // 숫자만 추출
    const descriptionInputValue = descriptionInput.value.trim();
    const paymentSelectValue = paymentSelect.value;
    const classSelectValue = classSelect.value;

    const newIncomeExpense = {
      id: 0,
      type: isIncome ? 'income' : 'expense',
      money: isIncome ? Number(moneyInputValue) : -Number(moneyInputValue),
      description: descriptionInputValue,
      payment: paymentSelectValue,
      class: classSelectValue,
    };

    store.updateIncomeExpenseData(dateInputValue, newIncomeExpense);
  };

  const formInit = (
    dateInput,
    moneyInput,
    descriptionInput,
    paymentSelect,
    classSelect
  ) => {
    dateInput.value = formattedDate;
    moneyInput.value = '';
    descriptionInput.value = '';
    paymentSelect.value = '';
    classSelect.value = '';
  };

  return form;
}
