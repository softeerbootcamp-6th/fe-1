import DailyListBlock from "../../../components/DailyListBlock/DailyListBlock.js";

function DailyList({ data }) {
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
        } else {
            selectedId = newId;
            const current = document.getElementById(newId);
            if (current) {
                current.classList.add("selected");
                const btn = current.querySelector(".delete-button");
                if (btn) btn.style.display = "block";
            }
        }
    };

    return {
        element: `
            <div class="daily-list">
                <div class="flex-row">
                    <div class="date-text">${data.date}</div>
                    <div class="inline-block">
                        ${data.totalIncome !== 0 ? `<span class="mr-1">수입</span><span>${data.totalIncome}원</span>` : ''}
                        ${data.totalExpenses !== 0 ? `<span class="mr-1">지출</span><span>${data.totalExpenses}원</span>` : ''}
                    </div>
                </div>
                <div class="daily-list-content">
                    ${list?.length
                ? list.map(item =>
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
                const dailyListBlock = DailyListBlock({ data: item, onSelect: updateSelected });
                if (dailyListBlock.init) dailyListBlock.init();
            });
        }
    };
}

export default DailyList;