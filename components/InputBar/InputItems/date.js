import { formatDate } from '../../../lib/utils.js';

const createDate = () => {
    const today = formatDate(new Date(), 'YYYY-MM-DD');

    const dateItem = document.createElement('div');
    dateItem.className = 'input-bar-item';
    dateItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="date-input" class="light-12">일자</label>
        </div>
        <div class="input-bar-item-wrapper">
            <input type="date" id="date-input" class="semibold-12" value=${today} />
        </div>
    `;

    return dateItem;
};

export default createDate;
