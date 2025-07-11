import { createElement } from '../../../utils.js';
import formData from '../../../store/formData.js';

export default function () {
    const dateInputInnerHtml = `
            <label for="dateInput" class="lt-12">일자</label>
            <input id="dateInput" type="date" class="sb-12" />
        `;

    const $dateInputItem = createElement(
        'div',
        {
            class: 'date-wrapper',
        },
        dateInputInnerHtml,
    );

    const $dateInput = $dateInputItem.querySelector('#dateInput');
    $dateInput.addEventListener('change', (e) => {
        formData.setDate(e.target.value);
    });

    return $dateInputItem;
}
