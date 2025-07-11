export function updateTotalAmounts(){
    const incomeTotal = document.querySelectorAll(".income-amount");
    const expenseTotal = document.querySelectorAll(".expense-amount");
    
    let totalSize = 0;
    let totalIncome = 0;
    let totalExpense = 0;

    incomeTotal.forEach((item) => {
        console.log(item);
        const amount = parseInt(item.textContent.replace(/[^\d]/g, ""));
        totalIncome += amount;
    });
    expenseTotal.forEach((item) => {
        const amount = parseInt(item.textContent.replace(/[^\d]/g, ""));
        totalExpense += amount;
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
    incomeDisplay.innerHTML = `
    <div class="total-income">
        <img src="../../assets/icons/black-check.svg"></img>
        <div class="total-size">수입: ${totalIncome.toLocaleString()}원</div>
    </div>
    `;
    expenseDisplay.innerHTML =  `
    <div class="total-income">
        <img src="../../assets/icons/black-check.svg"></img>
        <div class="total-size">지출: ${totalExpense.toLocaleString()}원</div>
    </div>
    `;
}