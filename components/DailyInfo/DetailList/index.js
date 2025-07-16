import createDetailListItem from '../DetailListItem/index.js';

function createDetailList({ records }) {
    const detailList = document.createElement('ol');
    detailList.className = 'daily-info-detail-list';

    records.map(({ id, category, description, payment, value }) => {
        const item = createDetailListItem({
            id,
            category,
            description,
            payment,
            value,
        });
        detailList.appendChild(item);
    });

    return detailList;
}

export default createDetailList;
