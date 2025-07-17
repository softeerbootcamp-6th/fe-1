import CategoryTag from "../../components/CategoryTag/CategoryTag.js";
import { PIE_CHART_DATA } from "../../utils/constants.js";
class ChartView {
  constructor() {
    this.$pieChart = document.querySelector(".pie-chart");
    this.$barChart = document.querySelector(".bar-chart");
    this.$transactions = document.querySelector(".transactions");
  }

  render(data) {
    const { groupedByCategory } = data;
    PIE_CHART_DATA.forEach((item) => {
      const total = groupedByCategory[item.category] || 0;
      item.total = total;
    });

    const sortedList = PIE_CHART_DATA.sort((a, b) => b.total - a.total);
    const totalExpense = sortedList.reduce((acc, item) => acc + item.total, 0);
    const total = totalExpense || 1; // divide-by-zero 방지

    const template = `
        <div class="pie-chart__container">
            <div class="pie-chart__circle"></div>
        </div>
        <div class="pie-chart__content">
            <div class="pie-chart__total font-serif-14">
                <span>이번 달 지출 금액</span>
                <span>${totalExpense.toLocaleString()}원</span>
            </div>
            <ul class="pie-chart__list">
                ${sortedList
                  .map(
                    (item) => `
                    <li class="pie-chart__item">
                        ${CategoryTag({ label: item.category }).outerHTML}
                        <div class="pie-chart__item-value font-light-14">
                            <span>
                                ${Math.round((item.total / total) * 100)}%
                            </span>
                            <span>${item.total.toLocaleString()}원</span>
                        </div>
                    </li>
                `
                  )
                  .join("")}
            </ul>
        </div>
    `;
    this.$pieChart.innerHTML = template;

    let currentPercent = 0;

    const segments = sortedList
      .filter((item) => item.total > 0)
      .map(({ color, total }) => {
        const percent = (total / totalExpense) * 100;
        const segment = `${color} ${currentPercent}% ${
          currentPercent + percent
        }%`;
        currentPercent += percent;
        return segment;
      });

    const gradient = `conic-gradient(${segments.join(", ")})`;

    // DOM에 적용
    const pieCircle = this.$pieChart.querySelector(".pie-chart__circle");
    if (pieCircle) {
      pieCircle.style.background = gradient;
    }
  }
}

export default ChartView;
