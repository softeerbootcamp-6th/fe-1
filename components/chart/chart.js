import { formatMoney } from "../../utils/format.js";
import { dateStore, transactionStore } from "../../store/index.js";
import { CATEGORY_NAME } from "../../constants/category.js";
import { getTotalExpenseData } from "../../utils/transaction.js";
import { renderLineChart } from "./lineChart.js";
import { createTransactionRow } from "../main/transactionsList.js";

// 카테고리별 지출 합계 및 퍼센트 구하기
export function getExpenseByCategory(
  totalExpenseTransactions,
  totalExpenseAmount
) {
  const expenseByCategory = {};

  // amount 누적
  totalExpenseTransactions.forEach((transaction) => {
    const cat = transaction.category;
    const amount = transaction.amount;
    if (!expenseByCategory[cat]) {
      expenseByCategory[cat] = { amount: 0, percent: 0 };
    }
    expenseByCategory[cat].amount += amount;
    expenseByCategory[cat].percent =
      (expenseByCategory[cat].amount / totalExpenseAmount) * 100;
  });

  return { expenseByCategory };
}

function createLegend(categories, expenseByCategory, totalExpenseAmount) {
  const dailyInfoTemplate = `
    <div class="daily-info serif-14 flex-between">
      <div>이번 달 지출 금액</div>
      <div>${formatMoney(totalExpenseAmount) || 0}원</div>
    </div>
    `;

  const legendTemplate = categories.reduce((acc, cat) => {
    return (
      acc +
      `
        <tr class="flex-between transaction-row">
            <td class="td-category light-12 category-${
              CATEGORY_NAME[cat] || "미분류"
            }">${cat}</td>
            <td class="light-14 legend-percent">${expenseByCategory[
              cat
            ].percent.toFixed(1)}%</td>
            <td class="light-14 legend-amount">${formatMoney(
              expenseByCategory[cat].amount
            )}원</td>
          </tr>
        `
    );
  }, "");

  return (
    dailyInfoTemplate +
    `<table class="legend-container tbody-border"><tbody>${legendTemplate}</tbody></table>`
  );
}

// 최신 6개월(이번달 포함) 카테고리 별 지출 총합 계산 및 출력
function logLast6MonthsTotalExpense(year, month, category) {
  const totalAmountByMonth = {};
  const totalTransactionList = {};

  for (let i = 0; i < 6; i++) {
    // 월이 0 이하일 때 연도/월 보정
    const calcYear = year - Math.floor((12 - month) / 12);
    const calcMonth = ((month - 1 - i + 12) % 12) + 1;
    const transactions = transactionStore.getTransactionsByCategory(
      calcYear,
      calcMonth,
      category
    );
    const { totalExpenseAmount } = getTotalExpenseData(transactions || []);
    totalAmountByMonth[calcMonth] = totalExpenseAmount;
    totalTransactionList[calcMonth] = transactions;
  }
  return { totalAmountByMonth, totalTransactionList };
}

export function renderLegend(
  container,
  categories,
  expenseByCategory,
  totalExpenseAmount
) {
  const legend = createLegend(
    categories,
    expenseByCategory,
    totalExpenseAmount
  );
  container.innerHTML = legend;

  // legend-container 내 transaction-row 클릭 시 카테고리명 콘솔 출력
  const legendTable = container.querySelector(".legend-container");
  if (legendTable) {
    legendTable.addEventListener("click", (e) => {
      const legendItem = e.target.closest(".transaction-row");
      if (legendItem && legendTable.contains(legendItem)) {
        const categoryName = legendItem
          .querySelector(".td-category")
          .textContent.trim();
        renderLineChartAndTransactionList(categoryName);
      }
    });
  }
}

export function renderLineChartAndTransactionList(categoryName) {
  const year = dateStore.getYear();
  const month = dateStore.getMonth();
  const { totalAmountByMonth, totalTransactionList } =
    logLast6MonthsTotalExpense(year, month, categoryName);
  const lineChartContainer = document.querySelector("#line-chart-container");
  renderLineChart(lineChartContainer, totalAmountByMonth);
  renderTransactionList(month, totalTransactionList);
}

export function createMonthlyExpenseTransactionList(
  month,
  totalTransactionList
) {
  // 1차원 배열에서 날짜별로 그룹핑
  const transactionListByDate = totalTransactionList[month].reduce(
    (acc, transaction) => {
      const date = transaction.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    },
    {}
  );

  // 날짜별로 섹션 생성
  const sections = Object.entries(transactionListByDate).reduce(
    (acc, [date, transactionList]) => {
      const { totalExpenseAmount } = getTotalExpenseData(transactionList);

      const header = `
        <div class="flex-between serif-14">
          <div>${date}</div>
          <div> 
          ${`지출 ${formatMoney(totalExpenseAmount)}원`}
       </div>
        </div>
      `;

      const rows = transactionList.reduce((rowAcc, transaction) => {
        const row = createTransactionRow(transaction, false);
        return rowAcc + row;
      }, "");

      return (
        acc +
        `
        ${header}
        <table>
            <tbody class="tbody-border">
                ${rows}
            </tbody>
        </table>
      `
      );
    },
    ""
  );

  return `
      ${sections}
  `;
}

export function initChart() {
  injectChartStyle();
}

function injectChartStyle() {
  if (document.getElementById("chart-style-link")) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "./components/chart/chart.style.css";
  link.id = "chart-style-link";
  document.head.appendChild(link);
}

export function renderTransactionList(month, totalTransactionList) {
  const transactionListContainer = document.querySelector(
    ".transaction-list-container"
  );
  if (transactionListContainer) {
    transactionListContainer.innerHTML = createMonthlyExpenseTransactionList(
      month,
      totalTransactionList
    );
  }
}
