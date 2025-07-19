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

  // 전체 수입 지출 내역을 리렌더링
  incomeExpenseStore.subscribe(() => {
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

  const currentMonthDataList = Object.entries(currentMonthData)
    .map((dailyData) => dailyData[1])
    .flat();

  const monthlyNum = currentMonthDataList.length;

  const monthlyIncome = currentMonthDataList
    .filter((data) => data.type == "income")
    .reduce((income, data) => income + data.money, 0);

  const monthlyExpense = currentMonthDataList
    .filter((data) => data.type == "expense")
    .reduce((expense, data) => expense - data.money, 0);

  // 기존 내용 지우기
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }

  const getMonthlyInfoHTML = (monthlyNum, monthlyIncome, monthlyExpense) => {
    return `
      <span> 전체내역 ${monthlyNum}건 </span>
      <div class="check-box-container">
        <div class="check-box">
          <button class="income-check-button">
            <img src="./assets/icons/checkbox.svg" />
          </button>
          <span>수입 ${monthlyIncome}</span>
        </div>
        <div class="check-box">
          <button class="expense-check-button">
            <img src="./assets/icons/checkbox.svg" />
          </button>
          <span>지출 ${monthlyExpense}</span>
        </div>
      <div>
    `;
  };

  const getDailyInfoHTML = ([dateString, dateData]) => {
    const dateObj = new Date(dateString);
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const dayStringList = ["월", "화", "수", "목", "금", "토", "일"];
    const dayStringIndex = dateObj.getDay();

    const dailyIncomeData = dateData.filter((data) => data.type == "income");
    const dailyExpenseData = dateData.filter((data) => data.type == "expense");

    const dailyIncome = dailyIncomeData.reduce(
      (income, data) => income + data.money,
      0,
    );
    const dailyExpense = dailyExpenseData.reduce(
      (expense, data) => expense - data.money,
      0,
    );

    return `
    <div class="daily-info-container serif14">
      <span>${month}월 ${date}일 ${dayStringList[dayStringIndex]}요일</span>
      <div>
        ${dailyIncome ? `<span>수입 ${dailyIncome}원</span>` : ""}
        ${dailyExpense ? `<span>지출 ${dailyExpense}원</span>` : ""}
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

  const getListItemHTML = ({ id, type, money, description, payment, tag }) => {
    const li = document.createElement("li");
    li.className = "list-item";
    li.id = id;

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
    <img class="delete-icon" src='../assets/icons/delete-icon.svg'/>
    <span class="delete-text semibold12">삭제</span>
    `;

    li.appendChild(tagSpan);
    li.appendChild(descriptionSpan);
    li.appendChild(paymentSpan);
    li.appendChild(moneySpan);
    li.appendChild(deleteDiv);

    // hover 이벤트 추가
    li.addEventListener("mouseenter", () => {
      deleteDiv.style.display = "flex";
      li.classList.toggle("list-item-hover");
    });

    li.addEventListener("mouseleave", () => {
      deleteDiv.style.display = "none";
      li.classList.toggle("list-item-hover");
    });

    li.addEventListener("click", (e) => {
      e.stopPropagation();
      handleListItemClick(e);
    });

    return li;
  };

  const monthlyInfoContainer = document.createElement("div");
  monthlyInfoContainer.className = "monthly-info-container light12";
  monthlyInfoContainer.innerHTML = getMonthlyInfoHTML(
    monthlyNum,
    monthlyIncome,
    monthlyExpense,
  );
  listContainer.appendChild(monthlyInfoContainer);

  let isIncomeChecked = true;
  let isExpenseChecked = true;

  const incomeCheckButton = monthlyInfoContainer.querySelector(
    ".income-check-button",
  );
  const expenseCheckButton = monthlyInfoContainer.querySelector(
    ".expense-check-button",
  );
  console.log(incomeCheckButton, expenseCheckButton);

  incomeCheckButton.addEventListener("click", () => {
    const incomeCheckButtonImg = incomeCheckButton.querySelector("img");
    isIncomeChecked = !isIncomeChecked;
    incomeCheckButtonImg.src = isIncomeChecked
      ? "./assets/icons/checkbox.svg"
      : "./assets/icons/uncheckbox.svg";

    const dailyContainers = listContainer.querySelectorAll(".daily-container");
    dailyContainers.forEach((el) => el.remove());

    if (isIncomeChecked) {
      renderDailyContainer(currentMonthData);
    } else {
      const currentMonthDataWithoutIncome = Object.fromEntries(
        Object.entries(currentMonthData).map(([date, dateData]) => [
          date,
          dateData.filter((item) => item.type !== "income"),
        ]),
      );
      renderDailyContainer(currentMonthDataWithoutIncome);
    }
  });

  expenseCheckButton.addEventListener("click", () => {
    const expenseCheckButtonImg = expenseCheckButton.querySelector("img");
    isExpenseChecked = !isExpenseChecked;
    expenseCheckButtonImg.src = isExpenseChecked
      ? "./assets/icons/checkbox.svg"
      : "./assets/icons/uncheckbox.svg";

    // dailyContainer가 없어질 때까지 remove
    const dailyContainers = listContainer.querySelectorAll(".daily-container");
    dailyContainers.forEach((el) => el.remove());

    if (isExpenseChecked) {
      renderDailyContainer(currentMonthData);
    } else {
      const currentMonthDataWithoutExpense = Object.fromEntries(
        Object.entries(currentMonthData).map(([date, dateData]) => [
          date,
          dateData.filter((item) => item.type !== "expense"),
        ]),
      );
      renderDailyContainer(currentMonthDataWithoutExpense);
    }
  });

  function renderDailyContainer(currentMonthData) {
    // 월데이터 날짜 별로 화면에 뿌리기
    Object.entries(currentMonthData).forEach(([date, dateData]) => {
      const dailyContainer = document.createElement("div");
      dailyContainer.className = "daily-container";
      dailyContainer.innerHTML = getDailyInfoHTML([date, dateData]);

      // 지출 내역 추가
      const listItemContainer = document.createElement("div");
      listItemContainer.className = "list-item-container";
      listItemContainer.id = date;
      dateData.forEach((item) => {
        listItemContainer.appendChild(getListItemHTML(item));
        dailyContainer.appendChild(listItemContainer);
      });
      listContainer.appendChild(dailyContainer);
    });
  }
  renderDailyContainer(currentMonthData);
}

// list 개별 요소 클릭
const handleListItemClick = ({ target }) => {
  const clickedElement = target.closest("div");
  const targetListItem = target.closest("li");

  const targetListItemID = Number(targetListItem.id);
  const targetListItemDate = targetListItem.closest("div").id;

  // 삭제 버튼 클릭했을 경우
  if (clickedElement.className == "delete") {
    incomeExpenseStore.delIncomeExpenseData(
      targetListItemDate,
      targetListItemID,
    );
  } else {
    // 삭제 버튼 아닌 곳 클릭했을 경우
    const targetData = incomeExpenseStore
      .getIncomeExpenseData()
      [targetListItemDate].find((data) => data.id === targetListItemID);

    const editEvent = new CustomEvent("edit-item", {
      detail: { targetListItemDate, ...targetData },
    });
    document.dispatchEvent(editEvent); // edit event 발생
  }
};
