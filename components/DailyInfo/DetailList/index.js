import createDetailListItem from '../DetailListItem/index.js';

function createDetailList({ records }) {
    const detailList = document.createElement('ol');
    detailList.className = 'daily-info-detail-list';

    records.map(({ category, description, payment, value }) => {
        const item = createDetailListItem({
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
