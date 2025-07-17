import { formatAmount } from "../../../../utils/format-utils.js";
import { getFilteredData } from "../../../../utils/data-utils.js";
import { getTransactions } from "../../../../api/transaction.js";

// 카테고리별 색상 매핑
const categoryColors = {
  월급: "#e39d5d",
  용돈: "#aacd7e",
  기타수입: "#aacd7e",
  생활: "#a7b9e9",
  "의료/건강": "#bcdfd3",
  "쇼핑/뷰티": "#d7ca6b",
  교통: "#7db7bf",
  식비: "#c5e0eb",
  "문화/여가": "#bda6e1",
  미분류: "#f0b0d3",
  기타: "#73a7d4",
};

// 통계 데이터 계산 함수
export async function calculateStatistics() {
  try {
    // API에서 데이터 가져오기
    const storeData = await getTransactions();
    // 해당 월의 데이터 가져오기
    const monthlyData = getFilteredData(storeData);
    // 지출 데이터만 필터링 (음수 금액)
    const expenseData = monthlyData.filter((item) => item.amount < 0);
    // 카테고리별 지출 집계
    const categoryStats = {};
    let totalExpense = 0;

    expenseData.forEach((item) => {
      const category = item.category || "미분류";
      const amount = Math.abs(item.amount);
      if (!categoryStats[category]) {
        categoryStats[category] = {
          amount: 0,
          count: 0,
          percentage: 0,
        };
      }
      categoryStats[category].amount += amount;
      categoryStats[category].count += 1;
      totalExpense += amount;
    });

    // 퍼센트 계산 (소수 첫째 자리까지)
    Object.keys(categoryStats).forEach((category) => {
      const percentage = (categoryStats[category].amount / totalExpense) * 1000;
      categoryStats[category].percentage = Math.round(percentage) / 10;
    });

    // 금액 순으로 정렬
    const sortedCategories = Object.entries(categoryStats).sort(
      ([, a], [, b]) => b.amount - a.amount
    );

    return {
      totalExpense,
      categoryStats: Object.fromEntries(sortedCategories),
      sortedCategories,
    };
  } catch (error) {
    console.error("통계 데이터 계산 실패:", error);
    return {
      totalExpense: 0,
      categoryStats: {},
      sortedCategories: [],
    };
  }
}

// 카테고리 리스트 렌더링 함수
export function renderCategoryList(data) {
  const categoryListEl = document.getElementById("category-list");
  const totalExpenseAmountEl = document.getElementById("total-expense-amount");

  // 총 지출 금액 업데이트
  totalExpenseAmountEl.textContent = `${formatAmount(data.totalExpense)}원`;

  const listHTML = data.sortedCategories
    .map(([category, stats]) => {
      const color = categoryColors[category] || categoryColors["기타"];
      return `
      <div class="category-item" data-category="${category}">
        <div class="category-info" style="background-color: ${color}">
          <span class="category-name">${category}</span>
        </div>
        <div class="category-details">
          <span class="category-amount">${formatAmount(stats.amount)}원</span>
          <span class="category-percentage">${stats.percentage}%</span>
        </div>
      </div>
    `;
    })
    .join("");

  categoryListEl.innerHTML = listHTML;
}

// 카테고리 초기화 함수
export async function initCategory() {
  try {
    const data = await calculateStatistics();
    renderCategoryList(data);
  } catch (error) {
    console.error("카테고리 초기화 실패:", error);
  }
}
