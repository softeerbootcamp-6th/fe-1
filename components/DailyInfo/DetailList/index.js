import createDetailListItem from '../DetailListItem/index.js';

function createDetailList({ records }) {
    const detailList = document.createElement('ol');
    detailList.className = 'daily-info-detail-list';

    records.map(({ id, category, description, paymentMethod, amount }) => {
        const item = createDetailListItem({
            id,
            category,
            description,
            paymentMethod,
            amount,
        });
        detailList.appendChild(item);
    });

    return detailList;
}

export default createDetailList;
