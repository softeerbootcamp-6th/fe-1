import { sharedState } from "../state/state.js";

export function updateTotalAmounts(){
    // 현재 표시된 항목만 계산에 포함
    const incomeTotal = document.querySelectorAll(".income-amount:not(.hidden-income)");
    const expenseTotal = document.querySelectorAll(".expense-amount:not(.hidden-expense)");
    
    let totalSize = 0;
    let totalIncome = 0;
    let totalExpense = 0;

    // 표시된 수입 항목만 합계 계산
    incomeTotal.forEach((item) => {
        if (item.closest('.entry-row')) {
            const amount = parseInt(item.textContent.replace(/[^\d]/g, ""));
            totalIncome += amount;
        }
    });
    
    // 표시된 지출 항목만 합계 계산
    expenseTotal.forEach((item) => {
        if (item.closest('.entry-row')) {
            const amount = parseInt(item.textContent.replace(/[^\d]/g, ""));
            totalExpense += amount;
        }
    });
    const sizeDisplay = document.getElementById("total-amount-text");
    const incomeDisplay = document.getElementById("total-income");
    const expenseDisplay = document.getElementById("total-expense");

    totalSize = incomeTotal.length + expenseTotal.length;
    sizeDisplay.innerHTML = `
    <div class="total-size">
        전체 내역: ${totalSize}건
    </div>
    `;
    
    // 수입 필터가 활성화 상태인지 확인하고 적절한 이미지 표시
    const incomeCheckboxImage = sharedState.showIncome ? "checkbox.svg" : "uncheckbox.svg";
    incomeDisplay.innerHTML = `
    <div class="total-income">
        <img src="../../assets/icons/${incomeCheckboxImage}" class="checkbox-image"></img>
        <div class="total-size">수입: ${totalIncome.toLocaleString()}원</div>
    </div>
    `;
    
    // 지출 필터가 활성화 상태인지 확인하고 적절한 이미지 표시
    const expenseCheckboxImage = sharedState.showExpense ? "checkbox.svg" : "uncheckbox.svg";
    expenseDisplay.innerHTML =  `
    <div class="total-income">
        <img src="../../assets/icons/${expenseCheckboxImage}" class="checkbox-image"></img>
        <div class="total-size">지출: ${totalExpense.toLocaleString()}원</div>
    </div>
    `;

    sharedState.totalIncome = totalIncome; // 상태 업데이트
    sharedState.totalExpense = totalExpense; // 상태 업데이트
    console.log("Total Income:", totalIncome);
    console.log("Total Expense:", totalExpense);
}