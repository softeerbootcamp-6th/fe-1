import { monthState } from "../../stores/subjects/index.js";
import { PIE_CHART_DATA } from "../../utils/constants.js";
import CategoryTag from "../../components/CategoryTag/CategoryTag.js";
import DailyHistory from "../../components/DailyHistory/DailyHistory.js";

class ChartView {
  constructor() {
    this.$pieChart = document.querySelector(".pie-chart");
    this.$chartDetail = document.querySelector(".chart__detail");
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
                    <li class="pie-chart__item" data-category="${
                      item.category
                    }">
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

  renderLineChart(data) {
    const CANVAS_WIDTH = 1500;
    const CANVAS_HEIGHT = 600;
    const CANVAS_PADDING_X = 40;
    const CANVAS_PADDING_Y = 80;
    const CANVAS_FONT_SIZE = 28;
    const CANVAS_FONT_WEIGHT = 600;
    const CANVAS_FONT_LINE_HEIGHT = 32;

    const { lineChartData, selectedCategory } = data;
    const template = `
      <h6 class="line-chart__title font-light-16">${selectedCategory} 카테고리 소비 추이</h6>
      <canvas class="canvas"></canvas>
    `;
    const lienChart = document.createElement("article");
    lienChart.classList.add("line-chart");
    lienChart.innerHTML = template;

    const canvas = lienChart.querySelector(".canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext("2d");

    const chartWidth = CANVAS_WIDTH - CANVAS_PADDING_X * 2;
    const chartHeight = CANVAS_HEIGHT - CANVAS_PADDING_Y * 2;

    const maxValue = Math.max(...lineChartData.map((d) => d.amount));
    const stepX = chartWidth / (lineChartData.length - 1);

    const points = lineChartData.map((d, i) => {
      const x = CANVAS_PADDING_X + i * stepX;
      const y =
        CANVAS_HEIGHT - CANVAS_PADDING_Y - (d.amount / maxValue) * chartHeight;
      return { x, y, ...d };
    });

    // ✅ Y축 눈금선 추가
    const numTicks = 5;
    const tickStep = Math.ceil(maxValue / numTicks / 10000) * 10000; // 단위 맞춤
    ctx.strokeStyle = "#ddd";
    ctx.fillStyle = "#999";
    ctx.font = `${CANVAS_FONT_SIZE}px Pretendard`;
    ctx.fontWeight = CANVAS_FONT_WEIGHT;
    ctx.lineHeight = CANVAS_FONT_LINE_HEIGHT;
    ctx.textAlign = "right";

    for (let i = 0; i <= numTicks; i++) {
      const value = tickStep * i;
      const y =
        CANVAS_HEIGHT - CANVAS_PADDING_Y - (value / maxValue) * chartHeight;

      // 선
      ctx.beginPath();
      ctx.moveTo(CANVAS_PADDING_X - 5, y);
      ctx.lineTo(CANVAS_WIDTH - CANVAS_PADDING_X, y);
      ctx.stroke();
    }

    // ✅ 선 연결
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();

    // ✅ 점과 라벨
    points.forEach(({ x, y, amount, month }, index) => {
      // 점
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = "#000";
      ctx.fill();

      // 금액 텍스트 (위)
      ctx.font = `${CANVAS_FONT_SIZE}px Pretendard`;
      ctx.fontWeight = CANVAS_FONT_WEIGHT;
      ctx.lineHeight = CANVAS_FONT_LINE_HEIGHT;
      ctx.fillStyle = "#333";
      const textAlign = () => {
        if (index === 0) return "left";
        if (index === points.length - 1) return "right";
        return "center";
      };
      ctx.textAlign = textAlign();
      ctx.fillText(amount.toLocaleString(), x, y - 20);

      // 월 텍스트 (아래)
      ctx.font = `${CANVAS_FONT_SIZE}px Pretendard`;
      ctx.fontWeight = CANVAS_FONT_WEIGHT;
      ctx.lineHeight = CANVAS_FONT_LINE_HEIGHT;
      ctx.fillText(month, x, CANVAS_HEIGHT - CANVAS_PADDING_Y + 40);
    });

    return lienChart;
  }

  renderTransactions(data) {
    const { year, month } = monthState.getMonthInfo();
    const { sortedByDate: transactions } = data;

    const transactionsListContainer = document.createElement("section");
    transactionsListContainer.className = "transactions__list";
    transactions.forEach((transaction) => {
      const dailyHistory = DailyHistory({
        date: `${year}-${month}-${transaction.date}`,
        items: transaction.transactions,
      });
      transactionsListContainer.appendChild(dailyHistory);
    });

    return transactionsListContainer;
  }

  renderDetail(data) {
    const { selectedCategory, lineChartData, sortedByDate } = data;
    if (!selectedCategory) {
      this.$chartDetail.innerHTML = "";
      return;
    }
    const lineChart = this.renderLineChart({
      lineChartData,
      selectedCategory,
    });
    const transactions = this.renderTransactions({ sortedByDate });
    this.$chartDetail.innerHTML = "";
    this.$chartDetail.append(lineChart, transactions);
  }
}

export default ChartView;
