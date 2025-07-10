// icon 객체는 상수이므로 모듈 스코프에 두어도 괜찮습니다.
const icon = {
    plus: {
        src: '/assets/icons/plus.svg',
        alt: 'Plus Icon',
    },
    minus: {
        src: '/assets/icons/minus.svg',
        alt: 'Minus Icon',
    },
};

let isMinus = true;

const createAmount = () => {
    const amountItem = document.createElement('div');
    amountItem.className = 'input-bar-item';
    amountItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="amount" class="light-12">금액</label>
        </div>
        <div class="input-bar-item-wrapper">
            <button class="amount-button">
                <img
                    src="${icon.minus.src}"
                    alt="${icon.minus.alt}"
                    width="16"
                    height="16"
                />
            </button>
            <input
                type="number"
                id="amount"
                class="semibold-12 amount-input"
                placeholder="0"
            />
            <span class="light-14">원</span>
        </div>
    `;

    const amountButton = amountItem.querySelector('.amount-button');
    const amountIcon = amountButton.querySelector('img');

    amountButton.addEventListener('click', () => {
        isMinus = !isMinus;
        const currentIcon = isMinus ? icon.minus : icon.plus;
        amountIcon.src = currentIcon.src;
        amountIcon.alt = currentIcon.alt;
    });

    return amountItem;
};

export default createAmount;
