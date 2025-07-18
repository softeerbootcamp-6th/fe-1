import { formatAmount } from '../utils.js';

export function bindInputValue(formData) {
    const { amount, date, description, category, payment } = formData;

    const $signImg = document.getElementById('sign');

    if (amount > 0) {
        $signImg.setAttribute('src', 'public/plus.svg');
    } else {
        $signImg.setAttribute('src', 'public/minus.svg');
    }

    const inputItems = {
        value: formatAmount(Math.abs(amount)) != '0' || '',
        date,
        description,
    };

    Object.entries(inputItems).forEach(([key]) => {
        const $input = document.querySelector(`#${key}Input`);
        if ($input) {
            $input.value = inputItems[key] ?? '';
        }
    });
    const $category = document.querySelector('#dropdown-toggle-category');
    const $payment = document.querySelector('#dropdown-toggle-payment');

    $category.textContent = category || '선택하세요.';
    $payment.textContent = payment || '선택하세요.';
}
