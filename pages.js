import { renderMonthlyInfo } from "./components/monthlyInfo.js";
import { renderInputBar } from "./components/inputBar.js";

export function createMainPage() {
  return `
    <div class="main-page">
      <div id="input-bar-container"></div>
      <div id="monthly-info-container"></div>
      <div class="flex-row">    
        <div>8월 14일 월요일</div>
        <div>지출 56,240원</div>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td>문화/여가</td>
              <td>스트리밍 서비스 정기 결제</td>
              <td>현대카드</td>
              <td>-10,900원</td>
            </tr>
            <tr>
              <td>교통</td>
              <td>후불 교통비 결제</td>
              <td>현대카드</td>
              <td>-45,340원</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div>
          <div>8월 9일 수요일</div>
          <div>지출 519,140원</div>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>식비</td>
                <td>두유 4개</td>
                <td>현대카드</td>
                <td>-19,140원</td>
              </tr>
              <tr>
                <td>생활</td>
                <td>8월 월세</td>
                <td>현대카드</td>
                <td>-500,000원</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div>8월 13일 일요일</div>
        <div>수입 2,010,580원 지출 10,000원</div>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td>식비</td>
              <td>잔치국수와 김밥</td>
              <td>현대카드</td>
              <td>-10,000원</td>
            </tr>
            <tr>
              <td>월급</td>
              <td>8월 급여</td>
              <td>현금</td>
              <td>2,010,580원</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function createCalendarPage() {
  return `
    <div class="calendar-page">
      <h2>캘린더</h2>
    </div>
  `;
}

export function createGraphPage() {
  return `
    <div class="graph-page">
      <h2>그래프</h2>
    </div>
  `;
}

export function renderMainPage() {
  const mainContainer = document.getElementById("main-container");
  if (mainContainer) {
    mainContainer.innerHTML = createMainPage();
  }
  // inputBar 렌더링
  const inputBarContainer = document.getElementById("input-bar-container");
  if (inputBarContainer) {
    renderInputBar(inputBarContainer);
  }

  // monthlyInfo 렌더링
  const monthlyInfoContainer = document.getElementById(
    "monthly-info-container"
  );
  if (monthlyInfoContainer) {
    renderMonthlyInfo(monthlyInfoContainer);
  }
}

export function renderCalendarPage() {
  const mainContainer = document.getElementById("main-container");
  if (mainContainer) {
    mainContainer.innerHTML = createCalendarPage();
  }
}

export function renderGraphPage() {
  const mainContainer = document.getElementById("main-container");
  if (mainContainer) {
    mainContainer.innerHTML = createGraphPage();
  }
}
