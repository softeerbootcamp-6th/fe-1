// 1. month가 바뀔 때마다 다른 지출 내역 보여주기
import { dateStore } from "../store/dateStore.js";
import { incomeExpenseStore } from "../store/incomeExpenseStore.js";

export function renderIncomeExpenseList() {
  const incomeExpenseListContainer = document.createElement("div");
  incomeExpenseListContainer.className = "income-expense-list-container";

  // 초기 렌더링
  renderListItem(incomeExpenseListContainer);

  // dateState 변경 시 재렌더링
  dateStore.subscribe(() => {
    renderListItem(incomeExpenseListContainer);
  });

  return incomeExpenseListContainer;
}

export function renderListItem(listContainer) {
  // 현재 연월 가져오기
  const currentYear = dateStore.getYear();
  const currentMonth = dateStore.getMonth();

  // 키로 현재 연월 데이터 가져오기
  const currentMonthData = incomeExpenseStore.getIncomeExpenseData([
    currentYear,
    currentMonth,
  ]);

  // TODO: 계산 로직 작성
  const monthlyNum = 0;
  const monthlyIncome = 0;
  const monthlyExpense = 0;

  // 기존 내용 지우기
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }

  const getMonthlyInfoHTML = (monthlyNum, monthlyIncome, monthlyExpense) => {
    return `
      <span> 전체내역 ${monthlyNum}건 </span>
      <div class="check-box-container">
        <div >
          <button>
            <img src="./assets/icons/checkbox.svg" />
          </button>
          <span>수입${monthlyIncome}</span>
        </div>
        <div>
          <button>
            <img src="./assets/icons/checkbox.svg" />
          </button>
          <span>지출${monthlyExpense}</span>
        </div>
      <div>
    `;
  };

  const getDailyInfoHTML = (dateString) => {
    const dateObj = new Date(dateString);
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const dayStringList = ["월", "화", "수", "목", "금", "토", "일"];
    const dayStringIndex = dateObj.getDay();

    const dailyIncome = "";
    const dailyExpense = "";

    return `
    <div class="daily-info-container">
      <span>${month}월 ${date}일 ${dayStringList[dayStringIndex]}요일</span>
      <div>
        <span>수입 ${dailyIncome}</span>
        <span>지출 ${dailyExpense}</span>
      </div>
    </div>
    `;
  };

  const tagColorMap = {
    생활: "tag-life",
    "의료/건강": "tag-health",
    "쇼핑/뷰티": "tag-shopping",
    식비: "tag-food",
    교통: "tag-transport",
    "문화/여가": "tag-culture",
    미분류: "tag-uncategorized",
    월급: "tag-salary",
    "기타 수입": "tag-etc-income",
    용돈: "tag-allowance",
  };

  const moneyColorMap = {
    income: "money-income",
    expense: "money-expense",
  };

  const getListItemHTML = ({ type, money, description, payment, tag }) => {
    const li = document.createElement("li");
    li.className = "list-item";

    const tagSpan = document.createElement("span");
    tagSpan.classList.add("tag", "light14", tagColorMap[tag]);
    tagSpan.textContent = tag;

    const descriptionSpan = document.createElement("span");
    descriptionSpan.className = "description light14";
    descriptionSpan.textContent = description;

    const paymentSpan = document.createElement("span");
    paymentSpan.className = "payment light14";
    paymentSpan.textContent = payment;

    const moneySpan = document.createElement("span");
    moneySpan.classList.add("money", "light14", moneyColorMap[type]);
    moneySpan.textContent = `${money}원`;

    // hover 시 deleteDiv 보여짐
    const deleteDiv = document.createElement("div");
    deleteDiv.className = "delete";
    deleteDiv.style.display = "none";
    deleteDiv.innerHTML = `
    <div class="delete-icon"><img src='../assets/icons/delete-icon.svg'/></div>
    <span class="delete-text semibold12">삭제</span>
    `;

    li.appendChild(tagSpan);
    li.appendChild(descriptionSpan);
    li.appendChild(paymentSpan);
    li.appendChild(moneySpan);
    li.appendChild(deleteDiv);

    // hover 이벤트 추가
    li.addEventListener("mouseenter", () => {
      deleteDiv.style.display = "block";
    });

    li.addEventListener("mouseleave", () => {
      deleteDiv.style.display = "none";
    });

    return li;
  };

  const monthlyInfoContainer = document.createElement("div");
  monthlyInfoContainer.className = "monthly-info-container";
  monthlyInfoContainer.innerHTML = getMonthlyInfoHTML(
    monthlyNum,
    monthlyIncome,
    monthlyExpense,
  );
  listContainer.appendChild(monthlyInfoContainer);

  // 월데이터 날짜 별로 화면에 뿌리기
  Object.entries(currentMonthData).forEach(([date, dateData]) => {
    const dailyContainer = document.createElement("div");
    dailyContainer.className = "daily-container";
    dailyContainer.innerHTML = getDailyInfoHTML(date);

    // 지출 내역 추가
    const listItem = document.createElement("div");
    listItem.className = "list-item-container";
    dateData.forEach((item) => {
      listItem.appendChild(getListItemHTML(item));
      dailyContainer.appendChild(listItem);
    });
    listContainer.appendChild(dailyContainer);
  });
}
