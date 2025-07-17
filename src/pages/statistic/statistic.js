import { updateHeaderDate } from "../../utils/date-utils.js";
import { formatAmount } from "../../utils/format-utils.js";
import {
  getFilteredData,
  getMonthlyExpenseByCategory,
  getFilteredExpenseDataByCategory,
} from "../../utils/data-utils.js";
import { getTransactions } from "../../api/transaction.js";
import { dateStore } from "../../store/date-store.js";
import { loadCSS } from "../../store/routing-store.js";
import { renderHistoryListWithFilter } from "../main/utils/main-ui-utils.js";

export function initStatistic() {
  // DOM 요소들
  const categoryListEl = document.getElementById("category-list");
  const totalExpenseAmountEl = document.getElementById("total-expense-amount");
  const chartPlaceholderEl = document.getElementById("chart-placeholder");
  const trendContainerEl = document.getElementById("trend-chart");
  const historyListEl = document.getElementById("history-list");

  // 라인 차트 컨테이너 및 히스토리 리스트 초기화
  if (trendContainerEl && historyListEl) {
    console.log("초기화");
    trendContainerEl.innerHTML = "";
    historyListEl.innerHTML = "";
  }

  // 카테고리별 색상 매핑
  const categoryColors = {
    월급: "#e39d5d",
    용돈: "#aacd7e",
    기타수입: "#a28878",
    생활: "#a7b9e9",
    "의료/건강": "#bcdfd3",
    "쇼핑/뷰티": "#d7ca6b",
    교통: "#7db7bf",
    식비: "#c5e0eb",
    "문화/여가": "#bda6e1",
    미분류: "#f0b0d3",
    기타: "#73a7d4",
  };

  // 기존 canvas 의 arc 함수를 svg path 형식으로 변환하는 함수
  function describeArc(cx, cy, rOuter, rInner, startAngle, endAngle) {
    const polarToCartesian = (cx, cy, r, angle) => [
      cx + r * Math.cos(angle),
      cy + r * Math.sin(angle),
    ];
    const [x1, y1] = polarToCartesian(cx, cy, rOuter, startAngle);
    const [x2, y2] = polarToCartesian(cx, cy, rOuter, endAngle);
    const [x3, y3] = polarToCartesian(cx, cy, rInner, endAngle);
    const [x4, y4] = polarToCartesian(cx, cy, rInner, startAngle);
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    return [
      `M ${x1} ${y1}`,
      `A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
      "Z",
    ].join(" ");
  }

  // 도넛 차트 SVG 생성 함수
  function renderDonutChart(data, highlightCategory = null) {
    // 기존 SVG 제거
    const existingSvg = chartPlaceholderEl.querySelector("#donut-chart");
    if (existingSvg) existingSvg.remove();
    const size = 300;
    const cx = size / 2;
    const cy = size / 2;
    const rOuter = cx - 30;
    const rInner = rOuter * 0.5;
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("id", "donut-chart");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.style.display = "block";
    svg.style.margin = "0 auto";
    svg.style.background = "var(--neutral-surface-default)";

    if (!data.sortedCategories || data.sortedCategories.length === 0) {
      // 데이터 없음 표시
      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", cx);
      circle.setAttribute("cy", cy);
      circle.setAttribute("r", rOuter);
      circle.setAttribute("fill", "#e0e0e0");
      svg.appendChild(circle);
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", cx);
      text.setAttribute("y", cy + 6);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "#999");
      text.setAttribute("font-size", "16");
      text.textContent = "데이터 없음";
      svg.appendChild(text);
      chartPlaceholderEl.appendChild(svg);
      return;
    }

    let currentAngle = -Math.PI / 2;
    data.sortedCategories.forEach(([category, stats]) => {
      const sliceAngle = (stats.percentage / 100) * 2 * Math.PI;
      let startAngle = currentAngle;
      let endAngle = currentAngle + sliceAngle;
      const tinyNumber = 0.0001;
      const superTinyNumber = 0.0001;
      // 시작과 끝이 같으면(100%) endAngle을 살짝 줄임
      if (Math.abs(endAngle - startAngle) >= 2 * Math.PI - tinyNumber) {
        endAngle -= superTinyNumber;
      }
      let color = categoryColors[category] || categoryColors["기타"];
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute(
        "d",
        describeArc(cx, cy, rOuter, rInner, startAngle, endAngle)
      );
      path.setAttribute("fill", color);
      path.setAttribute("data-category", category);
      path.classList.add("donut-arc");
      // 클릭 이벤트: 트렌드 차트 표시 및 강조
      path.addEventListener("click", () => {
        renderDonutChart(data, category); // 강조 다시 그림
        showCategoryTrendChart(category);
      });
      svg.appendChild(path);
      currentAngle = endAngle;
    });
    chartPlaceholderEl.appendChild(svg);
  }

  // 통계 데이터 계산 함수
  async function calculateStatistics() {
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
        const percentage =
          (categoryStats[category].amount / totalExpense) * 1000;

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
  function renderCategoryList(data) {
    const listHTML = data.sortedCategories
      .map(([category, stats]) => {
        const color = categoryColors[category] || categoryColors["기타"];
        return `
        <div class="category-item" data-category="${category}">
          <div class="category-info" style="background-color: ${color}">
            <span class="category-name">${category}</span>
          </div>
          <div class="category-stats">
            <span class="category-percentage">${stats.percentage}%</span>
            <span class="category-amount">${formatAmount(stats.amount)}원</span>
          </div>
        </div>
      `;
      })
      .join("");
    categoryListEl.innerHTML = listHTML;

    // 클릭 이벤트 등록
    categoryListEl.querySelectorAll(".category-item").forEach((item) => {
      item.addEventListener("click", function () {
        const category = this.dataset.category;
        showCategoryTrendChart(category);
      });
    });
  }

  // 전체 통계 업데이트 함수
  async function updateStatistics() {
    try {
      const statisticsData = await calculateStatistics();
      // 총 지출 금액 업데이트 (요소가 있다면)
      if (totalExpenseAmountEl) {
        totalExpenseAmountEl.textContent = `${formatAmount(
          statisticsData.totalExpense
        )}원`;
      }
      renderDonutChart(statisticsData); // SVG 차트로 변경
      // 카테고리 리스트 렌더링
      if (categoryListEl) {
        renderCategoryList(statisticsData);
      }
    } catch (error) {
      console.error("통계 업데이트 실패:", error);
    }
  }

  // 초기 렌더링
  updateHeaderDate();
  updateStatistics();
}
async function showCategoryTrendChart(category) {
  try {
    // API에서 전체 데이터 가져오기
    const allData = await getTransactions();
    // 월별 데이터 추출
    const monthlyData = getMonthlyExpenseByCategory(allData, category);

    // 차트 그릴 canvas 준비
    const trendContainer = document.getElementById("trend-chart");
    if (!trendContainer) return;

    // 기존 캔버스가 있다면 제거
    const existingCanvas = trendContainer.querySelector("canvas");
    if (existingCanvas) {
      existingCanvas.remove();
    }

    // 새 캔버스 생성
    const trendCanvas = document.createElement("canvas");
    trendCanvas.width = 850;
    trendCanvas.height = 450;

    trendCanvas.style.margin = "20px auto";
    trendCanvas.style.border = "1px solid black";

    // 컨테이너에 캔버스 추가
    trendContainer.appendChild(trendCanvas);

    // 차트 데이터 준비
    const months = Array.from({ length: 12 }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    );
    const year = dateStore.getState().currentYear;
    const dataArr = months.map((m) => monthlyData[`${year}-${m}`] || 0);

    // 차트 그리기
    drawLineChart(trendCanvas, dataArr, months, category);
    renderExpenseHistoryList(allData, category);
  } catch (error) {
    console.error("카테고리 트렌드 차트 로드 실패:", error);
  }
}

// 차트 그리기 함수
function drawLineChart(canvas, dataArr, months, category) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 캔버스/그래프 영역 설정
  const width = canvas.width;
  const height = canvas.height;
  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // 데이터 최대값 (0이면 1로)
  const maxValue = Math.max(...dataArr, 1);

  // 1. 배경 보조선(격자)
  ctx.save();
  ctx.strokeStyle = "rgba(50, 50, 50, 0.12)";
  ctx.lineWidth = 0.5;
  ctx.font = "12px Arial";
  ctx.fillStyle = "#888";

  // Y축 12등분
  for (let i = 0; i <= 14; i++) {
    const y = padding + (chartHeight * i) / 14;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }
  // X축 12등분 (월)
  for (let i = 0; i < 12; i++) {
    const x = padding + (chartWidth * i) / 11;
    ctx.beginPath();
    ctx.moveTo(x, padding);
    ctx.lineTo(x, height - padding);
    ctx.stroke();
    // 월 라벨
    ctx.fillText(months[i], x - 8, height - 8);
  }
  ctx.restore();

  // 2. 데이터 점 및 선
  ctx.save();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.beginPath();
  dataArr.forEach((v, i) => {
    const x = padding + (chartWidth * i) / 11;
    const y = padding + chartHeight * (1 - v / maxValue);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // 점 찍기 및 금액 표시
  ctx.fillStyle = "black";
  dataArr.forEach((v, i) => {
    const x = padding + (chartWidth * i) / 11;
    const y = padding + chartHeight * (1 - v / maxValue);

    // 점 그리기
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();

    // 금액 표시 (0이 아닌 경우만)
    if (v > 0) {
      ctx.save();
      ctx.font = "12px Pretendard";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";

      // 금액 포맷팅 (천 단위 콤마)
      const formattedAmount = v
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      // 점 위쪽에 표시 (점이 위쪽에 있으면 아래쪽에 표시)
      const textY = y + 20;
      ctx.fillText(`${formattedAmount}원`, x, textY);
      ctx.restore();
    }
  });
  ctx.restore();

  // 3. 차트 제목
  ctx.save();
  ctx.font = "16px Pretendard";
  ctx.fillStyle = "black";
  ctx.textAlign = "start";
  ctx.fillText(`${category} 월별 소비 추이`, padding, 32);
  ctx.restore();
}

// 통계 페이지용 카테고리별 지출 내역 렌더링 함수
async function renderExpenseHistoryList(transactions, category) {
  //TODO[규진] - 메인 페이지 스타일 로드(추후에 시간이 남으면 컴포넌트화 후 해당 컴포넌트만 로드하도록 수정)
  loadCSS("src/pages/main/main.css");

  // 확장된 렌더링 함수 사용
  return renderHistoryListWithFilter(transactions, (data) =>
    getFilteredExpenseDataByCategory(data, category)
  );
}
