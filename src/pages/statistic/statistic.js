import { accountBookStore } from "../../store/account-book-store.js";
import { updateHeaderDate } from "../../utils/date-utils.js";
import { formatAmount } from "../../utils/format-utils.js";
import {
  getFilteredData,
  getMonthlyExpenseByCategory,
} from "../../utils/data-utils.js";

function initStatistic() {
  // DOM 요소들
  const categoryListEl = document.getElementById("category-list");
  const totalExpenseAmountEl = document.getElementById("total-expense-amount");
  const chartPlaceholder = document.getElementById("chart-placeholder");

  // DOM 요소가 모두 준비되었는지 확인
  if (!categoryListEl || !chartPlaceholder) {
    setTimeout(() => {
      initStatistic();
    }, 100);
    return;
  }

  // 기존 캔버스가 있다면 제거
  const existingCanvas = document.getElementById("expense-chart");
  if (existingCanvas) {
    existingCanvas.remove();
  }

  // 캔버스 생성 및 설정
  const chartCanvas = document.createElement("canvas");
  chartCanvas.id = "expense-chart";

  // 캔버스 크기를 명시적으로 설정
  const canvasSize = 300;
  chartCanvas.width = canvasSize;
  chartCanvas.height = canvasSize;

  // 캔버스 스타일 설정
  chartCanvas.style.display = "block";
  chartCanvas.style.margin = "0 auto";
  chartCanvas.style.backgroundColor = "var(--neutral-surface-default)";
  chartCanvas.style.width = canvasSize + "px";
  chartCanvas.style.height = canvasSize + "px";

  // 차트 영역에 추가
  if (chartPlaceholder) {
    try {
      chartPlaceholder.appendChild(chartCanvas);
    } catch (error) {}
  }

  // 전역 변수 초기화 (헤더와 동기화)
  if (!window.currentYear) window.currentYear = new Date().getFullYear();
  if (window.currentMonth === undefined)
    window.currentMonth = new Date().getMonth();

  // 카테고리별 색상 매핑
  const categoryColors = {
    월급: "#e39d5d", // pastel-porsche (colorchip-20)
    용돈: "#aacd7e", // pastel-caper (colorchip-40)
    기타수입: "#a28878", // pastel-almondFrost (colorchip-10)
    생활: "#a7b9e9", // pastel-perano (colorchip-90)
    "의료/건강": "#bcdfd3", // pastel-cruise (colorchip-50)
    "쇼핑/뷰티": "#d7ca6b", // pastel-citron (colorchip-30)
    교통: "#7db7bf", // pastel-glacier (colorchip-70)
    식비: "#c5e0eb", // pastel-onahau (colorchip-60)
    "문화/여가": "#bda6e1", // pastel-perfume
    미분류: "#f0b0d3", // pastel-lavenderPink
    기타: "#73a7d4", // pastel-jordyBlue (colorchip-80)
  };

  // 통계 데이터 계산 함수
  function calculateStatistics(year, month) {
    // Store에서 데이터 가져오기
    const storeData = accountBookStore.getTransactions();
    // 해당 월의 데이터 가져오기
    const monthlyData = getFilteredData(storeData, year, month);
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

  // 도넛 차트 그리기 함수 (https://aosceno.tistory.com/729)
  function drawDonutChart(canvas, data) {
    if (!canvas) {
      return;
    }
    // 캔버스 컨텍스트 가져오기
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = Math.min(centerX, centerY) - 30;
    const innerRadius = outerRadius * 0.5;
    if (!data.sortedCategories || data.sortedCategories.length === 0) {
      // 빈 원 그리기
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
      ctx.arc(centerX, centerY, innerRadius, 2 * Math.PI, 0, true);
      ctx.fillStyle = "#e0e0e0";
      ctx.fill();
      // "데이터 없음" 텍스트 추가
      ctx.fillStyle = "#999";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("데이터 없음", centerX, centerY);
      return;
    }

    // 데이터 별 조각 그리기
    let currentAngle = -Math.PI / 2; // 12시 방향부터 시작
    data.sortedCategories.forEach(([category, stats]) => {
      const sliceAngle = (stats.percentage / 100) * 2 * Math.PI;
      const color = categoryColors[category] || categoryColors["기타"];
      // 도넛 조각 그리기
      ctx.beginPath();
      // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
      // 출처 : https://blog.naver.com/javaking75/140170132097
      // arc 함수 - (중앙 좌표, 반지름, 시작 각도, 끝 각도)
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
      // 색은 카테고리별 색상 매핑에서 가져옴
      ctx.fillStyle = color;
      ctx.fill();
      currentAngle += sliceAngle;
    });
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
  function updateStatistics(year, month) {
    const statisticsData = calculateStatistics(year, month);
    // 총 지출 금액 업데이트 (요소가 있다면)
    if (totalExpenseAmountEl) {
      totalExpenseAmountEl.textContent = `${formatAmount(
        statisticsData.totalExpense
      )}원`;
    }
    // 도넛 차트 그리기
    if (chartCanvas) {
      drawDonutChart(chartCanvas, statisticsData);
    }
    // 카테고리 리스트 렌더링
    if (categoryListEl) {
      renderCategoryList(statisticsData);
    }
  }

  // Store 변경 감지 설정
  function setupStoreSubscription() {
    accountBookStore.subscribe(() => {
      updateStatistics(window.currentYear, window.currentMonth);
    });
  }

  // Store 변경 감지 설정
  setupStoreSubscription();

  // 초기 렌더링
  updateHeaderDate(window.currentYear, window.currentMonth);
  updateStatistics(window.currentYear, window.currentMonth);

  // 전역 함수로 등록 (월 변경 시 호출용)
  window.updateStatistics = updateStatistics;
}

function showCategoryTrendChart(category) {
  // 전체 데이터 가져오기
  const allData = accountBookStore.getTransactions();
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
  const year = window.currentYear || new Date().getFullYear();
  const dataArr = months.map((m) => monthlyData[`${year}-${m}`] || 0);

  // 차트 그리기
  drawLineChart(trendCanvas, dataArr, months, category);
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

window.initStatistic = initStatistic;
