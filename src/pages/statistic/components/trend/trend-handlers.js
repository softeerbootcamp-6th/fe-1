import { getMonthlyExpenseByCategory } from "../../../../utils/data-utils.js";
import { dateStore } from "../../../../store/date-store.js";
import { renderExpenseHistoryList } from "../history/history-handlers.js";
import { transactionUtils } from "../../../../store/transaction-store.js";

export async function showCategoryTrendChart(category) {
  try {
    // store의 현재 데이터 사용
    const allData = transactionUtils.getCurrentTransactions();

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
