import createContent from './Items/content.js';

function createInputBar() {
    const container = document.createElement('div');
    container.className = 'input-bar-container';

    const dateItem = document.createElement('div');
    dateItem.className = 'input-bar-item';
    dateItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="date-input" class="light-12">일자</label>
        </div>
        <div class="input-bar-item-wrapper">
            <input type="date" id="date-input" />
        </div>
    `;
    container.appendChild(dateItem);

    const amountItem = document.createElement('div');
    amountItem.className = 'input-bar-item';
    amountItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="amount" class="light-12">금액</label>
        </div>
        <div class="input-bar-item-wrapper">
            <button class="amount-button">
                <img
                    src="/assets/icons/plus.svg"
                    alt="plus icon"
                    width="16"
                    height="16"
                />
            </button>
            <input
                type="number"
                id="amount"
                class="semibold-12"
                placeholder="0"
            />
            <span class="light-14">원</span>
        </div>
    `;
    container.appendChild(amountItem);

    const contentItem = createContent();
    container.appendChild(contentItem);

    const paymentMethodItem = document.createElement('div');
    paymentMethodItem.className = 'input-bar-item';
    paymentMethodItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="payment-method" class="light-12">
                결제수단
            </label>
        </div>
        <div class="input-bar-item-wrapper">
            <div class="select-container semibold-12">
                선택하세요
            </div>
            <img
                src="/assets/icons/chevron-down.svg"
                alt="Chevron Down Icon"
                width="16"
                height="16"
            />
        </div>
    `;
    container.appendChild(paymentMethodItem);

    const categoryItem = document.createElement('div');
    categoryItem.className = 'input-bar-item';
    categoryItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="category" class="light-12"> 분류 </label>
        </div>
        <div class="input-bar-item-wrapper">
            <div class="select-container semibold-12">
                선택하세요
            </div>
            <img
                src="/assets/icons/chevron-down.svg"
                alt="Chevron Down Icon"
                width="16"
                height="16"
            />
        </div>
    `;
    container.appendChild(categoryItem);

    const submitBtn = document.createElement('button');
    submitBtn.className = 'submit-button';
    submitBtn.innerHTML = `
        <img
            src="/assets/icons/check.svg"
            alt="check icon"
            width="24"
            height="24"
            class="submit-icon"
        />
    `;

    container.appendChild(submitBtn);

    return container;
}

const mainPlaceholder = document.getElementById('main-placeholder');
mainPlaceholder.innerHTML = '';
const inputBar = createInputBar();
mainPlaceholder.appendChild(inputBar);
