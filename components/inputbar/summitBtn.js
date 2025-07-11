import { createElement } from '../../utils.js';
import formData from '../../store/formData.js';

export default function () {
    const summitBtnInnerHtml = `
            <button class="add-button" disabled>
                <img
                    src="/public/check.svg"
                    width="24px"
                    height="24px"
                />
            </button>
        `;

    const $summitBtn = createElement(
        'div',
        {
            class: 'add-button-wrappe',
        },
        summitBtnInnerHtml,
    );

    const $btn = $summitBtn.firstElementChild;
    $btn.addEventListener('click', () => {
        if (!formData.isValid) return;
        // 제출 로직 작성 예정
    });

    formData.subscribeIsValid((isValid) => {
        if (isValid) {
            $btn.removeAttribute('disabled');
        } else {
            $btn.setAttribute('disabled', '');
        }
    });

    return $summitBtn;
}
