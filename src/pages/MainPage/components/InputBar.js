import DropDown from '../../../components/DropDown/DropDown.js';
import { formatAmount } from '../../../utils/format.js';
import incomeExpenseStore from '../../../store/incomeExpenseStore.js';
import MainPage from '../MainPage.js';

const pluscCategoryList = [
    '월급', '용돈', '기타 수입'
];
const minusCategoryList = [
    '생활', '식비', '교통', '쇼핑/뷰티', '의료/건강', '문화/건강', '미분류'
];

function InputBar() {
    const paymentOptions = ['현금', '신용카드'];

    let isPlus = false;
    let isEditing = false;
    let editingData = null; // 수정 중인 데이터 저장

    const updateCategoryOptions = () => {
        const { categorySelect } = getInputElements();
        if (categorySelect) {
            const categoryList = isPlus ? pluscCategoryList : minusCategoryList;
            // categorySelect.innerHTML = `
            //     <option value="" disabled selected>선택하세요.</option>
            //     ${categoryList.map(category =>
            //     `<option value="${category}">${category}</option>`
            // ).join('')}
            // `;

            categorySelect.value = ''; // 선택된 값 초기화
        }
    };

    const updatePlusMinusButton = () => {
        const button = document.getElementById('plus-minus-btn');
        const img = button.querySelector('img');

        if (img) {
            img.src = `assets/icons/${!isPlus ? 'minus' : 'plus'}.svg`;
            img.alt = `${!isPlus ? 'minus' : 'plus'} icon`;
        }

        // 분류 옵션 업데이트
        updateCategoryOptions();
        validateInputs();
    };


    const togglePlusMinus = () => {
        isPlus = !isPlus;
        updatePlusMinusButton();
    };

    const getInputElements = () => {
        return {
            dateInput: document.getElementById('date-select'),
            amountInput: document.querySelector('.amount-field'),
            contentInput: document.querySelector('.content-field'),
            paymentSelect: document.getElementById('payment-field'),
            categorySelect: document.getElementById('category-select'),
            checkButton: document.getElementById('submit-btn')
        };
    };

    const validateInputs = () => {
        const { dateInput, amountInput, contentInput, paymentSelect, categorySelect, checkButton } = getInputElements();

        const isValid = dateInput.value.trim() !== '' &&
            !isNaN(parseFloat(amountInput.value)) &&
            contentInput.value.trim() !== '' &&
            paymentSelect.value.trim() !== '' &&
            categorySelect.value.trim() !== '';


        if (checkButton) {
            checkButton.disabled = !isValid; // 체크 버튼 활성화/비활성화
            if (isValid) {
                checkButton.classList.remove('disabled');
                checkButton.style.cursor = 'pointer';
            } else {
                checkButton.classList.add('disabled');
                checkButton.style.cursor = 'not-allowed';
            }
            const img = checkButton.querySelector('img');

            if (img) {
                img.src = `assets/icons/${isValid ? 'check-button-active' : 'check-button'}.svg`;
            }
        }
    };

    const handleSubmit = () => {
        const { dateInput, amountInput, contentInput, paymentSelect, categorySelect } = getInputElements();

        const signValue = isPlus ? amountInput.value : `-${amountInput.value}`; // 수입/지출에 따라 금액에 부호 추가

        const formData = {
            date: dateInput.value,
            amount: parseInt(signValue.replace(/,/g, ''), 10), // 숫자만 허용하고 쉼표 제거
            description: contentInput.value,
            method: paymentSelect.value,
            category: categorySelect.value
        };
        console.log('Form submitted:', formData);
        console.log('isEditing:', isEditing);

        if (!isEditing) {
            // 새로 추가하는 경우
            incomeExpenseStore.updateAllDummyData(formData);
        } else {
            // 수정일 경우
            incomeExpenseStore.updateExistingData(formData, editingData.blockId);
        }
        incomeExpenseStore.getCurrentIncomeExpenseList();

        MainPage().init(); // MainPage 초기화 호출
    };

    const formatAmountField = () => {
        const { amountInput } = getInputElements();

        // 리스너 달고
        amountInput.addEventListener('input', () => {
            amountInput.value = amountInput.value.replace(/[^0-9]/g, ''); // 숫자만 허용
            const rawValue = amountInput.value.replace(/,/g, '');

            amountInput.value = formatAmount(rawValue);
        });

    };

    const updateContentCount = () => {
        const { contentInput } = getInputElements();
        const countTextElement = document.querySelector('.input-count-text');

        if (contentInput && countTextElement) {
            contentInput.addEventListener('input', () => {
                const currentLength = contentInput.value.length;
                countTextElement.textContent = `${currentLength}/32`;
            });
        }
    };

    const setFields = (data) => {
        // plusminus 버튼 상태 업데이트
        isPlus = data && data.amount >= 0;
        updatePlusMinusButton();

        const { dateInput, amountInput, contentInput, paymentSelect, categorySelect } = getInputElements();
        if (data) {
            dateInput.value = data.date;
            amountInput.value = formatAmount(Math.abs(data.amount));
            contentInput.value = data.description;
            paymentSelect.value = data.method;
            categorySelect.value = data.category;
            isEditing = true;
            editingData = data;
        }
    };

    const resetFields = () => {
        console.log('Resetting fields');
        const { dateInput, amountInput, contentInput, paymentSelect, categorySelect } = getInputElements();
        dateInput.value = new Date().toISOString().substring(0, 10); // 오늘 날짜로 초기화
        amountInput.value = '';
        contentInput.value = '';
        paymentSelect.value = '';
        categorySelect.value = '';
        isEditing = false;
        editingData = null;
    };

    return {
        element: `
            <div class="input-bar">
                <div class="flex-column input-field">
                    <label>일자</label>
                    <input type="date" id='date-select'>
                </div>
                <div class="border-line"></div>
                <div class="flex-column">
                    <label class="mr-1">금액</label>
                    <div class="flex-row">
                        <button class="icon-button sign-button" id="plus-minus-btn">
                            <img src="assets/icons/minus.svg" alt="minus icon">
                        </button>
                        <input type="text" class="amount-field text-align-right" placeholder="0">
                        <span style="font-size: 14px">원</span>
                    </div>
                </div>
                <div class="border-line"></div>
                <div class="flex-column">
                    <div class="flex-row">    
                        <label>내용</label>
                        <span class="input-count-text">0/32</span>
                    </div>
                    <input maxlength='32' type="text" class="content-field" placeholder="입력하세요">
                </div>
                <div class="border-line"></div>
                <div class="flex-column">
                    <label>결제 수단</label>
                    ${DropDown({
            options: paymentOptions,
            id: 'payment-field',
            editable: true
        }).element}
                </div>
                <div class="border-line"></div>
                <div class="flex-column">
                    <label>분류</label>
                    ${DropDown({
            options: isPlus ? pluscCategoryList : minusCategoryList,
            id: 'category-select',
            editable: false
        }).element}
                </div>
                <button class="icon-button" id="submit-btn">
                    <img src="assets/icons/check-button.svg" alt="check icon" id="check-icon">
                </button>
            </div>
        `,
        init: () => {
            document.getElementById('date-select').value = new Date().toISOString().substring(0, 10);

            // DOM이 렌더링된 후에 이벤트 리스너 등록
            const plusMinusBtn = document.getElementById('plus-minus-btn');
            if (plusMinusBtn) {
                plusMinusBtn.addEventListener('click', togglePlusMinus);
                const img = plusMinusBtn.querySelector('img');

                if (img) {
                    img.src = `assets/icons/${!isPlus ? 'minus' : 'plus'}.svg`;
                    img.alt = `${!isPlus ? 'minus' : 'plus'} icon`;
                }
            }

            // 초기 분류 옵션 설정 (기본값: minus/지출)
            updateCategoryOptions();

            // 입력값 변경 이벤트 등록
            const inputs = document.querySelectorAll('.input-field input, .amount-field, .content-field');
            inputs.forEach(input => {
                input.addEventListener('input', validateInputs);
            });

            // 드롭다운 값 변경 이벤트 등록
            const paymentSelect = document.getElementById('payment-field');
            if (paymentSelect) {
                paymentSelect.addEventListener('change', () => {
                    console.log('Payment method changed:', paymentSelect.value);
                    validateInputs();
                });
            }
            // 드롭다운 값 변경 이벤트 등록
            const categorySelect = document.getElementById('category-select');
            if (categorySelect) {
                categorySelect.addEventListener('change', () => {
                    console.log('Category changed:', categorySelect.value);
                    validateInputs();
                });
            }



            // 입력 필드 초기화
            resetFields();

            // 초기 체크 버튼 상태 설정
            validateInputs();

            // Apply formatting to amount-field
            formatAmountField();

            // Update content count dynamically
            updateContentCount();

            const checkButton = document.getElementById('submit-btn');
            if (checkButton) {
                checkButton.addEventListener('click', () => {
                    if (!checkButton.classList.contains('disabled')) {
                        handleSubmit();
                    }
                });
            }

            // DropDown 초기화
            DropDown({
                options: paymentOptions,
                id: 'payment-field',
                editable: true
            }).init();
            // 카테고리 선택 드롭다운 초기화
            DropDown({
                options: isPlus ? pluscCategoryList : minusCategoryList,
                id: 'category-select',
                editable: false
            }).init();

        },
        setFields,
        resetFields,
    }
}
export default InputBar;