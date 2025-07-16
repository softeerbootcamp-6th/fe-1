import createDailyList from '../DailyInfo/List/index.js';
import paymentDataStore from '../../store/paymentData.js';

export default function createMonthlyInfo() {
    const monthlyInfo = document.createElement('div');
    monthlyInfo.className = 'main-container';
    monthlyInfo.innerHTML = `
        <div class="main-container">
            <div class="monthly-info">
                <div class="item-counter">
                    <span class="light-12">전체 내역</span>
                    <span class="light-12">13건</span>
                </div>
                <div class="checkbox-buttons">
                    <div class="checkbox-button-container">
                        <button class="checkbox-button">
                            <img
                                src="/assets/icons/checkbox.svg"
                                alt="Checkbox Icon"
                                width="16"
                                height="16"
                            />
                        </button>
                        <span class="light-12"> 수입 </span>
                    </div>
                    <div class="checkbox-button-container">
                        <button class="checkbox-button">
                            <img
                                src="/assets/icons/uncheckbox.svg"
                                alt="Uncheckbox Icon"
                                width="16"
                                height="16"
                            />
                        </button>
                        <span class="light-12"> 지출 </span>
                    </div>
                </div>
            </div>
            <ol class="daily-list-container">
            </ol>
        </div>
    `;

    const dailyListContainer = monthlyInfo.querySelector(
        '.daily-list-container'
    );

    paymentDataStore.paymentData.map((data) => {
        const dailyList = createDailyList(data);
        dailyListContainer.appendChild(dailyList);
    });

    return monthlyInfo;
}
