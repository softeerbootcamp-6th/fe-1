import { formatNumberWithCommas, getTotalAmount } from '../../lib/utils.js';
import dateStore from '../../store/date.js';
import paymentDataStore from '../../store/paymentData.js';

export default function createTotalAmountInfo() {
    const totalAmountInfo = document.createElement('div');
    totalAmountInfo.className = 'total-amount-info-container';

    renderTotalAmountInfo();

    document.addEventListener('dateChanged', renderTotalAmountInfo);
    document.addEventListener('paymentDataUpdated', renderTotalAmountInfo);

    function renderTotalAmountInfo() {
        const { totalIncome, totalExpense } = getTotalAmount(
            paymentDataStore.getPaymentData(
                dateStore.getYear(),
                dateStore.getMonth()
            )
        );

        totalAmountInfo.innerHTML = `
            <div class="total-amount-info">
                <span class="serif-14">총 수입</span>
                <span class="serif-14">
                    ${formatNumberWithCommas(totalIncome)}원
                </span>
                <span class="serif-14">총 지출</span>
                <span class="serif-14">
                    ${formatNumberWithCommas(totalExpense)}원
                </span>
            </div>
            <div class="total-amount-info">
                <span class="serif-14">총합</span>
                <span class="serif-14">
                    ${formatNumberWithCommas(totalIncome - totalExpense)}원
                </span>
            </div>
        `;
    }

    return totalAmountInfo;
}
