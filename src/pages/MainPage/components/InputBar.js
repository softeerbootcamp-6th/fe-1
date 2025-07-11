import DropDown from '../../../components/DropDown/DropDown.js';

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
        const categorySelect = document.getElementById('category-select');
        if (categorySelect) {
            const categoryList = isPlus ? pluscCategoryList : minusCategoryList;
            categorySelect.innerHTML = `
            <option value="" disabled selected>선택하세요.</option>
            ${categoryList.map(category =>
                `<option value="${category}">${category}</option>`
            ).join('')}
        `;
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



    const validateInputs = () => {
        const dateInput = document.getElementById('date-select');
        const amountInput = document.querySelector('.amount-field');
        const contentInput = document.querySelector('.content-field');
        const paymentSelect = document.getElementById('payment-field');
        const categorySelect = document.getElementById('category-select');
        const checkButton = document.getElementById('submit-btn');

        console.log(dateInput.value, amountInput.value, contentInput.value, paymentSelect.value, categorySelect.value, checkButton);

        const isValid = dateInput.value.trim() !== '' &&
            !isNaN(parseFloat(amountInput.value)) &&
            contentInput.value.trim() !== '' &&
            paymentSelect.value.trim() !== '' &&
            categorySelect.value.trim() !== '';

        console.log('Validation result:', isValid);

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
        const dateInput = document.getElementById('date-select');
        const amountInput = document.querySelector('.amount-field');
        const contentInput = document.querySelector('.content-field');
        const paymentSelect = document.getElementById('payment-field');
        const categorySelect = document.getElementById('category-select');

        const formData = {
            date: dateInput.value,
            amount: amountInput.value,
            content: contentInput.value,
            payment: paymentSelect.value,
            category: categorySelect.value
        };

        console.log('Form submitted:', formData);

        // MainPage로 formData 전달
        if (onSubmitCallback) {
            onSubmitCallback(formData);
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
                    <label>금액</label>
                    <div class="inline-block">
                        <button class="icon-button sign-button" id="plus-minus-btn">
                            <img src="assets/icons/minus.svg" alt="minus icon">
                        </button>
                        <input type="text" class="amount-field" placeholder="0">
                        <span>원</span>
                    </div>
                </div>
                <div class="border-line"></div>
                <div class="flex-column">
                    <div class="inline-block">    
                        <label>내용</label>
                        <span class="input-count-text">글자수 /32</span>
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