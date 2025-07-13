import { dummyData } from "../../constants/dummy.js";
import { updateHeaderDate } from "../../utils/dateUtils.js";
import { formatAmount } from "../../utils/formatUtils.js";
import { getFilteredData } from "../../utils/dataUtils.js";

function initStatistic() {
  console.log("initStatistic 호출됨");

  // DOM 요소들
  const categoryListEl = document.getElementById("category-list");
  const totalExpenseAmountEl = document.getElementById("total-expense-amount");
  const chartPlaceholder = document.getElementById("chart-placeholder");

  console.log("DOM 요소들:", {
    categoryListEl,
    totalExpenseAmountEl,
    chartPlaceholder,
  });

  // 캔버스 생성 및 설정
  const chartCanvas = document.createElement("canvas");
  chartCanvas.id = "expense-chart";
  chartCanvas.width = 300;
  chartCanvas.height = 300;

  // 캔버스 스타일 설정
  chartCanvas.style.display = "block";
  chartCanvas.style.margin = "0 auto";
  chartCanvas.style.border = "2px solid var(--neutral-border-default)";
  chartCanvas.style.borderRadius = "8px";
  chartCanvas.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  chartCanvas.style.backgroundColor = "var(--neutral-surface-default)";

  // 차트 영역에 추가
  if (chartPlaceholder) {
    chartPlaceholder.appendChild(chartCanvas);
    console.log("새 캔버스를 chart-placeholder에 추가했습니다");
    console.log("생성된 캔버스:", chartCanvas);
    console.log("캔버스 위치:", chartCanvas.getBoundingClientRect());
  } else {
    console.error("chart-placeholder를 찾을 수 없습니다");
  }

  // 간단한 테스트 - 캔버스가 정상 작동하는지 확인
  const testCtx = chartCanvas.getContext("2d");
  testCtx.fillStyle = "red";
  testCtx.fillRect(0, 0, 50, 50);
  console.log("테스트 빨간 사각형 그리기 완료");

  // 전역 변수 초기화 (헤더와 동기화)
  if (!window.currentYear) window.currentYear = new Date().getFullYear();
  if (window.currentMonth === undefined)
    window.currentMonth = new Date().getMonth();

  console.log("현재 년월:", window.currentYear, window.currentMonth);

  // 카테고리별 색상 매핑 (동적 CSS 변수는 미사용 - 안 되는데 왜 그러지 ㅜㅜ)
  const categoryColors = {
    월급: "#8FA7CA",
    용돈: "#A8C7A8",
    기타수입: "#D4B896",
    생활: "#8FA7CA",
    "의료/건강": "#A8C7A8",
    "쇼핑/뷰티": "#D4B896",
    교통: "#9BC4D1",
    식비: "#B8C5E8",
    "문화/여가": "#C8A8D1",
    미분류: "#E8B8C8",
    기타: "#D1C4A8",
  };

  // 통계 데이터 계산 함수
  function calculateStatistics(year, month) {
    console.log("calculateStatistics 호출:", year, month);
    console.log("전체 dummyData:", dummyData);

    // 해당 월의 데이터 가져오기
    const monthlyData = getFilteredData(dummyData, year, month);
    console.log("월별 데이터:", monthlyData);

    // 지출 데이터만 필터링 (음수 금액)
    const expenseData = monthlyData.filter((item) => item.amount < 0);
    console.log("지출 데이터:", expenseData);

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

    // 퍼센트 계산
    Object.keys(categoryStats).forEach((category) => {
      categoryStats[category].percentage =
        totalExpense > 0
          ? Math.round((categoryStats[category].amount / totalExpense) * 100)
          : 0;
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
  }

  // 도넛 차트 그리기 함수
  function drawDonutChart(canvas, data) {
    console.log("drawDonutChart 호출됨", canvas, data);

    if (!canvas) {
      console.error("캔버스가 null입니다");
      return;
    }

    // 캔버스 크기 설정
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("2D 컨텍스트를 가져올 수 없습니다");
      return;
    }

    console.log("컨텍스트 획득 성공:", ctx);
    console.log("캔버스 실제 크기:", canvas.width, canvas.height);
    console.log("캔버스 DOM 크기:", canvas.offsetWidth, canvas.offsetHeight);

    // 간단한 테스트 그리기
    ctx.fillStyle = "blue";
    ctx.fillRect(10, 10, 50, 50);
    console.log("파란 사각형 테스트 완료");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = Math.min(centerX, centerY) - 20;
    const innerRadius = outerRadius * 0.6;

    console.log("차트 설정:", { centerX, centerY, outerRadius, innerRadius });

    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!data.sortedCategories || data.sortedCategories.length === 0) {
      console.log("데이터가 없어서 빈 차트를 그립니다");
      // 빈 원 그리기
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
      ctx.arc(centerX, centerY, innerRadius, 2 * Math.PI, 0, true);
      ctx.fillStyle = "#e0e0e0";
      ctx.fill();
      return;
    }

    let currentAngle = -Math.PI / 2; // 12시 방향부터 시작

    data.sortedCategories.forEach(([category, stats]) => {
      const sliceAngle = (stats.percentage / 100) * 2 * Math.PI;
      const color = categoryColors[category] || categoryColors["기타"];

      console.log(
        `차트 조각 그리기: ${category}, ${stats.percentage}%, 색상: ${color}`
      );

      // 도넛 조각 그리기
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        outerRadius,
        currentAngle,
        currentAngle + sliceAngle
      );
      ctx.arc(
        centerX,
        centerY,
        innerRadius,
        currentAngle + sliceAngle,
        currentAngle,
        true
      );
      ctx.closePath();
      ctx.fillStyle = color;
      console.log("ctx.fillStyle", ctx.fillStyle);
      ctx.fill();

      currentAngle += sliceAngle;
      console.log("currentAngle", currentAngle);
    });

    console.log("차트 그리기 완료", ctx);
  }

  // 카테고리 리스트 렌더링 함수
  function renderCategoryList(data) {
    const listHTML = data.sortedCategories
      .map(([category, stats]) => {
        const color = categoryColors[category] || categoryColors["기타"];
        return `
        <div class="category-item">
          <div class="category-info">
            <div class="category-color" style="background-color: ${color}"></div>
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
  }

  // 전체 통계 업데이트 함수
  function updateStatistics(year, month) {
    console.log("updateStatistics 호출됨:", year, month);
    const statisticsData = calculateStatistics(year, month);
    console.log("통계 데이터:", statisticsData);

    // 총 지출 금액 업데이트 (요소가 있다면)
    if (totalExpenseAmountEl) {
      totalExpenseAmountEl.textContent = `${formatAmount(
        statisticsData.totalExpense
      )}원`;
    }

    // 도넛 차트 그리기
    if (chartCanvas) {
      console.log("차트 그리기 시작 캔버스:", chartCanvas);
      console.log("차트 캔버스 크기:", chartCanvas.width, chartCanvas.height);
      console.log("차트 캔버스 위치:", chartCanvas.getBoundingClientRect());
      console.log("차트 캔버스 부모:", chartCanvas.parentElement);
      drawDonutChart(chartCanvas, statisticsData);
    } else {
      console.error("차트 캔버스를 찾을 수 없음");
    }

    // 카테고리 리스트 렌더링
    if (categoryListEl) {
      console.log("카테고리 리스트 렌더링 시작");
      renderCategoryList(statisticsData);
    } else {
      console.error("카테고리 리스트 요소를 찾을 수 없음");
    }
  }

  // DOM 요소가 모두 준비되었는지 확인
  if (!categoryListEl || !chartPlaceholder) {
    console.error("필수 DOM 요소를 찾을 수 없습니다. 다시 시도합니다.");
    setTimeout(() => {
      console.log("재시도 중...");
      initStatistic();
    }, 100);
    return;
  }

  // 초기 렌더링
  console.log("초기 렌더링 시작");
  updateHeaderDate(window.currentYear, window.currentMonth);
  updateStatistics(window.currentYear, window.currentMonth);

  // 전역 함수로 등록 (월 변경 시 호출용)
  window.updateStatistics = updateStatistics;
}

window.initStatistic = initStatistic;
