import DropDown from '../../../components/DropDown/DropDown.js';
import { formatAmount } from '../../../utils/format.js';

const pluscCategoryList = [
    '월급', '용돈', '기타 수입'
];
const minusCategoryList = [
    '생활', '식비', '교통', '쇼핑/뷰티', '의료/건강', '문화/건강', '미분류'
];

function InputBar(onSubmitCallback) {
    const paymentOptions = ['카드', '현금', '계좌이체', '기타'];

    let isPlus = false;

    const updateCategoryOptions = () => {
        const { categorySelect } = getInputElements();
        if (categorySelect) {
            const categoryList = isPlus ? pluscCategoryList : minusCategoryList;
            categorySelect.innerHTML = `
                <option value="" disabled selected>선택하세요.</option>
                ${categoryList.map(category =>
                `<option value="${category}">${category}</option>`
            ).join('')}
            `;

            categorySelect.value = ''; // 선택된 값 초기화
            validateInputs();
        }
    };

    const togglePlusMinus = () => {
        isPlus = !isPlus;
        const button = document.getElementById('plus-minus-btn');
        const img = button.querySelector('img');

        if (img) {
            img.src = `assets/icons/${!isPlus ? 'minus' : 'plus'}.svg`;
            img.alt = `${!isPlus ? 'minus' : 'plus'} icon`;
        }

        // 분류 옵션 업데이트
        updateCategoryOptions();
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
        else console.error('Check button not found');
    };

    const handleSubmit = () => {
        const { dateInput, amountInput, contentInput, paymentSelect, categorySelect } = getInputElements();

        const formData = {
            date: dateInput.value,
            amount: amountInput.value,
            content: contentInput.value,
            payment: paymentSelect.value,
            category: categorySelect.value
        };


        // MainPage로 formData 전달
        if (onSubmitCallback) {
            onSubmitCallback(formData);
        }
    };

    const formatAmountField = () => {
        const { amountInput } = getInputElements();

        // 리스너 달고
        amountInput.addEventListener('input', () => {
            amountInput.value = amountInput.value.replace(/[^0-9]/g, ''); // 숫자만 허용
            const rawValue = amountInput.value.replace(/,/g, '');
            if (!isNaN(rawValue)) {
                amountInput.value = formatAmount(rawValue);
            }
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
                        <span>원</span>
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
            }

            // 초기 분류 옵션 설정 (기본값: minus/지출)
            updateCategoryOptions();

            // 입력값 변경 이벤트 등록
            const inputs = document.querySelectorAll('.input-field input, .amount-field, .content-field, .category-field, #category-select');
            inputs.forEach(input => {
                input.addEventListener('input', validateInputs);
            });

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
        }
    }
}
export default InputBar;