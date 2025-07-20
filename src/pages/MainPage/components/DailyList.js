import DailyListBlock from "../../../components/DailyListBlock/DailyListBlock.js";
import { formatAmount } from '../../../utils/format.js';

function DailyList({ data, inputBar, incomeFilterOn, expenseFilterOn }) {
    const list = data.list;
    let selectedId = null;

    const updateSelected = (newId) => {
        if (selectedId && selectedId !== newId) {
            const prev = document.getElementById(selectedId);
            if (prev) {
                prev.classList.remove("selected");
                const prevBtn = prev.querySelector(".delete-button");
                if (prevBtn) prevBtn.style.display = "none";
            }
        }

        // 토글: 같은 ID 클릭 시 선택 해제
        if (selectedId === newId) {
            selectedId = null;
            const current = document.getElementById(newId);
            if (current) {
                current.classList.remove("selected");
                const btn = current.querySelector(".delete-button");
                if (btn) btn.style.display = "none";
            }

            // InputBar의 입력 필드 초기화
            inputBar.resetFields();
        } else {
            selectedId = newId;
            const current = document.getElementById(newId);
            if (current) {
                current.classList.add("selected");
                const btn = current.querySelector(".delete-button");
                if (btn) btn.style.display = "block";
            }

            // InputBar의 입력 필드에 선택된 데이터 설정
            const selectedData = list.find(item => item.blockId === newId);
            inputBar.setFields(selectedData);

        }
    };

    return {
        element: `
            <div class="daily-list">
                <div class="flex-row">
                    <div class="date-text">${data.date}</div>
                    <div class="inline-block">
                        ${data.totalIncome !== 0 ? `<span class="mr-1">수입</span><span class="mr-2">${formatAmount(data.totalIncome)}원</span>` : ''}
                        ${data.totalExpenses !== 0 ? `<span class="mr-1">지출</span><span>${formatAmount(data.totalExpenses)}원</span>` : ''}
                    </div>
                </div>
                <div class="daily-list-content">
                    ${list?.length
                ? list.filter(item => {
                    if (item.amount > 0 && !incomeFilterOn) return false;
                    if (item.amount < 0 && !expenseFilterOn) return false;
                    return true;
                }).map(item =>
                    DailyListBlock({ data: item, onSelect: updateSelected }).element
                ).join('')
                : ''
            }
                </div>
            </div>
        `,
        init: () => {
            if (!list || list.length === 0) return;

            list.forEach(item => {
                if ((item.amount > 0 && incomeFilterOn) || (item.amount < 0 && expenseFilterOn)) {
                    const dailyListBlock = DailyListBlock({ data: item, onSelect: updateSelected });
                    if (dailyListBlock.init) dailyListBlock.init();
                }
            });
        }
    };
}

export default DailyList;